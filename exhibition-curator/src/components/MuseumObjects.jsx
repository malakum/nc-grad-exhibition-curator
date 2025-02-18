import React, { useEffect, useState } from "react";
import MuseumObjectCard from "./MuseumObjectCard";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";
 import { useLocation } from "react-router-dom";
 import { getMusObjects } from "../../utils/api";
import AdvancedSearch from "./AdvancedSearch";

const MuseumObjects = () =>{

    const [museumObjects, setMuseumObjects] = useState(null);
    const PER_PAGE = 8;
    const [page, setPage] = useState(1);
    const [postPerPage,setPostPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [departmentId,setDepartmentId] = useState();
    const [isHighlight,setIsHighlight] = useState(false);
    const location = useLocation();
    let q = 'sunflower';
    let data1 ='';
    let buttonQuery ='';
    const allFilteredData =[];
   
    if (location.state){
       if (location.state.searchField){
           q = location.state.searchField;
        }
      }
  
        function previousPage(){
            if(page > 1){
                setPage(page=>page-1);
                setCurrentPage(page);
            }
        }
    
        function nextPage(){
              if ((page*PER_PAGE)<museumObjects.total){
                setPage(page=>page+1);
                setCurrentPage(page);
            }
        };
    
    const getData = async(data1)=>{
          console.log('querystring inside musum object in side advanced search',data1);
          
          buttonQuery += `?q=${q}`;
          buttonQuery +=data1;
          console.log('button query  inside get data',buttonQuery);
          const res1 = await getMusObjects(buttonQuery);
        
          console.log(res1.data);
          setMuseumObjects(res1.data);
          
         };
      

        const getPostData = async (q,departmentId,isHighlight) => {
          const query = [];
         // if (departmentId) query.push(`departmentId=${departmentId}`);
         // if (isHighlight) query.push(`isHighlight=${isHighlight}`);
          if (q) query.push(`q=${q}`);
        
          const queryStringMuseum = query.length ? `?${query.join("&")}` : "";
          console.log('query string museum in side museum object',queryStringMuseum);

          const res = await getMusObjects(queryStringMuseum);
          console.log(res.data);

          setMuseumObjects(res.data);
        }
      

    useEffect(() =>{
      getPostData(q,departmentId,isHighlight);
    },[q,departmentId,isHighlight]);

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
 
  let total_page = totalObjectsNumber/PER_PAGE;
  console.log('total page',total_page);
 
 if (totalObjectsNumber >= 1){
  
   const lastPostIndex = currentPage*postPerPage;
   const firstPostIndex = lastPostIndex-postPerPage;
   const currentMuseumPosts = museumObjects.objectIDs.slice(firstPostIndex, lastPostIndex);
   allFilteredData.push(currentMuseumPosts);
  }

  if (museumObjects.total===0){
    console.log('no data');
  }

  if (museumObjects ){
    if (museumObjects.total==0){
             return (
        <>
            <Row className="gy-4">
        
                        <h4>Nothing Here</h4><br/>
                        Try searching for something else
             </Row>
        </>);
    }
    
    else{
   
  
    return ( <>
            
         <h2> MuseumObjects</h2>
         
         <AdvancedSearch getData={getData}/>
         <h3>Total Museum Objects:  {museumObjects.total}</h3>
                         
      <Row className="gy-4">
                     {/* {museumObjects.objectIDs.map((objectID,index)=>(  */}
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

}
}

export default MuseumObjects;

