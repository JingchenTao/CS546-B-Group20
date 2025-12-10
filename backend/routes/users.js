import express from 'express';
import * as usersController from '../controllers/users.js';
import { adminAuthMiddleware } from '../middleware/adminAuth.js';

const router = express.Router();

// Get registration
router.get('/register', (req, res) => {
    res.render('register',{title: 'register'});
})

// Post registration
router.post('/register', usersController.registerUser);


// get login
router.get('/login', (req, res) => {
    res.render('login',{title: 'login'});
})

// Login
router.post('/login', usersController.loginUser);




// for the user profile
router.get('/userProfile', (req, res) => {
    res.render('profile',{title: 'profile'});
})


// Get current user's profile
router.get('/me', usersController.getCurrentUser);

// Get current user's favorite parks (with park details)
router.get('/me/favorites', usersController.getFavoriteParksForCurrentUser);

// Add a park to current user's favorites
router.post('/me/favorites/:parkId', usersController.addFavoriteParkForCurrentUser);

// Remove a park from current user's favorites
router.delete('/me/favorites/:parkId', usersController.removeFavoriteParkForCurrentUser);

router.get('/adminProfile', (req, res) => {
    res.render('adminProfile',{title: 'Administrator Profile'});
})

// Promote a user to admin (admin only)
router.post('/admin/role', adminAuthMiddleware, usersController.promoteUser);


// get logout
router.get('/logout', (req, res) => {
    res.render('logout',{title: 'logout'});
})

// Logout
router.post('/logout', usersController.logoutUser);


// Get user by id (for profile viewing or admin)
router.get('/:id', usersController.getUserById);

export default router;
