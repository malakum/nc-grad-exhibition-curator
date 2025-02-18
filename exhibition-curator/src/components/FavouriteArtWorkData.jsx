import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArticArtworkCard from "./ArticArtworkCard";
import { useState ,useEffect } from "react";


export default function FavouritArtWorkData() {
 
  const favouriteArtworkData = [{name:"mala",artworkObject:[8427,197508]} ,
                             {name:"smith",artworkObject:[35720,20029]},
                             {name:"peter",artworkObject:[112885,97390]}];

    const [favouritesList,setFavouritesList] =useState([])   ; 
       

   useEffect(() =>{
    const data1= favouriteArtworkData[1].artworkObject;
    console.log(data1);
    setFavouritesList(data1)  ; 
       
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
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                <ArticArtworkCard artwork_id={currentObjectID} />
                
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
