import React, { useEffect, useState } from "react";
import {fetchMusObjectDetail} from "../utils/api";
import { useParams } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";

const MuseumObjectCard = ({objectID}) =>{

    const [museumObjectCard, setMuseumObjectCard] = useState(null);

    function onClickURL (url){ window.open(url,'_blank')};
   
    if (objectID){
        useEffect(() => {
          fetchMusObjectDetail(objectID).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
        setMuseumObjectCard(museumObjectDetailFromApi);
      });
    }, [objectID])}
    else {useEffect(() => {
      fetchMusObjectDetail(100).then((museumObjectDetailFromApi) => {
      console.log('Museum object Detail from api'+museumObjectDetailFromApi);
      console.log(JSON.stringify(museumObjectDetailFromApi));
    setMuseumObjectCard(museumObjectDetailFromApi);
  });
}, [])}
    
    if (!museumObjectCard) {
      return <p>Loading...</p>;
    };


    
     return (<div      
    > Object Card
    
     <div >
          <img src={museumObjectCard.primaryImageSmall} alt ="primary image small" width="100px" height="100px"/>
        </div>
          <Link
                                              to={`/objects/${objectID}`}
                                               > Link for object detail
                                                </Link>;
         <p>museum Id {museumObjectCard.objectID}</p>
         <p>museum department:{museumObjectCard.department}</p>
         <p>museum Name: {museumObjectCard.objectName}</p>
         <p>museum title :{museumObjectCard.title}</p>
      
     </div>
     
    );
  };
  
export default MuseumObjectCard;

