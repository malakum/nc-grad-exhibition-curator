import axios from 'axios';

const museumApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
  });

 
//console.log('api data');
console.log(museumApi);
// export const   fetchDepartments = () =>{
//     return museumApi
//     .get("/departments")
//     .then( res=> {
//         console.log(res.data.departments);
//         return res.data.departments });
// };

async function fetchDepartments(){
  
    const url = `https://collectionapi.metmuseum.org/public/collection/v1`;
      try {
      const response1 = await axios.get(url+`/departments`); // Make GET request
     //console.log(response1.data);
      
      const  getMuseumDepartment = response1.data.departments;
      // museumObject = response1.data;
      
      //  console.log('package detail data');
      //  console.log( getMuseumDepartment);
      
       return getMuseumDepartment;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchDepartments();

  async function fetchMusObjects(departmentId , q, isHighlight){
    
    const url = `https://collectionapi.metmuseum.org/public/collection/v1`;
      try {
     
         const query = [];
        if (isHighlight) query.push(`isHighlight=${isHighlight}`);
        if (departmentId) query.push(`departmentId=${departmentId}`);
        if (q) query.push(`q=${q}`);
        const queryString = query.length ? `?${query.join("&")}` : "";
      
            const response1 = await axios.get(url+`/search${queryString}`); // Make GET request
     //console.log(response1.data);
      
       const getMusObjects = response1.data;
      
        //console.log( getMusObjects);
      
       return getMusObjects;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchMusObjects(1,'sunflower',false);
  
  console.log('departments3');

  async function fetchMusObjectDetail(objectIDs){
  
    const url = `https://collectionapi.metmuseum.org/public/collection/v1`;
      try {
      const response1 = await axios.get(url+`/objects/${objectIDs}`); // Make GET request
     
      
       const getMuseumObjectDetail = response1.data;
       //console.log(getMuseumObjectDetail);
  
       return getMuseumObjectDetail;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchMusObjectDetail(2);

  //https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower

  //https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=french
  //https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Quilts|Silk|Bedcovers&q=quilt
  //https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir
  //https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=France&q=flowers
 //https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&q=African 

 //https://collectionapi.metmuseum.org/mothra/collectionlisting/search?department=1&offset=20
 //artist ,material,geolocation,era,department
 //facets-id-artist ,label-Artist/culture,serchable -true values :[{object}]
   //      id-material , label -Object Type /Material , searchable -true, values :[{object}]
   //       id-geolocation, label-Geographic Location ,searchable -true values : [{object}]
   //       id-era , label- Date /Era ,searchable :false , value :[{object}]
   //       id -department , label -Department , searchable -false, values :[{object}]

 async function fetchMusObjectsListing(departmentId){
    
  const url = `https://collectionapi.metmuseum.org/mothra/collectionlisting`;
    try {
   
       const query = [];
       if (departmentId) query.push(`department=${departmentId}`);
      // if (isHighlight) query.push(`isHighlight=${isHighlight}`);
      // if (q) query.push(`q=${q}`);
       const queryString = query.length ? `?${query.join("&")}` : "";
    
          const response1 = await axios.get(url+`/search${queryString}&offset=20`); // Make GET request
  // console.log(response1.data);
    
     const getMusObjectsListing = response1.data.results;
     const getSearchCriteria = response1.data.facets;
       console.log('museum object listing');
      console.log( getMusObjectsListing);
      console.log('all search criteria');
     // console.log(getSearchCriteria);
    
     return getMusObjectsListing;
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchMusObjectsListing(1);



  export {fetchDepartments, fetchMusObjects, fetchMusObjectDetail, fetchMusObjectsListing};
