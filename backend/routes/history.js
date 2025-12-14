import {Router} from 'express';
import * as historyMethod from '../data/history.js';
import * as helper from '../controllers/review.js';

const router = Router();
router
  .route('/')
  .get(async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }

    try {
        let historyInfo = await historyMethod.getHistory(req.session.user._id.toString());
        return res.status(200).json(historyInfo);
    } catch (e) {
        if (typeof e === 'string' && e.includes('No user with this user ID')) {
            return res.status(404).json({ error: e });
    }
        return res.status(500).json({error: 'Internal server error!'});
    }
});

router
    .route('/:historyId')
    .get(async (req, res) => {
        
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }
    try {
        req.params.historyId = helper.checkId(req.params.historyId, 'history id URL Param');
    } catch (e) {
        return res.status(400).json({error: 'invalid history ID'});
    }
    try {
      let historyInfo = await historyMethod.getHistoryByHistoryId(req.params.historyId);
      let currentUserId = req.session.user._id.toString();
      if (historyInfo.user_id !== currentUserId && req.session.user.role !== 'admin') {
        return res.status(403).json({ error: 'You can only view your own history unless you are admin' });
      }
      return res.status(200).json(historyInfo);
    } catch (e) {
      if (typeof e === 'string' && e.includes('No history with this history ID')) {
        return res.status(404).json({ error: 'No history with this history ID' });
      }

      return res.status(500).json({ error:'Internal server error' });
    }
  })

  .delete(async (req, res) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'You must be logged in to perform this action' });
    }

    try {
        req.params.historyId = helper.checkId(req.params.historyId, 'history id URL Param');
    } catch (e) {
        return res.status(400).json({error: 'invalid history ID'});
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).json({ error: 'Only admin can delete history!' });
    }

    try {
       await historyMethod.getHistoryByHistoryId(req.params.historyId);
    } catch (e) {
       if (typeof e === 'string' && e.includes('No history with this history ID')) {
            return res.status(404).json({ error: 'No history with this history ID' });
        }
       return res.status(500).json({ error: 'Internal server error' });
    }

    try {
        const deletedInfo = await historyMethod.deleteHistoryByHistoryId(req.params.historyId);
        return res.status(200).json(deletedInfo);
    } catch (e) {
        return res.status(500).json({error: 'Internal server error!'});
    }
});
    
export default router;
        
    





