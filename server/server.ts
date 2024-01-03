import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import database from './configurations/database.js';
import authRoutes from './routes/auth.js';
import refreshRoute from './routes/refresh.js';
import usersRoutes from './routes/users.js';
import articlesRoutes from './routes/articles.js';
import authMiddleware from './middlewares/authentication.js';
import corsOptions from './configurations/cors.js';

// absolute paths ? shortcut

dotenv.config();

const port = process.env.SERVER_PORT ?? 8800;

const app = express();

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
app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

// Обработка ошибок, последний Middleware
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
