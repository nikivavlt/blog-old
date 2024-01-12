import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import corsOptions from './config/cors.js';
import database from './config/database.js';
import authRoutes from './routes/authentication.js';
import refreshRoute from './routes/refresh-token.js';
import usersRoutes from './routes/users.js';
import articlesRoutes from './routes/articles.js';
import authMiddleware from './middlewares/authentication.js';
import searchRoute from './routes/search.js';
// import errorHandler from './middlewares/error.js';

// absolute paths ? shortcut

dotenv.config();

const port = process.env.SERVER_PORT ?? 8080;
const app = express();

// custom middleware logger
// app.use(logger);

app.use(cors(corsOptions));

// app.use(express.static('uploads'))
// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload())
// express-fileupload

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/refresh', refreshRoute);

app.use(authMiddleware);
app.use('/search', searchRoute);
app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

database.connect((error) => {
  if (error !== null) {
    // throw error;
    console.log('Connection failed', error);
    return;
  }
  console.log('Successfully connected to the database.');
});
