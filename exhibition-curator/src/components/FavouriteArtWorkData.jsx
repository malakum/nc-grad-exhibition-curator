import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import ArticArtworkCard from "./ArticArtworkCard";
import { useState ,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function FavouritArtWorkData() {
 
  const favouriteArtworkData = [{name:"mala",artworkObjects:[8427,197508,18421,20029]} ,
                             {name:"smith",artworkObjects:[35720,20029,35720,796]},
                             {name:"peter",artworkObjects:[112885,97390,9400,918]}];

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
    // let newData = [];
    // let indexData = 0;
    // for (let i=0; i<3; i++){
    //  if (favouriteArtworkData[i].name === loggedInUser1)
    //  {
    //      newData = favouriteArtworkData[i].artworkObjects;
    //      indexData = i;
    //  }
    // };

    const handleFavData = (e) =>{
    
      navigate ("/favourite",{state : { loggedInUser1 : loggedInUser1}});

};
const handleHome = (e) =>{
   
      navigate ("/");
      
};

    
    // console.log('logged in user in fav artwork data',loggedInUser1);
    // console.log('new data ',newData);
 

   useEffect(() =>{
    // const data1= favouriteArtworkData[indexData].artworkObjects;
    // console.log('data1',data1);
    // setFavouritesList(data1)  ; 
    const newData1 = favouriteArtworkData.filter(favData => favData.name=== loggedInUser1);
    const favList = newData1[0].artworkObjects;
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
       
        <h3>Favourite Artworks </h3>
        <h4>Logged in User : {loggedInUser1}</h4>
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                <ArticArtworkCard artwork_id={currentObjectID} />
                
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
