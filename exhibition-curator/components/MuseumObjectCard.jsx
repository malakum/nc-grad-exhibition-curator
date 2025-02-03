import React, { useEffect, useState } from "react";
import {fetchMusObjectDetail} from "../utils/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";

const MuseumObjectCard = ({objectID}) =>{

    const [museumObjectCard, setMuseumObjectCard] = useState(null);

    function onClickURL (url){ window.open(url,'_blank')};
   
    if (objectID){
        useEffect(() => {
          fetchMusObjectDetail(objectID).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
        setMuseumObjectCard(museumObjectDetailFromApi);
      });
    }, [objectID])}
    else {
      return(<p> Object Id is required...</p>)
    }
    
    if (!museumObjectCard) {
      return <p>Loading...</p>;
    };


    
     return (    
    <>
    
     <Card>
     <Card.Img
        variant="top"
       src ={museumObjectCard.primaryImageSmall
        ? museumObjectCard.primaryImageSmall
        : `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`} alt ="primaryImageImage" width="100px" height="100px"
        //    src={museumObjectCard.primaryImageSmall} alt ="primary image small" width="100px" height="100px"/>
        />
        
        <Card.Body>
    <Card.Title>{museumObjectCard.title ? museumObjectCard.title : "N/A"}</Card.Title>
    <Card.Text>
         <p>museum Id {museumObjectCard.objectID}</p>
         <p>museum department:{museumObjectCard.department}</p>
         <p>museum Name: {museumObjectCard.objectName}</p>
         <Link
                                              to={`/objects/${objectID}`}
                                               > Link for object detail
                                                
         </Link>
    </Card.Text>
  </Card.Body>
</Card>
</>
     );   
    
  };
 
  
export default MuseumObjectCard;

