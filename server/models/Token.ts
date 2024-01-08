import database from '../config/database.js';

const getRefreshToken = (userId: string, callback): void => {
  const query = 'SELECT `refresh_token` from users WHERE id = ? ';

  database.query(query, userId, (error, data) => {
    if (error !== null) return callback(error, null);

    const refreshToken = data[0].refresh_token;

    return callback(null, refreshToken);
  });
};

const updateRefreshToken = (userId: string, refreshToken: string, callback): void => {
  const query = 'UPDATE users SET `refresh_token` = ? WHERE id = ?';

  database.query(query, [refreshToken, userId], (error, data) => {
    if (error !== null) return callback(error, null);

    return callback(null, data);
  });
};

const deleteRefreshToken = (userId: string, callback): void => {
  const query = 'UPDATE users SET `refresh_token` = NULL WHERE id = ?';

  database.query(query, userId, (error, data) => {
    if (error !== null) return callback(error, null);

    return callback(null, data);
  });
};

export {
  getRefreshToken,
  updateRefreshToken,
  deleteRefreshToken
};
