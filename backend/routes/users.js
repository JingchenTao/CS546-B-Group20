import express from 'express';
import * as usersController from '../controllers/users.js';
import { adminAuthMiddleware } from '../middleware/adminAuth.js';

const router = express.Router();

// Registration
router.post('/register', usersController.registerUser);

// get register

//get login

// Login
router.post('/login', usersController.loginUser);

// Get current user's profile
router.get('/me', usersController.getCurrentUser);

// Get current user's favorite parks (with park details)
router.get('/me/favorites', usersController.getFavoriteParksForCurrentUser);

// Add a park to current user's favorites
router.post('/me/favorites/:parkId', usersController.addFavoriteParkForCurrentUser);

// Remove a park from current user's favorites
router.delete('/me/favorites/:parkId', usersController.removeFavoriteParkForCurrentUser);

// Promote a user to admin (admin only)
router.post('/admin/role', adminAuthMiddleware, usersController.promoteUser);

// Logout
router.post('/logout', usersController.logoutUser);


// Get user by id (for profile viewing or admin)
router.get('/:id', usersController.getUserById);


export default router;
