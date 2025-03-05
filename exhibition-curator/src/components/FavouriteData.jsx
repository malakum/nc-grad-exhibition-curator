import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Row,Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const FavouriteData = () =>{
    
    const navigate = useNavigate();
    const location = useLocation();

    const [searchField, setSearchField] = useState('sunflower');

    let loggedInUser = '';
    if (location.state){
     if (location.state.user){
         loggedInUser = location.state.user;
      }
      if (location.state.loggedInUser1){
        loggedInUser = location.state.loggedInUser1;
     }

    };
    
   
     //submitting Form async fucntion
     const submitForm = async (e) => {
      e.preventDefault()
     
     const  q= searchField;
     console.log('searchfeild',searchField);
     console.log('q',q);
   
      
   }
   const handleMetro = (e) =>{
  
         console.log('searchfeild',searchField);
   
         navigate ("/objects" ,{state : { searchField : searchField , loggedInUser : loggedInUser}});
   
   };
   const handleArtworks = (e) =>{
   
         console.log('searchfeild',searchField);
   
         navigate ("/artworks" ,{state : { searchField : searchField, loggedInUser : loggedInUser} });
   
   };
   const handleHome = (e) =>{
      
         navigate ("/");
         
   };

  const handleMetroFav = (e) =>{
     
         navigate ("/favourite/metro" ,{state : { loggedInUser : loggedInUser}});
      
      };

  const handleArtworksFav = (e) =>{
      
                     navigate ("/favourite/artworks" ,{state : { loggedInUser : loggedInUser}});
      
      };
       
    return ( <>
     <h2>Search Page</h2>
     <h3>Logged in User : {loggedInUser}</h3>
     <Form className="d-flex" onSubmit={submitForm}>Search:
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {setSearchField(e.target.value)}}
                  />
                   
                  {/* <Button type="submit" variant="success">Search</Button>
                   */}
               </Form>
               <Form.Text className="text-muted">
               Search String (ie: &quot;cat&quot;, &quot;mouse&quot;, &quot;sunflower&quot;, &quot;table&quot;, &quot;chair&quot;, etc.)
            </Form.Text>
         <div>
          <Row>
            <Row></Row>
            <Col>
            <Button onClick={handleMetro}> Metro Museums </Button>
            </Col>
            <Col> 
            <Button onClick={handleArtworks}> Artic Artworks </Button>
            </Col>
            <Col>
            <Button onClick={handleHome}>Home Page</Button>
            </Col>
          </Row>
          
            </div>
         <div>
            <p> User Favourite Data </p>
             <Row>
            <Col>
            <Button onClick={handleMetroFav}> Favourite-Metro Museums </Button>
            </Col>
           
            <Col> 
            <Button onClick={handleArtworksFav}> Favourite-Artic Artworks </Button>
            </Col>
            {/* <Col>
            <Button onClick={handleHome}>Home </Button>
            </Col> */}
          </Row>
          <p>......................</p>
            </div>

    </>)
}
export default FavouriteData;

