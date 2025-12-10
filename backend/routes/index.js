import parksRoutes from './parks.js';
import usersRoutes from './users.js';
import reviewsRoutes from './review.js';
import commentsRoutes from './comment.js';

const constructorMethod = (app) => {
  app.get('/', (req, res) => {
    res.render('homepage');
  });

  // update with fake data
  app.get('/parks', (req, res) => {
    const fakeParks = [
      {
        id: '1',
        name: 'Central Park',
        location: 'New York, NY',
        rating: 4.8
      },
      {
        id: '2',
        name: 'Golden Gate Park',
        location: 'San Francisco, CA',
        rating: 4.7
      },
      {
        id: '3',
        name: 'Lincoln Park',
        location: 'Chicago, IL',
        rating: 4.6
      },
      {
        id: '4',
        name: 'Griffith Park',
        location: 'Los Angeles, CA',
        rating: 4.5
      }
    ];
    res.render('parks/list', { parks: fakeParks });
  });

  app.get('/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const fakeParks = {
      '1': {
        name: 'Central Park',
        description: 'A beautiful 843-acre park in the heart of Manhattan, featuring lakes, meadows, and numerous recreational facilities.',
        type: 'Urban Park',
        zipCodes: '10024, 10025, 10023',
        rating: 4.8
      },
      '2': {
        name: 'Golden Gate Park',
        description: 'One of the most visited parks in the country, spanning over 1,000 acres with gardens, museums, and recreational areas.',
        type: 'Urban Park',
        zipCodes: '94117, 94118, 94121',
        rating: 4.7
      },
      '3': {
        name: 'Lincoln Park',
        description: 'A great place to relax and enjoy nature, featuring beautiful gardens and walking trails.',
        type: 'Community Park',
        zipCodes: '60614, 60657',
        rating: 4.6
      },
      '4': {
        name: 'Griffith Park',
        description: 'One of the largest urban parks in North America, featuring the Griffith Observatory and hiking trails.',
        type: 'Urban Park',
        zipCodes: '90027, 90028',
        rating: 4.5
      }
    };

    const fakeReviews = [
      {
        userName: 'John Doe',
        rating: 5.0,
        comment: 'Absolutely beautiful park! Perfect for a weekend stroll.',
        date: '2024-01-15'
      },
      {
        userName: 'Jane Smith',
        rating: 4.5,
        comment: 'Great facilities and well-maintained. Highly recommend!',
        date: '2024-01-10'
      },
      {
        userName: 'Mike Johnson',
        rating: 4.0,
        comment: 'Nice park but can get crowded on weekends.',
        date: '2024-01-05'
      }
    ];

    const park = fakeParks[parkId] || fakeParks['1'];
    res.render('parks/detail', { park, reviews: fakeReviews });
  });

  app.get('/users/login', (req, res) => {
    res.render('users/login');
  });

  app.get('/users/register', (req, res) => {
    res.render('users/register');
  });

  app.get('/users/me', (req, res) => {
    const fakeUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      addressCity: 'New York',
      addressZip: '10001'
    };

    const fakeFavorites = [
      {
        id: '1',
        name: 'Central Park',
        location: 'New York, NY',
        rating: 4.8
      },
      {
        id: '2',
        name: 'Golden Gate Park',
        location: 'San Francisco, CA',
        rating: 4.7
      },
      {
        id: '3',
        name: 'Lincoln Park',
        location: 'Chicago, IL',
        rating: 4.6
      }
    ];

    res.render('users/profile', { user: fakeUser, favorites: fakeFavorites });
  });

  app.use('/parks', parksRoutes);
  app.use('/users', usersRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/comments', commentsRoutes);
  
  app.use(/(.*)/, (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
};

export default constructorMethod;

