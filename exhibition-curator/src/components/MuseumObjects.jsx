import React, { useEffect, useState } from "react";
import {fetchMusObjects} from "../../utils/api";
//import  Link  from 'react-router-dom' ;
import MuseumObjectCard from "./MuseumObjectCard";
import  Row  from "react-bootstrap/Row";
 import Pagination from 'react-bootstrap/Pagination';
 import  Col  from "react-bootstrap/Col";
 import { useLocation } from "react-router-dom";
 import { getMusObjects } from "../../utils/api";
 
 




const MuseumObjects = (props) =>{

    const [museumObjects, setMuseumObjects] = useState(null);
    const [museumObjectList,setMuseumObjectList] = useState([]);
   
     const PER_PAGE = 10;
      const [page, setPage] = useState(1);
     
    // let  {q} = props.q;
    const location = useLocation();
    let q = '';
    if (location.state.q){
     q = location.state.q;
     console.log('props in museum objects',props.q);
    }
    // let q = props.q;
    //let q = 'cat';
     console.log('q inside museum objects',q);
     if (!q ){
      q = 'cat';
     };
    

     
    
        function previousPage(){
            if(page > 1){
                setPage(page=>page-1);
            }
        }
    
        function nextPage(){
          //  if(page<artworks.length){
              if ((page*PER_PAGE)<museumObjects.total){
                setPage(page=>page+1);
            }
        };

        const getPostData = async (departmentId,q,isHighlight,geolocation) => {
          const query = [];
          if (isHighlight) query.push(`isHighlight=${isHighlight}`);
          if (departmentId) query.push(`departmentId=${departmentId}`);
          if (q) query.push(`q=${q}`);
      
          if (geolocation) {
            if (geolocation.length>1){query.push(`geolocation=${geolocation}`);}
          };
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
         // return museumApi.get(`/search${queryStringMuseum}`);
          const res = await getMusObjects(queryStringMuseum);
        
          console.log(res.data);
          

          
          setMuseumObjects(res.data);
        }
      

    useEffect(() =>{
      getPostData(1,q,false,'a');
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
    let count1 = totalObjectsNumber;
    let firstPageData = museumObjects.objectIDs.slice(0,PER_PAGE);
    allFilteredData.push(firstPageData);
    count1 = count1-1;
     let secondPageData = museumObjects.objectIDs.slice(PER_PAGE,(PER_PAGE*2));
   allFilteredData.push(secondPageData);
   count1 = count1 -1;
   let thirdPageData = museumObjects.objectIDs.slice((PER_PAGE*2),(PER_PAGE*3));
   allFilteredData.push(thirdPageData);
   count1 = count1-1;
   let fourthPageData = museumObjects.objectIDs.slice((PER_PAGE*3),(PER_PAGE*4));
   allFilteredData.push(fourthPageData);
   count1 = count1 -1;
   console.log('count1',count1);
  
  }
  console.log('all filtered data',allFilteredData);
  


  
    return ( <>
            
         <h2> MuseumObjects</h2>
         <h3>Total Museum Objects: {museumObjects.total}</h3>
                
      <Row className="gy-4">
                    {/* {museumObjects.objectIDs.map((objectID,index)=>( */}
                    {allFilteredData[page-1].map((objectID,index)=>(
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

