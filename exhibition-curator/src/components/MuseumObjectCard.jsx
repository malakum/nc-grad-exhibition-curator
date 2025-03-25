import React, { useEffect, useState, useContext } from "react";
//import {fetchMusObjectDetail} from "../../utils/api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { getMusObjectDetail } from "../../utils/api";
import { supabase } from "../lib/supabaseClient";
import { UserContext } from "../contexts/User";

const MuseumObjectCard = ({objectID}) =>{

    const [museumObjectCard, setMuseumObjectCard] = useState(null);
     const { loggedInUser, isLoggedIn } = useContext(UserContext);
     console.log('user context',UserContext);
     console.log('use context',useContext(UserContext));
     console.log(loggedInUser);

    //  const handleFavDelete = async () =>{
    //    console.log('favobjects metro card',objectID);
    //    console.log('logged in user',loggedInUser);
     
    //    const { data , error } = await supabase
    //                                   .from("favmetro")
    //                                   .select("*")
    //                                   .eq("fav_user",loggedInUser)
    //                                    .eq("fav_object",objectID);
    //    if (error){
    //      console.log("Error selecting data fav metro card:", error);
    //    }
    //    else {
    //      console.log("data selected fav metro card",data);
    //    }
    //  };

    if (objectID){
      useEffect(() => {
        getMusObjectDetail(objectID).
        then((museumObjectDetailFromApi) => {
           console.log('Museum object Detail from api'+museumObjectDetailFromApi);
            setMuseumObjectCard(museumObjectDetailFromApi);
         })
         .catch((err) => {
          console.log('error in museum card',err);
         
        })
       }, [objectID])}
    
    else {
      return(<p> Object Id is required...</p>)
    }
    
    if (!museumObjectCard) {
      return <p>Loading...</p>;
    };

    
    


    
     return (    
    <>
    <div >
     < Card style={{ width: "18rem", height: "25rem" }} >
     < Card.Img
        variant="top"
       src ={museumObjectCard.primaryImageSmall
        ? museumObjectCard.primaryImageSmall
        : `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`} alt ="primaryImageSmall"  height ="100px" width ="100px"
       />
        
         <Card.Body > 
    <Card.Title >{museumObjectCard.title ? museumObjectCard.title.slice(0,20) : "N/A"}</Card.Title>
    <Card.Text>
     <p>
    <strong>Department: </strong>
      {museumObjectCard.department ? museumObjectCard.department : "N/A"} </p>
      <br />
      <strong>Object Name: </strong>
      {museumObjectCard.objectName ? museumObjectCard.objectName : "N/A"}
      <br />
      <strong>Medium: </strong>
      {museumObjectCard.medium ? museumObjectCard.medium.slice(0,10) : "N/A"}
      <br />
      {/* <strong>Geolocation: </strong>
      {museumObjectCard.geolocation ? museumObjectCard.geolocation : "N/A"}
      <br /> */}

                <Link
                                              to={`/objects/${objectID}`}
                                               > Link for object detail
                                                
         </Link>
         <br />
            {/* <p>{museumObjectCard.objectID}</p>
          <Button onClick={handleFavDelete}> Delete Data </Button> */}
        
    </Card.Text> 
   </Card.Body>
</Card>
</div>

</>
     );   
    
  };
 
  
export default MuseumObjectCard;

