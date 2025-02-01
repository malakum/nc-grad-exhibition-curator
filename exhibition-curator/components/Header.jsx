import { Link } from "react-router-dom";

const Header = () =>{
    return ( <>
         <h1> Header : Exhibition Curator</h1>
         <div>
         <button >Metro Museum Departments
        {/* <button onClick={() => onClickURL1("MuseumDepartments")}>Metro Museum</button> */}
        <Link
                                         to={`/departments/`}
                                          > Link for Metro Museum Departments
                                    </Link>;
                                    </button>  
        </div>
        <div>
         <button >Metro Museum Objects
         <Link
                                         to={`/objects`}
                                          > Link for Museum objects
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