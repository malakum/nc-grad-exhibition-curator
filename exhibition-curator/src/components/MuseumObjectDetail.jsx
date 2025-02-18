import React, { useEffect, useState } from "react";
//import {fetchMusObjectDetail} from "../../utils/api";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getMusObjectDetail } from "../../utils/api";
import { useAtom } from "jotai";
import { favouritesAtom } from "../../store";
import { atom } from "jotai";




const MuseumObjectDetail = () =>{

    const [museumObjectDetail, setMuseumObjectDetail] = useState(null);

    const { objectID } =useParams();   

    function onClickURL (url){ window.open(url,'_blank')};
 
  //  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
   
   
    const [showAdded, setShowAdded] = useState(false);

    //using the useEffect hook
    // useEffect(()=>{
    //     setShowAdded(favouritesList?.includes(props.objectID))
    // }, [favouritesList])
  //  let newShowAdded =favouritesList?.includes(objectID);


    //async- await function favouritesClicked
    async function favouritesClickedMuseum() {
        if(showAdded){
          //  setFavouritesList(await removeFromFavourites(objectID))
            setShowAdded(false)
        }
        else{
          //  setFavouritesList(await addToFavourites(objectID))
            setShowAdded(true)
        }
    }
   
    if (objectID){
      useEffect(() => {
        getMusObjectDetail(objectID).
        then((museumObjectDetailFromApi) => {
              console.log('Museum object Detail from api'+museumObjectDetailFromApi);
              setMuseumObjectDetail(museumObjectDetailFromApi);
             })
             .catch((err) => {
              // setIsLoading(false);
                 setError(err.response.data);
             })
  }, [objectID])}
    //     useEffect(() => {
    //       fetchMusObjectDetail(objectID).then((museumObjectDetailFromApi) => {
    //   console.log('Museum object Detail from api'+museumObjectDetailFromApi);
    //     setMuseumObjectDetail(museumObjectDetailFromApi);
    //   });
    // }, [objectID])}
    else { 
      return <p> Object Id is required..</p>
    }
    
    if (!museumObjectDetail) {
      return <p>Loading...</p>;
    };


    
     return (<div      
    > Object Detail
    <Card>
    
  {museumObjectDetail.primaryImage && (
    <Card.Img variant="top" src={museumObjectDetail.primaryImage?museumObjectDetail.primaryImage
      : `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`} alt ="primaryImage" width="200px" height="200px"/>
  )}
  <Card.Body>
    <Card.Title>{museumObjectDetail.title ? museumObjectDetail.title : "N/A"}</Card.Title>
    <Card.Text>
    <strong>Object Name: </strong>
      {museumObjectDetail.objectName ? museumObjectDetail.objectName : "N/A"}
      <br />
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
          {/* &nbsp; */}
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
      <Button
                  variant={showAdded ? "primary" : "outline-primary"}
                  onClick={favouritesClickedMuseum}
                >
                  {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                </Button>
    </Card.Text>
  </Card.Body>
</Card>
       
       
     </div>
     
    );
  };

  
  
export default MuseumObjectDetail;

