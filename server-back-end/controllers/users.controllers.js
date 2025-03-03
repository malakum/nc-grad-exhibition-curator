const {selectUsers, checkUser, createUser, updateUserByUserName, deleteUserRow } =require('../models/users.models');

exports.getUsers = (req, res, next) => {
   
    selectUsers().then((users) => {        
   res.status(200).send({ users});
  }).catch(next);
};

exports.postUser = (req, res, next) => {
    const {user_name} = req.params;
    const newUser = req.body;
    // console.log('user name inside post user in controllers', user_name);
    // console.log('new user inside post user in controllers',newUser);
    return checkUser(user_name).then((userExist)=>{
      // console.log(userExist);
      if (!userExist || userExist.length===0){
           createUser(user_name,newUser).then((users) => {        
                                                 res.status(201).send({ users});
                                 }).catch(next);
                                }
      else {
        console.log(user_name ,'already exist');
      }                          
                              });
                            };

exports.patchUserByUserName = (req, res, next) => {
  const {user_name} = req.params; 
  const updateUser = req.body;
  return checkUser(user_name).then((userExist)=>{
    if (userExist && userExist.length >0) {

  updateUserByUserName(user_name, updateUser).then((users) => {        
                      res.status(201).send({ users});
                       }).catch(next);
                      }
                    })
};

exports.deleteUserByUserName = (req, res, next) => {
  const {user_name} = req.params;
  deleteUserRow(user_name).then((users) => {        
                             res.status(204).send({ users});
                         }).catch(next);
};




