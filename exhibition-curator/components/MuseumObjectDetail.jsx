import React, { useEffect, useState } from "react";
import {fetchMusObjectDetail} from "../utils/api";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const MuseumObjectDetail = () =>{

    const [museumObjectDetail, setMuseumObjectDetail] = useState(null);
    const { objectID } =useParams();   

    function onClickURL (url){ window.open(url,'_blank')};
   
    if (objectID){
        useEffect(() => {
          fetchMusObjectDetail(objectID).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
        setMuseumObjectDetail(museumObjectDetailFromApi);
      });
    }, [objectID])}
    else {useEffect(() => {
      fetchMusObjectDetail(100).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
      console.log(JSON.stringify(museumObjectDetailFromApi));
    setMuseumObjectDetail(museumObjectDetailFromApi);
  });
}, [])}
    
    if (!museumObjectDetail) {
      return <p>Loading...</p>;
    };


    
     return (<div      
    > Object Detail
    <Card>
    
  {museumObjectDetail.primaryImage && (
    <Card.Img variant="top" src={museumObjectDetail.primaryImage} alt ="primaryImage" width="100px" height="100px"/>
  )}
  <Card.Body>
    <Card.Title>{museumObjectDetail.title ? museumObjectDetail.title : "N/A"}</Card.Title>
    <Card.Text>
    <strong>Date: </strong>
      {museumObjectDetail.objectDate ? museumObjectDetail.objectDate : "N/A"}
      <br />
      <strong>Classification: </strong>
      {museumObjectDetail.classification ? museumObjectDetail.classification : "N/A"}
      <br />
      <strong>Medium: </strong>
      {museumObjectDetail.medium ? museumObjectDetail.medium : "N/A"}
      <br />
      <br />
      <strong>Artist: </strong>
      {museumObjectDetail.artistDisplayName ? museumObjectDetail.artistDisplayName : "N/A"}
      {museumObjectDetail.artistDisplayName && (
        <>
          &nbsp;
          <a
            href={museumObjectDetail?.artistWikidata_URL}
            target="_blank"
            rel="noreferrer"
          >
            wiki
          </a>
        </>
      )}
      <br />
      <strong>Credit Line: </strong>
      {museumObjectDetail.creditLine ? museumObjectDetail.creditLine : "N/A"}
      <br />
      <strong>Dimensions: </strong>
      {museumObjectDetail.dimensions ? museumObjectDetail.dimensions : "N/A"}
      <br />
      <br />
     {/* <p>museum Id {museumObjectDetail.objectID}</p>
     <div >
          <img src={museumObjectDetail.primaryImageSmall} alt ="primary image small" width="100px" height="100px"/>
        </div>
     <p>museum department:{museumObjectDetail.department}</p>
     <p>museum Name: {museumObjectDetail.objectName}</p>
     <p>museum title :{museumObjectDetail.title}</p>
     <p>museum Artist AlphaSort: {museumObjectDetail.artistAlphaSort}</p>
     <p>museum Artist Nationality: {museumObjectDetail.artistNationality}</p>
     <p>museum Artist Gender: {museumObjectDetail.artistGender}</p>
     <p>museum Object Date : {museumObjectDetail.objectDate}</p>
     <p>museum Object Begin Date: {museumObjectDetail.objectBeginDate}</p>
     <p>museum Object End Date: {museumObjectDetail.objectEndDate}</p>
     <div onClick={() => onClickURL(museumObjectDetail.objectURL) }>
        ItemDeatilClick
        </div>
      <a href={museumObjectDetail.artistWikidata_URL} target="_blank" rel="noopener noreferrer">
          Visit Profile

        </a>
        <a href={museumObjectDetail.primaryImage} target="_blank" rel="noopener noreferrer">
          primary image
        </a> */}
        {/* <Button
        variant={showAdded ? "primary" : "outline-primary"}
        onClick={favouritesClicked}
      >
        {showAdded ? "+ Favourite (added)" : "+ Favourite"}
      </Button> */}
    </Card.Text>
  </Card.Body>
</Card>
       
       
     </div>
     
    );
  };

  
  
export default MuseumObjectDetail;

