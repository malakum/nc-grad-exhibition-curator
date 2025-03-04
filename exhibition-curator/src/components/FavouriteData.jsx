import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Row,Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const FavouriteData = () =>{
    
    const navigate = useNavigate();
    const location = useLocation();

    let loggedInUser = '';
    if (location.state){
     if (location.state.user){
         loggedInUser = location.state.user;
      }
      if (location.state.loggedInUser1){
        loggedInUser = location.state.loggedInUser1;
     }

    };

  
      const handleMetroFav = (e) =>{
     
         navigate ("/favourite/metro" ,{state : { loggedInUser : loggedInUser}});
      
      };
      const handleArtworksFav = (e) =>{
      
                     navigate ("/favourite/artworks" ,{state : { loggedInUser : loggedInUser}});
      
      };
      const handleHome = (e) =>{
         
            navigate ("/");
            
      };
      
    return ( <>
         <div>
         <p>Logged in User : {loggedInUser}</p>
         <p> User Favourite Data </p>
             <Row>
            <Col>
            <Button onClick={handleMetroFav}> Favourite Data from Metro Museums </Button>
            </Col>
            <Col> 
            <Button onClick={handleArtworksFav}> Favourite Data from Artic Artworks </Button>
            </Col>
            <Col>
            <Button onClick={handleHome}>Home </Button>
            </Col>
          </Row>
          <p>......................</p>
            </div>

    </>)
}
export default FavouriteData;