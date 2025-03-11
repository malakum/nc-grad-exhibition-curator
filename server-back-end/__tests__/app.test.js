const { favobjectsData,
       usersData, } = require("../db/data/test-data/index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const request = require("supertest");
const allApiDataOutput = require("../endpoint.json");


beforeEach(() => seed({ favobjectsData, usersData }));
afterAll(() => db.end());


describe("/api", () => {
  const output = allApiDataOutput;
  test("GET:200 sends an array of all api to the client", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { allApi } = body;
       // console.log('all api data',allApi);
        expect (allApi).toEqual(output);
      });
  });
});

describe("/api/users", () => {
  test("GET:200 sends an array of users to the client", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
     //  console.log(users.rows.length);
       //console.log(users.rows);
       expect(users.rows).toHaveLength(3);
       
          users.rows.forEach((user) => {
          expect(user).toMatchObject({
            
          user_name: expect.any(String),
           user_password: expect.any(String),
           user_email: expect.any(String)
            });
        });
      });
  });
});



describe("/api/users/:user_name", () => {
  const newUser = { user_name: 'rama',
                    user_password: 'rama1',
                    user_email :'rama@gmail.com'};

  test("POST:201 add new user to be registered ", () => {
    return request(app)
      .post("/api/users/rama")
      .send(newUser)
      .expect(201)
      .then(({ body} ) => {
   //   console.log('user inside post user app test',body);
        const {users} = body

    //   console.log('user inside post user app test ',users);
   
        expect(users).toMatchObject({

          user_name: 'rama',
          user_password: 'rama1',
          user_email :'rama@gmail.com'
                 
        });
     
    
      });  
    });

    const updateUser = { user_password : "mala2"};
      test("PATCH:202 password of user to be changed", () => {
        return request(app)
          .patch("/api/users/mala")
            .send(updateUser)
            .expect(201)
            .then(({ body }) => {
        
            const {users} = body
       
            expect(users).toMatchObject({
              user_name: 'mala',
              user_password: 'mala2',
              user_email :'malakumari@gmail.com',
                     
            });
         
        
          });  
  });
  test("DELETE:204 status 204 and no content.", () => {
    return request(app)
      .delete("/api/users/rama")
      .expect(204)
      .then(({ body }) => {
        const  users  = body;
        expect(users).toEqual({});
      });
  });
});


describe("/api/favobjects/:fav_user", () => {
  test("GET:200 sends an favourite objects of passed user to the client", () => {
    return request(app)
      .get("/api/favobjects/mala")
      .expect(200)
      .then(({ body }) => {
    // console.log('body of fav object in app test',body);
        const { favObject } = body;
        // console.log('favObject',favObject);
        // console.log(favObject.rows.length);
        expect(favObject.rows).toHaveLength(3);
       
        favObject.rows.forEach((fav) => {
        expect(fav).toMatchObject({
          fav_id : expect.any(Number),
          fav_flag_id : expect.any(String),
          fav_object : expect.any(Number),
          created_at : '2020-03-14T14:02:00.000Z',
          fav_user :'mala'
        })
      });
       
   
      });
  });

  const newFavobject = {
    fav_flag_id :"A",
    fav_object :1111,
    fav_user :"mala"
    };
  test("POST:201 post or save object for passed logged in user to the client", () => {
    return request(app)
      .post("/api/favobjects/1111")
      .send(newFavobject)
      .expect(201)
      .then(({ body }) => {
     
        const { favObject } = body;
      
          expect(favObject).toMatchObject({
            fav_id: expect.any(Number),
            fav_flag_id: 'A',
            fav_object: 1111,
            fav_user :'mala',
            created_at: expect.any(String)
            
            });
       
      });
  });
  
   
  });

  describe("/api/favobjectsmetro/:fav_user", () => {
    test("GET:200 sends an favourite objects of passed user to the client", () => {
      return request(app)
        .get("/api/favobjectsmetro/mala")
        .expect(200)
        .then(({ body }) => {
      // console.log('body of fav object in app test',body);
          const { favObject } = body;
          // console.log('favObject',favObject);
          // console.log(favObject.rows.length);
         // expect(favObject.rows).toHaveLength(3);
         
          favObject.rows.forEach((fav) => {
          //  console.log(fav);
          expect(fav).toMatchObject({
            fav_id : expect.any(Number),
            fav_flag_id : expect.any(String),
            fav_object : expect.any(Number),
            created_at : '2020-03-14T14:02:00.000Z',
            fav_user :'mala'
          })
        });
         
     
        });
    });
  
    // const newFavobject = {
    //   fav_flag_id :"M",
    //   fav_object :2222,
    //   fav_user :"mala"
    //   };
    // test("POST:201 post or save object for passed logged in user to the client", () => {
    //   return request(app)
    //     .post("/api/favobjectsmetro/2222")
    //     .send(newFavobject)
    //     .expect(201)
    //     .then(({ body }) => {
       
    //       const { favObject } = body;
        
    //         expect(favObject).toMatchObject({
    //           fav_id: expect.any(Number),
    //           fav_flag_id: 'M',
    //           fav_object: 2222,
    //           fav_user :'mala',
    //           created_at: expect.any(String)
              
    //           });
         
    //     });
    // });
    
    
    });

    describe("/api/favobjectsart/:fav_user", () => {
      test("GET:200 sends an favourite objects of passed user to the client", () => {
        return request(app)
          .get("/api/favobjectsart/mala")
          .expect(200)
          .then(({ body }) => {
        // console.log('body of fav object in app test',body);
            const { favObject } = body;
            // console.log('favObject',favObject);
            // console.log(favObject.rows.length);
           // expect(favObject.rows).toHaveLength(3);
           
            favObject.rows.forEach((fav) => {
            expect(fav).toMatchObject({
              fav_id : expect.any(Number),
              fav_flag_id : expect.any(String),
              fav_object : expect.any(Number),
              created_at : '2020-03-14T14:02:00.000Z',
              fav_user :'mala'
            })
          });
           
       
          });
      });
    
      // const newFavobject = {
      //   fav_flag_id :"A",
      //   fav_object :3333,
      //   fav_user :"mala"
      //   };
      // test("POST:201 post or save object for passed logged in user to the client", () => {
      //   return request(app)
      //     .post("/api/favobjectsart/3333")
      //     .send(newFavobject)
      //     .expect(201)
      //     .then(({ body }) => {
         
      //       const { favObject } = body;
          
      //         expect(favObject).toMatchObject({
      //           fav_id: expect.any(Number),
      //           fav_flag_id: 'A',
      //           fav_object: 3333,
      //           fav_user :'mala',
      //           created_at: expect.any(String)
                
      //           });
           
      //     });
      // });
    });

    // describe("/api/favid/:fav_id", () => {
    //      test("DELETE:204 status 204 and no content.", () => {
    //       return request(app)
    //         .delete("/api/favid/1")
    //         .expect(204)
    //         .then(({ body }) => {
    //           console.log(body);
    //           const  favobject  = body;
    //           expect(favobject).toEqual({});
    //         });
    //     });   
    //   });