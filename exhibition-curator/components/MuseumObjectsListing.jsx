import React, { useEffect, useState } from "react";
import {fetchMusObjectsListing} from "../utils/api";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";

//const MuseumObjectsListing = ({departmentId}) =>{
    const MuseumObjectsListing = ({departmentId}) =>{
        //  const departmentId =useParams(departmentId);

    const [museumObjectsListing, setMuseumObjectsListing] = useState(null);
    const [museumFacets,setMuseumFacets] = useState(null);
    const [museumFacetArtist,setMuseumFacetArtist] =useState(null);
    const [museumFacetMaterial,setMuseumFacetMaterial] =useState(null);
    const [museumFacetGeolocation,setMuseumFacetGeolocation] =useState(null);
    const [museumFacetEra,setMuseumFacetEra] =useState(null);
    const [museumFacetDepartment,setMuseumFacetDepartment] =useState(null);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [offestValue,setOffsetValue] = useState(20);

    function onClickURL (url){ window.open(url,'_blank')};

   // let currentPageNo =1;
   // let offsetValue =20;

    const handlePreviousPage =()=>{
      if (currentPageNo<=1){
        setCurrentPageNo(currentPageNo);
      }
      else {
        setCurrentPageNo(currentPageNo-1);
      }
    };

    const handleNextPage = () => {
      setCurrentPageNo(currentPageNo+1);
    };

    const handleCurrentPage = () =>{
      if (currentPageNo >1) {
         //offsetValue = 20 +offsetValue;
        // console.log(offsetValue);
         setOffsetValue(20+((currentPageNo-1)*20));
      }
      else {
        setOffsetValue(20)
      };
    }
   
    if (departmentId){
        useEffect(() => {
          fetchMusObjectsListing(departmentId,offestValue).then((dataFromApi) => {
      //console.log('Museum object Detail from api'+dataFromApi);
        setMuseumObjectsListing(dataFromApi.results);
        setMuseumFacets(dataFromApi.facets);
      });
    }, [departmentId,offestValue])}
else {
         useEffect(() => {
        fetchMusObjectsListing(1,offestValue).then((dataFromApi) => {
    //console.log('Museum object Detail from api'+dataFromApi);
      setMuseumObjectsListing(dataFromApi.results);
      setMuseumFacets(dataFromApi.facets);
    });
  }, [offestValue]);
}

    
    if (!museumObjectsListing) {
      return <p>Loading...</p>;
    };

    if (museumFacets){
        if (museumFacets[0].id==='artist'){
            console.log(museumFacets[0].values[0].id+"("+museumFacets[0].values[0].count+")");
            console.log(museumFacets[0].values[1].id+"("+museumFacets[0].values[1].count+")");
            
           //setMuseumFacetArtist(newArray);
        }
        if (museumFacets[1].id==='material'){
            console.log(museumFacets[1].values[0]);
          //  setMuseumFacetMaterial(museumFacets[1].values);
        }
        if (museumFacets[2].id==='geolocation'){
            console.log(museumFacets[2].values[0]);
        //setMuseumFacetGeolocation(museumFacets[2].values)
        }
        if (museumFacets[3].id==='era'){
            console.log(museumFacets[3].values[0]);
        //setMuseumFacetEra(museumFacets[3].values);
        }
        if (museumFacets[4].id==='department'){
            console.log(museumFacets[4].values[0]);
        //setMuseumFacetDepartment(museumFacets[4].values)
        }
        else {
            return <p>no search data...</p>;
        }
    }
    console.log('artist'+museumFacetArtist);
    console.log('material'+museumFacetMaterial);
    console.log('Geolocation'+museumFacetGeolocation);
    console.log('era'+museumFacetEra);
    console.log('department'+museumFacetDepartment);

    
     return (<div 
      //style={{
    //   width: '500px',
    //   height: '200px',
    //   overflowY: 'scroll' ,// Show scrollbar if content overflows
    //   border: '1px solid black',
    //   marginTop: '20px',
    // }}
    > Object Listing Detail
    <section style={{
       width: '800px',
       height: '200px',
       overflowY: 'scroll' ,// Show scrollbar if content overflows
      border: '1px solid black',
      marginTop: '20px',
      
    }}>
    <p>Search : q </p>
    <p> Artist/Culture : artist : {museumFacets[0].id}</p>
    <p>Material : material : {museumFacets[1].id}</p>
    <p>Geographic Location : geolocation : {museumFacets[2].id} </p>
    <p>Date /era : era :{museumFacets[3].id}</p>
    <p>Department : department: {museumFacets[4].id}</p>
    </section>
        {/* //facets-id-artist ,label-Artist/culture,serchable -true values :[{object}]
   //      id-material , label -Object Type /Material , searchable -true, values :[{object}]
   //       id-geolocation, label-Geographic Location ,searchable -true values : [{object}]
   //       id-era , label- Date /Era ,searchable :false , value :[{object}]
   //       id -department , label -Department , searchable -false, values :[{object}] */}
    <div style={{
      width: '800px',
      height: '300px',
      overflowY: 'scroll' ,// Show scrollbar if content overflows
      border: '1px solid black',
      marginTop: '20px',
      
    }}>
    <ul>
        {museumObjectsListing.map((objectsListing, index) => (
             <li key={index}>
             <div onClick={() => onClickURL(objectsListing.url) }>
             <img src={objectsListing.image} alt ="Image" width="100px" height="100px"/>
                <button>ObjectListingUrl</button>
             </div>
            <p> Title: {objectsListing.title}</p>
            <p> Description: {objectsListing.description}</p>
            <p> Artist: {objectsListing.artist}</p>
            <p> Culture: {objectsListing.culture}</p>
            <p> Date: {objectsListing.date}</p>
            <p> Medium: {objectsListing.medium}</p>
            <p> AccessionNumber: {objectsListing.accessionNumber}</p>
            <p> GalleryInformation: {objectsListing.galleryInformation}</p>
            <p>-----------------------------------------</p>
            </li>
        ))}
      </ul>
    </div>
    <footer>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick = {handleCurrentPage}>Current Page : {currentPageNo}</button>
      <button onClick = {handleNextPage}>Next</button>
    </footer>
    </div>
      
     
     
    );
  };
  
export default MuseumObjectsListing;

