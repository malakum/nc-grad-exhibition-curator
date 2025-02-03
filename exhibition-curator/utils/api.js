import axios from 'axios';

// const museumApi = axios.create({
//     baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
//   });

//   const articApi = axios.create({
//     baseURL: "https://api.artic.edu/api/v1/artworks"
//   });


 async function fetchMusObjects(departmentId , q, isHighlight,geolocation){
    
    const url = `https://collectionapi.metmuseum.org/public/collection/v1`;
      try {
     
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
        const queryString = query.length ? `?${query.join("&")}` : "";
      
      
            const response1 = await axios.get(url+`/search${queryString}`); // Make GET request
    
      
       const getMusObjects = response1.data;
            
       return getMusObjects;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchMusObjects(1,'sunflower',true,'a');
  
  

  async function fetchMusObjectDetail(objectIDs){
  
    const url = `https://collectionapi.metmuseum.org/public/collection/v1`;
      try {
      const response1 = await axios.get(url+`/objects/${objectIDs}`); // Make GET request
     
      
       const getMuseumObjectDetail = response1.data;
        return getMuseumObjectDetail;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchMusObjectDetail(2);

 
async function fetchArticArtworks(q,page,limit) {
const url1 = `https://api.artic.edu/api/v1/artworks`;
try {
      const query = [];
          if (q) query.push(`q=${q}`);
      if (page) query.push(`page=${page}`);
      if (limit) query.push(`limit=${limit}`);
 
  
        const queryString = query.length ? `?${query.join("&")}` : "";
         console.log(queryString);

         const response2 = await axios.get(url1+`/search${queryString}`); // Make GET request
         const getArticArtworks = response2.data.data;
         const getArticPagination = response2.data.pagination;
     
         return getArticArtworks;

} catch (error) {
       console.error('Error fetching data from Artic Artworks:', error);
}
}
fetchArticArtworks('cat',1,2);

async function fetchArticArtworkById(artwork_id) {
  const url1 = `https://api.artic.edu/api/v1/artworks`;
  try {
        
           const response3 = await axios.get(url1+`/${artwork_id}`); // Make GET request
         
          const getArticArtworkById = response3.data.data;
        
           return getArticArtworkById;
  
  } catch (error) {
         console.error('Error fetching data from Artic Artwork by Artwork id:', error);
  }
  }
  fetchArticArtworkById(21023);

  export { fetchMusObjects, fetchMusObjectDetail,fetchArticArtworks,fetchArticArtworkById};
