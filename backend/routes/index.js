import parksRoutes from './parks.js';
import usersRoutes from './users.js';
import reviewsRoutes from './review.js';
import commentsRoutes from './comment.js';

const constructorMethod = (app) => {
  app.use('/parks', parksRoutes);
  app.use('/users', usersRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/comments', commentsRoutes);
  
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

export default constructorMethod;

