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
                             {name:"smith",museumObjects:[220,120]},
                             {name:"peter",museumObjects:[330,120]}];

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
     let newData = [];
     let indexData = 0;
     for (let i=0; i<3; i++){
      if (favouriteMuseumData[i].name === loggedInUser1)
      {
          newData = favouriteMuseumData[i].museumObjects;
          indexData = i;
      }
     };
     
     console.log('logged in user in fav museum data',loggedInUser1);
     console.log('new data ',newData);

     const handleFavData = (e) =>{
    
      navigate ("/favourite",{state : { loggedInUser1 : loggedInUser1}});

};
const handleHome = (e) =>{
   
      navigate ("/");
      
};

    useEffect(() =>{
      const data1= favouriteMuseumData[indexData].museumObjects;
      console.log(data1);
      setFavouritesList(data1)  ; 
         
        },[]);
                  
   

   console.log('favourite list inside museum favourite',favouritesList);
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
          <p>Logged in User : {loggedInUser1}</p>
          <p>Favourite Metro Museum Objects</p>
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                {/* <ArtworkCard objectID={currentObjectID} /> */}
               < MuseumObjectCard objectID={currentObjectID} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
            <Button onClick={handleFavData}> Favourite Data page </Button>
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
