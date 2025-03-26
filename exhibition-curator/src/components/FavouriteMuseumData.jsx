import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import MuseumObjectCard from "./MuseumObjectCard";
import { useState, useEffect ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { UserContext } from "../contexts/User";

export default function FavouritMuseumData() {
 
  // const favouriteMuseumData = [{name:"malakumari",museumObjects:[110,220,333,444]} ,
  //                            {name:"smith",museumObjects:[220,120,707887,485308]},
  //                            {name:"peter",museumObjects:[334,120,363282]}];

    const [favouritesList,setFavouritesList] =useState([])   ; 
    const navigate = useNavigate();
    const location = useLocation();
    const   { loggedInUser, isLoggedIn } = useContext(UserContext);
    const [dataDeleted, setDataDeleted] = useState(false);
      console.log('logged in use in fev metro',loggedInUser);

    let loggedInUser1 = '';
       if (location.state){
          if (location.state.loggedInUser){
             loggedInUser1 = location.state.loggedInUser;
          }
          if (location.state.user){
            loggedInUser1 = location.state.user;
          }
        };
        console.log('logged in use in fev metro2',loggedInUser1);
        console.log(loggedInUser1, typeof loggedInUser1)
        if ( typeof loggedInUser1=== Object) {
          loggedInUser1 ='';
        }
  
     const handleFavData = (e) =>{
           navigate ("/favourite",{state : { loggedInUser1 : loggedInUser1}});
      };

    //  const handleHome = (e) =>{
    //        navigate ("/");
    //  };

 const handleFavDelete = async ({currentObjectID}) =>{
       console.log('favobjects metro card',currentObjectID);
       console.log('logged in user',loggedInUser1);
     
       const { data , error } = await supabase
                                      .from("favmetro")
                                      .delete()
                                      .eq("fav_user",loggedInUser1)
                                       .eq("fav_object",currentObjectID);
       if (error){
         console.log("Error deleting favourite data :", error);
         setDataDeleted(false);
             }
       else {
         console.log("favourite data deleted ",data);
         setDataDeleted(true);
         setFavouritesList(favouritesList.filter(currentList => currentList !==currentObjectID));
        // setFavouritesList(favouritesList.filter((currentList)=> {currentList !=currentObjectID}));
         
       }
      // }
     };

    const fetchFavobjects = async () =>{
      const { data , error } = await supabase
                                     .from("favmetro")
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
      // const newData1 = favouriteMuseumData.filter(favData => favData.name== loggedInUser1);
      // if (newData1[0]){
      // const favList = newData1[0].museumObjects;
      // setFavouritesList(favList)  ; 
      // }
         fetchFavobjects();
        },[]);
                  
   if(!favouritesList) { 
    return <p> No Favourite List...</p>};
   

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
        <h3>Favourite Metro Museum Objects</h3>
          <h4>Logged in User : {loggedInUser1}</h4>
          <Row>
          <Col>
            <Button onClick={handleFavData}> Search Page </Button>
            </Col> 
            </Row>
          <Row className="gy-4">
            {favouritesList?.map((currentObjectID, index) => (
              <Col lg={3} key={currentObjectID}>
                 < MuseumObjectCard objectID={currentObjectID} />
                
                 {/* <Button variant={dataDeleted ? "primary" : "outline-primary"} */}
                 <Button
                 onClick={() =>handleFavDelete({currentObjectID}) }>
                   Delete Data 
                 </Button>
                  
              </Col>
            
            ))}
          </Row>
          <br/>
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
