import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await connectDB(); // Connect to the database
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1); // Exit if database connection fails
  }
})();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send('HI :)'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
