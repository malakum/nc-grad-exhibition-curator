import axios from 'axios';

const museumApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
  });

 
console.log('api data');
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
        console.log( getMuseumDepartment);
      
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
      //  const url = `/search? ${queryString}`;
            const response1 = await axios.get(url+`/search${queryString}`); // Make GET request
     //console.log(response1.data);
      
       const getMusObjects = response1.data;
      
        console.log( getMusObjects);
      
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
       console.log(getMuseumObjectDetail);
  
       return getMuseumObjectDetail;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchMusObjectDetail(2);
  
  

  export {fetchDepartments, fetchMusObjects, fetchMusObjectDetail};
