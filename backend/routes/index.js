import parksRoutes from './parks.js';
import usersRoutes from './users.js';
import reviewsRoutes from './review.js';
import commentsRoutes from './comment.js';

import * as parksData from '../data/parks.js'; //frontend update
import * as reviewData from '../data/review.js';


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

    const parks = allParks.slice(0, 20);

    res.render('parks/list', { parks });
  } catch (e) {
    res.status(500).render('error', { error: e });
  }
});

  app.get('/parks/:id', async (req, res) => {
    try {
      const parkId = req.params.id;

      const park = await parksData.getParkById(parkId);
      const reviews = await reviewData.getReviewsByParkId(parkId);

      res.render('parks/detail', { park, reviews });
    } catch (e) {
      res.status(404).render('error', { error: e });
    }
  });
  //end   

  app.use('/parks', parksRoutes);
  app.use('/users', usersRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/comments', commentsRoutes);
  
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

export default constructorMethod;

