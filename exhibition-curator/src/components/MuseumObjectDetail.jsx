import React, { useContext,useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getMusObjectDetail } from "../../utils/api";
import { UserContext } from "../contexts/User";
import { supabase } from "../lib/supabaseClient";
import { Row , Col } from "react-bootstrap";





const MuseumObjectDetail = () =>{

  const { loggedInUser, isLoggedIn } = useContext(UserContext);

  console.log('loggedInUser isLoggedIn',loggedInUser, isLoggedIn);
 

    const [museumObjectDetail, setMuseumObjectDetail] = useState(null);

    const { objectID } =useParams();   
    const navigate = useNavigate();

    
    function onClickURL (url){ window.open(url,'_blank')};
 
  
   
   
    const [showAdded, setShowAdded] = useState(false);
    const handleFavData = (e) =>{
    
      navigate ("/favourite",{state : { loggedInUser : loggedInUser}});

};

    
    async function favouritesClickedMuseum() {
        if(showAdded){
         
            setShowAdded(false)
        }
        else{

          // const newFavobject = {
          //   fav_flag_id :"M",
          //   fav_object :objectID,
          //   fav_user : loggedInUser
          //   };
          //  setFavouritesList(await addToFavourites(objectID))
        //  const  newFavobject = {fav_object : objectID ,fav_flag :'M' , fav_user :loggedInUser};
       
          // console.log('fav  metro museum object added',newFavobject);
           const { data , error} = await supabase
                                        .from("favmetro")
                                               .select("fav_object")
                                               .eq("fav_user",loggedInUser)
                                               .eq("fav_object",objectID);
          
          if (error){
                      console.log ('error1',error);
                                                        };
          if (data){
                                                console.log('data1',data);
                                              }
          if (!data || data.length===0 )
            {

          const { data2, error2 } = await supabase
                      .from('favmetro')
                      .insert([{ fav_object: objectID , fav_user: loggedInUser }])
                      .select("*")
                      .single();
                  
                    if (error2) 
                      {console.error('Error inserting item:', error2.message);
                      }
                    else {
                      console.log('Item inserted:', data2);
                    }
                  }
                          //  posFavobject(fav_object, newFavobject);
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
   
    else { 
      return <p> Object Id is required..</p>
    }
    
    if (!museumObjectDetail) {
      return <p>Loading...</p>;
    };


    
     return (<div      
    > Object Detail
    <Row>
          <Col>
            <Button onClick={handleFavData}> Search Page </Button>
            </Col> 
            </Row>
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
{/* <Row>
            <Col>
            <Button onClick={handleFavData}> Search Page </Button>
            </Col>
           
          </Row> */}
       
       
     </div>
     
    );
  };

  
  
export default MuseumObjectDetail;

