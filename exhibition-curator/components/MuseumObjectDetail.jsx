import React, { useEffect, useState } from "react";
import {fetchMusObjectDetail} from "../utils/api";
import { useParams } from "react-router-dom";

const MuseumObjectDetail = () =>{

    const [museumObjectDetail, setMuseumObjectDetail] = useState(null);
    const { objectID } = useParams();
   // console.log('objectId'+objectID);
    // if (objectID ===null) 
    // {objectID = 4};

        useEffect(() => {
          fetchMusObjectDetail(4).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
        setMuseumObjectDetail(museumObjectDetailFromApi);
      });
    }, []);
    
    if (!museumObjectDetail) {
      return <p>Loading...</p>;
    };
    
    return (<div style={{
      width: '500px',
      height: '200px',
      overflowY: 'scroll' ,// Show scrollbar if content overflows
      border: '1px solid black',
      marginTop: '20px',
    }}
    > Object Detail
     <p>museum Id {museumObjectDetail.objectID}</p>
     <p>museum department {museumObjectDetail.department}</p>
     <p>museum Name {museumObjectDetail.objectName}</p>
     <p>museum title {museumObjectDetail.title}</p>
     <p>museum Artist AlphaSort {museumObjectDetail.artistAlphaSort}</p>
     <p>museum Artist Nationality {museumObjectDetail.artistNationality}</p>
     <p>museum Artist Gender {museumObjectDetail.artistGender}</p>
      <a href={museumObjectDetail.artistWikidata_URL} target="_blank" rel="noopener noreferrer">
          Visit Profile
        </a>
        <p>museum Object Date {museumObjectDetail.objectDate}</p>
     <p>museum Object Begin Date {museumObjectDetail.objectBeginDate}</p>
     <p>museum Object End Date {museumObjectDetail.objectEndDate}</p>
        <p>museum medium {museumObjectDetail.medium}</p>
     <a href={museumObjectDetail.artistULAN_URL} target="_blank" rel="noopener noreferrer">
          Visit ULAN Profile
        </a>
     </div>
     
    );
  };
  
export default MuseumObjectDetail;

