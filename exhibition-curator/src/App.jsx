import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.min.css';
import Header from './components/Header';
import MuseumObjects from './components/MuseumObjects';
import MuseumObjectCard from './components/MuseumObjectCard';
import MuseumObjectDetail from './components/MuseumObjectDetail';
import MuseumMainPage from './components/MuseumMainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticArtworks from './components/ArticArtworks';
import ArticArtworkCard  from './components/ArticArtworkCard';
import ArticArtworkDetail from './components/ArticArtworkDetail';
//import Navbar from './components/MainNav';
import { Container } from 'react-bootstrap';
import Login  from './components/Login';
import Register from './components/Register';
import MainNav from './components/MainNav';
import AdvancedSearch from './components/AdvancedSearch';
import { UserProvider } from './contexts/userProvider';
import FavouritMuseumData from './components/FavouriteMuseumData';

function App() {
  
  return (
    <>
      <div>
<BrowserRouter>

     
        <MainNav />
         <Container>
          <UserProvider>
         <Header />
        <Routes>
              <Route path="/" element={<MuseumMainPage />}></Route>
                          <Route path="/login" element={<Login />}></Route>
              <Route path="/favourite" element={<FavouritMuseumData />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/search" element ={<AdvancedSearch />}></Route>
              <Route path="/objects" element ={<MuseumObjects />}></Route>
             <Route path="/objects/:objectID" element ={<MuseumObjectDetail />}></Route>
              <Route path ="/artworks" element ={<ArticArtworks/>}></Route>
             <Route path ="/artworks/:id" element ={<ArticArtworkDetail/>}></Route>
             <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
        </Routes>
        </UserProvider>
        </Container>

</BrowserRouter>
</div>


    </>
  )
}

export default App
