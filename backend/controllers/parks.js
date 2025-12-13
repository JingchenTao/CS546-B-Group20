import * as parksData from '../data/parks.js';
import { ObjectId } from 'mongodb';

export const getAllParks = async (req, res) => {
  try {
    const { search, location, type, zipcode, minRating, sort} = req.query;
    
    const parksList = await parksData.getAllParks(search, location, type, zipcode, minRating, sort);
    
    res.status(200).json(parksList);

    
  } catch (error) {
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getParkById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
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

export const createPark = async (req, res) => {
  try {
    const { park_name, park_location, park_zip, description, park_type } = req.body;
    
    if (park_name === undefined || park_location === undefined || park_zip === undefined || 
        description === undefined || park_type === undefined) {
      return res.status(400).json({ error: 'All fields must be provided' });
    }
    
    const newPark = await parksData.createPark(park_name, park_location, park_zip, description, park_type);
    
    res.status(200).json(newPark);
  } catch (error) {
    if (error.message && error.message.includes('already exists')) {
      return res.status(409).json({ error: error.message });
    }
    if (error.message && error.message.includes('validation failed')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const updatePark = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
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
      return res.status(409).json({ error: error.message });
    }
    if (error.message && error.message.includes('cannot be modified directly')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const deletePark = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
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

export const reParkRating = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Park ID must be a non-empty string' });
    }
    
    if (!ObjectId.isValid(id.trim())) {
      return res.status(400).json({ error: 'Park ID must be a valid ObjectId' });
    }
    
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
