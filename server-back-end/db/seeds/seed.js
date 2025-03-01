const format = require('pg-format');
const db = require('../connection');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('./utils');

const seed = ({ favobjectsData, usersData }) => {
  return db
    .query(`DROP TABLE IF EXISTS favobjects;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE users (
        user_name VARCHAR PRIMARY KEY,
        user_password VARCHAR NOT NULL,
        user_email_id VARCHAR 
      );`);

      return Promise.all([ usersTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE favobjects (
        fav_id SERIAL PRIMARY KEY,
        fav_flag_id VARCHAR NOT NULL ,
        fav_object  INTEGER NOT NULL,
        fav_user VARCHAR NOT NULL REFERENCES users(user_name),
        created_at TIMESTAMP DEFAULT NOW()
         );`);
    })
    .then(() => {
       const insertUsersQueryStr = format(
        'INSERT INTO users ( user_name, user_password, user_email_id) VALUES %L;',
        usersData.map(({ user_name, user_password, user_email_id }) => [
          user_name,
          user_password,
          user_email_id
        ])
      );
    // console.log(usersData);
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([ usersPromise]);
    })
    .then(() => {
      const formattedFavobjectData = favobjectsData.map(convertTimestampToDate);
      const insertFavobjectQueryStr = format(
        'INSERT INTO favobjects (fav_flag_id, fav_object, fav_user, created_at) VALUES %L RETURNING *;',
        formattedFavobjectData.map(
          ({
            fav_flag_id,
            fav_object,
            fav_user,
            created_at
          
          }) => [fav_flag_id, fav_object, fav_user,created_at]
        )
      );

      return db.query(insertFavobjectQueryStr);
    });
    
};

module.exports = seed;