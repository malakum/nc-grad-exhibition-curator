import React, { useEffect, useState } from "react";
import {fetchMusObjectsListing} from "../utils/api";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";

//const MuseumObjectsListing = ({departmentId}) =>{
    const MuseumObjectsListing = () =>{

    const [museumObjectsListing, setMuseumObjectsListing] = useState(null);

    function onClickURL (url){ window.open(url,'_blank')};
   
    // if (departmentId){
    //     useEffect(() => {
    //       fetchMusObjectsListing(departmentId).then((dataFromApi) => {
    //   console.log('Museum object Detail from api'+dataFromApi);
    //     setMuseumObjectsListing(dataFromApi);
    //   });
    // }, [departmentId])}
//else {
         useEffect(() => {
        fetchMusObjectsListing(1).then((dataFromApi) => {
    console.log('Museum object Detail from api'+dataFromApi);
      setMuseumObjectsListing(dataFromApi);
    });
  }, []);
//}
    
    if (!museumObjectsListing) {
      return <p>Loading...</p>;
    };


    
     return (<div 
      //style={{
    //   width: '500px',
    //   height: '200px',
    //   overflowY: 'scroll' ,// Show scrollbar if content overflows
    //   border: '1px solid black',
    //   marginTop: '20px',
    // }}
    > Object Listing Detail
    <p>Search : q </p>
    <p> Artist/Culture : artist</p>
    <p>Material : material</p>
    <p>Geographic Location : geolocation</p>
    <p>Date /era : era</p>
    <p>Department : department</p>
        {/* //facets-id-artist ,label-Artist/culture,serchable -true values :[{object}]
   //      id-material , label -Object Type /Material , searchable -true, values :[{object}]
   //       id-geolocation, label-Geographic Location ,searchable -true values : [{object}]
   //       id-era , label- Date /Era ,searchable :false , value :[{object}]
   //       id -department , label -Department , searchable -false, values :[{object}] */}
    <div style={{
      width: '500px',
      height: '400px',
      overflowY: 'scroll' ,// Show scrollbar if content overflows
      border: '1px solid black',
      marginTop: '20px',
    }}>
    <ul>
        {museumObjectsListing.map((objectsListing, index) => (
            //  {museumObjects.objectIDs.slice(0, 10).map((objectID, index) => (
          <li key={index}>
            <p> Title: {objectsListing.title}</p>
            <p> Description: {objectsListing.description}</p>
            <p> Artist: {objectsListing.artist}</p>
            <p> Culture: {objectsListing.culture}</p>
            <p> TeaserText: {objectsListing.teaserText}</p>
            <div onClick={() => onClickURL(objectsListing.url) }>
        <button>ObjectListingUrl</button>
        </div>
            <div>
            <img src={objectsListing.image} alt ="Image" width="100px" height="100px"/>
{/*            
            <img src={objectsListing.regularImage} alt ="Regular Image" width="100px" height="100px"/>
            <img src={objectsListing.largerImage} alt ="Larger Image" width="100px" height="100px"/> */}
           
            </div>
            <p> Date: {objectsListing.date}</p>
            <p> Medium: {objectsListing.medium}</p>
            <p> AccessionNumber: {objectsListing.accessionNumber}</p>
            <p> GalleryInformation: {objectsListing.galleryInformation}</p>
            <p>-----------------------------------------</p>
            </li>
        ))}
      </ul>
    </div>
    </div>
      
     
     
    );
  };
  
export default MuseumObjectsListing;

