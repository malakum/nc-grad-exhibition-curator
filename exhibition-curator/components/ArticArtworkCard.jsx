import React, { useEffect, useState } from "react";
import {fetchArticArtworkById, fetchMusObjectDetail} from "../utils/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";

const ArticArtworkCard = ({artwork_id}) =>{

    const [artworkCard, setArtworkCard] = useState(null);
    console.log('inside artwork card',artwork_id);

   
    if (artwork_id){
        useEffect(() => {
          fetchArticArtworkById(artwork_id).then((dataFromApi) => {
      console.log('Museum object Detail from api'+dataFromApi);
        setArtworkCard(dataFromApi);
      });
    }, [artwork_id])}
    else { 
        return <p>artwork Id is required</p>
    };
    
    if (!artworkCard) {
      return <p>Loading...</p>;
    };


    
     return (    
    <>
    
     <Card>
     {artworkCard.thumbnail.lqip && (
    <Card.Img variant="top" src={artworkCard.thumbnail.lqip} alt ="artwork image" width="100px" height="100px"/>
    
  )}
     
        <p>{artworkCard.thumbnail.alt_text}</p>
        <Card.Body>
    <Card.Title>{artworkCard.title ? artworkCard.title : "N/A"}</Card.Title>
    <Card.Text>
  
         <p>Artwork date_display:{artworkCard.date_display}</p>
         <p>Artwrok Artist_display: {artworkCard.artist_display}</p>
        
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

