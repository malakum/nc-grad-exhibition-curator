import  { useEffect, useState ,useContext} from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/User";

function Wrapper ({children }) {
    const [authenticated , setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { loggedInUser, isLoggedIn } = useContext(UserContext);
   //  if (loggedInUser){
   //    console.log(loggedInUser, isLoggedIn);
   //  };
   //  console.log('logged in user',loggedInUser);

    useEffect (() => {
           console.log('wrapper');
        const getSession = async () => {
          const { 
               data : { session },
                 } = await supabase.auth.getSession();
               
                 setAuthenticated(!!session);
                 setLoading(false);
                }
            getSession();          
               }, []);
   //             console.log('logged in user in wrapper',loggedInUser, typeof loggedInUser);
   //  console.log('authenticated',authenticated);
    
      if (loading){
         return <div> Loading ....</div>;
         } else {
            if (authenticated && (typeof loggedInUser ==='string')) {
                  return <>{children}</>
               }
             return <Navigate to ="/auth" />;
             }
       }

   export default Wrapper;
