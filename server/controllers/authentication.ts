import { database } from '../configurations/database.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/token-generator.js';
import User from '../models/User.js';

const dayInMilliseconds = 24 * 60 * 60 * 1000;

const signIn = (request, response) => {
  const { username: requestUsername, password: requestPassword } = request.body;

  User.getUserByName(requestUsername, (error, data) => {
    if (error !== null) throw error;

    const newObject = { ...data };

    newObject['refresh_token'] = 'test';

    new User(newObject).updateUser((error, data) => {
      console.log(error);
      console.log(data);
    });
  });

  const query = 'SELECT * FROM users WHERE username = ?';

  database.query(query, [request.body.username], (error, data) => {

    if (error !== null) return response.json(error);

    if (data.length === 0) return response.status(404).json('User not found.');

    const { username: databaseUsername, password: databasePassword, role: databaseRole } = data[0];


    const isPasswordCorrect = bcrypt.compareSync(requestPassword, databasePassword);

    if (!isPasswordCorrect) return response.status(401).json('Wrong password');

    const accessToken = generateAccessToken(databaseUsername, databaseRole);
    const refreshToken = generateRefreshToken(databaseUsername);
    // const query = 'UPDATE users SET refresh_token = ? WHERE username = ?';

    // database.query(query, [refreshToken, requestUsername], (error, data) => {
    // });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: dayInMilliseconds
    })
      .status(200)
      .json({ username: databaseUsername, token: accessToken });
  });
};

export default signIn;
