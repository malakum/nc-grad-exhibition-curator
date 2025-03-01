import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MuseumObjectCard from "./MuseumObjectCard";
import { useState, useEffect } from "react";

export default function FavouritMuseumData() {
 
  const favouriteMuseumData = [{name:"mala",museumObjects:[110,220,333,444]} ,
                             {name:"smith",museumObjects:[220,120]},
                             {name:"peter",museumObjects:[330,120]}];

    const [favouritesList,setFavouritesList] =useState([])   ;   
    useEffect(() =>{
      const data1= favouriteMuseumData[0].museumObjects;
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
          <p>Favourite Metro Museum Objects</p>
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                {/* <ArtworkCard objectID={currentObjectID} /> */}
               < MuseumObjectCard objectID={currentObjectID} />
              </Col>
            ))}
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
