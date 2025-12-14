import {Router} from 'express';
import * as commentMethod from '../data/comment.js';
import * as helper from '../controllers/review.js';
import * as reviewMethod from '../data/review.js';



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
      if (typeof e === 'string' && e.includes('No comment with this comment ID')) {
        return res.status(404).json({ error: 'Not found this comment id!' });
      }
     return res.status(500).json({error: 'Internal server error!'});
    }

  })


  .delete(async (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }

    try {
      req.params.commentId = helper.checkId(req.params.commentId, 'comment id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid comment ID'});
    }

    let deletedInfo;
    try {
      deletedInfo = await commentMethod.getCommentByCommentId(req.params.commentId);
    } catch (e) {
      if (typeof e === 'string' && e.includes('No comment with this comment ID')) {
        return res.status(404).json({ error: 'Not found this comment id!' });
      }
     return res.status(500).json({error: 'Internal server error!'});
    }

    
    if(req.session.user._id.toString() !== deletedInfo.user_id.toString() && req.session.user.role !== 'admin'){
      return res.status(403).json({ error: 'You can only delete your own comment, or your role is admin!' });
    }

    let commentInfo;
    try {
      commentInfo = await commentMethod.deleteCommentByCommentId(req.params.commentId,  req.session.user._id.toString());
      return res.status(200).json(commentInfo);

    } catch (e) {
      return res.status(500).json({error: 'Internal server error!'});
    }

    

  })


  .put(async (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }

    try {
      req.params.commentId = helper.checkId(req.params.commentId.toString(), 'comment id URL Param');
    } catch (e) {
      return res.status(400).json({error: 'invalid comment ID'});
    }

    let upgradedInfo;
    try {
      upgradedInfo = await commentMethod.getCommentByCommentId(req.params.commentId);
    } catch (e) {
      if (typeof e === 'string' && e.includes('No comment with this comment ID')) {
        return res.status(404).json({ error: 'Not found this comment id!' });
      }
     return res.status(500).json({error: 'Internal server error!'});
    }

    if(req.session.user._id.toString() !== upgradedInfo.user_id.toString() && req.session.user.role !== 'admin'){
      return res.status(403).json({ error: 'You can only update your own comment, or your role is admin!' });
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
      commentInfo = await commentMethod.updateComment(req.params.commentId, commentData.comment_content,req.session.user._id.toString() );

      return res.status(200).json(commentInfo);

    } catch (e) {
      return res.status(500).json({error: 'Internal server error!'});
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

      try {
        await reviewMethod.getReviewByReviewId(req.params.reviewId);
      } catch (e) {
        if (typeof e === 'string' && e.includes('No review with this review ID')) {
          return res.status(404).json({ error: 'Not found this review id!' });
        }
        return res.status(500).json({error: 'Internal server error!'});
      }

      let commentInfo;
      try {
        commentInfo = await commentMethod.getCommentsByReviewId(req.params.reviewId);
  
        return res.status(200).json(commentInfo);
  
      } catch (e) {
        return res.status(500).json({error: 'Internal server error!'});
      }
  
    })
  
  
  
    .post(async (req, res) => {

      if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'You must be logged in to perform this action' });
      }

      try {
        req.params.reviewId = helper.checkId(req.params.reviewId, 'review id URL Param');
      } catch (e) {
        return res.status(400).json({error: 'invalid review ID'});
      }

      try {
        await reviewMethod.getReviewByReviewId(req.params.reviewId);
      } catch (e) {
        if (typeof e === 'string' && e.includes('No review with this review ID')) {
          return res.status(404).json({ error: 'Not found this review id!' });
        }
        return res.status(500).json({error: 'Internal server error!'});
      }
  
      const userInfo = req.session.user;
  
  
      let userId
      try {
        userId = helper.checkId(userInfo._id.toString(), 'user id');
      } catch (e) {
        return res.status(400).json({error: 'invalid user ID'});
      }
  
      let commentData = req.body;
      if (!commentData || Object.keys(commentData).length === 0) {
        return res.status(400).json({error: 'There are no fields in the request body'});
      }

      let parentCommentId = null;
    
      if(commentData.parentCommentId){
          try {
            parentCommentId = helper.checkId(commentData.parentCommentId, 'parent comment id');
          } catch (e) {
            return res.status(400).json({error: 'invalid comment ID'});
          }
          try {
            await commentMethod.getCommentByCommentId(parentCommentId);
          } catch (e) {
            if (typeof e === 'string' && e.includes('No comment with this comment ID')) {
              return res.status(404).json({ error: 'Not found this comment id!' });
            }
            return res.status(500).json({error: 'Internal server error!'});
          }
      }


      try {
        commentData.comment_content = helper.checkIsProperReview(commentData.comment_content, 'new comment content');
      } catch (e) {
        return res.status(400).json({error: e});
      }
  
      let commentInfo;
      try {
        commentInfo = await commentMethod.addComment(userId, req.params.reviewId, parentCommentId, commentData.comment_content);
  
        return res.status(200).json(commentInfo);
  
      } catch (e) {
        if (typeof e === 'string' && e.includes('does not belong to review')) {
          return res.status(400).json({ error: e });
        }
        if (typeof e === 'string' && e.includes('has already commented')) {
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
      let commentInfo;
      try {
        commentInfo = await commentMethod.getCommentsByUserId(req.params.userId);
        return res.status(200).json(commentInfo);
      } catch (e) {
        if (typeof e === 'string' && e.includes('No user with this user ID')) {
          return res.status(404).json({ error: e });
        }
        return res.status(500).json({error: 'Internal server error!'});
      }
     
    })
  
export default router;