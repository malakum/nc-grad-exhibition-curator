import React, { useEffect, useState } from "react";
import {fetchArticArtworks} from "../../utils/api";
import ArticArtworkCard from "./ArticArtworkCard";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";
 import Button from 'react-bootstrap/Button';
 import { useNavigate } from "react-router-dom";

 import { useLocation } from "react-router-dom";



const ArticArtworks = () =>{

    const [artworks, setArtworks] = useState(null);
   
    const [page, setPage] = useState(1);
    const PER_PAGE = 8; // should not be more then 99
    const limit = PER_PAGE; // should not be more than 99
    const navigate = useNavigate();
    const location = useLocation();
    let q ='sunflower';
    let loggedInUser1 = '';

    if (location.state){
       if (location.state.searchField ){
           q = location.state.searchField;
           console.log('q inside artic artworks',q);
           }

           if (location.state.loggedInUser){
            loggedInUser1 = location.state.loggedInUser;
         }
         if (location.state.user){
           loggedInUser1 = location.state.user;
        }
    };

    console.log(loggedInUser1, typeof loggedInUser1)
    if ( typeof loggedInUser1=== Object) {
      loggedInUser1 ='';
    }

          const handleFavData = (e) =>{
    
        navigate ("/favourite",{state : { loggedInUser1 : loggedInUser1}});
  
  };
     
    function previousPage(){
        if(page > 1){
            setPage(page=>page-1);
        }
    }

    function nextPage(){
     
        if (page <5){
            setPage(page=>page+1);
        }
    };

   
    

  useEffect(() => {
    fetchArticArtworks(q,page,limit).then((dataFromApi) => {
    console.log('Artic Artworks'+dataFromApi);
      setArtworks(dataFromApi);
    });
    
  }, [q,page,PER_PAGE]);

  if (!artworks) {
    return <p>Loading...</p>;
  };
 

    return ( <>
            
         <h2> ArticArtworks</h2>
         <h3>Logged in User : {loggedInUser1}</h3>
         <Row>
          <Col>
            <Button onClick={handleFavData}> Search Page </Button>
            </Col> 
            </Row>
             
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
