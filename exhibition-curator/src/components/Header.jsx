import { Link } from "react-router-dom";
import { useState } from "react";
//import { Form } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MuseumObjects from "./MuseumObjects";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () =>{

      const [searchField, setSearchField] = useState();
       const navigate = useNavigate();
      
        //submitting Form async fucntion
        const submitForm = async (e) => {
         e.preventDefault()
        
        const  q= searchField;
        console.log('searchfeild',searchField);
        console.log('q',q);
      
         
      }
      const handleMetro = (e) =>{
            const  q= searchField;
            console.log('searchfeild',searchField);
            console.log('q',q);
            if (q){
            navigate ("/objects" ,{state : { q : q}});
            }
      };
      const handleArtworks = (e) =>{
            const  q= searchField;
            console.log('searchfeild',searchField);
            console.log('q',q);
            if (q){
            navigate ("/artworks" ,{state : { q : q}});
            }
      };
      const handleHome = (e) =>{
         
            navigate ("/");
            
      };
      
    return ( <>
         <h1> Art Exhibition Curator</h1>
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
         <div>
          
         <Button onClick={handleMetro}> Metro Museums </Button>
         <Link
                                         to={`/objects `} 
                                          > Link for Metro Museum 
                                    </Link>
          </div>
          <div>          
            <Button onClick={handleArtworks}> Artic Artworks </Button>
         <Link
                                         to={`/artworks`} 
                                          > Link for Artic Artwork
                                    </Link> 
                                                               </div>

         <div>
         <Button onClick={handleHome}>Home
         <Link
                                         to={`/`}
                                          > Link for Home
                                    </Link>; </Button>
                                                               </div>
                                                               <Link
                                         to={`/login`} 
                                          > Link for Login Page
                                    </Link>
                                    <Link
                                         to={`/register`} 
                                          > Link for Register Page
                                    </Link>

    </>)
}
export default Header;