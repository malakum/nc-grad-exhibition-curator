import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store';

import { addToHistory } from '../lib/userData';
import { getMusObjects } from '../../utils/api';

const  AdvancedSearch =(props) => {

//using Atom
const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    
//useform
const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
        searchBy: '',
        geoLocation: '',
        medium: '',
        isOnView: false,
        isHighlight: false,
        departmentId :''
        // q: ''
    },
});

//middleware
//const router = useRouter();

  useEffect(() => {
    let data = {
      searchBy: "title",
      geoLocation: "",
      medium: "",
      isOnView: false,
      isHighlight: false,
      departmentId :1
      // q: ""
    }

    // set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  })

  //async function 
  async function submitForm(data) {
    let queryString = "";
   // queryString +=`${data.searchBy}=true`
    if(data.geoLocation){
      queryString += `&geoLocation=${data.geoLocation}`
    }
   
    if(data.medium){
      queryString += `&medium=${data.medium}`
    }
   
    if(data.departmentId){
      console.log(data.departmentId);

      queryString += `&departmentId=${+data.departmentId}`
    }

    console.log('query string in side advance search',queryString);
    console.log(props.getData);
    props.getData(queryString);
   
     
  //  router.push(`/artwork?${queryString}`)
  // navigate (`/search`);
   // setSearchHistory(await addToHistory(queryString))
  }


  return (
    <>
      <p>Advance serach page</p>
      <Form onSubmit={handleSubmit(submitForm)}>
       
        <Row>
            <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Department Id</Form.Label>
              <Form.Control type="number" placeholder="" name="departmentId" {...register("departmentId")}/>
              <Form.Text className="text-muted">
              Department Number  (ie 1,2,3,4,5, upto 13 )
            </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")}/>
              <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.)
            </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
              <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.)
            </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
  
};
export default AdvancedSearch;