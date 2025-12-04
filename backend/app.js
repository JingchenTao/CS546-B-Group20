import express from 'express';
import configRoutes from './routes/index.js';

const app = express();
const port = 3000;

app.use(express.json());

configRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});