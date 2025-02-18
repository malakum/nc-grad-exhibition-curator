import axios from 'axios';

const museumApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
  });

  const articApi = axios.create({
    baseURL: "https://api.artic.edu/api/v1/artworks",
  });

  export const getMusObjects =  async(queryStringMuseum) => {
         console.log(queryStringMuseum);
       return museumApi.get(`/search${queryStringMuseum}`);
    
     
    };

  export const getMusObjectDetail = async (objectIDs) => {
       console.log('objectid '+objectIDs);
          return museumApi.get(`/objects/${objectIDs}`).then(res => {
            return res.data;})
  };

  

  export const getArtworkDetail = async (artwork_id) => {
       console.log('artworkid1'+artwork_id);
          return articApi.get(`/${artwork_id}`).then(res => {
            return res.data.data;})
  }



 
async function fetchArticArtworks(q,page,limit,per_page) {
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
fetchArticArtworks('cat',1,2,2);

  export { fetchArticArtworks };
