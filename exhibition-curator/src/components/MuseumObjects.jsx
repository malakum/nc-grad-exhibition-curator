import React, { useEffect, useState } from "react";
//import {fetchMusObjects} from "../../utils/api";
//import  Link  from 'react-router-dom' ;
import MuseumObjectCard from "./MuseumObjectCard";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";
 import { useLocation } from "react-router-dom";
 import { getMusObjects } from "../../utils/api";
import AdvancedSearch from "./AdvancedSearch";
 
 




const MuseumObjects = () =>{

    const [museumObjects, setMuseumObjects] = useState(null);
    const [museumObjectList,setMuseumObjectList] = useState([]);
   
     const PER_PAGE = 8;
      const [page, setPage] = useState(1);
      const [postPerPage,setPostPerPage] = useState(8);
      const [currentPage, setCurrentPage] = useState(1);

      
     
    // let  {q} = props.q;
    const location = useLocation();
    let q = 'cat';
    console.log('location state',location.state);
    //console.log('location state search field',location.state.searchField);
    if (location.state){
    if (location.state.searchField){
     q = location.state.searchField;
    // console.log('props in museum objects',props.q);
    }}
    // let q = props.q;
    //let q = 'cat';
     console.log('q inside museum objects',q);
    //  if (!q ){
    //   q = 'cat';
    //  };
    

     
    
        function previousPage(){
            if(page > 1){
                setPage(page=>page-1);
                setCurrentPage(page);
            }
        }
    
        function nextPage(){
          //  if(page<artworks.length){
              if ((page*PER_PAGE)<museumObjects.total){
                setPage(page=>page+1);
                setCurrentPage(page);
            }
        };

        const getPostData = async (departmentId,q,isHighlight) => {
          const query = [];
          if (isHighlight) query.push(`isHighlight=${isHighlight}`);
          if (departmentId) query.push(`departmentId=${departmentId}`);
          if (q) query.push(`q=${q}`);
      
          // if (geolocation) {
          //   if (geolocation.length>1){query.push(`geolocation=${geolocation}`);}
          // };
          // if (meduim) {
          //   if (medium.length>1){query.push(`medium=${medium}`);}
          // };
          // if (dateBegin){
          //   if (dateBegin.length>1){query.push(`dateBegin=${dateBegin}`);}
          // }
          // if (dateEnd){
          //   if (dateEnd.length>1){query.push(`dateEnd=${dateEnd}`);}
          // }
          const queryStringMuseum = query.length ? `?${query.join("&")}` : "";
          console.log('query string museum in side museum object',queryStringMuseum);
         // return museumApi.get(`/search${queryStringMuseum}`);
          const res = await getMusObjects(queryStringMuseum);
        
          console.log(res.data);
          

          
          setMuseumObjects(res.data);
        }
      

    useEffect(() =>{
      getPostData(1,q,false);
    },[q]);

  // useEffect(() => {
  //   fetchMusObjects(1,q,false).then((museumObjectsFromApi) => {
  //   console.log('taglist from api'+museumObjectsFromApi);
  //     setMuseumObjects(museumObjectsFromApi);
  //   });
  // }, [q]);

  
  if (!museumObjects) {
    return <p>Loading...</p>;
  };
 
  console.log('museum object total',museumObjects.total);
  console.log('museum object is', museumObjects.objectIDs);
  let totalObjectsNumber = museumObjects.total;
  console.log('total object',totalObjectsNumber);
  const allFilteredData =[];
  let total_page = totalObjectsNumber/PER_PAGE;
  console.log('total page',total_page);
 // if (totalObjectsNumber >PER_PAGE){

 if (totalObjectsNumber >= 1){
  
   const lastPostIndex = currentPage*postPerPage;
   const firstPostIndex = lastPostIndex-postPerPage;
   const currentMuseumPosts = museumObjects.objectIDs.slice(firstPostIndex, lastPostIndex);
   allFilteredData.push(currentMuseumPosts);
     
  }
  //console.log('all filtered data',allFilteredData);
  


  
    return ( <>
            
         <h2> MuseumObjects</h2>
         <AdvancedSearch />
         <h3>Total Museum Objects: {museumObjects.total}</h3>
                
      <Row className="gy-4">
                    {/* {museumObjects.objectIDs.map((objectID,index)=>( */}
                     {allFilteredData[0].map((objectID,index)=>( 
                        // {currentMuseumPosts.map((objectID,index)=>(
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

