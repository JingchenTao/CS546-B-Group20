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

// Helper function to convert all ObjectIds in a park to strings
const convertParkObjectIds = (park) => {
  if (!park) return park;
  park._id = park._id.toString();
  return park;
};

// Helper function to build MongoDB query from request query parameters
export const buildQuery = (reqQuery) => {
  const query = {};
  
  // Handle search (partial match on park_name, case-insensitive)
  if (reqQuery.search) {
    const searchStr = trimString(reqQuery.search);
    if (searchStr && searchStr.length > 0) {
      query.park_name = { $regex: searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    }
  }
  
  // Handle location (case-insensitive, convert to uppercase)
  if (reqQuery.location) {
    const locationStr = trimString(reqQuery.location).toUpperCase();
    if (locationStr && ['M', 'B', 'Q', 'X', 'R'].includes(locationStr)) {
      query.park_location = locationStr;
    }
  }
  
  // Handle type (case-insensitive)
  if (reqQuery.type) {
    const typeStr = trimString(reqQuery.type);
    if (typeStr && typeStr.length > 0) {
      query.park_type = { $regex: new RegExp(`^${typeStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') };
    }
  }
  
  // Handle zipcode (5 digits)
  if (reqQuery.zipcode) {
    const zipStr = trimString(reqQuery.zipcode);
    if (zipStr && /^\d{5}$/.test(zipStr)) {
      query.park_zip = { $in: [zipStr] };
    }
  }
  
  // Handle minRating
  if (reqQuery.minRating !== undefined && reqQuery.minRating !== null) {
    const minRating = parseFloat(reqQuery.minRating);
    if (!isNaN(minRating) && minRating >= 0 && minRating <= 5) {
      query.rating = { $gte: minRating };
    }
  }
  
  return query;
};

// Get all parks with filtering and sorting
export const getAllParks = async (search, location, type, zipcode, minRating, sort) => {
  try {
    // Validate sort parameter
    let validatedSort;
    try {
      validatedSort = validateSort(sort);
    } catch (error) {
      throw new Error(`Sort validation failed: ${error.message || error}`);
    }
    
    // Validate minRating if provided
    let validatedMinRating;
    if (minRating !== undefined && minRating !== null) {
      try {
        validatedMinRating = validateMinRating(minRating);
      } catch (error) {
        throw new Error(`Min rating validation failed: ${error.message || error}`);
      }
    }
    
    // Validate zipcode if provided
    if (zipcode !== undefined && zipcode !== null) {
      if (typeof zipcode !== 'string') {
        throw 'Zipcode must be a string';
      }
      const trimmedZip = trimString(zipcode);
      if (!/^\d{5}$/.test(trimmedZip)) {
        throw 'Zipcode must be exactly 5 digits';
      }
    }
    
    // Build query object
    const reqQuery = {
      search: search,
      location: location,
      type: type,
      zipcode: zipcode,
      minRating: validatedMinRating
    };
    
    const query = buildQuery(reqQuery);
    
    const parksCollection = await parks();
    
    // Build sort object
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
    
    // Get all parks matching query
    let allParks = await parksCollection.find(query).sort(sortObj).toArray();
    
    // Populate review count for each park
    const reviewCollection = await review();
    for (let park of allParks) {
      const reviewCount = await reviewCollection.countDocuments({ parkId: park._id.toString() });
      park.reviewCount = reviewCount;
    }
    
    // Re-sort if sorting by reviews
    if (validatedSort === 'reviews_asc' || validatedSort === 'reviews_desc') {
      allParks.sort((a, b) => {
        if (validatedSort === 'reviews_asc') {
          return a.reviewCount - b.reviewCount;
        } else {
          return b.reviewCount - a.reviewCount;
        }
      });
    }
    
    // Convert ObjectIds to strings
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

// Get park by ID
export const getParkById = async (parkId) => {
  try {
    // Validate parkId using helper
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
    
    // Populate review count
    const reviewCollection = await review();
    const reviewCount = await reviewCollection.countDocuments({ parkId: trimmedId });
    park.reviewCount = reviewCount;
    
    return convertParkObjectIds(park);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error getting park by ID: ${error.message || error}`);
  }
};

// Get popular parks
export const getPopularParks = async (limit) => {
  try {
    let validatedLimit;
    try {
      validatedLimit = validateLimit(limit);
    } catch (error) {
      throw new Error(`Limit validation failed: ${error.message || error}`);
    }
    
    // Get parks sorted by rating or reviews
    const parksList = await getAllParks(undefined, undefined, undefined, undefined, undefined, 'rating_desc');
    
    // Sort by review count if rating is the same, then take top N
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

// Get recommended parks
export const getRecommendParks = async ({ zipcode, location }) => {
  try {
    // If both zipcode and location provided, prioritize zipcode
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
    
    // If only location provided
    if (location) {
      const trimmedLocation = trimString(location).toUpperCase();
      if (!['M', 'B', 'Q', 'X', 'R'].includes(trimmedLocation)) {
        throw 'Location must be one of: M, B, Q, X, R';
      }
      
      const parksList = await getAllParks(undefined, trimmedLocation, undefined, undefined, undefined, 'rating_desc');
      return parksList.slice(0, 10);
    }
    
    // If neither provided, return top rated parks
    return await getPopularParks(10);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error getting recommended parks: ${error.message || error}`);
  }
};

// Create a new park
export const createPark = async (park_name, park_location, park_zip, description, park_type) => {
  try {
    // Validate all parameters are provided
    if (park_name === undefined || park_location === undefined || park_zip === undefined || 
        description === undefined || park_type === undefined) {
      throw 'All parameters must be provided';
    }
    
    // Trim and validate all inputs
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
    
    // Check for duplicate park names (case-insensitive)
    const existingPark = await parksCollection.findOne({
      park_name: { $regex: new RegExp(`^${trimmedParkName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
    });
    
    if (existingPark) {
      throw 'A park with this name already exists';
    }
    
    // Create the park object
    const newPark = {
      park_name: trimmedParkName,
      park_location: validatedLocation,
      park_zip: validatedZip,
      description: trimmedDescription,
      park_type: trimmedParkType,
      rating: 0,
      reviewCount: 0
    };
    
    // Insert the park into the database
    const insertInfo = await parksCollection.insertOne(newPark);
    
    if (insertInfo.insertedCount === 0) {
      throw 'Could not add park';
    }
    
    // Get the inserted park and return it
    const insertedPark = await parksCollection.findOne({ _id: insertInfo.insertedId });
    return convertParkObjectIds(insertedPark);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error creating park: ${error.message || error}`);
  }
};

// Update a park
export const updatePark = async (parkId, updateData) => {
  try {
    // Validate parkId using helper
    let trimmedId;
    try {
      trimmedId = validateObjectId(parkId);
    } catch (error) {
      throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    
    // Validate updateData
    if (!updateData || typeof updateData !== 'object' || Array.isArray(updateData)) {
      throw 'Update data must be an object';
    }
    
    const parksCollection = await parks();
    
    // Check if park exists
    const existingPark = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    if (!existingPark) {
      throw 'No park found with that ID';
    }
    
    // Build update object
    const updateObj = {};
    
    // Validate and add park_name if provided
    if (updateData.park_name !== undefined) {
      try {
        const trimmedParkName = validateParkName(trimString(updateData.park_name));
        // Check for duplicate names (excluding current park)
        const duplicatePark = await parksCollection.findOne({
          park_name: { $regex: new RegExp(`^${trimmedParkName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
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
    
    // Validate and add park_location if provided
    if (updateData.park_location !== undefined) {
      try {
        updateObj.park_location = validateParkLocation(trimString(updateData.park_location));
      } catch (error) {
        throw new Error(`Park location validation failed: ${error.message || error}`);
      }
    }
    
    // Validate and add park_zip if provided
    if (updateData.park_zip !== undefined) {
      try {
        updateObj.park_zip = validateParkZip(updateData.park_zip);
      } catch (error) {
        throw new Error(`Park ZIP validation failed: ${error.message || error}`);
      }
    }
    
    // Validate and add description if provided
    if (updateData.description !== undefined) {
      try {
        updateObj.description = validateDescription(trimString(updateData.description));
      } catch (error) {
        throw new Error(`Description validation failed: ${error.message || error}`);
      }
    }
    
    // Validate and add park_type if provided
    if (updateData.park_type !== undefined) {
      try {
        updateObj.park_type = validateParkType(trimString(updateData.park_type));
      } catch (error) {
        throw new Error(`Park type validation failed: ${error.message || error}`);
      }
    }
    
    // Rating cannot be updated through this function
    if (updateData.rating !== undefined) {
      throw 'Rating cannot be modified directly. Use reParkRating() to update rating.';
    }
    
    // If no fields to update, return existing park
    if (Object.keys(updateObj).length === 0) {
      return convertParkObjectIds(existingPark);
    }
    
    // Update the park
    const updateInfo = await parksCollection.updateOne(
      { _id: new ObjectId(trimmedId) },
      { $set: updateObj }
    );
    
    if (updateInfo.modifiedCount === 0) {
      throw 'Could not update park';
    }
    
    // Get the updated park and return it
    const updatedPark = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    return convertParkObjectIds(updatedPark);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error updating park: ${error.message || error}`);
  }
};

// Helper function for cascade delete
// This is a utility function I added to handle cascade deletion
// It calls deleteReview() and deleteCommentsByReviewId() if they exist, otherwise deletes directly
const deleteParkCascade = async (parkId) => {
  try {
    const reviewCollection = await review();
    const commentCollection = await comment();
    const usersCollection = await users();
    
    // Get all reviews for this park
    const parkReviews = await reviewCollection.find({ parkId: parkId.toString() }).toArray();
    
    // Try to import deleteReview and deleteCommentsByReviewId if they exist
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
    
    // Delete all comments and reviews for this park
    for (let reviewDoc of parkReviews) {
      // Try to use deleteCommentsByReviewId if available
      if (deleteCommentsByReviewIdFn) {
        try {
          await deleteCommentsByReviewIdFn(reviewDoc._id.toString());
        } catch (error) {
          // Fallback to direct deletion
          await commentCollection.deleteMany({ reviewId: reviewDoc._id.toString() });
        }
      } else {
        // Direct deletion
        await commentCollection.deleteMany({ reviewId: reviewDoc._id.toString() });
      }
      
      // Try to use deleteReview if available
      if (deleteReviewFn) {
        try {
          await deleteReviewFn(reviewDoc._id.toString());
        } catch (error) {
          // Fallback to direct deletion
          await reviewCollection.deleteOne({ _id: reviewDoc._id });
        }
      } else {
        // Direct deletion
        await reviewCollection.deleteOne({ _id: reviewDoc._id });
      }
    }
    
    // Remove parkId from all users' favorites
    await usersCollection.updateMany(
      { favorites: parkId.toString() },
      { $pull: { favorites: parkId.toString() } }
    );
    
    // Also handle ObjectId format
    await usersCollection.updateMany(
      { favorites: new ObjectId(parkId) },
      { $pull: { favorites: new ObjectId(parkId) } }
    );
    
    return true;
  } catch (error) {
    throw new Error(`Error in cascade delete: ${error.message || error}`);
  }
};

// Delete a park
export const deletePark = async (parkId) => {
  try {
    // Validate parkId using helper
    let trimmedId;
    try {
      trimmedId = validateObjectId(parkId);
    } catch (error) {
      throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    
    const parksCollection = await parks();
    
    // First, get the park to return its name
    const park = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    
    if (!park) {
      throw 'No park found with that ID';
    }
    
    // Perform cascade delete
    await deleteParkCascade(trimmedId);
    
    // Delete the park
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

// Recalculate park rating
export const reParkRating = async (parkId) => {
  try {
    // Validate parkId using helper
    let trimmedId;
    try {
      trimmedId = validateObjectId(parkId);
    } catch (error) {
      throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    
    const parksCollection = await parks();
    const reviewCollection = await review();
    
    // Check if park exists
    const park = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    if (!park) {
      throw 'No park found with that ID';
    }
    
    // Get all reviews for this park
    const parkReviews = await reviewCollection.find({ parkId: trimmedId }).toArray();
    
    // Calculate average rating
    let newRating = 0;
    if (parkReviews.length > 0) {
      const sum = parkReviews.reduce((acc, review) => {
        return acc + (review.rating || 0);
      }, 0);
      newRating = sum / parkReviews.length;
      // Round to 1 decimal place
      newRating = Math.round(newRating * 10) / 10;
    }
    
    // Update park rating
    const updateInfo = await parksCollection.updateOne(
      { _id: new ObjectId(trimmedId) },
      { $set: { rating: newRating } }
    );
    
    if (updateInfo.modifiedCount === 0 && parkReviews.length > 0) {
      throw 'Could not update park rating';
    }
    
    // Get the updated park and return it
    const updatedPark = await parksCollection.findOne({ _id: new ObjectId(trimmedId) });
    return convertParkObjectIds(updatedPark);
  } catch (error) {
    if (error.message && error.message.includes('Failed to connect to database')) {
      throw error;
    }
    throw new Error(`Error recalculating park rating: ${error.message || error}`);
  }
};
