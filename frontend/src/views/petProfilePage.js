import { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import axios from "axios";
import { json } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function PetProfilePage() {
  // const [ res, setRes] = useState();
  let [ res , setRes]=useState([]);
  let {authTokens} = useContext(AuthContext)
  const api = useAxios();

  // useEffect(() => {
    
    
  //     getProfile()
  // }, [])
  
  let getProfile = async() => {
    // let response = await fetch('http://127.0.0.1:8000/api/petprofile/', {
    //   method:'GET',
    //   headers:{
    //     'Content-Type':'apph2cation/json',
    //     'Authorization':'Bearer ' + String(authTokens.access)

    //   }
    // })
      // try {
      //   const response = await api.get("/petprofile/");
      //   console.log(response.data.response);
      //   setRes(response.data.response);
      //   } catch {
      //     setRes("Something went wrong");
      //   }

    // const response = await api.get("http://127.0.0.1:8000/api/petprofile/");
    // let data = await response.json()
    // setRes(data)
    // console.log(data);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/petprofile/");
        console.log(response.data.response);
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("/petprofile/")
  //     .then((response) => response.data)
  //     .then((json) => {
  //       console.log('json', json);
  //       setRes(json.data.movies);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("/petprofile/");
  //       let data = response.data.response;
        
  //       setRes(data);
  //       console.log(data);
        
  //     } catch {
  //       setRes("Something went wrong");
  //     }
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <h1>Pet Profile Page</h1>
      {/* <p/>{res.map((pet, index) => (
        <h5>Pet Name: {pet.pet_name}<br></br>Pet Type: {pet.pet_type}</h5>
    ))}<p/> */}
      <ul>
        {[res].map((r, id) => (
          <h6 key={id}> Pet Name: {r.pet_name}<br></br>Pet Type: {r.pet_type} </h6>
        ))}

      </ul>
    
    </div>
  );
}

export default PetProfilePage;