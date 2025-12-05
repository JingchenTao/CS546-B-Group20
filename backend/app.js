import express from 'express';
import configRoutes from './routes/index.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

// JSON body parsing
app.use(express.json({ limit: '10mb' }));

// Cookie parser (required for session)
app.use(cookieParser());

// Session configuration
app.use(session({
  name: 'AuthCookie',
  secret: 'This is a secret key', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Configure routes
configRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});