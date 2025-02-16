import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import {useRouter} from 'next/router';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {useState} from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store';

import { addToHistory } from '../lib/userData';
import { removeToken, readToken } from '../lib/authenticate';



export default function MainNav() {
    //Middleware
 // const router = useRouter();
 const navigate = useNavigate();
 const location = useLocation();
console.log('navigate',navigate);
console.log('location',location);
  //using useState hook
  const [searchField, setSearchField] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  //using Atom
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  //submitting Form async fucntion
  const submitForm = async (e) => {
   e.preventDefault()
   setIsExpanded(false)
   //the following need to be changed
   //router.push(`/artwork?title=true&q=${searchField}`)
  // navigate(`/search?title=true&q=${searchField}`);
  console.log('navigate inside main nav');
  navigate("/search");
  //location.search = searchField;
   setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
   e.target.reset();
   
}

   let token = readToken();

   //logout function
   function logout() {   
      setIsExpanded(false);
      //will remove the function and redirect to login
      removeToken();
       navigate('/login');
   }
 
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
                  {/* <Link href="/" passHref legacyBehavior><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={location.pathname === "/"}>Home</Nav.Link></Link>
                */}
                  <Link className="nav-link"
                                         to={`/search`} 
                                          > Advance Search
                                    </Link>
                                    <Link className="nav-link"
                                         to={`/objects `} 
                                          > Link for Metro Museum 
                                    </Link>
                                    <Link className="nav-link"
                                         to={`/artworks `} 
                                          > Link for Artwork 
                                    </Link>
                  {token 
                  && 
                  <Link className="nav-link"
                  to={`/search`} 
                   > Advance Search
             </Link>
                  // <Link href="/search" passHref legacyBehavior><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={location.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                
                }
                  
               </Nav>
               &nbsp;
               {token && 
               <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {setSearchField(e.target.value)}}
                  />
                  <Button type="submit" variant="success">Search</Button>
               </Form>
               }
            
               &nbsp;
               {token 
                  ?
               <Nav>
                  <p>user favourite and history list</p>

                  <NavDropdown title={token.userName} id="basic-nav-dropdown" active={location.pathname === "/favourites" || location.pathname === "/history"} >
                  <Link
                                         to={`/favourites`} 
                                          > Favourite
                                    </Link>
                     <Link href="/favourites" passhref legacybehavior>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={location.pathname ==="/favourites"}>Favourites</NavDropdown.Item>
                     </Link>
                     <Link
                                         to={`/history`} 
                                          > history
                                    </Link>
                     <Link href="/history" passhref legacybehavior>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={location.pathname === "/history"}>Search History</NavDropdown.Item>
                     </Link>
                     <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  {/* <NavDropdown title={token.userName} id="basic-nav-dropdown" active={router.pathname === "/favourites" || router.pathname === "/history"} >
                     <Link href="/favourites" passHref legacyBehavior>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                     </Link>
                     <Link href="/history" passHref legacyBehavior>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                     </Link>
                     <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown> */}
               </Nav>
               :
               <Nav className="ms-auto">
                
                  <Link className="nav-link"
                                         to={`/login`} 
                                          > Login
                                    </Link>
                                           
                                    <Link className="nav-link"
                                         to={`/register`} 
                                          > Register
                                    </Link>

                   {/* <Link href="/register" passhref legacybehavior><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={navigate("/register")}>Register</Nav.Link></Link>
                  <Link href="/login" passhref legacybehavior><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={navigate("/login")}>Login</Nav.Link></Link>
               */}
               
              
               </Nav>
             
               }
               
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  