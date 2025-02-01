import React, { useEffect, useState } from "react";
import {fetchMusObjects} from "../utils/api";
//import  Link  from 'react-router-dom' ;
import MuseumObjectDetail from "./MuseumObjectDetail";
import MuseumObjectCard from "./MuseumObjectCard";

const MuseumObjects = () =>{

    const [museumObjects, setMuseumObjects] = useState(null);
    const [geolocation, setGeolocation] = useState('a');
    

  useEffect(() => {
    fetchMusObjects(1,'sunflower',false,geolocation).then((museumObjectsFromApi) => {
    console.log('taglist from api'+museumObjectsFromApi);
      setMuseumObjects(museumObjectsFromApi);
    });
  }, []);

  if (!museumObjects) {
    return <p>Loading...</p>;
  };

    return ( <>
            
         <h2> MuseumObjects</h2>
         <h3>Total Museum Objects: {museumObjects.total}</h3>
         <div 
    //      style={{
    //   width: '500px',
    //    height: '200px',
    //    overflowY: 'scroll' ,// Show scrollbar if content overflows
    //    border: '1px solid black',
    //    marginTop: '20px',
    //  }}
     >
      <ul>
        {museumObjects.objectIDs.map((objectID, index) => (
            //  {museumObjects.objectIDs.slice(0, 10).map((objectID, index) => (
          <li key={index}>
            <p>Object ID: {objectID}</p>
            

            <MuseumObjectCard objectID={objectID}/>
          
            </li>
        ))}
      </ul>
      </div>
    </>)
}
export default MuseumObjects;

