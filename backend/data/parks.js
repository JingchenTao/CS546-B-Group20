import { ObjectId } from 'mongodb';
import { parks } from '../config/mongoCollections.js';
import { review } from '../config/mongoCollections.js';
import { comment } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import {
  validateParkName,
  validateParkLocation,
  validateParkZip,
  validateDescription,
  validateParkType,
  validateRating,
  validateObjectId,
  validateSort,
  validateLimit,
  validateMinRating,
  trimString
} from '../helpers.js';

const convertParkObjectIds = (park) => {
  if (!park) return park;
  park._id = park._id.toString();
  return park;
};
export const buildQuery = (reqQuery) => {
  const query = {};
  
  if (reqQuery.search) {
    const searchStr = trimString(reqQuery.search);
    if (searchStr && searchStr.length > 0) {
      query.park_name = { $regex: searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    }
  }
  
  if (reqQuery.location) {
    const locationStr = trimString(reqQuery.location).toUpperCase();
    if (locationStr && ['M', 'B', 'Q', 'X', 'R'].includes(locationStr)) {
      query.park_location = locationStr;
    }
  }
  
  if (reqQuery.type) {
    const typeStr = trimString(reqQuery.type);
    if (typeStr && typeStr.length > 0) {
      query.park_type = { $regex: new RegExp(`^${typeStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') };
    }
  }
  
  if (reqQuery.zipcode) {
    const zipStr = trimString(reqQuery.zipcode);
    if (zipStr && /^\d{5}$/.test(zipStr)) {
      query.park_zip = { $in: [zipStr] };
    }
  }
  
  if (reqQuery.minRating !== undefined && reqQuery.minRating !== null) {
    const minRating = parseFloat(reqQuery.minRating);
    if (!isNaN(minRating) && minRating >= 0 && minRating <= 5) {
      query.rating = { $gte: minRating };
    }
  }
  
  return query;
};

export const getAllParks = async (search, location, type, zipcode, minRating, sort) => {
  try {
    let validatedSort;
    try {
      validatedSort = validateSort(sort);
    } catch (error) {
      throw new Error(`Sort validation failed: ${error.message || error}`);
    }
    
    let validatedMinRating;
    if (minRating !== undefined && minRating !== null) {
      try {
        validatedMinRating = validateMinRating(minRating);
      } catch (error) {
        throw new Error(`Min rating validation failed: ${error.message || error}`);
      }
    }
    
    if (zipcode !== undefined && zipcode !== null) {
      if (typeof zipcode !== 'string') {
        throw 'Zipcode must be a string';
      }
      const trimmedZip = trimString(zipcode);
      if (!/^\d{5}$/.test(trimmedZip)) {
        throw 'Zipcode must be exactly 5 digits';
      }
    }
    
    const reqQuery = {
      search: search,
      location: location,
      type: type,
      zipcode: zipcode,
      minRating: validatedMinRating
    };
    
    const query = buildQuery(reqQuery);
    
    const parksCollection = await parks();
    
    let sortObj = {};
    switch (validatedSort) {
      case 'rating_asc':
        sortObj = { rating: 1 };
        break;
      case 'rating_desc':
        sortObj = { rating: -1 };
        break;
      case 'name_asc':
        sortObj = { park_name: 1 };
        break;
      case 'name_desc':
        sortObj = { park_name: -1 };
        break;
      case 'reviews_asc':
        sortObj = { reviewCount: 1 };
        break;
      case 'reviews_desc':
        sortObj = { reviewCount: -1 };
        break;
      default:
        sortObj = { rating: -1 };
    }
    
    let allParks = await parksCollection.find(query).sort(sortObj).toArray();
    
    const reviewCollection = await review();
    for (let park of allParks) {
      const reviewCount = await reviewCollection.countDocuments({ park_id: new ObjectId(park._id.toString()) });
      park.reviewCount = reviewCount;
    }
    
    if (validatedSort === 'reviews_asc' || validatedSort === 'reviews_desc') {
      allParks.sort((a, b) => {
        if (validatedSort === 'reviews_asc') {
          return a.reviewCount - b.reviewCount;
        } else {
          return b.reviewCount - a.reviewCount;
        }
      });
    }
    
    allParks.forEach(park => {
      convertParkObjectIds(park);
    });
    
    return allParks;
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error getting all parks: ${error.message || error}`);
  }
};

export const getParkById = async (parkId) => {
  try {
    let trimmedId;
    try {
      trimmedId = validateObjectId(parkId);
    } catch (error) {
      throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    
    const parksCollection = await parks();
    const park = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    
    if (!park) {
      throw 'No park found with that ID';
    }
    
    const reviewCollection = await review();
    const reviewCount = await reviewCollection.countDocuments({ park_id: new ObjectId(trimmedId) });
    park.reviewCount = reviewCount;
    
    return convertParkObjectIds(park);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error getting park by ID: ${error.message || error}`);
  }
};

export const getPopularParks = async (limit) => {
  try {
    let validatedLimit;
    try {
      validatedLimit = validateLimit(limit);
    } catch (error) {
      throw new Error(`Limit validation failed: ${error.message || error}`);
    }
    
    const parksList = await getAllParks(undefined, undefined, undefined, undefined, undefined, 'rating_desc');
    
    parksList.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
    
    return parksList.slice(0, validatedLimit);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error getting popular parks: ${error.message || error}`);
  }
};

export const getRecommendParks = async ({ zipcode, location }) => {
  try {
    if (zipcode) {
      if (typeof zipcode !== 'string') {
        throw 'Zipcode must be a string';
      }
      const trimmedZip = trimString(zipcode);
      if (!/^\d{5}$/.test(trimmedZip)) {
        throw 'Zipcode must be exactly 5 digits';
      }
      
      const parksList = await getAllParks(undefined, undefined, undefined, trimmedZip, undefined, 'rating_desc');
      return parksList.slice(0, 10);
    }
    
    if (location) {
      const trimmedLocation = trimString(location).toUpperCase();
      if (!['M', 'B', 'Q', 'X', 'R'].includes(trimmedLocation)) {
        throw 'Location must be one of: M, B, Q, X, R';
      }
      
      const parksList = await getAllParks(undefined, trimmedLocation, undefined, undefined, undefined, 'rating_desc');
      return parksList.slice(0, 10);
    }
    return await getPopularParks(10);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error getting recommended parks: ${error.message || error}`);
  }
};

export const createPark = async (park_name, park_location, park_zip, description, park_type) => {
  try {
    if (park_name === undefined || park_location === undefined || park_zip === undefined || 
        description === undefined || park_type === undefined) {
      throw 'All parameters must be provided';
    }
    
    let trimmedParkName, validatedLocation, validatedZip, trimmedDescription, trimmedParkType;
    
    try {
      trimmedParkName = validateParkName(trimString(park_name));
    } catch (error) {
      throw new Error(`Park name validation failed: ${error.message || error}`);
    }
    
    try {
      validatedLocation = validateParkLocation(trimString(park_location));
    } catch (error) {
      throw new Error(`Park location validation failed: ${error.message || error}`);
    }
    
    try {
      validatedZip = validateParkZip(park_zip);
    } catch (error) {
      throw new Error(`Park ZIP validation failed: ${error.message || error}`);
    }
    
    try {
      trimmedDescription = validateDescription(trimString(description));
    } catch (error) {
      throw new Error(`Description validation failed: ${error.message || error}`);
    }
    
    try {
      trimmedParkType = validateParkType(trimString(park_type));
    } catch (error) {
      throw new Error(`Park type validation failed: ${error.message || error}`);
    }
    
    const parksCollection = await parks();
    
    const existingPark = await parksCollection.findOne(
     { park_name: trimmedParkName.toLowerCase() });
    
    if (existingPark) {
      throw 'A park with this name already exists';
    }
    
    const newPark = {
      park_name: trimmedParkName.toLowerCase(),
      park_location: validatedLocation,
      park_zip: validatedZip,
      description: trimmedDescription,
      park_type: trimmedParkType,
      rating: 0,
      reviewCount: 0
    };
    
    const insertInfo = await parksCollection.insertOne(newPark);
    
    if (insertInfo.insertedCount === 0) {
      throw 'Could not add park';
    }
    
    const insertedPark = await parksCollection.findOne({ _id: insertInfo.insertedId });
    return convertParkObjectIds(insertedPark);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error creating park: ${error.message || error}`);
  }
};

export const updatePark = async (parkId, updateData) => {
  try {
    let trimmedId;
    try {
      trimmedId = validateObjectId(parkId);
    } catch (error) {
      throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    
    if (!updateData || typeof updateData !== 'object' || Array.isArray(updateData)) {
      throw 'Update data must be an object';
    }
    
    const parksCollection = await parks();
    
    const existingPark = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    if (!existingPark) {
      throw 'No park found with that ID';
    }
    
    const updateObj = {};
    
    if (updateData.park_name !== undefined) {
      try {
        const trimmedParkName = validateParkName(trimString(updateData.park_name));
        const duplicatePark = await parksCollection.findOne({
          park_name: trimmedParkName.toLowerCase()  ,
          _id: { $ne: new ObjectId(trimmedId) }
        });
        if (duplicatePark) {
          throw 'A park with this name already exists';
        }
        updateObj.park_name = trimmedParkName;
      } catch (error) {
        throw new Error(`Park name validation failed: ${error.message || error}`);
      }
    }
    
    if (updateData.park_location !== undefined) {
      try {
        updateObj.park_location = validateParkLocation(trimString(updateData.park_location));
      } catch (error) {
        throw new Error(`Park location validation failed: ${error.message || error}`);
      }
    }
    
    if (updateData.park_zip !== undefined) {
      try {
        updateObj.park_zip = validateParkZip(updateData.park_zip);
      } catch (error) {
        throw new Error(`Park ZIP validation failed: ${error.message || error}`);
      }
    }
    
    if (updateData.description !== undefined) {
      try {
        updateObj.description = validateDescription(trimString(updateData.description));
      } catch (error) {
        throw new Error(`Description validation failed: ${error.message || error}`);
      }
    }
    
    if (updateData.park_type !== undefined) {
      try {
        updateObj.park_type = validateParkType(trimString(updateData.park_type));
      } catch (error) {
        throw new Error(`Park type validation failed: ${error.message || error}`);
      }
    }
    
    if (updateData.rating !== undefined) {
      throw 'Rating cannot be modified directly.';
    }
    
    if (Object.keys(updateObj).length === 0) {
      return convertParkObjectIds(existingPark);
    }
    
    const updateInfo = await parksCollection.updateOne(
      { _id: new ObjectId(trimmedId) },
      { $set: updateObj }
    );
    
    if (updateInfo.modifiedCount === 0) {
      throw 'Could not update park';
    }
    
    const updatedPark = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    return convertParkObjectIds(updatedPark);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error updating park: ${error.message || error}`);
  }
};

const deleteParkCascade = async (parkId) => {
  try {
    const reviewCollection = await review();
    const commentCollection = await comment();
    const usersCollection = await users();
    
    const parkReviews = await reviewCollection.find({ park_id: new ObjectId(parkId.toString()) }).toArray();
    
    let deleteReviewFn, deleteCommentsByReviewIdFn;
    try {
      const reviewModule = await import('./review.js');
      deleteReviewFn = reviewModule.deleteReview;
    } catch (e) {
      deleteReviewFn = null;
    }
    try {
      const commentModule = await import('./comment.js');
      deleteCommentsByReviewIdFn = commentModule.deleteCommentsByReviewId;
    } catch (e) {
      deleteCommentsByReviewIdFn = null;
    }
    
    for (let reviewDoc of parkReviews) {
      if (deleteCommentsByReviewIdFn) {
        try {
          await deleteCommentsByReviewIdFn(reviewDoc._id.toString());
        } catch (error) {
          await commentCollection.deleteMany({ review_id: new ObjectId(reviewDoc._id.toString()) });
        }
      } else {
        await commentCollection.deleteMany({ review_id: new ObjectId(reviewDoc._id.toString()) });
      }
      
      if (deleteReviewFn) {
        try {
          await deleteReviewFn(reviewDoc._id.toString());
        } catch (error) {
          await reviewCollection.deleteOne({ _id: reviewDoc._id });
        }
      } else {
        await reviewCollection.deleteOne({ _id: reviewDoc._id });
      }
    }
    
    await usersCollection.updateMany(
      { favorite_Parks: parkId.toString() },
      { $pull: { favorite_Parks: parkId.toString() } }
    );
    
    await usersCollection.updateMany(
      { favorite_Parks: new ObjectId(parkId) },
      { $pull: { favorite_Parks: new ObjectId(parkId) } }
    );
    
    return true;
  } catch (error) {
    throw new Error(`Error in cascade delete: ${error.message || error}`);
  }
};

export const deletePark = async (parkId) => {
  try {
    let trimmedId;
    try {
      trimmedId = validateObjectId(parkId);
    } catch (error) {
      throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    
    const parksCollection = await parks();
    
    const park = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    
    if (!park) {
      throw 'No park found with that ID';
    }
    
    await deleteParkCascade(trimmedId);
    
    const deleteInfo = await parksCollection.deleteOne({ _id: new ObjectId(trimmedId) });
    
    if (deleteInfo.deletedCount === 0) {
      throw 'Could not remove park';
    }
    
    return {
      park_name: park.park_name,
      deleted: true
    };
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error removing park: ${error.message || error}`);
  }
};


