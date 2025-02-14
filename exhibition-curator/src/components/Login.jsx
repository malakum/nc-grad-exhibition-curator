import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { authenticateUser } from "../lib/authenticate";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';

import { favouritesAtom } from '../../store'
import { searchHistoryAtom } from '../../store';

import { getFavourites, getHistory } from '../lib/userData';

// export default function Login(props) {
const Login = (props) =>{

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
 // const router = useRouter();
 const navigate =useNavigate();
 const location = useLocation();

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function handleSubmit(e) {
    e.preventDefault();

    try{
      await authenticateUser(user, password);
      //invoking before it redirect to favourites
      await updateAtoms();
      //redirect to "/favourites" 
      // the following need to be changed and checked
    //  router.push("/favourites");
       navigate("/favourites");
    }catch(err){
     setWarning(err.message);
    }

  }

  //async await function updateAtoms
  async function updateAtoms(){
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
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