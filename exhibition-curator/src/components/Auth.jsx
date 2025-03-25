import { useState , useContext, useEffect} from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/User";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row,Col } from "react-bootstrap";

const  Auth =() =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { setLoggedInUser, setIsLoggedIn } = useContext(UserContext);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error){ 
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
    else {console.log('Sign-up successful!');
    setError('');
    navigate ("/favourite",{state : { user : email}});
  }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {console.error('Error signing in:', error.message);
      setError(error.message);
    }
    else {
        console.log('Sign-in successful!');
        const loggedUser = email;
        setLoggedInUser(loggedUser);
        setIsLoggedIn(true);
        setError('');
        navigate ("/favourite",{state : { user : email}});
    }
  };

  const handleSignOut = async () => {
           await supabase.auth.signOut();
           navigate("/");
            };

     useEffect (() => {
         
           const session = supabase.auth.session;
          //  console.log (session);
            setUser(session?.user?.email);
            const data =supabase.auth.onAuthStateChange((event,session) =>{
                        switch (event) {
                          case "SIGNED_IN" :
                          setUser(session?.user)
                           break ;
                          case "SIGNED_OUT" :
                          setUser(null)
                           break;
                          default:
                           }
                         }
                     );
               return () => {
              //authListener.unsubscribe(); 
               //unsubscribe();
                };
        
        },[]);        

  return (
    <div>
        <Form> Email :
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>.</p>
      Password :
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> 
       </Form>
       <Row>
       <p>..........</p>
      <Button onClick={handleSignUp}>Sign Up</Button>
      <br />
      <p>..........</p>
      <Button onClick={handleSignIn}>Sign In</Button>
      <br />
      <p>..........</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
      <p>..........</p>
      </Row>
      <br />
      <Row>
      { error && <p> {error} </p>}
      </Row>
     
    </div>
  );
}

export default Auth;
