import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {useState} from 'react';




export default function MainNav() {
    //Middleware
 const navigate = useNavigate();
 const location = useLocation();

  //using useState hook
  const [searchField, setSearchField] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  
 
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
               <Link className="nav-link"
                                         to={`/search`} 
                                          > Advance Search
                                    </Link>
                  
                                  
               </Nav>
              
            
               <Nav className="ms-auto">
                   
                  <Link className="nav-link"
                                         to={`/login`} 
                                          > Login
                                    </Link>
               
               </Nav>
             
         
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  