import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store';

import { addToHistory } from '../lib/userData';
import { getMusObjects } from '../../utils/api';

const  AdvancedSearch =() => {

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
      isHighlight: false
      // q: ""
    }

    // set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  })

  //async function 
  async function submitForm(data) {
    let queryString = "?";
   // queryString +=`${data.searchBy}=true`
    if(data.geoLocation){
      queryString += `geoLocation=${data.geoLocation}`
    }
    if(data.medium){
      queryString += `&medium=${data.medium}`
    }
   // queryString += `&q=${data.q}&isHighlight=${data.isHighlight}`;
   queryString +=`&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q='cat'`
    console.log('query string in side advance search',queryString);
    //  const res = await getMusObjects(queryString);
            
    //  console.log('advance search get meuseum objects',res.data);
     
  //  router.push(`/artwork?${queryString}`)
  // navigate (`/search`);
   // setSearchHistory(await addToHistory(queryString))
  }


  return (
    <>
      <p>Advance serach page</p>
      <Form onSubmit={handleSubmit(submitForm)}>
        {/* <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control 
              className={errors.q?.type === "required" && "is-invalid"}
              type="text" 
              placeholder="" name="q" 
              {...register("q", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row> */}
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select name="searchBy" className="mb-3"  {...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")}/>
              <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
            </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
              <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
            </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
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