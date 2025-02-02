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
    else {useEffect(() => {
      fetchArticArtworkById(100).then((dataFromApi) => {
      console.log('Museum object Detail from api'+dataFromApi);
      console.log(JSON.stringify(dataFromApi));
    setMuseumObjectCard(dataFromApi);
  });
}, [])}
    
    if (!artworkCard) {
      return <p>Loading...</p>;
    };


    
     return (    
    <>
    
     <Card>
     <img
    
       src = {artworkCard.thumbnail.lqip
        ? artworkCard.thumbnail.lqip
        : `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`} alt ={artworkCard.thumbnail.alt_text} width="100px" height="100px"
        
        />
       
        <Card.Body>
    <Card.Title>{artworkCard.title ? artworkCard.title : "N/A"}</Card.Title>
    <Card.Text>
         <p>Artwork Id {artworkCard.id}</p>
         <p>Artwork date_display:{artworkCard.date_display}</p>
         <p>Artwrok Artist_display: {artworkCard.artist_display}</p>
         <p>Artwork thumbnail alt_text :{artworkCard.thumbnail.alt_text}</p>
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

