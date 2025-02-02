 import { fetchDepartments } from "../utils/api";

 import { Link } from "react-router-dom";
 //import className from tailwindcss;

 
 

 import React, { useEffect, useState } from "react";

// import { Link } from "react-router-dom";

const MuseumDepartment = () =>{

    const [museumDepartments, setMuseumDepartments] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(() => {
    fetchDepartments()
    .then((res) => {
        console.log(res);
      
      setMuseumDepartments(res); 
     
      setIsLoading(false);
      })
      .catch((err) => {
        // If you have more specific error structure, you can type it accordingly
        setError(err.response?.data || { msg: "An error occurred" });
      });
  }, []);



    return ( <>
         <h2> Metro Museum Department</h2>
            <div 
            // style={{
            //      width: '500px',
            //      height: '300px',
            //      overflowY: 'scroll' ,// Show scrollbar if content overflows
            //      border: '1px solid black',
            //      marginTop: '20px',
            //      }}
                 >
                <ul>
                   {museumDepartments.map((department1,index) => (
                    <li key={index}>
                       {department1.departmentId}
                        {/* <p>Department Id {department1.departmentId}</p> */}
                       <p> department name {department1.displayName}</p>
                       <Link
                                         to={`/departmentId/${department1.departmentId}`}
                                          > Link for Object Listing
                                           </Link>;
                    </li>
                    ))}
                 </ul>
               </div>
             </>)
}
export default MuseumDepartment;


