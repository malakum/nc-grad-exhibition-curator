import React, { useEffect, useState } from "react";
import {fetchMusObjectDetail} from "../utils/api";
import { useParams } from "react-router-dom";


const MuseumObjectDetail = () =>{

    const [museumObjectDetail, setMuseumObjectDetail] = useState(null);
    const { objectID } =useParams();   

    function onClickURL (url){ window.open(url,'_blank')};
   
    if (objectID){
        useEffect(() => {
          fetchMusObjectDetail(objectID).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
        setMuseumObjectDetail(museumObjectDetailFromApi);
      });
    }, [objectID])}
    else {useEffect(() => {
      fetchMusObjectDetail(100).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
      console.log(JSON.stringify(museumObjectDetailFromApi));
    setMuseumObjectDetail(museumObjectDetailFromApi);
  });
}, [])}
    
    if (!museumObjectDetail) {
      return <p>Loading...</p>;
    };


    
     return (<div      
    > Object Detail
     <p>museum Id {museumObjectDetail.objectID}</p>
     <div >
          <img src={museumObjectDetail.primaryImageSmall} alt ="primary image small" width="100px" height="100px"/>
        </div>
     <p>museum department:{museumObjectDetail.department}</p>
     <p>museum Name: {museumObjectDetail.objectName}</p>
     <p>museum title :{museumObjectDetail.title}</p>
     <p>museum Artist AlphaSort: {museumObjectDetail.artistAlphaSort}</p>
     <p>museum Artist Nationality: {museumObjectDetail.artistNationality}</p>
     <p>museum Artist Gender: {museumObjectDetail.artistGender}</p>
     <p>museum Object Date : {museumObjectDetail.objectDate}</p>
     <p>museum Object Begin Date: {museumObjectDetail.objectBeginDate}</p>
     <p>museum Object End Date: {museumObjectDetail.objectEndDate}</p>
     <div onClick={() => onClickURL(museumObjectDetail.objectURL) }>
        ItemDeatilClick
        </div>
      <a href={museumObjectDetail.artistWikidata_URL} target="_blank" rel="noopener noreferrer">
          Visit Profile

        </a>
        <a href={museumObjectDetail.primaryImage} target="_blank" rel="noopener noreferrer">
          primary image
        </a>
       
       
     </div>
     
    );
  };
  
export default MuseumObjectDetail;

