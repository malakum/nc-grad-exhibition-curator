import React, { useEffect, useState } from "react";
//import {fetchArticArtworkById, fetchMusObjectDetail} from "../../utils/api"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import { useParams } from "react-router-dom";
//import { BrowserRouter, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { getArtworkDetail } from "../../utils/api";

const ArticArtworkCard = ({artwork_id}) =>{

    const [artworkCard, setArtworkCard] = useState(null);
  

   
    if (artwork_id){
        useEffect(() => {
          // fetchArticArtworkById
          getArtworkDetail(artwork_id).
          then((dataFromApi) => {
                 // console.log('Museum object Detail from api'+dataFromApi);
                   setArtworkCard(dataFromApi);
            })
            .catch((err) => {
              // setIsLoading(false);
                 setError(err.response.data);
             })
    }, [artwork_id])}
    else { 
        return <p>artwork Id is required</p>
    };
    
    if (!artworkCard) {
      return <p>Loading...</p>;
    };


    
     return (    
    <>
    
     <Card style={{ width: "18rem", height: "25rem" }}>
      {artworkCard.image_id &&(
    <Card.Img variant = "top" src = {`https://www.artic.edu/iiif/2/`+ artworkCard.image_id+`/full/100,/0/default.jpg` } alt ="artwork" width ="100px" height="100px"/>
   )}
   
        <Card.Body >
    <Card.Title>{artworkCard.title ? artworkCard.title : "N/A"}</Card.Title>
    <Card.Text >
    <strong>Date Display : </strong>
      {artworkCard.date_display ? artworkCard.date_display : "N/A"}
      <br />
      <strong>Artist Display : </strong>
      {artworkCard.artist_display ? artworkCard.artist_display.slice(0,40) : "N/A"}
      <br />
      <strong>Artwork Id : </strong>
      {artworkCard.id ? artworkCard.id : "N/A"}
      <br />
      <Link
                                              to={`/artworks/${artworkCard.id}`}
                                               > Link for Artwork detail
                                                
         </Link>
    </Card.Text>
  </Card.Body>
</Card>
</>
     );   
    
  };
 
  
export default ArticArtworkCard;

