import React, { useEffect, useState } from "react";
//import {fetchArticArtworkById} from "../../utils/api";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getArtworkDetail } from "../../utils/api";


const ArticArtworkDetail = () =>{

    const [artworkDetail, setArtworkDetail] = useState(null);
    console.log('use params',useParams());
  const { id } =useParams();   
  console.log(id);

  //const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  //changing default value to false
  const [showAdded, setShowAdded] = useState(false);

  //const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
  
  //using the useEffect hook
  // useEffect(()=>{
  //     setShowAdded(favouritesList?.includes(props.objectID))
  // }, [favouritesList])


  //async- await function favouritesClicked
  async function favouritesClickedArtwork() {
      if(showAdded){
         // setFavouritesList(await removeFromFavourites(props.objectID))
          setShowAdded(false)
      }
      else{
        //  setFavouritesList(await addToFavourites(props.objectID))
          setShowAdded(true)
      }
  }
   
    if (id){
        useEffect(() => {
       //   fetchArticArtworkById
          getArtworkDetail(id).
          then((dataFromApi) => {
                console.log('ArticArtwork detail data from api'+dataFromApi);
                setArtworkDetail(dataFromApi);
           })
           .catch((err) => {
            // setIsLoading(false);
               setError(err.response.data);
           })
           }, [id])}
   else {
    return <p>artworks Id should be there....</p>
   }
    
    if (!artworkDetail) {
      return <p>Loading...</p>;
    };


    
     return (     
    <> Artwork Detail
    <Card>
    {/* {artworkDetail.thumbnail.lqip && (
    <Card.Img variant="top" src={artworkDetail.thumbnail.lqip} alt ="artwork image" width="100px" height="100px"/>
    
  )
   } */}
   {artworkDetail.image_id &&(
    <Card.Img variant = "top" src = {`https://www.artic.edu/iiif/2/`+ artworkDetail.image_id+`/full/200,/0/default.jpg` } alt ="artwork" width ="200px" height="200px"/>
   )}
    <p>{artworkDetail.thumbnail.alt_text}</p>
    {/* <p>https://www.artic.edu/iiif/2/{artworkDetail.image_id}/full/843,/0/default.jpg</p> */}
   
  <Card.Body>
    <Card.Title>{artworkDetail.title ? artworkDetail.title : "N/A"}</Card.Title>
    <Card.Text>
    
    <strong>Date Display : </strong>
      {artworkDetail.date_display ? artworkDetail.date_display : "N/A"}
      <br />
      <strong>Main reference number : </strong>
      {artworkDetail.main_reference_number ? artworkDetail.main_reference_number : "N/A"}
      <br />
      <strong>Medium display : </strong>
      {artworkDetail.medium_display ? artworkDetail.medium_display : "N/A"}
      <br />
      <br />
      <strong>Artist Display : </strong>
      {artworkDetail.artist_display ? artworkDetail.artist_display : "N/A"}
      
      <br />
      <strong>Place of origin : </strong>
      {artworkDetail.place_of_origin ? artworkDetail.place_of_origin : "N/A"}
      <br />
      
      <strong>Short Description :  </strong>
      {artworkDetail.short_description ? artworkDetail.short_description : "N/A"}
      <br />
      <strong>Artwork type title : </strong>
      {artworkDetail.artwork_type_title ? artworkDetail.artwork_type_title : "N/A"}
      <br />
      <strong>Department Title : </strong>
      {artworkDetail.department_title ? artworkDetail.department_title : "N/A"}
      <br />
      <strong>Artist Title : </strong>
      {artworkDetail.artist_title ? artworkDetail.artist_title : "N/A"}
      <br />
      <strong>Dimensions : </strong>
      {artworkDetail.dimensions ? artworkDetail.dimensions : "N/A"}
      <br />
      <strong>Credit Line : </strong>
      {artworkDetail.credit_line ? artworkDetail.credit_line : "N/A"}
      <br />
     
      <br />
      <Button
                  variant={showAdded ? "primary" : "outline-primary"}
                  onClick={favouritesClickedArtwork}
                >
                  {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                </Button>
       
    </Card.Text>
  </Card.Body>
</Card>
       
       
     </>
     
    );
  };

  
  
export default ArticArtworkDetail;
  
  