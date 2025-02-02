import React, { useEffect, useState } from "react";
import {fetchArticArtworkById, fetchMusObjectDetail} from "../utils/api";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ArticArtworkDetail = () =>{

    const [artworkDetail, setArtworkDetail] = useState(null);
    console.log('use params',useParams());
  const { id } =useParams();   
  console.log(id);
 //const {id} = props.id;

    //function onClickURL (url){ window.open(url,'_blank')};
   
    if (id){
        useEffect(() => {
          fetchArticArtworkById(id).then((dataFromApi) => {
      console.log('ArticArtwork detail data from api'+dataFromApi);
        setArtworkDetail(dataFromApi);
      });
    }, [id])}
   else {useEffect(() => {
        fetchArticArtworkById(14620).then((dataFromApi) => {
    console.log('ArticArtwork detail data from api'+dataFromApi);
      setArtworkDetail(dataFromApi);
    });
  }, [])}
    
    if (!artworkDetail) {
      return <p>Loading...</p>;
    };


    
     return (<div      
    > Artwork Detail
    <Card>
    {/* "https://www.artic.edu/iiif/2/d94d0e3d-5d89-ce07-ee0f-7fa6d8def8ab/full/843,/0/default.jpg"  */}
  {/* {artworkDetail.primaryImage && (
    <Card.Img variant="top" src={museumObjectDetail.primaryImage} alt ="primaryImage" width="100px" height="100px"/>
  )} */}
  <Card.Body>
    <Card.Title>{artworkDetail.title ? artworkDetail.title : "N/A"}</Card.Title>
    <Card.Text>
    <img
    
    src = {artworkDetail.thumbnail.lqip
     ? artworkDetail.thumbnail.lqip: "N/A"
     } alt ={artworkDetail.thumbnail.alt_text} width="100px" height="100px"
     
     />
    <strong>Date Display: </strong>
      {artworkDetail.date_display ? artworkDetail.date_display : "N/A"}
      <br />
      <strong>Main reference number: </strong>
      {artworkDetail.main_reference_number ? artworkDetail.main_reference_number : "N/A"}
      <br />
      <strong>Medium display: </strong>
      {artworkDetail.medium_display ? artworkDetail.medium_display : "N/A"}
      <br />
      <br />
      <strong>Artist artist_display: </strong>
      {artworkDetail.artist_display ? artworkDetail.artist_display : "N/A"}
      {/* {artworkDetail.artist_display && (
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
      )} */}
      <br />
      <strong>Place of origin: </strong>
      {artworkDetail.place_of_origin ? artworkDetail.place_of_origin : "N/A"}
      <br />
      dimention credit line
      <strong>short_description </strong>
      {artworkDetail.short_description ? artworkDetail.short_description : "N/A"}
      <br />
      <strong>artwork_type_title </strong>
      {artworkDetail.artwork_type_title ? artworkDetail.artwork_type_title : "N/A"}
      <br />
      <strong>department_title </strong>
      {artworkDetail.department_title ? artworkDetail.department_title : "N/A"}
      <br />
      <strong>artist_title </strong>
      {artworkDetail.artist_title ? artworkDetail.artist_title : "N/A"}
      <br />
      <strong>dimensions </strong>
      {artworkDetail.dimensions ? artworkDetail.dimensions : "N/A"}
      <br />
      <strong>credit_line </strong>
      {artworkDetail.credit_line ? artworkDetail.credit_line : "N/A"}
      <br />
     
      <br />
    
        {/* <Button
        variant={showAdded ? "primary" : "outline-primary"}
        onClick={favouritesClicked}
      >
        {showAdded ? "+ Favourishort_descriptiote (added)" : "+ Favourite"}
      </Button> */}
    </Card.Text>
  </Card.Body>
</Card>
       
       
     </div>
     
    );
  };

  
  
export default ArticArtworkDetail;
  
  