import  { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";

function Wrapper ({children }) {
    const [authenticated , setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

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
      if (loading){
         return <div> Loading ....</div>;
         } else {
            if (authenticated) {
                  return <>{children}</>
               }
             return <Navigate to ="/auth" />;
             }
       }

   export default Wrapper;
