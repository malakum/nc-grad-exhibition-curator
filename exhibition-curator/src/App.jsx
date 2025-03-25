import { useState , useEffect } from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap.min.css';
import Header from './components/Header';
import MuseumObjects from './components/MuseumObjects';
import MuseumObjectDetail from './components/MuseumObjectDetail';
import MuseumMainPage from './components/MuseumMainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticArtworks from './components/ArticArtworks';
import ArticArtworkDetail from './components/ArticArtworkDetail';
import { Container } from 'react-bootstrap';
import Login  from './components/Login';
import MainNav from './components/MainNav';
import AdvancedSearch from './components/AdvancedSearch';
import FavouritMuseumData from './components/FavouriteMuseumData';
import FavouriteData from './components/FavouriteData';
import FavouritArtWorkData from './components/FavouriteArtWorkData';
import Auth from './components/Auth';
import Wrapper from './components/Wrapper';
import { UserProvider } from './contexts/User';
import ThemeToggle from './components/ThemeToggle';


// const { theme, setTheme } = useTheme();


function App() {
 // const { theme, setTheme } = useTheme();
  const [theme,setTheme] = useState('light');
const body = document.body;

useEffect (() => {
  switch (theme) {
     case "light":
          body.classList.remove("bg-dark");
          body.classList.remove("text-light");
          body.classList.add("bg-light");
          body.classList.add("text-dark");
          break;
     case  "dark":
          body.classList.remove("bg-light");
          body.classList.remove("text-dark");
          body.classList.add("bg-dark");
          body.classList.add("text-light");
          break;
      default :
          body.classList.remove("bg-dark");
          body.classList.remove("text-light");
          body.classList.add("bg-light");
          body.classList.add("text-dark");

        }


}, [])

  
  return (
    <>
      <div>
<BrowserRouter>

<UserProvider>
        <MainNav />
         <Container>
         <ThemeToggle />
         <Header />
        <Routes>
              <Route path="/" element={<MuseumMainPage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path ="/auth" element ={<Auth/>}></Route>
              <Route path="/favourite" element={<Wrapper><FavouriteData /></Wrapper>}></Route>
              <Route path="/favourite/artworks" element={<Wrapper><FavouritArtWorkData /></Wrapper>}></Route>
              <Route path="/favourite/metro" element={<Wrapper><FavouritMuseumData /></Wrapper>}></Route>
              <Route path="/search" element ={<AdvancedSearch />}></Route>
              <Route path="/objects" element ={<Wrapper><MuseumObjects /></Wrapper>}></Route>
             <Route path="/objects/:objectID" element ={<Wrapper><MuseumObjectDetail /></Wrapper>}></Route>
              <Route path ="/artworks" element ={<Wrapper><ArticArtworks/></Wrapper>}></Route>
             <Route path ="/artworks/:id" element ={<Wrapper><ArticArtworkDetail/></Wrapper>}></Route>
            
             <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
        </Routes>
      
        </Container>
          </UserProvider>

</BrowserRouter>
</div>


    </>
  )
}

export default App
