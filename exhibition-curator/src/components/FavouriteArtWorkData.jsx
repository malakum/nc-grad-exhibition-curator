import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import ArticArtworkCard from "./ArticArtworkCard";
import { useState ,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";


export default function FavouritArtWorkData() {
 
  // const favouriteArtworkData = [{name:"mala",artworkObjects:[8427,197508,18421,20029]} ,
  //                            {name:"smith",artworkObjects:[35720,20029,35720,796]},
  //                            {name:"peter",artworkObjects:[112885,97390,9400,918]}];

    const [favouritesList,setFavouritesList] =useState([])   ; 
    const navigate = useNavigate();
    const location = useLocation();
    const [dataDeleted, setDataDeleted] = useState(false);
    let loggedInUser1 = '';
    if (location.state){
     if (location.state.loggedInUser){
         loggedInUser1 = location.state.loggedInUser;
      }
      if (location.state.user){
        loggedInUser1 = location.state.user;
     }
    };
   
    const handleFavData = (e) =>{
    
      navigate ("/favourite",{state : { loggedInUser1 : loggedInUser1}});

       };
    //  const handleHome = (e) =>{
   
    //   navigate ("/");
      
    //    };


const handleFavDelete = async (currentObjectID) =>{
  console.log('favobjects',currentObjectID);
  const { data , error } = await supabase.from("favart").delete().eq("fav_user",loggedInUser1)
                                 .eq("fav_object",currentObjectID);
  if (error){ 
    // console.log("Error selecting data :", error);
    setDataDeleted(false);
   }
  else { 
    // console.log("data selected",data);
    setDataDeleted(true);
    setFavouritesList(favouritesList.filter(currentList => currentList !==currentObjectID));
    
   }
};

const fetchFavobjects = async () =>{
      const { data , error } = await supabase
                                     .from("favart")
                                     .select("*")
                                     .eq("fav_user",loggedInUser1);
      if (error){
        console.log("Error fetching :", error);
      }
      else {
      
        const fav_listset = [];
        if (data.length>=1){
          for (let i=0 ; i<data.length ;i++){
           const  fav_list = data[i].fav_object;
            fav_listset.push(fav_list)

          }
        }
        setFavouritesList(fav_listset);
      }
    }

   
 

   useEffect(() =>{
    
    // const newData1 = favouriteArtworkData.filter(favData => favData.name=== loggedInUser1);
    // if (newData1[0]){ const favList = newData1[0].artworkObjects;
    // setFavouritesList(favList)  ;  }
        fetchFavobjects(); 
      },[]);

      if(!favouritesList) { 
        return <p>No favouriteList...</p>};

  if (favouritesList) {
    if (favouritesList?.length == 0) {
    
      return (
        <>
          <Row className="gy-4">
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                <br />
                Try searching for something else
              </Card.Body>
            </Card>
          </Row>
        </>
      );
    } else {
      return (
        <>
       
        <h3>Favourite Artworks </h3>
        <h4>Logged in User : {loggedInUser1}</h4>
        <Row>
                  <Col>
                    <Button onClick={handleFavData}> Search Page </Button>
                    </Col> 
                    </Row>
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                <ArticArtworkCard artwork_id={currentObjectID} />
                  <Button onClick={() =>handleFavDelete(currentObjectID)}> Delete Data </Button>
              
              </Col>
            ))}
          </Row>
           {/* <Row>
                        <Col>
                      <Button onClick={handleHome}>Home </Button>
                      </Col>
                    </Row> */}
               

        </>
      );
    }
  } else {
    return (
      <>
      <p> error </p>
       </>
    );
  }
}
