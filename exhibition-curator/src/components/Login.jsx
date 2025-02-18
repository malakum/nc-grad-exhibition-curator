import { Card, Form, Alert, Button } from "react-bootstrap";
import { authenticateUser } from "../lib/authenticate";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userProvider";

const Login = (props) =>{
  const { setLoggedInUser, setIsLoggedIn } = useContext(UserContext);
  const [users, setUsers] = useState([]);

 const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [error, setError] = useState(null);

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
 const location = useLocation();


  async function handleSubmit(e) {
    e.preventDefault();

    try{
      await authenticateUser(user, password);
      setUsername(e.target.value);
            setIsValid(true);
      
     // await updateAtoms();
      
    //  router.push("/favourites");
       navigate("/favourite");
    }catch(err){
      const loggedUser = user[0];
      setLoggedInUser(loggedUser);
      setIsLoggedIn(true);
     setWarning(err.message);
    }
 
  }
 
  console.log('username',username);
  

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
          valid user names are mala,peter,smith
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

        {warning && <>
          <br />
          {/* Alert Component */}
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
        
      </Form>
    </>
  );
}

export default Login;