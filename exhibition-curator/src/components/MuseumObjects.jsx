import React, { useEffect, useState } from "react";
import {fetchMusObjects} from "../../utils/api";
//import  Link  from 'react-router-dom' ;
import MuseumObjectCard from "./MuseumObjectCard";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";
 import { useSearchParams } from "react-router-dom";




const MuseumObjects = () =>{

    const [museumObjects, setMuseumObjects] = useState(null);
    const [museumObjectList,setMuseumObjectList] = useState([]);
   
     const PER_PAGE = 10;
      const [page, setPage] = useState(1);
     
      let q = 'cat';
    
    
        function previousPage(){
            if(page > 1){
                setPage(page=>page-1);
            }
        }
    
        function nextPage(){
            if(page<artworks.length){
                setPage(page=>page+1);
            }
        }

    

  useEffect(() => {
    fetchMusObjects(1,q,false).then((museumObjectsFromApi) => {
    console.log('taglist from api'+museumObjectsFromApi);
      setMuseumObjects(museumObjectsFromApi);
    });
  }, [q]);

  
  if (!museumObjects) {
    return <p>Loading...</p>;
  };

  
    return ( <>
            
         <h2> MuseumObjects</h2>
         <h3>Total Museum Objects: {museumObjects.total}</h3>
                
      <Row className="gy-4">
                    {museumObjects.objectIDs.map((objectID,index)=>(
                        <Col lg={3} key={index}><MuseumObjectCard objectID={objectID} /></Col>))}
                </Row>
      <Row>
                    <Col>
                        <br/>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                </Row>

    </>)
}
export default MuseumObjects;

