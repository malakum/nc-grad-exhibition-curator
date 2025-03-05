const db = require("../db/connection");
const format = require("pg-format");

exports.selectFavobjectsByUser = (fav_user) => {
 // console.log('user name in fav object models',fav_user);
  return db.query(`SELECT * FROM favobjects WHERE fav_user = $1 `,[fav_user])
                  .then(({rows}) => {
           //         console.log('rows of fav objects in favobject models',rows);
                    return {rows}
                  })};

                  exports.selectFavobjectsMetroByUser = (fav_user) => {
                  //  console.log('user name in fav object models',fav_user);
                     return db.query(`SELECT * FROM favobjects WHERE fav_user = $1 AND fav_flag_id ='M' `,[fav_user])
                                     .then(({rows}) => {
                                     // console.log('rows of fav objects in favobject models',rows);
                                       return {rows}
                                     })};
              
                                     exports.selectFavobjectsArtByUser = (fav_user) => {
                            //           console.log('user name in fav object models',fav_user);
                                       return db.query(`SELECT * FROM favobjects WHERE fav_user = $1 AND fav_flag_id='A' `,[fav_user])
                                                       .then(({rows}) => {
                                                      //   console.log('rows of fav objects in favobject models',rows);
                                                         return {rows}
                                                       })};
                                                   
              

                


 exports.checkFavobjectByObjectId = (fav_object,fav_user) =>{
                    return db.query(`SELECT * 
                                      FROM favobjects
                                      WHERE fav_object = $1 
                                      AND fav_user =$2 `,[fav_object,fav_user])
                                      .then(({rows}) => {
                               //         console.log('check favobjectsby objectid in favobjectsmodels',rows);
                                        return {rows};
                                      });
                                    };
                          
                
  exports.createFavobjectByObjectId = (fav_object,newFavobject) => {
                                  const { fav_flag_id, fav_user} = newFavobject;
                                  const inputDate = new Date;
                      //            console.log('fav flag object user and inputdate in favobject models',fav_flag_id,fav_object,fav_user,inputDate);

                                  const newFavobjectArr = [];
                                  newFavobjectArr.push(fav_flag_id,fav_object,fav_user,inputDate);
                          
                               const favobjectInsertQuery = format(`INSERT INTO favobjects(
                                                                  fav_flag_id,fav_object,fav_user,created_at)
                                                                  VALUES %L RETURNING*`,[newFavobjectArr]);
                                                         //         console.log('favobjectInsertQuery',favobjectInsertQuery);
                          
                               return db.query(favobjectInsertQuery)
                                 .then(({ rows }) => {
                            //      console.log('create favobjectsby objectid in favobjectsmodels',rows[0]);
                                return rows[0];
                                })
                              
                               };

                               exports.createFavobjectMetroByObjectId = (fav_object,newFavobject) => {
                                const { fav_flag_id, fav_user} = newFavobject;
                                const inputDate = new Date;
                    //            console.log('fav flag object user and inputdate in favobject models',fav_flag_id,fav_object,fav_user,inputDate);

                                const newFavobjectArr = [];
                                newFavobjectArr.push(fav_flag_id,fav_object,fav_user,inputDate);
                        
                             const favobjectInsertQuery = format(`INSERT INTO favobjects(
                                                                fav_flag_id,fav_object,fav_user,created_at)
                                                                VALUES %L RETURNING*`,[newFavobjectArr]);
                                                   //             console.log('favobjectInsertQuery',favobjectInsertQuery);
                        
                             return db.query(favobjectInsertQuery)
                               .then(({ rows }) => {
                          //      console.log('create favobjectsby objectid in favobjectsmodels',rows[0]);
                              return rows[0];
                              })
                            
                             };

                             exports.createFavobjectArtByObjectId = (fav_object,newFavobject) => {
                              const { fav_flag_id, fav_user} = newFavobject;
                              const inputDate = new Date;
                  //            console.log('fav flag object user and inputdate in favobject models',fav_flag_id,fav_object,fav_user,inputDate);

                              const newFavobjectArr = [];
                              newFavobjectArr.push(fav_flag_id,fav_object,fav_user,inputDate);
                      
                           const favobjectInsertQuery = format(`INSERT INTO favobjects(
                                                              fav_flag_id,fav_object,fav_user,created_at)
                                                              VALUES %L RETURNING*`,[newFavobjectArr]);
                                                      //       console.log('favobjectInsertQuery',favobjectInsertQuery);
                      
                           return db.query(favobjectInsertQuery)
                             .then(({ rows }) => {
                  //            console.log('create favobjectsby objectid in favobjectsmodels',rows[0]);
                            return rows[0];
                            })
                          
                           };


  exports.deleteFavobjectRow = (fav_id) => {
      console.log('fav id in favobjects models',fav_id);
    //   return db.query(`DELETE FROM favobjects WHERE fav_id =$1 RETURNING *`,[fav_id] )                     
    //  .then(({ rows }) => {
    //   console.log('delete  favobjectsby objectid in favobjectsmodels',rows);
    //    return {rows};
    //  });
     
     };   
     

