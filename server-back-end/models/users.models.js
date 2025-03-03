const users = require("../db/data/test-data/users");
const db = require("../db/connection");
const format = require("pg-format");


exports.checkUser = (user_name)=>{
  return db.query(`SELECT * FROM users WHERE user_name =$1 `,[user_name])
  .then (({rows})=>{
          console.log('rows inside check user in users model',rows);
          return rows;
  })
};

exports.selectUsers = () => {
      let sqlQuery = `SELECT *  FROM users `;
   
  return db.query(sqlQuery).then(({ rows }) => {
    return { rows };
  });
};

exports.createUser = (user_name ,newUser) => {
    const {  user_password,user_email} = newUser;
    console.log('inside create user in user model',user_name, user_password,user_email);
                                   const newUserArr = [];
                                    newUserArr.push(user_name,user_password,user_email);
                            
                                 const insertUserQuery = format(`INSERT INTO users(
                                                                    user_name,user_password,user_email)
                                                                    VALUES %L RETURNING*`,[newUserArr]);
                            
                                 return db.query(insertUserQuery)
                                   .then(({ rows }) => {
                                    console.log('rows inside creat user inside usermodel',rows);
                                    console.log('rows[0] inside creat user inside usermodel',rows[0]);
                                 
                                  return rows[0];
                                  })
  
};

 exports.updateUserByUserName = (user_name,updateUser) => {
  const { user_password } = updateUser;
 

  console.log('user name password inside update user by user name in user models',user_name, user_password);

     const updateUserQuery = format(`UPDATE users
                                     SET user_password = '${user_password}'
                                     WHERE user_name = '${user_name}' RETURNING*`);
                                  
      console.log(updateUserQuery);
      return db.query(updateUserQuery)
         .then(({ rows }) => {
          console.log('row inside update user by user name inside user model',rows);
      
       return rows[0];
     })
     .catch((error) => {console.log(error)});
    // }) 
     };   

 exports.deleteUserRow = (user_name) => {
      return db.query(`DELETE FROM users WHERE user_name =$1 RETURNING *`,[user_name] )
                     
     .then(({ rows }) => {
      
       return {rows};
     });
     
     };   

