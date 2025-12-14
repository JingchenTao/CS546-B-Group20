import express from 'express';
import configRoutes from './routes/index.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  let methodRewrite = null;
  if (req.body && req.body._method) {
    methodRewrite = req.body._method;
    delete req.body._method; 
  }
  if (!methodRewrite && req.query && req.query._method) {
    methodRewrite = req.query._method;
  }
  if (methodRewrite) {
    req.method = methodRewrite.toUpperCase();
  }
  next();
};

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// JSON body parsing
app.use(express.json({ limit: '10mb' }));

// Cookie parser (required for session)
app.use(cookieParser());

app.use(rewriteUnsupportedBrowserMethods);
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

app.use('/users/login', async (req, res, next) => {
     if(req.method === 'GET'){
          if (req.session.user) {
               if (req.session.user.role === 'admin') {
                         return res.redirect('/users/adminProfile');
                    } else {
                         return res.redirect('/users/userProfile');
                    }
          } 
     }
     next();
});

app.use('/users/register', async (req, res, next) => {
     if(req.method === 'GET'){
          if (req.session.user) {
               if (req.session.user.role === 'admin') {
                         return res.redirect('/users/adminProfile');;
                    } else {
                         return res.redirect('/users/userProfile');
                    }
          } 
     }
     next();
});



app.use('/users/userProfile', async (req, res, next) => {
     if(req.method === 'GET' && !req.session.user){
          return res.redirect('/users/login');
     } 
     next();
});


app.use('/users/adminProfile', async (req, res, next) => {
     if(req.method === 'GET'){
          if (!req.session.user) {
               return res.redirect('/users/login');
          } else if( req.session.user.role !== 'admin'){
               return res.status(403).render('error',{title:'admin',error: '403: the user does not have permission to view the page!',
                                            redirectLink: '/users/userProfile'});
          } 
          next();
     } else {
          next();
     } 

})

app.use('/users/logout', async (req, res, next) => {
     if(req.method === 'GET'){
          if (!req.session.user) {
               return res.redirect('/users/login');
          } else { next();}
     } else {next();} 
});

app.use('/history/', async (req, res, next) => {
     if(req.method === 'GET'){
          if (!req.session.user) {
               return res.redirect('/users/userProfile');       
          } else {next();}
     } else {
          next();
     }
     
});

app.use('/public', express.static(path.resolve(__dirname, '../frontend/public')));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, '../frontend/views'));


// Configure routes
configRoutes(app);

app.listen(port, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});