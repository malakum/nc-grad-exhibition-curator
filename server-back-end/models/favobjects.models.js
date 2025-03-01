const db = require("../db/connection");
const format = require("pg-format");

exports.selectFavobjectsByUser = (user_name) => {
  return db.query(`SELECT * 
                  FROM favobjects WHERE fav_user = $1
                  ORDER BY created_at desc`,[user_name])
                  .then(({rows}) => {
                    return {rows};
                  });
                };

 exports.checkFavobjectByObjectId = (fav_object,fav_user) =>{
                    return db.query(`SELECT * 
                                      FROM favobjects
                                      WHERE fav_object = $1 
                                      AND fav_user =$2 `,[fav_object,fav_user])
                                      .then(({rows}) => {
                                        return {rows};
                                      });
                                    };
                          
                
  exports.createFavobjectByObjectId = (fav_object,newFavobject) => {
                                  const { fav_flag, fav_user} = newFavobject;
                                  const inputDate = new Date;
                                  const newFavobjectArr = [];
                                  newFavobjectArr.push(fav_flag,fav_object,fav_user,inputDate,);
                          
                               const favobjectInsertQuery = format(`INSERT INTO favobjects(
                                                                  fav_flag,fav_object,fav_user,created_at)
                                                                  VALUES %L RETURNING*`,[newFavobjectArr]);
                          
                               return db.query(favobjectInsertQuery)
                                 .then(({ rows }) => {
                               
                                return rows[0];
                                })
                              
                               };


  exports.deleteFavobjectRow = (fav_id) => {
      return db.query(`DELETE FROM favobjects WHERE fav_id =$1 RETURNING *`,[fav_id] )
                     
     .then(({ rows }) => {
      
       return {rows};
     });
     
     };   
     

