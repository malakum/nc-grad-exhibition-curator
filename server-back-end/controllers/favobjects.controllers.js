
//const { checkUser} = require("../models/users.models");
const { selectFavobjectsByUser,
        createFavobjectByObjectId,
        selectFavobjectsMetroByUser,
        createFavobjectMetroByObjectId,
        selectFavobjectsArtByUser,
        createFavobjectArtByObjectId,
        deleteFavobjectRow,
        checkFavobjectByObjectId } = require("../models/favobjects.models");

exports.getFavobjectsByUser = (req, res, next) => {
      const {fav_user} = req.params;
      const user_name = fav_user;

  //  return checkUser(user_name).then((userExist)=>{
  //   if (userExist && userExist.length >0) {
       selectFavobjectsByUser(fav_user).then((favObject)=>{
                res.status(200).send({favObject});
            })
          //  }
     //   else {
     //  console.log('user does not exist');
          //  return Promise.reject({ status: 404, msg: "Not Found" })
    //    }
       //  }).catch(next)
    };

exports.getFavobjectsMetroByUser = (req, res, next) => {
        //  console.log('user in req param',req.params);
          const {fav_user} = req.params;
     //     const user_name = fav_user
       //   console.log('user name in favobjects controller',fav_user);
       //   return checkUser(user_name).then((userExist)=>{
          
        //       if (userExist && userExist.length >0) {
                   selectFavobjectsMetroByUser(fav_user).then((favObject)=>{
                      res.status(200).send({favObject});
                  })
         //         }
         //     else {
         //         console.log('user does not exist');
                //  return Promise.reject({ status: 404, msg: "Not Found" })
         //     }
          //     }).catch(next)
          };

          
          exports.getFavobjectsArtByUser = (req, res, next) => {
            //  console.log('user in req param',req.params);
              const {fav_user} = req.params;
            //  const user_name = fav_user;
           //   console.log('user name in favobjects controller',fav_user);
            //  return checkUser(user_name).then((userExist)=>{
              
              //     if (userExist && userExist.length >0) {
                       selectFavobjectsArtByUser(fav_user).then((favObject)=>{
                          res.status(200).send({favObject});
                      })
                //      }
                //  else {
                //      console.log('user does not exist');
                    //  return Promise.reject({ status: 404, msg: "Not Found" })
                //  }
                //   }).catch(next)
              };
          


// exports.postFavobjectMetroByObjectId = (req, res, next) => {
//         const {fav_object} = req.params;
//         const newFavobject = req.body;
//         const { fav_flag_id,fav_user } = newFavobject;
           
//         if (!fav_flag_id || !fav_object || !fav_user){
//              console.log('please put value of fav flag,object and user')
//           //  res.status(400).send({msg :'Bad Request'});
                     
//               }
//         else {
//             checkFavobjectByObjectId(fav_object,fav_user).then((favobjectExist)=>{
//             if (favobjectExist && favobjectExist.length >0) {
//                 console.log('fav object already exist');
//              //   res.status(401).send({msg :'Bad Request'});
//              //   return Promise.reject({ status: 402, msg: "Already exist" })  
//             }
//             else {
//                 createFavobjectMetroByObjectId(fav_object,newFavobject).then ((favObject)=>{
//                     res.status(201).send({favObject});
//                 }).catch(next);
//             };
//         });
//     };
// };
        
//     exports.postFavobjectArtByObjectId = (req, res, next) => {
//         const {fav_object} = req.params;
//         const newFavobject = req.body;
//         const { fav_flag_id,fav_user } = newFavobject;
           
//         if (!fav_flag_id || !fav_object || !fav_user){
//              console.log('please put value of fav flag,object and user')
//           //  res.status(400).send({msg :'Bad Request'});
                     
//               }
//         else {
//             checkFavobjectByObjectId(fav_object,fav_user).then((favobjectExist)=>{
//             if (favobjectExist && favobjectExist.length >0) {
//                 console.log('fav object already exist');
//              //   res.status(401).send({msg :'Bad Request'});
//              //   return Promise.reject({ status: 402, msg: "Already exist" })  
//             }
//             else {
//                 createFavobjectArtByObjectId(fav_object,newFavobject).then ((favObject)=>{
//                     res.status(201).send({favObject});
//                 }).catch(next);
//             };
//         });
//     };
// };
        
    exports.postFavobjectByObjectId = (req, res, next) => {
        const {fav_object} = req.params;
        const newFavobject = req.body;
        const { fav_flag_id,fav_user } = newFavobject;
           
        if (!fav_flag_id || !fav_object || !fav_user){
             console.log('please put value of fav flag,object and user')
          //  res.status(400).send({msg :'Bad Request'});
                     
              }
        else {
            checkFavobjectByObjectId(fav_object,fav_user).then((favobjectExist)=>{
            if (favobjectExist && favobjectExist.length >0) {
                console.log('fav object already exist');
             //   res.status(401).send({msg :'Bad Request'});
             //   return Promise.reject({ status: 402, msg: "Already exist" })  
            }
            else {
                createFavobjectByObjectId(fav_object,newFavobject).then ((favObject)=>{
                    res.status(201).send({favObject});
                }).catch(next);
            };
        });
    };
    
        
exports.deleteFavobjectByFavId =(req,res,next) =>{
    console.log('req params in delete fab object by fav id',req.params);
        const {fav_id} = req.params;
        console.log('fav id in favobject t controller',fav_id);
        deleteFavobjectRow(fav_id).then((favObject) =>{
                 res.status(204).send({favObject});
            }).catch(next);
        };
    };


    