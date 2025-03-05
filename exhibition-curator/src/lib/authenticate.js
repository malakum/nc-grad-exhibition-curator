
export async function authenticateUser(user, password) {
  const validUsers = [{user_name:'mala',user_password:'mala123',user_email:'mala@gmail.com'},
                      {user_name:'peter',user_password:'peter123',user_email:'peter@gmail.com'},
                      {user_name:'smith',user_password:'smith123',user_email:'smith@gmail.com'}
                     ];
  // console.log('validusers',validUsers)  ;
   
 const users = validUsers.filter(user1 => user1.user_name=== user);
 const passwords = validUsers.filter(user1 => user1.user_password ===password);
 
 if (users.length >0 && passwords.length >0){
     console.log('user and password is valid');
     return users[0];
 }
 else {
  console.log('user or password is invalid');
 }

 //  console.log('users',users);
  // console.log('users data', users[0].user_name,users[0].user_password,users[0].user_email);
                   
  const validUser = ['mala','peter','smith'];
   if (validUser.includes(user)){
    console.log(user,'is valid');
    return true;
   }
   else {
    console.log(user,'is not valid');
    return false;
    
   }
  }
 