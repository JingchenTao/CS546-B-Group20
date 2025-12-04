import express from 'express';
const router = express.Router();
import * as parksController from '../controllers/parks.js';
import { adminAuthMiddleware } from '../middleware/adminAuth.js';

// GET /parks - Get all parks with filtering and sorting
router.get('/', parksController.getAllParks);

// GET /parks/popular - Get popular parks
router.get('/popular', parksController.getPopularParks);

// GET /parks/recommend - Get recommended parks
router.get('/recommend', parksController.getRecommendParks);

// GET /parks/:id - Get park by ID
router.get('/:id', parksController.getParkById);

// POST /parks - Create a new park (admin only)
router.post('/', adminAuthMiddleware, parksController.createPark);

// PUT /parks/:id - Update a park (admin only)
router.put('/:id', adminAuthMiddleware, parksController.updatePark);

// DELETE /parks/:id - Delete a park (admin only)
router.delete('/:id', adminAuthMiddleware, parksController.deletePark);

export default router;