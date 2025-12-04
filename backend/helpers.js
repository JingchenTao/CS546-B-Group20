// Helper functions for park validation

// Trim all string inputs
export const trimString = (str) => {
  if (typeof str === 'string') {
    return str.trim();
  }
  return str;
};

// Validate ObjectId string
export const validateObjectId = (id) => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw 'ID must be provided and must be a non-empty string';
  }
  
  const trimmed = id.trim();
  if (!/^[0-9a-fA-F]{24}$/.test(trimmed)) {
    throw 'ID must be a valid ObjectId string';
  }
  
  return trimmed;
};

// Validate park name
export const validateParkName = (parkName) => {
  if (!parkName || typeof parkName !== 'string' || parkName.trim() === '') {
    throw 'Park name must be provided and must be a non-empty string';
  }
  
  const trimmed = parkName.trim();
  if (trimmed.length < 1 || trimmed.length > 80) {
    throw 'Park name must be between 1 and 80 characters long';
  }
  
  // Check if it contains only whitespace
  if (trimmed.replace(/\s/g, '').length === 0) {
    throw 'Park name must not contain only whitespace';
  }
  
  return trimmed;
};

// Validate ZIP code (single string or array of strings)
export const validateParkZip = (parkZip) => {
  if (parkZip === undefined || parkZip === null) {
    throw 'Park ZIP code must be provided';
  }
  
  // Handle single string
  if (typeof parkZip === 'string') {
    const trimmed = parkZip.trim();
    if (trimmed.length !== 5 || !/^\d{5}$/.test(trimmed)) {
      throw 'ZIP code must contain exactly 5 digits';
    }
    return [trimmed];
  }
  
  // Handle array
  if (Array.isArray(parkZip)) {
    if (parkZip.length === 0) {
      throw 'Park ZIP code array must not be empty';
    }
    
    const validatedZips = [];
    for (let zip of parkZip) {
      if (typeof zip !== 'string') {
        throw 'Each ZIP code must be a string';
      }
      const trimmed = zip.trim();
      if (trimmed.length !== 5 || !/^\d{5}$/.test(trimmed)) {
        throw 'Each ZIP code must contain exactly 5 digits';
      }
      validatedZips.push(trimmed);
    }
    return validatedZips;
  }
  
  throw 'Park ZIP code must be a string or an array of strings';
};

// Validate park location (borough code)
export const validateParkLocation = (parkLocation) => {
  if (!parkLocation || typeof parkLocation !== 'string' || parkLocation.trim() === '') {
    throw 'Park location must be provided and must be a non-empty string';
  }
  
  const trimmed = parkLocation.trim().toUpperCase();
  const validBoroughs = ['M', 'B', 'Q', 'X', 'R'];
  
  if (!validBoroughs.includes(trimmed)) {
    throw 'Park location must be one of: M (Manhattan), B (Brooklyn), Q (Queens), X (Bronx), R (Staten Island)';
  }
  
  return trimmed;
};

// Validate description
export const validateDescription = (description) => {
  if (!description || typeof description !== 'string' || description.trim() === '') {
    throw 'Description must be provided and must be a non-empty string';
  }
  
  const trimmed = description.trim();
  if (trimmed.length > 999) {
    throw 'Description must be 999 characters or less';
  }
  
  return trimmed;
};

// Validate park type
export const validateParkType = (parkType) => {
  if (!parkType || typeof parkType !== 'string' || parkType.trim() === '') {
    throw 'Park type must be provided and must be a non-empty string';
  }
  
  const trimmed = parkType.trim();
  if (trimmed.length > 20) {
    throw 'Park type must be 20 characters or less';
  }
  
  return trimmed;
};

// Validate rating
export const validateRating = (rating) => {
  if (rating === undefined || rating === null) {
    return 0; // Default rating
  }
  
  if (typeof rating !== 'number') {
    throw 'Rating must be a number';
  }
  
  if (isNaN(rating)) {
    throw 'Rating must be a valid number';
  }
  
  if (rating < 0 || rating > 5) {
    throw 'Rating must be between 0 and 5';
  }
  
  return rating;
};

// Validate sort parameter
export const validateSort = (sort) => {
  const validSorts = ['rating_asc', 'rating_desc', 'name_asc', 'name_desc', 'reviews_asc', 'reviews_desc'];
  
  if (!sort) {
    return 'rating_desc'; // Default sort
  }
  
  if (typeof sort !== 'string') {
    throw 'Sort must be a string';
  }
  
  const trimmed = sort.trim();
  if (!validSorts.includes(trimmed)) {
    throw `Sort must be one of: ${validSorts.join(', ')}`;
  }
  
  return trimmed;
};

// Validate limit parameter
export const validateLimit = (limit) => {
  if (limit === undefined || limit === null) {
    return 10; // Default limit
  }
  
  if (typeof limit !== 'number') {
    throw 'Limit must be a number';
  }
  
  if (!Number.isInteger(limit) || limit <= 0) {
    throw 'Limit must be a positive integer';
  }
  
  return limit;
};

// Validate minRating parameter
export const validateMinRating = (minRating) => {
  if (minRating === undefined || minRating === null) {
    return undefined;
  }
  
  if (typeof minRating !== 'number') {
    throw 'Min rating must be a number';
  }
  
  if (isNaN(minRating)) {
    throw 'Min rating must be a valid number';
  }
  
  if (minRating < 0 || minRating > 5) {
    throw 'Min rating must be between 0 and 5';
  }
  
  return minRating;
};

