import { database } from '../configurations/database.js';
import bcrypt from 'bcryptjs';
import type express from 'express';
import jwt from 'jsonwebtoken';
import tokenService from '../services/token-service.js';

// CONTROLLERS - HTTPS request/response all business logic move to services
// destructure of request data
// SPLIT CONTROLLER signInController/ signUpController
// Authentication - user signIn, authorization - role access

// handleSignInute
const signIn = (request, response) => {
  //   Check if user exists in database
  const query = 'SELECT * FROM users WHERE username = ?';

  database.query(query, [request.body.username], (error, data) => {
    if (error) return response.json(error);

    // 401 instead?
    if (data.length === 0) return response.status(404).json('User not found.');

    const isPasswordCorrect = bcrypt.compareSync(request.body.password, data[0].password);

    // 401 instead ?
    if (!isPasswordCorrect) return response.status(400).json('Wrong password');
    // or username check

    // plus role inside access token
    // make roles like integers 5:17:00 Dave Gray Node.js tutorial
    // create separate/ manual claim for userData
    const token = tokenService.generateAccessToken(data[0].id);

    // generate random key and add additional data for token creation (id + smth..)
    // added expiration date
    const {password, ...otherData} = data[0];

    // separate access and refresh tokens (send acces in json and refresh in cookies and database during signup)
    response.cookie('access_token', token, { //refreshToken
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    })
      .status(200)
      .json(otherData);
  });
};

const signUp = (request: express.Request, response: express.Response) => {
  //   Check if user exists in database
  const query = 'SELECT * FROM users WHERE email = ? OR username = ?';

  database.query(query, [request.body.email, request.body.username], (error, data) => {
    // check if it has all necessary fields (password, username ...) - return 400
    if (error) return response.json(error);

    if (data.length) return response.status(409).json('User already exists.');

    // Hash the password and create user CREATE SERVICE
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);

    // add refresh token inside database
    // add role
    // add is_admin boolean value or roles

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

const verify = (request, response) => {
  const token = request.cookies.access_token;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return response.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    }).status(401).json('Access token expired.'); // sameSite 'none'
  }

  return response.status(200).json('Access token valid.');
};

const signOut = (request, response) => {

  // DONT PASS userdata on client just verify jwt in headers and check refresh token
  // secure - server for https only
  // delete refreshToken in db found user by refresh token
  // check if it has refresh token or not and send 204
  response.clearCookie('access_token', {
    sameSite: 'none',
    secure: true
  }).status(200).json('User has been sign out'); // sameSite 'none'
  // 204 instead
};

export { signIn, signUp, signOut, verify };
