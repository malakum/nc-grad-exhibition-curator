import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { registerUser } from "../lib/authenticate";
import { useNavigate } from "react-router-dom";
//import { useRouter } from 'next/router';

const   Register = (props) => {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  //const router = useRouter();
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    try{
      //invoking registerUser
      await registerUser(user, password, password2);
      //redirecting to login
      //the following need to be checked and changed
      //router.push("/login");
      navigate("/login");
    }catch(err){
     setWarning(err.message);
    }

  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
          Register for an account:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group  >
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={password2} id="password" name="password" onChange={e => setPassword2(e.target.value)} />
        </Form.Group  >

        {warning && <>
          <br />
          {/* Alert Component */}
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
  );
};

export default Register;