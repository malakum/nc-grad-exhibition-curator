import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Row,Col } from "react-bootstrap";

const Header = () =>{

      const [searchField, setSearchField] = useState('sunflower');
       const navigate = useNavigate();
      
        //submitting Form async fucntion
        const submitForm = async (e) => {
         e.preventDefault()
        
        const  q= searchField;
        console.log('searchfeild',searchField);
        console.log('q',q);
      
         
      }
      const handleMetro = (e) =>{
     
            console.log('searchfeild',searchField);
      
            navigate ("/objects" ,{state : { searchField : searchField}});
      
      };
      const handleArtworks = (e) =>{
      
            console.log('searchfeild',searchField);
      
            navigate ("/artworks" ,{state : { searchField : searchField}});
      
      };
      const handleHome = (e) =>{
         
            navigate ("/");
            
      };
      
    return ( <>
         
         <h1>------ Art Exhibition Curator--------</h1>
         {/* <Form className="d-flex" onSubmit={submitForm}>Search:
                  <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {setSearchField(e.target.value)}}
                  />
                   
                 
               </Form>
               <Form.Text className="text-muted">
               Search String (ie: &quot;cat&quot;, &quot;mouse&quot;, &quot;sunflower&quot;, &quot;table&quot;, &quot;chair&quot;, etc.)
            </Form.Text>
         <div>
          <Row>
            <Col>
            <Button onClick={handleMetro}> Metro Museums </Button>
            </Col>
            <Col> 
            <Button onClick={handleArtworks}> Artic Artworks </Button>
            </Col>
            <Col>
            <Button onClick={handleHome}>Home </Button>
            </Col>
          </Row>
          <p>......................</p>
            </div> */}

    </>)
}
export default Header;