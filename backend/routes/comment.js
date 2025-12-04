import {Router} from 'express';
import * as commentMethod from '../data/comment.js';
import * as helper from '../controllers/review.js';


const router = Router();

router
  .route('/:commentId')
  .get(async (req, res) => {
    try {
      req.params.commentId = helper.checkId(req.params.commentId, 'comment id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid comment ID'});
    }

    let commentInfo;
    try {
      commentInfo = await commentMethod.getCommentByCommentId(req.params.commentId);

      return res.status(200).json(commentInfo);

    } catch (e) {
      return res.status(404).json({error: 'Not found this comment id!'});
    }

  })

  .delete(async (req, res) => {
    try {
      req.params.commentId = helper.checkId(req.params.commentId, 'comment id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid comment ID'});
    }

    let commentInfo;
    try {
      commentInfo = await commentMethod.deleteCommentByCommentId(req.params.commentId);
      return res.status(200).json(commentInfo);

    } catch (e) {
      return res.status(404).json({error: 'Not found this comment id!'});
    }

  })

  .put(async (req, res) => {
    try {
      req.params.commentId = helper.checkId(req.params.commentId, 'comment id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid comment ID'});
    }

    let commentData = req.body;
    if (!commentData || Object.keys(commentData).length === 0) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {
      commentData.comment_content = helper.checkIsProperReview(commentData.comment_content, 'new comment content');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    let commentInfo;
    try {
      commentInfo = await commentMethod.updateComment(req.params.commentId, commentData.comment_content);

      return res.status(200).json(commentInfo);

    } catch (e) {
      return res.status(404).json({error: e});
    }
  });


  router
    .route('/review/:reviewId')
    .get(async (req, res) => {
      try {
        req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
      } catch (e) {
        return res.status(400).json({error: 'invalid review ID'});
      }
  
      let commentInfo;
      try {
        commentInfo = await commentMethod.getCommentsByReviewId(req.params.reviewId);
  
        return res.status(200).json(commentInfo);
  
      } catch (e) {
        return res.status(404).json({error: 'Not found the comments with provided review id!'});
      }
  
    })
  
  
  
    .post(async (req, res) => {
      try {
        req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
      } catch (e) {
        return res.status(400).json({error: 'invalid review ID'});
      }
  
      const userInfo = req.session.user;
  
      if (!userInfo) {
        return res.status(400).json({error: 'The user should login in'});
      }
  
      let userId
      try {
        userId = helper.checkId(userInfo._id, 'user id');
      } catch (e) {
        return res.status(400).json({error: 'invalid user ID'});
      }
  
      let commentData = req.body;
      if (!commentData || Object.keys(commentData).length === 0) {
        return res.status(400).json({error: 'There are no fields in the request body'});
      }

      let parentCommentId = null;
      try {
        if(commentData.parentCommentId){
            parentCommentId = helper.checkId(commentData.parentCommentId, 'parent comment id');
        }
      } catch (e) {
        return res.status(400).json({error: 'invalid comment ID'});
      }

      try {
        commentData.comment_content = helper.checkIsProperReview(commentData.comment_content, 'new review content');
      } catch (e) {
        return res.status(400).json({error: e});
      }
  
      let commentInfo;
      try {
        commentInfo = await commentMethod.addComment(userId, req.params.reviewId, parentCommentId, commentData.comment_content);
  
        return res.status(200).json(commentInfo);
  
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
      let commentInfo;
      try {
        commentInfo = await commentMethod.getCommentsByUserId(req.params.userId);
        return res.status(200).json(commentInfo);
      } catch (e) {
        return res.status(404).json({error: 'Not found the comments with provided user id!'});
      }
    })
  
export default router;