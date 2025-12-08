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
      return res.status(404).json({error: 'Not found this review id!'});
    }

  })

  .delete(async (req, res) => {
    try {
      req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid review ID'});
    }

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.deleteReviewByReviewId(req.params.reviewId);

      return res.status(200).json(reviewInfo);

    } catch (e) {
      return res.status(404).json({error: 'Not found this review id!'});
    }

  })

  .put(async (req, res) => {
    try {
      req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid review ID'});
    }

    let reviewData = req.body;
    if (!reviewData || Object.keys(reviewData).length === 0) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {
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
      return res.status(404).json({error: e});
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
      return res.status(404).json({error: 'Not found the reviews with provided park id!'});
    }

  })



  .post(async (req, res) => {
    try {
      req.params.parkId = helper.checkId(req.params.parkId, 'park id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid park ID'});
    }

    const userInfo = req.session.user;

    if (!userInfo) {
      return res.status(401).json({error: 'The user should login in'});
    }

    let userId
    try {
      userId = helper.checkId(userInfo._id, 'user id');
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
      reviewData.rating = helper.checkIsProperRate(reviewData.rating, 'rating');
      reviewData.review_content = helper.checkIsProperReview(reviewData.review_content, 'new review content');
    } catch (e) {
      return res.status(400).json({error: 'invalid park ID'});
    }
    reviewData.rating = helper.checkIsProperRate(reviewData.rating);
    reviewData.review_content = helper.checkIsProperReview(reviewData.review_content);

    let reviewInfo;
    try {
      reviewInfo = await reviewMethod.addReview(userId, req.params.parkId, reviewData.rating, reviewData.review_content);

      return res.status(200).json(reviewInfo);

    } catch (e) {
      return res.status(404).json({error: e});
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
      return res.status(404).json({error: 'Not found the reviews with provided user id!'});
    }
  })




export default router;