import parksRoutes from './parks.js';
import usersRoutes from './users.js';
import reviewRoutes from './review.js';
import commentRoutes from './comment.js';

const constructorMethod = (app) => {
  app.use('/parks', parksRoutes);
  app.use('/users', usersRoutes);
  app.use('/review', reviewRoutes);
  app.use('/comment', commentRoutes);
  
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

export default constructorMethod;

