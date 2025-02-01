import React, { useEffect, useState } from "react";
import {fetchMusObjectsListing} from "../utils/api";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const MuseumObjectsListing = () =>{
    

    const [museumObjectsListing, setMuseumObjectsListing] = useState(null);
    const [museumFacets,setMuseumFacets] = useState(null);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [offsetValue,setOffsetValue] = useState(20);
    const [artist, setArtist] = useState('a');
    const [material, setMaterial] = useState('a');
    const [geolocation, setGeolocation] = useState('a');
    const [era, setEra] = useState('a');
    const { departmentId } =useParams();  
    const [countSearch, setCountSearch] = useState(0);

    function onClickURL (url){ window.open(url,'_blank')};

    
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


    const handleChangeArtist = (event) => {
      setArtist(event.target.value);
};
const handleChangeMaterial = (event) => {
      setMaterial(event.target.value);
};
const handleChangeGeolocation = (event) => {
      setGeolocation(event.target.value);
};
const handleChangeEra = (event) => {
      setEra(event.target.value);
};

  console.log('countSearch',countSearch)  ; 
    const handleRefreshData =() =>{
            console.log("artist museun"+artist,"Material museun"+material,
            "geolocationMuseun"+geolocation,"date era"+era);
            setCountSearch(countSearch +1);
            console.log('count inside',countSearch);
           };
           console.log('count 2',countSearch);
       if ( countSearch >0){
        console.log(departmentId,offsetValue,artist,material,geolocation,era);
         useEffect(() => {
          fetchMusObjectsListing(departmentId,offsetValue,artist,material,geolocation,era).then((dataFromApi) => {
            setMuseumObjectsListing(dataFromApi.results);
            setMuseumFacets(dataFromApi.facets);
             });
            }, [departmentId,offsetValue]);
          }
       
    if (departmentId){
        useEffect(() => {
          fetchMusObjectsListing(departmentId,offsetValue,artist,material,geolocation,era).then((dataFromApi) => {
             setMuseumObjectsListing(dataFromApi.results);
             setMuseumFacets(dataFromApi.facets);
              });
             }, [departmentId,offsetValue]);
        }
    else {
         useEffect(() => {
            fetchMusObjectsListing(1,offsetValue).then((dataFromApi) => {
    //console.log('Museum object Detail from api'+dataFromApi);
            setMuseumObjectsListing(dataFromApi.results);
            setMuseumFacets(dataFromApi.facets);
              });
          }, [1,offsetValue]);
         };

    
    if (!museumObjectsListing) {
      return <p>Loading...</p>;
    };

      
 return (
           <div > <h2>Object Listing Detail</h2> 
            <section style={{
             width: '800px',
             height: '200px',
             overflowY: 'scroll' ,// Show scrollbar if content overflows
             border: '1px solid black',
             marginTop: '20px',
            }}>
               <h3>Interactive List</h3>
               <p>Search : q 
               <input type="text" id="searchText" placeholder="Enter searchitem..." />
               <button onClick="searchButton()">search Item</button></p>
               <div>
                  <h4>Artist:
                     {/* {selectedValueArtist}</h4>  */}
                     <select value={artist} onChange={handleChangeArtist}>
                     <option value="a">Select an option</option>
                     <option value={museumFacets[0].values[0].id}>{museumFacets[0].values[0].id+"("+museumFacets[0].values[0].count+")"}</option>
                     <option value={museumFacets[0].values[1].id}>{museumFacets[0].values[1].id+"("+museumFacets[0].values[1].count+")"}</option>
                     <option value={museumFacets[0].values[1].id}>{museumFacets[0].values[2].id+"("+museumFacets[0].values[2].count+")"}</option>
                     </select> </h4>
                  <h4>Material:
                     {/* {selectedValueMaterial} */} 
                     <select value={material} onChange={handleChangeMaterial}>
                     <option value="a">Select an option</option>
                     <option value={museumFacets[1].values[0].id}>{museumFacets[1].values[0].id+"("+museumFacets[1].values[0].count+")"}</option>
                     <option value={museumFacets[1].values[1].id}>{museumFacets[1].values[1].id+"("+museumFacets[1].values[1].count+")"}</option>
                     <option value={museumFacets[1].values[1].id}>{museumFacets[1].values[2].id+"("+museumFacets[1].values[2].count+")"}</option>
                     </select> </h4> 
                  <h4>Geolocation: 
                      {/* {selectedValueGeolocation} */}
                      <select value={geolocation} onChange={handleChangeGeolocation}>
                      <option value="a">Select an option</option>
                      <option value={museumFacets[2].values[0].id}>{museumFacets[2].values[0].id+"("+museumFacets[2].values[0].count+")"}</option>
                      <option value={museumFacets[2].values[1].id}>{museumFacets[2].values[1].id+"("+museumFacets[2].values[1].count+")"}</option>
                      <option value={museumFacets[2].values[1].id}>{museumFacets[2].values[2].id+"("+museumFacets[2].values[2].count+")"}</option>
                      </select> </h4>
                  <h4>Date /Era:
                      {/* {selectedValueEra} */}
                      <select value={era} onChange={handleChangeEra}>
                      <option value="a">Select an option</option>
                      <option value={museumFacets[3].values[0].id}>{museumFacets[3].values[0].id+"("+museumFacets[3].values[0].count+")"}</option>
                      <option value={museumFacets[3].values[1].id}>{museumFacets[3].values[1].id+"("+museumFacets[3].values[1].count+")"}</option>
                      <option value={museumFacets[3].values[1].id}>{museumFacets[3].values[2].id+"("+museumFacets[3].values[2].count+")"}</option>
                      </select> </h4>
                  <button onClick = {handleRefreshData}>Refresh Data </button>
                 </div>
           </section>
       
           <main style={{
               width: '800px',
               height: '300px',
               overflowY: 'scroll' ,// Show scrollbar if content overflows
               border: '1px solid black',
               marginTop: '20px',
                  }}>
              <ul>
                 {museumObjectsListing.map((objectsListing, index) => (
                 <li key={index}>
                  <Card>
    
    {objectsListing.image && (
      <Card.Img variant="top" src={objectsListing.image} alt ="Image" width="100px" height="100px" />
    )}
    <Card.Body>
      <Card.Title>{objectsListing.title ? objectsListing.title : "N/A"}</Card.Title>
      <Card.Text>
                    {/* <div onClick={() => onClickURL(objectsListing.url) }>
                     <img src={objectsListing.image} alt ="Image" width="100px" height="100px"/>
                     <button>ObjectListingUrl</button>
                    </div> */}
                    {/* <p> Title: {objectsListing.title}</p> */}
                    <strong>Date: </strong>
      {objectsListing.objectDate ? objectsListing.objectDate : "N/A"}
      <br />
      <strong> Description: </strong>{objectsListing.description ?objectsListing.description : "N/A"}
      <strong> Artist:</strong> {objectsListing.artist ? objectsListing.artist :"N/A"}
      <strong> Culture:</strong> {objectsListing.culture ? objectsListing.culture : "N/A"}
      <strong> Date: </strong>{objectsListing.date ? objectsListing.date :"N/A" }
      <strong> Medium:</strong> {objectsListing.medium ? objectsListing.medium : "N/A"}
      <strong> AccessionNumber:</strong> {objectsListing.accessionNumber ? objectsListing.accessionNumber :"N/A"}
      <strong> GalleryInformation:</strong> {objectsListing.galleryInformation ? objectsListing.galleryInformation : "N/A"}
                 
                    {/* <p> Description: {objectsListing.description}</p>
                    <p> Artist: {objectsListing.artist}</p>
                    <p> Culture: {objectsListing.culture}</p>
                    <p> Date: {objectsListing.date}</p>
                    <p> Medium: {objectsListing.medium}</p>
                    <p> AccessionNumber: {objectsListing.accessionNumber}</p>
                    <p> GalleryInformation: {objectsListing.galleryInformation}</p>
                    <p>-----------------------------------------</p> */}
                    </Card.Text>
  </Card.Body>
</Card>
                  </li>
                  ))}
               </ul>
             </main>
             <footer>
               <button onClick={handlePreviousPage}>Previous</button>
               <button onClick = {handleCurrentPage}>Current Page : {currentPageNo}</button>
              <button onClick = {handleNextPage}>Next</button>
             </footer>
          </div>

    );
  };
  
export default MuseumObjectsListing;

