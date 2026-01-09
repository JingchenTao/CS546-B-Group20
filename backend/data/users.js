import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { users, parks } from '../config/mongoCollections.js';
import { trimString, validateObjectId } from '../helpers.js';
import { addHistory} from '../data/history.js';
const normalizeString = (value, fieldName) => {
    if (value === undefined || value === null) {
        throw `${fieldName} is required`;
    }
    if (typeof value !== 'string') {
        throw `${fieldName} must be a string`;
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
        throw `${fieldName} cannot be an empty string or just spaces`;
    }
    return trimmed;
};

const validateName = (name, fieldName) => {
    const trimmed = normalizeString(name, fieldName);
    if (trimmed.length < 2 || trimmed.length > 50) {
        throw `${fieldName} must be between 2 and 50 characters`;
    }
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if (!nameRegex.test(trimmed)) {
        throw `${fieldName} can only contain letters, spaces, apostrophes, and hyphens`;
    }
    return trimmed;
};

const validateEmail = (email) => {
    const trimmed = normalizeString(email, 'Email').toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        throw 'Email is not a valid email address';
    }
    return trimmed;
};

const validatePassword = (password) => {
    const trimmed = normalizeString(password, 'Password');
    if (trimmed.length < 8) {
        throw 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(trimmed)) {
        throw 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(trimmed)) {
        throw 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(trimmed)) {
        throw 'Password must contain at least one digit';
    }
    if (!/[^A-Za-z0-9]/.test(trimmed)) {
        throw 'Password must contain at least one special character';
    }
    return trimmed;
};

const validateRole = (role) => {
    if (role === undefined || role === null) {
        return 'user';
    }
    if (typeof role !== 'string') {
        throw 'Role must be a string';
    }
    const trimmed = role.trim().toLowerCase();
    if (trimmed !== 'user' && trimmed !== 'admin') {
        throw 'Role must be either "user" or "admin"';
    }
    return trimmed;
};

const validateZip = (zip) => {
    if (zip === undefined || zip === null) {
        return null;
    }
    if (typeof zip !== 'string') {
        throw 'Zip code must be a string';
    }
    const trimmed = zip.trim();
    if (trimmed.length === 0) {
        return null;
    }
    const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (!zipRegex.test(trimmed)) {
        throw 'Zip code must be a valid US ZIP code';
    }
    return trimmed;
};

const validateCity = (city) => {
    if (city === undefined || city === null) {
        return null;
    }
    if (typeof city !== 'string') {
        throw 'City must be a string';
    }
    const trimmed = city.trim();
    if (trimmed.length === 0) {
        return null;
    }
    if (trimmed.length > 100) {
        throw 'City must be at most 100 characters';
    }
    return trimmed;
};

const hashPassword = async (password) => {
    const saltRounds = 16;
    return bcrypt.hash(password, saltRounds);
};


export const createUser = async (
    firstName,
    lastName,
    email,
    password,
    addressZip,
    addressCity,
    role = 'user'
) => {
    const usersCollection = await users();

    let first_name;
    let last_name;
    let normalizedEmail;
    let normalizedPassword;
    let normalizedRole;
    let zip;
    let city;
    try {
        first_name = validateName(firstName, 'First name');
    } catch (error) {
        throw new Error(`First name validation failed: ${error.message || error}`);
    }

    try {
        last_name = validateName(lastName, 'Last name');
    } catch (error) {
        throw new Error(`Last name validation failed: ${error.message || error}`);
    }

    try {
        normalizedEmail = validateEmail(email);
    } catch (error) {
        throw new Error(`Email validation failed: ${error.message || error}`);
    }

    try {
        normalizedPassword = validatePassword(password);
    } catch (error) {
        throw new Error(`Password validation failed: ${error.message || error}`);
    }

    try {
        normalizedRole = validateRole(role);
    } catch (error) {
        throw new Error(`Role validation failed: ${error.message || error}`);
    }

    try {
        zip = validateZip(addressZip);
    } catch (error) {
        throw new Error(`Zip code validation failed: ${error.message || error}`);
    }

    try {
        city = validateCity(addressCity);
    } catch (error) {
        throw new Error(`City validation failed: ${error.message || error}`);
    }


    const existingUser = await usersCollection.findOne({ email: normalizedEmail });
    if (existingUser) {
        throw new Error('Email is already in use');
    }

    
    const passwordHash = await hashPassword(normalizedPassword);

    const newUser = {
        first_name,
        last_name,
        email: normalizedEmail,
        passwordHash,
        role: normalizedRole,
        address_zip: zip,
        address_city: city,
        favorite_Parks: [],
        createdAt: new Date()
    };

    const insertInfo = await usersCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw new Error('Could not create user');
    }

    const created = await usersCollection.findOne({ _id: insertInfo.insertedId });
    if (!created) {
        throw new Error('Could not fetch created user');
    }

    let createdUser = {
        _id: created._id.toString(),
        first_name: created.first_name,
        last_name: created.last_name,
        email: created.email,
        role: created.role,
        address_zip: created.address_zip || null,
        address_city: created.address_city || null,
        favorite_Parks: (created.favorite_Parks || []).map((id) =>
            typeof id === 'string' ? id : id.toString()
        ),
        createdAt: created.createdAt
    };

    let content = `The user (${created._id.toString()}) was created by  ${created._id.toString()}`;

    await addHistory(created._id.toString(), created._id.toString(), 'users', 'create', content, {before: null, after:createdUser})

    return createdUser;
};

export const getUserById = async (id, viewedById = null) => {
    let validatedId;
    try {
        validatedId = validateObjectId(id);
    } catch (error) {
        throw new Error(`User ID validation failed: ${error.message || error}`);
    }

    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: new ObjectId(validatedId) });
    if (!user) {
        throw new Error('User not found');
    }
    if (viewedById){
        try {
            viewedById = validateObjectId(viewedById);
        } catch (error) {
            throw new Error(`User ID validation failed: ${error.message || error}`);
        }
        if(viewedById.toString() !== validatedId.toString()){
            const viewedBy = await usersCollection.findOne({ _id: new ObjectId(viewedById) });
            if (!viewedBy) {
                throw new Error('User not found');
            }
            let content = `The user (${validatedId}) was viewed by ${viewedById}`;
            await addHistory(viewedById, validatedId, 'users', 'view', content, {before: null, after:null})
        }
    }

    return {
        _id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        address_zip: user.address_zip || null,
        address_city: user.address_city || null,
        favorite_Parks: (user.favorite_Parks || []).map((id) =>
            typeof id === 'string' ? id : id.toString()
        ),
        createdAt: user.createdAt
    };
};

export const promoteUserToAdmin = async (id, promotedbyId) => {
    let validatedId;
    try {
        validatedId = validateObjectId(id);
    } catch (error) {
        throw new Error(`User ID validation failed: ${error.message || error}`);
    }

    try {
        promotedbyId = validateObjectId(promotedbyId);
    } catch (error) {
        throw new Error(`Admin ID validation failed: ${error.message || error}`);
    }

    const usersCollection = await users();
    const existing = await usersCollection.findOne({ _id: new ObjectId(validatedId) });
    if (!existing) {
        throw new Error('User not found');
    }
    if (existing.role === 'admin') {
        throw new Error('User is already an admin');
    }

    const existingAdmin = await usersCollection.findOne({ _id: new ObjectId(promotedbyId) });
    if (!existingAdmin) {
        throw new Error('Admin not found');
    }
    if (existingAdmin.role !== 'admin') {
        throw new Error('User should be promoted by an admin');
    }

    const updateResult = await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(validatedId) },
        { $set: { role: 'admin' } },
        { returnDocument: 'after' }
    );

    if(!updateResult) throw new Error('Could not promote user');
    let content = `The user (${validatedId}) was promoted by ${promotedbyId}`;
    await addHistory(promotedbyId, validatedId, 'users', 'promote', content, {before: { role: 'user' }, after: { role: 'admin' }})

    return {
        _id: updateResult._id.toString(),
        first_name: updateResult.first_name,
        last_name: updateResult.last_name,
        email: updateResult.email,
        role: updateResult.role,
        address_zip: updateResult.address_zip || null,
        address_city: updateResult.address_city || null,
        favorite_Parks: (updateResult.favorite_Parks || []).map((id) =>
            typeof id === 'string' ? id : id.toString()
        ),
        createdAt: updateResult.createdAt
    };
};

export const getUserByEmailInternal = async (email) => {
    let normalizedEmail;
    try {
        normalizedEmail = validateEmail(email);
    } catch (error) {
        throw new Error(`Email validation failed: ${error.message || error}`);
    }

    const usersCollection = await users();
    const user = await usersCollection.findOne({ email: normalizedEmail });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};


export const authenticateUser = async (email, password) => {
    let normalizedEmail;
    let normalizedPassword;

    try {
        normalizedEmail = validateEmail(email);
    } catch (error) {
        throw new Error(`Email validation failed: ${error.message || error}`);
    }
    try {
        normalizedPassword = validatePassword(password);
    } catch (error) {
        throw new Error(`Password validation failed: ${error.message || error}`);
    }
    const usersCollection = await users();
    const user = await usersCollection.findOne({ email: normalizedEmail });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const match = await bcrypt.compare(normalizedPassword, user.passwordHash);
    if (!match) {
        throw new Error('Invalid email or password');
    }
    return {
        _id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        address_zip: user.address_zip || null,
        address_city: user.address_city || null,
        favorite_Parks: (user.favorite_Parks || []).map((id) =>
            typeof id === 'string' ? id : id.toString()
        ),
        createdAt: user.createdAt
    };
};


export const addFavoritePark = async (userId, parkId) => {
    let validatedUserId;
    let validatedParkId;
    try {
        validatedUserId = validateObjectId(userId);
    } catch (error) {
        throw new Error(`User ID validation failed: ${error.message || error}`);
    }
    try {
        validatedParkId = validateObjectId(parkId);
    } catch (error) {
        throw new Error(`Park ID validation failed: ${error.message || error}`);
    }
    const usersCollection = await users();
    const parksCollection = await parks();
    const parkObjectId = new ObjectId(validatedParkId);
    const park = await parksCollection.findOne({ _id: parkObjectId });
    if (!park) {
        throw new Error('Park not found');
    }

    let currentFavorite = (await getUserById(validatedUserId)).favorite_Parks
    
    for( let one of currentFavorite){
        if (one.toString() === validatedParkId){
           let removed = await removeFavoritePark(validatedUserId, validatedParkId);
           return removed;
        }
    }
    const updateResult = await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(validatedUserId) },
        { $addToSet: { favorite_Parks: parkObjectId } },
        { returnDocument: 'after' }
    );

    if (!updateResult) {
        throw new Error('User not found');
    }

    updateResult.favorite_Parks = (updateResult.favorite_Parks || []).map((id) =>
            typeof id === 'string' ? id : id.toString()
        )
    let content = `The user (${validatedUserId}) added the park ${validatedParkId} into his favourite park list.`;
    await addHistory(validatedUserId, validatedParkId, 'users', 'favorite_add', content, {before: { favorite_Parks: currentFavorite }, after: { favorite_Parks: updateResult.favorite_Parks }})
    return {
        _id: updateResult._id.toString(),
        favorite_Parks: updateResult.favorite_Parks
    };
};

export const removeFavoritePark = async (userId, parkId) => {
    let validatedUserId;
    let validatedParkId;

    try {
        validatedUserId = validateObjectId(userId);
    } catch (error) {
        throw new Error(`User ID validation failed: ${error.message || error}`);
    }

    try {
        validatedParkId = validateObjectId(parkId);
    } catch (error) {
        throw new Error(`Park ID validation failed: ${error.message || error}`);
    }

    const usersCollection = await users();
    const parksCollection = await parks();
    const parkObjectId = new ObjectId(validatedParkId);
    const park = await parksCollection.findOne({ _id: parkObjectId });
    if (!park) {
        throw new Error('Park not found');
    }

    let currentFavorite = (await getUserById(validatedUserId)).favorite_Parks

    if(!currentFavorite.includes(validatedParkId)){
       throw new Error(`The park is not current user's favourite park, so it could not be removed.`)
    }

    const updatedUser = await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(validatedUserId) },
        { $pull: { favorite_Parks: new ObjectId(validatedParkId) } },
        { returnDocument: 'after' }
    );

    if (!updatedUser) {
        throw new Error('User not found');
    }

    updatedUser.favorite_Parks = (updatedUser.favorite_Parks || []).map((id) =>
            typeof id === 'string' ? id : id.toString()
        )


    let content = `The user (${validatedUserId}) removed the park ${validatedParkId} from his favourite park list.`;
    await addHistory(validatedUserId, validatedParkId, 'users', 'favorite_remove', content, {before: { favorite_Parks: currentFavorite }, after: { favorite_Parks: updatedUser.favorite_Parks }})
    
    return {
        _id: updatedUser._id.toString(),
        favorite_Parks: updatedUser.favorite_Parks
    };
};


export const getFavoriteParks = async (userId) => {
    let validatedUserId;
    try {
        validatedUserId = validateObjectId(userId);
    } catch (error) {
        throw new Error(`User ID validation failed: ${error.message || error}`);
    }

    const usersCollection = await users();
    const parksCollection = await parks();

    const user = await usersCollection.findOne({ _id: new ObjectId(validatedUserId) });
    if (!user) {
        throw new Error('User not found');
    }

    const favoriteIds = user.favorite_Parks || [];
    if (!favoriteIds.length) {
        return [];
    }

    const parkObjectIds = favoriteIds.map((id) =>
        typeof id === 'string' ? new ObjectId(id) : id
    );

    const favoriteParks = await parksCollection
        .find({ _id: { $in: parkObjectIds } })
        .toArray();

    return favoriteParks.map((park) => ({
        _id: park._id.toString(),
        park_name: park.park_name,
        park_location: park.park_location,
        park_zip: park.park_zip,
        description: park.description,
        park_type: park.park_type,
        rating: park.rating,
        reviewCount: park.reviewCount
    }));
};
