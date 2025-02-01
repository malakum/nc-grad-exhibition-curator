import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.min.css';
import Header from '../components/Header';
import MuseumDepartment from '../components/MuseumDepartment';
import MuseumObjects from '../components/MuseumObjects';
import MuseumObjectDetail from '../components/MuseumObjectDetail';
import MuseumObjectsListing from '../components/MuseumObjectsListing';
import MuseumMainPage from '../components/MuseumMainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
<BrowserRouter>

       <Header />

        <Routes>
              <Route path="/" element={<MuseumMainPage />}></Route>
             <Route path="/departments" element={<MuseumDepartment />}></Route>
             <Route path="/objects" element ={<MuseumObjects />}></Route>
             <Route path="/objects/:objectID" element ={<MuseumObjectDetail />}></Route>
             <Route path="/departmentId" element ={<MuseumObjectsListing />}></Route>
             <Route path="/departmentId/:departmentId" element ={<MuseumObjectsListing />}></Route>
             <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
        </Routes>

</BrowserRouter>

{/* </div> */}

      {/* <div>
        <Header/>
        <MuseumDepartment/>
        <MuseumObjectsListing/>
        <MuseumObjects/> */}
               {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
