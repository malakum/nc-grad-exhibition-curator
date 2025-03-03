const express = require("express");


const app = express();
//const  cors = require('cors');


const { getAllApi }= require("./controllers/allApi.controllers.js");

const { getUsers, postUser , patchUserByUserName, deleteUserByUserName} = require("./controllers/users.controllers.js");

const { getFavobjectsByUser,postFavobjectByObjectId,
  deleteFavobjectByFavId } = require("./controllers/favobjects.controllers.js");

//app.use(cors());

app.use(express.json());

app.get('/api', getAllApi);

app.post('/api/users/:user_name', postUser);
app.get('/api/users', getUsers);

app.patch('/api/users/:user_name', patchUserByUserName);
app.delete('/api/users/:user_name', deleteUserByUserName);

app.post('/api/favobjects/:fav_object', postFavobjectByObjectId);
app.get('/api/favobjects/:fav_user', getFavobjectsByUser);

//app.delete('/api/favobjects/:fav_id', deleteFavobjectByFavId);

//app.delete('/api/favobject'  ,deleteFavobjectByFavId);





app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad Request' });
    } 
    else {
        next(err);
    }
   });

  app.use((err, req, res, next) => {
  
    if (err.status && err.msg) {
    
        res.status(err.status).send({ msg: err.msg });
    }
   
    });
app.use((err, req, res, next) => {
 
    res.status(500).send('Server Error!');
  });


module.exports = app;