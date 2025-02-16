import React, { useEffect, useState } from "react";
//import {fetchMusObjectDetail} from "../../utils/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { getMusObjectDetail } from "../../utils/api";

const MuseumObjectCard = ({objectID}) =>{

    const [museumObjectCard, setMuseumObjectCard] = useState(null);

   // function onClickURL (url){ window.open(url,'_blank')};
   
    if (objectID){
      useEffect(() => {
        getMusObjectDetail(objectID).
        then((museumObjectDetailFromApi) => {
           console.log('Museum object Detail from api'+museumObjectDetailFromApi);
            setMuseumObjectCard(museumObjectDetailFromApi);
         })
         .catch((err) => {
         // setIsLoading(false);
            setError(err.response.data);
        })
       }, [objectID])}
    //     useEffect(() => {
    //       fetchMusObjectDetail(objectID).then((museumObjectDetailFromApi) => {
    //   console.log('Museum object Detail from api'+museumObjectDetailFromApi);
    //     setMuseumObjectCard(museumObjectDetailFromApi);
    //   });
    // }, [objectID])}
    else {
      return(<p> Object Id is required...</p>)
    }
    
    if (!museumObjectCard) {
      return <p>Loading...</p>;
    };


    
     return (    
    <>
    <div >
     <Card style={{ width: "18rem", height: "22rem" }} >
     <Card.Img
        variant="top"
       src ={museumObjectCard.primaryImageSmall
        ? museumObjectCard.primaryImageSmall
        : `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`} alt ="primaryImageSmall"  height ="100px" width ="100px"
       />
        
        <Card.Body >
    <Card.Title >{museumObjectCard.title ? museumObjectCard.title.slice(0,20) : "N/A"}</Card.Title>
    <Card.Text >
   
    <strong>Department: </strong>
      {museumObjectCard.department ? museumObjectCard.department : "N/A"}
      <br />
      <strong>Object Name: </strong>
      {museumObjectCard.objectName ? museumObjectCard.objectName : "N/A"}
      <br />
         {/* <p>museum Id {museumObjectCard.objectID}</p>
         <p>Department : {museumObjectCard.department}</p>
         <p>Object Name : {museumObjectCard.objectName}</p> */}
         <Link
                                              to={`/objects/${objectID}`}
                                               > Link for object detail
                                                
         </Link>
    </Card.Text>
  </Card.Body>
</Card>
</div>
</>
     );   
    
  };
 
  
export default MuseumObjectCard;

