import parksRoutes from './parks.js';
import usersRoutes from './users.js';
import reviewsRoutes from './review.js';
import commentsRoutes from './comment.js';
import historytsRoutes from './history.js';
import * as parksData from '../data/parks.js'; //frontend update
import * as reviewData from '../data/review.js';
import * as commentData from '../data/comment.js';
import * as usersData from '../data/users.js';


const constructorMethod = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage');
  });

  //frontend update
  app.get('/parks', async (req, res) => {
  try {
    const allParks = await parksData.getAllParks(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'rating_desc'
    );

    res.render('parks/list', { parks: allParks });
  } catch (e) {
    res.status(500).render('error', { error: e });
  }
});

  app.get('/parks/:id', async (req, res) => {
  try {
    const parkId = req.params.id;

    let userInfo;
    if(!req.session || !req.session.user) {
      userInfo = null;
    } else {
      userInfo = req.session.user._id;
    }

    const park = await parksData.getParkById(parkId, userInfo);
    const reviewsRaw = await reviewData.getReviewsByParkId(parkId);
    
    const currentUserId = req.session?.user?._id;
    const isAdmin = req.session?.user?.role === 'admin';
    
    const reviews = await Promise.all(reviewsRaw.map(async (review) => {
      const user = await usersData.getUserById(review.user_id);
      const isOwner = currentUserId && currentUserId.toString() === review.user_id.toString();
      
      const commentsRaw = await commentData.getCommentsByReviewId(review._id);
      const comments = await Promise.all(commentsRaw.map(async (comment) => {
        const commentUser = await usersData.getUserById(comment.user_id);
        const commentIsOwner = currentUserId && currentUserId.toString() === comment.user_id.toString();
        return {
          ...comment,
          user_name: `${commentUser.first_name} ${commentUser.last_name}`,
          isOwner: commentIsOwner || isAdmin
        };
      }));
      
      return {
        ...review,
        user_name: `${user.first_name} ${user.last_name}`,
        isOwner: isOwner || isAdmin,
        comments: comments
      };
    }));

    const userData = req.session?.user ? {
      ...req.session.user,
      isAdmin: req.session.user.role === 'admin'
    } : null;

    const parkWithFormattedZip = {
      ...park,
      park_zip_display: Array.isArray(park.park_zip) ? park.park_zip.join(',') : park.park_zip
    };

    res.render('parks/detail', {
      park: parkWithFormattedZip,
      reviews,
      user: userData
    });
  } catch (e) {
    res.status(404).render('error', { error: e });
  }
});

  //end 1st  //frontend update 2nd

  app.use('/api/parks', parksRoutes);  //frontend update 2nd


  app.use('/users', usersRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/comments', commentsRoutes);
  app.use('/history', historytsRoutes);
  
app.use(/(.*)/, (req, res) => {
  res.status(404).render('error', {
    error: 'Page not found'
  });
});
}

export default constructorMethod;

