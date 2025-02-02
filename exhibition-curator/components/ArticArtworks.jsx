import React, { useEffect, useState } from "react";
import {fetchArticArtworks} from "../utils/api";
import ArticArtworkCard from "./ArticArtworkCard";

//import  Link  from 'react-router-dom' ;


const ArticArtworks = () =>{

    const [artworks, setArtworks] = useState(null);
    const [searchItem,setSearchItem] = useState('cat');
    const page =1;
    const limit = 10; // can't be more that 100 per page  
    let q ='cat';
   // const [geolocation, setGeolocation] = useState('a');
    

  useEffect(() => {
    fetchArticArtworks(q,page,limit).then((dataFromApi) => {
    console.log('Artic Artworks'+dataFromApi);
      setArtworks(dataFromApi);
    });
  }, ['cat',1,10]);

  if (!artworks) {
    return <p>Loading...</p>;
  };

    return ( <>
            
         <h2> ArticArtworks</h2>
         <h3>Total Artworks: {artworks.total}</h3>
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
        {artworks.map((artwork, index) => (
            //  {museumObjects.objectIDs.slice(0, 10).map((objectID, index) => (
          <li key={index}>
            <p>Artworks: {artwork.id}</p>
            

            <ArticArtworkCard artwork_id={artwork.id}/>
          
            </li>
        ))}
      </ul>
      </div>
    </>)
}
export default ArticArtworks;
