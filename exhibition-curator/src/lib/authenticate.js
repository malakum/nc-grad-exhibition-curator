
export async function authenticateUser(user, password) {
  const validUser = ['mala','peter','smith'];
   if (validUser.includes(user)){
    console.log(user,'is valid');
    return user;
   }
   else {
    console.log(user,'is not valid');
   // return false;
    
   }
  }
 