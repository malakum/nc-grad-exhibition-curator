import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import artChicagoImage from '../src/assets/artChicago.png';

const MuseumMainPage = () =>{
    return ( <>
         <h2> Metro Museum</h2>
         <Row>
        <Col>
          <Image
            alt='Image'
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            rounded
            fluid
            width="200px" 
            height="200px"
          />
        </Col>
      </Row>
    
      <Row style={{marginTop: "20px"}}>
        <Col >
          <p>
          The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the mericas. 
          Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at
           1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by 
           area one of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in 
           Upper Manhattan,contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>
         
        </Col>
      </Row>
      <h2> The Art Institute Of Chicago</h2>
      <Row>
        <Col>
           <Image 
           src={artChicagoImage} 
           rounded
           fluid
           width="200px" 
            height="200px" />
        </Col>
      </Row>
      <Row>
        <Col>
        <p>
        Founded in 1879, the Art Institute of Chicago is one of the world&quot;s major museums, housing an extraordinary 
        collection of objects from across places, cultures, and time. We are also a place of active learning for all—dedicated 
        to investigation, innovation, education, and dialogue—continually aspiring to greater public service and civic engagement.
       
        </p>
        </Col>
      </Row>
    </>
  )
};
        



export default MuseumMainPage;