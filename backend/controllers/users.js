import * as usersData from '../data/users.js';


const getErrorMessage = (error) => {
    if (!error) return 'Unknown error';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    try {
        return JSON.stringify(error);
    } catch {
        return String(error);
    }
};


export const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            addressZip,
            addressCity,
            role
        } = req.body || {};

        if (!firstName || !lastName || !email || !password) {
            return res
                .status(400)
                .json({ error: 'firstName, lastName, email, and password are required' });
        }

        if (confirmPassword !== undefined && confirmPassword !== null) {
            if (confirmPassword !== password) {
                return res.status(400).json({ error: 'Password and confirmPassword do not match' });
            }
        }

        const user = await usersData.createUser(
            firstName,
            lastName,
            email,
            password,
            addressZip,
            addressCity,
            role
        );

        if (req.session) {
            req.session.user = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            };
        }

        return res.status(201).json(user);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('already in use')) {
            return res.status(409).json({ error: message });
        }
        if (
            lower.includes('validation failed') ||
            lower.includes('required') ||
            lower.includes('must') ||
            lower.includes('not a valid email')
        ) {
            return res.status(400).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }

        const user = await usersData.authenticateUser(email, password);

        if (req.session) {
            req.session.user = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            };
        }

        return res.status(200).json(user);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('invalid email or password')) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (
            lower.includes('validation failed') ||
            lower.includes('required') ||
            lower.includes('must')
        ) {
            return res.status(400).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const user = await usersData.getUserById(req.session.user._id);
        return res.status(200).json(user);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('user not found')) {
            return res.status(404).json({ error: message });
        }
        if (lower.includes('validation failed')) {
            return res.status(400).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'User id is required' });
        }

        const user = await usersData.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('user not found')) {
            return res.status(404).json({ error: message });
        }
        if (lower.includes('validation failed')) {
            return res.status(400).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const logoutUser = async (req, res) => {
    if (!req.session) {
        return res.status(200).json({ loggedOut: true });
    }

    const cookieName = 'AuthCookie';

    req.session.destroy((err) => {
        if (res.clearCookie) {
            res.clearCookie(cookieName);
        }
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        return res.status(200).json({ loggedOut: true });
    });
};

export const addFavoriteParkForCurrentUser = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const { parkId } = req.params;
        if (!parkId) {
            return res.status(400).json({ error: 'parkId parameter is required' });
        }

        const result = await usersData.addFavoritePark(req.session.user._id, parkId);
        return res.status(200).json(result);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('validation failed') || lower.includes('must')) {
            return res.status(400).json({ error: message });
        }
        if (lower.includes('user not found') || lower.includes('park not found')) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const removeFavoriteParkForCurrentUser = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const { parkId } = req.params;
        if (!parkId) {
            return res.status(400).json({ error: 'parkId parameter is required' });
        }

        const result = await usersData.removeFavoritePark(req.session.user._id, parkId);
        return res.status(200).json(result);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('validation failed') || lower.includes('must')) {
            return res.status(400).json({ error: message });
        }
        if (lower.includes('user not found') || lower.includes('park not found')) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const getFavoriteParksForCurrentUser = async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const parks = await usersData.getFavoriteParks(req.session.user._id);
        return res.status(200).json(parks);
    } catch (error) {
        const message = getErrorMessage(error);
        const lower = message.toLowerCase();
        if (lower.includes('validation failed')) {
            return res.status(400).json({ error: message });
        }
        if (lower.includes('user not found')) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

