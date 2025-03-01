const {selectUsers} =require('../models/users.models');

exports.getUsers = (req, res, next) => {
   
    selectUsers().then((users) => {        
   res.status(200).send({ users});
  }).catch(next);
};

exports.postUser = (req, res, next) => {
    const {user_name} = req.params;
       return checkUser(user_name).then((userExist)=>{
       
            if (userExist && userExist.length >0) {
              return Promise.reject({ status: 402, msg: "user already present " })
               }
           else {
               
                createUser().then((users) => {        
                       res.status(200).send({ users});
                 }).catch(next);
           }
            }).catch(next)
       };
  

exports.patchUserByUserName = (req, res, next) => {
  const {user_name,user_password} = req.params; 
  updateUserByUserName(user_name, user_password).then((users) => {        
 res.status(200).send({ users});
}).catch(next);
};

exports.deleteUserByUserName = (req, res, next) => {
  const {user_name} = req.params;
  deleteUserRow(user_name).then((users) => {        
 res.status(200).send({ users});
}).catch(next);
};




