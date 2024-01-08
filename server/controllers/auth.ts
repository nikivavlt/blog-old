import { database } from '../config/database.js';
import bcrypt from 'bcryptjs';
import type express from 'express';

// destructure of request data inside controller and pass to service
// SPLIT CONTROLLER signInController/ signUpController
// Authentication - user signIn, authorization - role access

const signUp = (request: express.Request, response: express.Response) => {
  //   Check if user exists in database
  const query = 'SELECT * FROM users WHERE email = ? OR username = ?';

  database.query(query, [request.body.email, request.body.username], (error, data) => {
    // check if it has all necessary fields (password, username ...) - return 400
    if (error) return response.json(error);

    if (data.length) return response.status(409).json('User already exists.');

    const {
      username,
      password, 
      email
      // ....
    } = request.body;

    // Hash the password and create user CREATE SERVICE
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt); // change request.body to destructured object and name
    // passwordHash

    // add refresh token inside database
    // add role
    // add is_admin boolean value or roles
    // USE DATA FROM DESCTUCTURED OBJECT
    const query = 'INSERT INTO users(`username`, `email`, `password`) VALUES (?)';
    const values = [
      request.body.username,
      request.body.email,
      hash
    ];

    database.query(query, [values], (error, data) => {
      if (error) return response.json(error);

      return response.status(200).json('User has been created.'); // send username
    });
  });
};

const signOut = (request, response) => {
  // DONT PASS userdata on client just verify jwt in headers and check refresh token
  // secure - server for https only
  // delete refreshToken in db found user by refresh token
  // check if it has refresh token or not and send 204
  response.clearCookie('refresh_token', {
    // DELETE TOKEN IN DATABASE
    sameSite: 'none', // strict
    secure: true
  }).status(200).json('User has been sign out'); // sameSite 'none'
  // 204 instead
};

export { signUp, signOut };
