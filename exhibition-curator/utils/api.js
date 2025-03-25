import axios from 'axios';

const museumApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
  });

  const articApi = axios.create({
    baseURL: "https://api.artic.edu/api/v1/artworks",
  });

  export const getMusObjects =  async(queryStringMuseum) => {
         console.log('query string museum inside api',queryStringMuseum);
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

 

//   export const getFavobjectsMetro = (fav_user) => {
//     return favApi.get('/favobjectsmetro/${fav_user}').then(res =>{
//         return res.data
//     })
//   }
  
//   export const getFavobjectsArt = (fav_user) => {
//     return favApi.get('/favobjectsart/${fav_user}').then(res =>{
//         return res.data
//     })
//   }



//     export const posFavobject = (fav_object, newFavobject) => {
//     return newsApi.post(`/favobjects/${fav_object}`, newFavobject).then(res => {
//         return res.data
//     })
// }

// export const deleteFavobject = (fav_id) => {
//   return newsApi.delete(`/favid/${fav_id}`).then(res => {
//       return res.status
//   })
// }


//   export const getComments = (article_id) => {
//     return newsApi.get(`/articles/${article_id}/comments`).then(res => {
//         return res.data.comments
//     })
// }

//   export const postComment = (article_id, newComment) => {
//     return newsApi.post(`/articles/${article_id}/comments`, newComment).then(res => {
//         return res.data.comment
//     })
// }

// export const deleteComment = (comment_id) => {
//   return newsApi.delete(`/comments/${comment_id}`).then(res => {
//       return res.status
//   })
// }

 
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
