import React, { useEffect, useState } from "react";
import {fetchArticArtworks} from "../utils/api";
import ArticArtworkCard from "./ArticArtworkCard";
import  Card  from "react-bootstrap/Card";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";



const ArticArtworks = () =>{

    const [artworks, setArtworks] = useState(null);
    const [searchItem,setSearchItem] = useState('cat');
    const limit = 10; // can't be more that 100 per page  
    let q ='cat';
    const PER_PAGE = 10;
    
    const [page, setPage] = useState(1);


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
             
      <Row className="gy-4">
                    {artworks.map((artwork,index)=>(
                        <Col lg={3} key={index}><ArticArtworkCard artwork_id={artwork.id} /></Col>))}
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
export default ArticArtworks;
