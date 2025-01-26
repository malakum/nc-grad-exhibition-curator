 import { fetchDepartments } from "../utils/api";
 //import className from tailwindcss;

 
 

 import React, { useEffect, useState } from "react";
//import { getTopics } from "../api";
// import { Link } from "react-router-dom";

const MuseumDepartment = () =>{

    const [museumDepartments, setMuseumDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState("");

     useEffect(() => {
    fetchDepartments()
    .then((res) => {
        console.log(res);
      // Corrected: Now we directly set res.departments which is the array of Department
      setMuseumDepartments(res); // Correctly passing the array of departments
     
      setIsLoading(false);
      })
      .catch((err) => {
        // If you have more specific error structure, you can type it accordingly
        setError(err.response?.data || { msg: "An error occurred" });
      });
  }, []);



    return ( <>
         <h1> Museumdepartment123</h1>
           <div>
         <ul>
   {museumDepartments.map((department1,index) => (
            <li key={index}>
               {department1.departmentId}
             <p>Department Id {department1.departmentId}</p>
             <p> department name {department1.displayName}</p>
             </li>
          ))}
        </ul>
        </div>
    </>)
}
export default MuseumDepartment;


//const MuseumDepartment = () => {

//    const [departments, setDepartments] = useState([]);
//     const [museumDepartments, setMuseumDepartments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDepartments()
//     .then((res) => {
//       // Corrected: Now we directly set res.departments which is the array of Department
//       setMuseumDepartments(res); // Correctly passing the array of departments
     
//       setIsLoading(false);
//       })
//       .catch((err) => {
//         // If you have more specific error structure, you can type it accordingly
//         setError(err.response?.data || { msg: "An error occurred" });
//       });
//   }, []);

    // if (error) {
    //     return <p>Error Message: {error.msg}</p>;
    //   }
    
    //   if (isLoading) {
    //     return <p>Loading...</p>;
    //   }


    // return ( <>
    //      <h1> Museum Departments</h1>
         {/* <div>
         <ul>
   {museumDepartments.map((department1,index) => (
            <li key={index}>
               {department1.departmentId}
             <p>Department Id {department1.departmentId}</p>
             <p> department name {department1.displayName}</p>
             </li>
          ))}
        </ul>
        </div> */}
         {/* <div >
            <Link   to={`/articles`}> All</Link>
            { departments.map((department) => {
                    return <Link
                        className="topics_maindiv_link"
                        key={topic.slug}
                        to={`/articles?topic=${topic.slug}`}
                    >
                        
                        {department.departmentIds}
                    // </Link>
                })
            }
        </div > */}
    {/* </>)
}
export default MuseumDepartment; */}