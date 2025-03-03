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
        user_name VARCHAR(50) PRIMARY KEY,
        user_password VARCHAR(50) NOT NULL,
        user_email VARCHAR(200) 
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
        'INSERT INTO users ( user_name, user_password, user_email) VALUES %L RETURNING *;',
        usersData.map(({ user_name, user_password, user_email }) => [
          user_name,
          user_password,
          user_email
        ])
      );
    // console.log(usersData);
     // return db.query(insertUsersQueryStr);
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