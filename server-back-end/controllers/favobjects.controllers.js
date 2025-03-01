
const { checkUser} = require("../models/users.models");
const { selectFavobjects, selectFavobjectsByUser,
        createFavobjectByObjectId,deleteFavobjectRow,
        checkFavobjectByObjectId } = require("../models/favobjects.models");

exports.getFavobjectsByUser = (req, res, next) => {
    const {user_name} = req.params;
    return checkUser(user_name).then((userExist)=>{
    
         if (userExist && userExist.length >0) {
            return selectFavobjectsByUser(user_name).then((data)=>{
                res.status(200).send({data});
            })
            }
        else {
            return Promise.reject({ status: 404, msg: "Not Found" })
        }
         }).catch(next)
    };

exports.getFavobjects = (req, res, next) => {
    return  selectFavobjects().then((data)=>{
            res.status(200).send({data});
            })
            .catch(next)
        };

exports.postFavobjectByObjectId = (req, res, next) => {
        const {fav_object} = req.params;
        const newFavobject = req.body;
        const { fav_flag_id,fav_user } = newFavobject;
           
        if (!fav_flag_id || !fav_object || !fav_user){
             
            res.status(400).send({msg :'Bad Request'});
                     
              }
        else {
            checkFavobjectByObjectId(fav_object).then((favobjectExist)=>{
            if (favobjectExist && favobjectExist.length >0) {
                res.status(401).send({msg :'Bad Request'});
                return Promise.reject({ status: 402, msg: "Already exist" })  
            }
            else {
                createFavobjectByObjectId(fav_object,newFavobject).then ((favobject)=>{
                    res.status(201).send({favobject});
                }).catch(next);
            };
        });
    };
        
                
        
exports.deleteFavobjectByObjectId =(req,res,next) =>{
        const {fav_id} = req.params;
        deleteFavobjectRow(fav_id).then((Favobject) =>{
             
                res.status(204).send({Favobject});
            }).catch(next);
        };
    };
