import React, { useEffect, useState } from "react";
import {fetchMusObjectsListing} from "../utils/api";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";


    const MuseumObjectsListing = () =>{
          const { departmentId } =useParams();

    const [museumObjectsListing, setMuseumObjectsListing] = useState(null);
    const [museumFacets,setMuseumFacets] = useState(null);
    const [museumFacetArtist,setMuseumFacetArtist] =useState(null);
    const [museumFacetMaterial,setMuseumFacetMaterial] =useState(null);
    const [museumFacetGeolocation,setMuseumFacetGeolocation] =useState(null);
    const [museumFacetEra,setMuseumFacetEra] =useState(null);
    const [museumFacetDepartment,setMuseumFacetDepartment] =useState(null);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [offsetValue,setOffsetValue] = useState(20);
    const [selectedValueArtist, setSelectedValueArtist] = useState('');
    const [selectedValueMaterial, setSelectedValueMaterial] = useState('');
    const [selectedValueGeolocation, setSelectedValueGeolocation] = useState('');
    const [selectedValueEra, setSelectedValueEra] = useState('');
    const [selectedValueDepartment, setSelectedValueDepartment] = useState(1);

    

    function onClickURL (url){ window.open(url,'_blank')};

    const handleChangeArtist = (event) => {
      setSelectedValueArtist(event.target.value);
    };
    const handleChangeMaterial = (event) => {
      setSelectedValueMaterial(event.target.value);
    };
    const handleChangeGeolocation = (event) => {
      setSelectedValueGeolocation(event.target.value);
    };
    const handleChangeEra = (event) => {
      setSelectedValueEra(event.target.value);
    };
    const handleChangeDepartment = (event) => {
      setSelectedValueDepartment(event.target.value);
    };
   // let currentPageNo =1;
   // let offsetValue =20;

    const handlePreviousPage =()=>{
      if (currentPageNo<=1){
        setCurrentPageNo(currentPageNo);
        setOffsetValue(20);
    
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
        
         setOffsetValue(20+((currentPageNo-1)*20));
      }
      else {
        setOffsetValue(20)
      };
    };

    const newPostHandler = (event) => {
      setInput(event.target.value);
     }


    const postSubmitHandler = (evt) => {
      if (input.length === 0) {
          console.log("Nothing to search here");
   
      } else {
          const newComment = {};
           newComment['body'] = input;
           console.log(newComment);
         }
       };
   
    if (departmentId){
        useEffect(() => {
          fetchMusObjectsListing(departmentId,offsetValue).then((dataFromApi) => {
      //console.log('Museum object Detail from api'+dataFromApi);
        setMuseumObjectsListing(dataFromApi.results);
        setMuseumFacets(dataFromApi.facets);
      });
    }, [departmentId,offsetValue])}
else {
         useEffect(() => {
        fetchMusObjectsListing(1,offsetValue).then((dataFromApi) => {
    //console.log('Museum object Detail from api'+dataFromApi);
      setMuseumObjectsListing(dataFromApi.results);
      setMuseumFacets(dataFromApi.facets);
    });
  }, [offsetValue]);
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
       

            <h1>Interactive List</h1>
 
  {/* <button onclick="addItem()">Add Item</button> */}
            
    <p>Search : q </p>
    <input type="text" id="searchText" placeholder="Enter searchitem..." />
    <button onclick="searchButton()">search Item</button>
   
      <div>
      <h4>Artist: {selectedValueArtist}</h4>
      <select value={selectedValueArtist} onChange={handleChangeArtist}>
        <option value="">Select an option</option>
        <option value={museumFacets[0].values[0].id}>{museumFacets[0].values[0].id+"("+museumFacets[0].values[0].count+")"}</option>
        <option value={museumFacets[0].values[1].id}>{museumFacets[0].values[1].id+"("+museumFacets[0].values[1].count+")"}</option>
        <option value={museumFacets[0].values[1].id}>{museumFacets[0].values[2].id+"("+museumFacets[0].values[2].count+")"}</option>
      </select> 
      <h4>Material: {selectedValueMaterial}</h4>
      <select value={selectedValueMaterial} onChange={handleChangeMaterial}>
        <option value="">Select an option</option>
        <option value={museumFacets[1].values[0].id}>{museumFacets[1].values[0].id+"("+museumFacets[1].values[0].count+")"}</option>
        <option value={museumFacets[1].values[1].id}>{museumFacets[1].values[1].id+"("+museumFacets[1].values[1].count+")"}</option>
        <option value={museumFacets[1].values[1].id}>{museumFacets[1].values[2].id+"("+museumFacets[1].values[2].count+")"}</option>
      </select>
     
      <h4>Geolocation: {selectedValueGeolocation}</h4>
      <select value={selectedValueGeolocation} onChange={handleChangeGeolocation}>
        <option value="">Select an option</option>
        <option value={museumFacets[2].values[0].id}>{museumFacets[2].values[0].id+"("+museumFacets[2].values[0].count+")"}</option>
        <option value={museumFacets[2].values[1].id}>{museumFacets[2].values[1].id+"("+museumFacets[2].values[1].count+")"}</option>
        <option value={museumFacets[2].values[1].id}>{museumFacets[2].values[2].id+"("+museumFacets[2].values[2].count+")"}</option>
      </select>
      <h4>Date /Era: {selectedValueEra}</h4>
      <select value={selectedValueEra} onChange={handleChangeEra}>
        <option value="">Select an option</option>
        <option value={museumFacets[3].values[0].id}>{museumFacets[3].values[0].id+"("+museumFacets[3].values[0].count+")"}</option>
        <option value={museumFacets[3].values[1].id}>{museumFacets[3].values[1].id+"("+museumFacets[3].values[1].count+")"}</option>
        <option value={museumFacets[3].values[1].id}>{museumFacets[3].values[2].id+"("+museumFacets[3].values[2].count+")"}</option>
      </select>
      <button>Refresh Data </button>
     
    </div>
    
    </section>
       
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

