import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {useContext,useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-bootstrap';

import { UserContext } from "../contexts/User";



export default function MainNav() {
    //Middleware
 const navigate = useNavigate();
 const location = useLocation();

 const { setLoggedInUser, setIsLoggedIn } = useContext(UserContext);
 
  //using useState hook
   const [isExpanded, setIsExpanded] = useState(false);

//   const { loginWithRedirect ,logout ,isAuthenticated , user } = useAuth0();
//   const handleFavData = (e) =>{
//    const loggedUser = user.name;
//    setLoggedInUser(loggedUser);
//    setIsLoggedIn(true);
//    navigate ("/favourite",{state : { user : user}});

//    };
  
 
    return (
     <>
      <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg" expanded={isExpanded}>
         <Container>
            <Navbar.Brand> Mala Kumari</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => {setIsExpanded(!isExpanded)}}/>
            <Navbar.Collapse id="basic-navbar-nav">
            
               <Nav className="me-auto" >
               <Link className="nav-link"
                                         to={`/`} 
                                          > Home
                                    </Link>
               </Nav>

               {/* <Nav className="ms-auto">
                  <Link className="nav-link"  to={`/login`}   > Login   </Link>
                    </Nav> */}
               <Nav className="ms-auto">                   
                   <Link className="nav-link"  to={`/auth`}  > Login/Register  </Link>
                     </Nav>  
               {/* <Nav className="ms-auto">                
                   <Link className="nav-link"   to={`/authsupabase`} > Auth supabase </Link>
                     </Nav>  
               <Nav className="ms-auto">
                   <Link className="nav-link" to={`/signup`}  > Sign up </Link>
                     </Nav>   
               <Nav className="ms-auto">                   
                   <Link className="nav-link"  to={`/signin`} > Sign in  </Link>
                     </Nav>    */}
               {/* <Nav>
                  { isAuthenticated && <li>
                     <p>{user.name}</p>
                     <Button onClick={handleFavData}> Search Page </Button>
                      </li>
                      }
                { isAuthenticated ?
               <li>
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      Log Out
                 </button>
               </li> :
               <li>
               <button onClick={() => loginWithRedirect()}>Log In</button>
               </li> 
                } 
              
               </Nav> */}
     
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  