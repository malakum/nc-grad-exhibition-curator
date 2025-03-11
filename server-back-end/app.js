const express = require("express");


const app = express();
//const  cors = require('cors');


const { getAllApi }= require("./controllers/allApi.controllers.js");

const { getUsers, postUser , patchUserByUserName, deleteUserByUserName} = require("./controllers/users.controllers.js");

const { getFavobjectsByUser,postFavobjectByObjectId,
  getFavobjectsMetroByUser,postFavobjectMetroByObjectId,
  getFavobjectsArtByUser,postFavobjectArtByObjectId, deleteFavobjectByFavId ,
   } = require("./controllers/favobjects.controllers.js");

//app.use(cors());

app.use(express.json());

app.get('/api', getAllApi);

app.get('/api/users', getUsers);
app.post('/api/users/:user_name', postUser);
app.patch('/api/users/:user_name', patchUserByUserName);

app.get('/api/favobjects/:fav_user', getFavobjectsByUser);
app.get('/api/favobjectsmetro/:fav_user', getFavobjectsMetroByUser);
app.get('/api/favobjectsart/:fav_user', getFavobjectsArtByUser);

app.post('/api/favobjects/:fav_object', postFavobjectByObjectId);
//app.post('/api/favobjectsmetro/:fav_object', postFavobjectMetroByObjectId);
//app.post('/api/favobjectsart/:fav_object', postFavobjectArtByObjectId);

app.delete('/api/users/:user_name', deleteUserByUserName);
//app.delete('/api/favid/:fav_id', deleteFavobjectByFavId);

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