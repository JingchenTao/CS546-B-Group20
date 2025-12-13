import {Router} from 'express';
import * as reviewMethod from '../data/review.js';
import * as helper from '../controllers/review.js';



const router = Router();


router
  .route('/:reviewId')
  .get(async (req, res) => {
    try {
      req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid review ID'});
    }

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.getReviewByReviewId(req.params.reviewId);

      return res.status(200).json(reviewInfo);

    } catch (e) {
      if (typeof e === 'string' && e.includes('No review with this review ID')) {
        return res.status(404).json({ error: 'Not found this review id!' });
      }
      return res.status(500).json({error: 'Internal server error!'});
    }
  })

  .delete(async (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }
  
    try {
      req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid review ID'});
    }

    let deletedInfo;
    try {
      deletedInfo = await reviewMethod.getReviewByReviewId(req.params.reviewId);
  
    } catch (e) {
      if (typeof e === 'string' && e.includes('No review with this review ID')) {
        return res.status(404).json({ error: 'Not found this review id!' });
      }
      return res.status(500).json({error: 'Internal server error!'});
      
    }

    if(req.session.user._id.toString() !== deletedInfo.user_id.toString() && req.session.user.role !== 'admin'){
      return res.status(403).json({ error: 'You can only delete your own review, or your role is admin!' });
    }


    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.deleteReviewByReviewId(req.params.reviewId);

      return res.status(200).json(reviewInfo);

    } catch (e) {
      if (typeof e === 'string' && e.includes('Could not delete the review with id')) {
        return res.status(404).json({ error: e });
      }
      return res.status(500).json({error: 'Internal server error!'});
    }
  })


  .put(async (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }

    try {
      req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid review ID'});
    }

    let upgradedInfo;
    try {
      upgradedInfo = await reviewMethod.getReviewByReviewId(req.params.reviewId);
    } catch (e) {
       if (typeof e === 'string' && e.includes('No review with this review ID')) {
        return res.status(404).json({ error: 'Not found this review id!' });
      }
      return res.status(500).json({error: 'Internal server error!'});
    }

    if(req.session.user._id.toString() !== upgradedInfo.user_id.toString() && req.session.user.role !== 'admin'){
      return res.status(403).json({ error: 'You can only update your own review, or your role is admin!' });
    }

    let reviewData = req.body;
    if (!reviewData || Object.keys(reviewData).length === 0) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {


      reviewData.rating = Number(reviewData.rating); //frontend 


      reviewData.rating = helper.checkIsProperRate(reviewData.rating, 'rating');
      reviewData.review_content = helper.checkIsProperReview(reviewData.review_content, 'new review content');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.updateReview(req.params.reviewId, reviewData.rating, reviewData.review_content);

      return res.status(200).json(reviewInfo);

    } catch (e) {
      return res.status(500).json({error: 'Internal server error!'});
    }
  });

router
  .route('/park/:parkId')
  .get(async (req, res) => {
    try {
      req.params.parkId = helper.checkId(req.params.parkId, 'park id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid park ID'});
    }

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.getReviewsByParkId(req.params.parkId);

      return res.status(200).json(reviewInfo);

    } catch (e) {
      if (typeof e === 'string' && e.includes('No park with this park ID')) {
        return res.status(404).json({ error: 'Not found this park id!' });
      }
      return res.status(500).json({ error: 'Internal server error!' });
      
    }

  })



  .post(async (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }

    try {
      req.params.parkId = helper.checkId(req.params.parkId, 'park id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid park ID'});
    }

    let userId
    try {
      userId = helper.checkId(req.session.user._id, 'user id');
    } catch (e) {
      return res.status(400).json({error: 'invalid user ID'});
    }
    let reviewData = req.body;
    if (!reviewData || Object.keys(reviewData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {

      reviewData.rating = Number(reviewData.rating); //frontend


      reviewData.rating = helper.checkIsProperRate(reviewData.rating, 'rating');
      reviewData.review_content = helper.checkIsProperReview(reviewData.review_content, 'new review content');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    
    try {
      await reviewMethod.getReviewsByParkId(req.params.parkId);
    } catch (e) {
      if (typeof e === 'string' && e.includes('No park with this park ID')) {
        return res.status(404).json({ error: 'Not found this park id!' });
      }
      return res.status(500).json({ error: 'Internal server error!' });
      
    }

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.addReview(userId, req.params.parkId, reviewData.rating, reviewData.review_content);
      
      //frontend update
      return res.redirect(`/parks/${req.params.parkId}`);


    } catch (e) {
      if (typeof e === 'string' && e.includes('Cannot review the same park twice')) {
        return res.status(409).json({ error: e });
      }
      return res.status(500).json({error: 'Internal server error!'});
    }

  })



router
  .route('/user/:userId')
  .get(async (req, res) => {
    try {
      req.params.userId = helper.checkId(req.params.userId, 'user id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid user ID'});
    }

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.getReviewsByUserId(req.params.userId);
      return res.status(200).json(reviewInfo);
    } catch (e) {
      if (typeof e === 'string' && e.includes('No user with this user ID')) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({error: 'Internal server error!'});
    }
  })


export default router;