import React, {useContext ,useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getArtworkDetail } from "../../utils/api";
import { UserContext } from "../contexts/User";
import { supabase } from "../lib/supabaseClient";
import { Row ,Col } from "react-bootstrap";


const ArticArtworkDetail = () =>{

  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const [artworkDetail, setArtworkDetail] = useState(null);
  const { id } =useParams();   
  const [showAdded, setShowAdded] = useState(false);
  const navigate = useNavigate();

  
  const handleFavData = (e) =>{
    
    navigate ("/favourite",{state : { loggedInUser : loggedInUser}});

};

  async function favouritesClickedArtwork() {
      if(showAdded){
          setShowAdded(false)
      }
      else{
       
          const { data , error } = await supabase
                                     .from("favart")
                                     .select("fav_object")
                                     .eq("fav_user",loggedInUser)
                                     .eq("fav_object",id);

          if (error){
            console.log ('error',error);
          };
          if (data){
            console.log('data',data);
          }
          if (!data || data.length===0 )
             {
                 const { data2, error2 } = await supabase
                                          .from('favart')
                                          .insert([{ fav_object: id , fav_user: loggedInUser }])
                                          .select("*")
                                          .single();
        
                  if (error2) 
                     {console.error('Error inserting item:', error2.message);
                  }
                  else {
                       console.log('Item inserted:', data2);
                  };
              }
        
             setShowAdded(true)
           }
    }
   
    if (id){
        useEffect(() => {
          getArtworkDetail(id).
          then((dataFromApi) => {
                console.log('ArticArtwork detail data from api'+dataFromApi);
                setArtworkDetail(dataFromApi);
           })
           .catch((err) => {
                 setError(err.response.data);
           })
           }, [id])


          }
     else {
         return <p>artworks Id should be there....</p>
          }
    
    if (!artworkDetail) {
      return <p>Loading...</p>;
    };


    
     return (     
            <> 
            <Row>
          <Col>
            <Button onClick={handleFavData}> Search Page </Button>
            </Col> 
            </Row>
            Artwork Detail
            <Card>
   
             {artworkDetail.image_id &&(
             <Card.Img variant = "top" src = {`https://www.artic.edu/iiif/2/`+ artworkDetail.image_id+`/full/200,/0/default.jpg` } alt ="artwork" width ="200px" height="200px"/>
             )}
            <p>{artworkDetail.thumbnail.alt_text}</p>
      
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
  
  