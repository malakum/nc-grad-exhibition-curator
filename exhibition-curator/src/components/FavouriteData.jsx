import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Row,Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";


const FavouriteData = () =>{
    
    const navigate = useNavigate();
    const location = useLocation();

    const [searchField, setSearchField] = useState('sunflower');

    let loggedInUser = '';
    if (location.state){
     if (location.state.user){
        if (location.state.user.name){
         loggedInUser = location.state.user.name;
        }
        else {
             loggedInUser = location.state.user;
        }
      }
      if (location.state.loggedInUser1){
        loggedInUser = location.state.loggedInUser1;
      }
      if (location.state.loggedInUser){
        loggedInUser = location.state.loggedInUser;
      }
     
    };
    console.log(loggedInUser, typeof loggedInUser)
    if ( typeof loggedInUser=== Object) {
      loggedInUser ='';
    }

    
   
    
     const submitForm = async (e) => {
      e.preventDefault()
     
     const  q= searchField;
      
      
   }
   const handleMetro = (e) =>{
  
         console.log('searchfeild',searchField);
   
         navigate ("/objects" ,{state : { searchField : searchField , loggedInUser : loggedInUser}});
   
   };
   const handleArtworks = (e) =>{
   
         console.log('searchfeild',searchField);
   
         navigate ("/artworks" ,{state : { searchField : searchField, loggedInUser : loggedInUser} });
   
   };
   

  const handleMetroFav = (e) =>{
     
         navigate ("/favourite/metro" ,{state : { loggedInUser : loggedInUser}});
      
      };

  const handleArtworksFav = (e) =>{
      
                     navigate ("/favourite/artworks" ,{state : { loggedInUser : loggedInUser}});
      
      };

      const handleSignOut = async () => {
                 await supabase.auth.signOut();
                 navigate("/");
                  };
       
    return ( <>
     <h2>Search Page</h2>
     <h3>Logged in User : {loggedInUser}</h3>
     <Form className="d-flex" onSubmit={submitForm}>Search:
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {setSearchField(e.target.value)}}
                  />
                
               </Form>
               <Form.Text className="text-muted">
               Search String (ie: &quot;cat&quot;, &quot;mouse&quot;, &quot;sunflower&quot;, &quot;table&quot;, &quot;chair&quot;, etc.)
            </Form.Text>
         <div>
          <Row>
            <Row></Row>
            <Col>
            <Button onClick={handleMetro}> Metro Museums </Button>
            </Col>
            <Col> 
            <Button onClick={handleArtworks}> Artic Artworks </Button>
            </Col>
          
            <Col> 
                  <Button onClick={handleSignOut}>Sign Out</Button>
            </Col>
          </Row>
          
            </div>
         <div>
            <p> User Favourite Data </p>
             <Row>
            <Col>
            <Button onClick={handleMetroFav}> Favourite-Metro Museums </Button>
            </Col>
           
            <Col> 
            <Button onClick={handleArtworksFav}> Favourite-Artic Artworks </Button>
            </Col>

           
           
          </Row>
          <p>......................</p>
            </div>

    </>)
}
export default FavouriteData;

