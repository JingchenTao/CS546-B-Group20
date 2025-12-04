import * as parksData from '../data/parks.js';
import { ObjectId } from 'mongodb';

// Get all parks
export const getAllParks = async (req, res) => {
  try {
    const { search, location, type, zipcode, minRating, sort } = req.query;
    
    const parksList = await parksData.getAllParks(search, location, type, zipcode, minRating, sort);
    
    res.status(200).json(parksList);
  } catch (error) {
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Get park by ID
export const getParkById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Controller layer validation - first line of defense
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
    // Data layer will also validate (second line of defense)
    const park = await parksData.getParkById(id);
    
    res.status(200).json(park);
  } catch (error) {
    if (error.message && error.message.includes('No park found')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Get popular parks
export const getPopularParks = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    
    const parksList = await parksData.getPopularParks(limit);
    
    res.status(200).json(parksList);
  } catch (error) {
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Get recommended parks
export const getRecommendParks = async (req, res) => {
  try {
    const { zipcode, location } = req.query;
    
    const parksList = await parksData.getRecommendParks({ zipcode, location });
    
    res.status(200).json(parksList);
  } catch (error) {
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Create a new park
export const createPark = async (req, res) => {
  try {
    const { park_name, park_location, park_zip, description, park_type } = req.body;
    
    // Check if all fields are provided
    if (park_name === undefined || park_location === undefined || park_zip === undefined || 
        description === undefined || park_type === undefined) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }
    
    const newPark = await parksData.createPark(park_name, park_location, park_zip, description, park_type);
    
    res.status(200).json(newPark);
  } catch (error) {
    if (error.message && error.message.includes('already exists')) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Update a park
export const updatePark = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Controller layer validation - first line of defense
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
    // Data layer will also validate (second line of defense)
    const updatedPark = await parksData.updatePark(id, updateData);
    
    res.status(200).json(updatedPark);
  } catch (error) {
    if (error.message && error.message.includes('No park found')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message && error.message.includes('already exists')) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message && error.message.includes('cannot be modified directly')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Delete a park
export const deletePark = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Controller layer validation - first line of defense
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
    // Data layer will also validate (second line of defense)
    const result = await parksData.deletePark(id);
    
    res.status(200).json(result);
  } catch (error) {
    if (error.message && error.message.includes('No park found')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Recalculate park rating
export const reParkRating = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Controller layer validation - first line of defense
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
    // Data layer will also validate (second line of defense)
    const updatedPark = await parksData.reParkRating(id);
    
    res.status(200).json(updatedPark);
  } catch (error) {
    if (error.message && error.message.includes('No park found')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
