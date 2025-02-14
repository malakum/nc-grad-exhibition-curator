import React, { useEffect, useState } from "react";
import {fetchArticArtworks} from "../../utils/api";
import ArticArtworkCard from "./ArticArtworkCard";
import  Card  from "react-bootstrap/Card";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";

 import { useLocation } from "react-router-dom";



const ArticArtworks = () =>{

    const [artworks, setArtworks] = useState(null);
    const [artworkList, setArtworkList] = useState([]);
    const [searchItem,setSearchItem] = useState('cat');
    const limit = 8; 
    const PER_PAGE = 8;
   
          const location = useLocation();
          let q = null;
            if (location.state.q ){
              q = location.state.q;
          
              console.log('q inside artic artworks',q);
            }
              if (!q ){
               q = 'cat';
              };
      
    
    const [page, setPage] = useState(1);


    function previousPage(){
        if(page > 1){
            setPage(page=>page-1);
        }
    }

    function nextPage(){
     
        if (page <3){
            setPage(page=>page+1);
        }
    }
    

  useEffect(() => {
    fetchArticArtworks(q,page,limit).then((dataFromApi) => {
    console.log('Artic Artworks'+dataFromApi);
      setArtworks(dataFromApi);
    });
    
  }, ['cat',page,8]);

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
