import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import MuseumObjectCard from "./MuseumObjectCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function FavouritMuseumData() {
 
  const favouriteMuseumData = [{name:"mala",museumObjects:[110,220,333,444]} ,
                             {name:"smith",museumObjects:[220,120,707887,485308]},
                             {name:"peter",museumObjects:[334,120,363282]}];

    const [favouritesList,setFavouritesList] =useState([])   ; 

    const navigate = useNavigate();

     const location = useLocation();

     let loggedInUser1 = '';

     if (location.state){
      if (location.state.loggedInUser){
          loggedInUser1 = location.state.loggedInUser;
       }
       if (location.state.user){
        loggedInUser1 = location.state.user;
     }
     };
    
     const handleFavData = (e) =>{
    
      navigate ("/favourite",{state : { loggedInUser1 : loggedInUser1}});

};
const handleHome = (e) =>{
   
      navigate ("/");
      
};

    useEffect(() =>{
      const newData1 = favouriteMuseumData.filter(favData => favData.name=== loggedInUser1);
      const favList = newData1[0].museumObjects;
      setFavouritesList(favList)  ; 
         
        },[]);
                  
   if(!favouritesList) return null;

  if (favouritesList) {
    if (favouritesList?.length == 0) {
      //if favourite List is Empty
      return (
        <>
          <Row className="gy-4">
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                <br />
                Try searching for something else
              </Card.Body>
            </Card>
          </Row>
        </>
      );
    } else {
      return (
        <>
        <h3>Favourite Metro Museum Objects</h3>
          <h4>Logged in User : {loggedInUser1}</h4>
          
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                {/* <ArtworkCard objectID={currentObjectID} /> */}
               < MuseumObjectCard objectID={currentObjectID} />
              </Col>
            ))}
          </Row>
          <br/>
          <Row>
         
            <Col>
            <Button onClick={handleFavData}> Search Page </Button>
            </Col>
            <Col>
            <Button onClick={handleHome}>Home </Button>
            </Col>
          </Row>

        </>
      );
    }
  } else {
    return (
      <>
      <p> error </p>
        {/* <Error statusCode={404} /> */}
      </>
    );
  }
}
