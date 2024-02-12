import database from "../config/database.js";

const getUser = (request, response) => {
  const query = `SELECT * FROM users WHERE LOWER(username) = ?`;

  database.query(query, [request.params.username], (error, data) => {
    const { password, refresh_token, ...rest } = data[0];

    return response.status(200).json(rest);
  });
};

export default getUser;

// getUserFriends

// removeFriend
// https://github.com/ed-roh/mern-social-media/blob/master/server/controllers/users.js