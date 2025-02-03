import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () =>{
      const [searchItem,setSearchItem] = useState('cat');
    return ( <>
         <h1> Art Exhibition Curator</h1>
         {/* <div>
         <p>Search Item: 
         <input type="text" id="searchText" placeholder="Enter searchitem..." /> </p>
         </div> */}
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