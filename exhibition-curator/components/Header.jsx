import { Link } from "react-router-dom";

const Header = () =>{
    return ( <>
         <h1> Header part</h1>
         <div>
         <button >Metro Museum</button>  
        {/* <button onClick={() => onClickURL1("MuseumDepartments")}>Metro Museum</button> */}
        <Link
                                         to={`/departments/`}
                                          > Link for Metro Museum Departments
                                    </Link>;
        </div>
        
         <p> --------</p>
         <div>
         <button >European Art</button>
         <Link
                                         to={`/objects`}
                                          > Link for Museum objects
                                    </Link>;
                                    </div>
    </>)
}
export default Header;