import { Link } from "react-router-dom";

const Header = () =>{
    return ( <>
         <h1> Art Exhibition Curator</h1>
         <div>
         <button >Metro Museum Departments
         <Link
                                         to={`/departments/`}
                                          > Link for Metro Museum Departments
                                    </Link>;
                                    </button>  
        </div>
        <div>
         <button >Metro Museums Objects
         <Link
                                         to={`/objects`}
                                          > Link for Museum objects
                                    </Link>; </button>
          </div>
          <div>          
            <button > Artic Artworks
         <Link
                                         to={`/artworks`}
                                          > Link for Artic Artwork
                                    </Link>; </button>
                                                               </div>

         <div>
         <button >Home
         <Link
                                         to={`/`}
                                          > Link for Home
                                    </Link>; </button>
                                                               </div>
    </>)
}
export default Header;