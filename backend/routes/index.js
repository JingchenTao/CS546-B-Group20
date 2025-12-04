import reviewsRoutes from './review.js';
import commentsRoutes from './comment.js';

const constructorMethod = (app) => {
  app.use('/reviews', reviewsRoutes);
  app.use('/comments', commentsRoutes);

  app.use(/.*/, (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;