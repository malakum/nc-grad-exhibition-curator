const users = require("../db/data/test-data/users");
const db = require("../db/connection");
//const format = require("pg-format");


exports.checkUser = (user_name)=>{
  return db.query(`SELECT * FROM users WHERE user_name =$1 `,[user_name])
  .then (({rows})=>{
    if (!rows.length){
      return Promise.reject({status:404 , msg: 'Not Found'})
  }
    return rows;
  })
};

exports.selectUsers = () => {
      let sqlQuery = `SELECT *  FROM users `;
   
  return db.query(sqlQuery).then(({ rows }) => {
    return { rows };
  });
};

exports.createUser = () => {
    const { user_name, user_password,user_email_id} = newUser;
                                   const newUserArr = [];
                                    newUserArr.push(user_name,user_password,user_email_id,);
                            
                                 const favobjectInsertQuery = format(`INSERT INTO favobjects(
                                                                    fav_flag,fav_object,fav_user,created_at)
                                                                    VALUES %L RETURNING*`,[newFavobjectArr]);
                            
                                 return db.query(favobjectInsertQuery)
                                   .then(({ rows }) => {
                                 
                                  return rows[0];
                                  })
  
};

 exports.updateUserByUserName = async(user_name) => {
      return db.query(`UPDATE users
                       SET user_password = $1
                       WHERE user_name = $2 `,[user_password,user_name] )
                     
     .then(({ rows }) => {
      
       return {rows};
     });
     
     };   

 exports.deleteUserRow = (user_name) => {
      return db.query(`DELETE FROM users WHERE user_name =$1 RETURNING *`,[user_name] )
                     
     .then(({ rows }) => {
      
       return {rows};
     });
     
     };   

