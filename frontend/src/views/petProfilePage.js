import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import axios from "axios";
import { json } from "react-router-dom";

function PetProfilePage() {
  // const [ res, setRes] = useState();
  const [ res , setRes]=useState([]);
  const api = useAxios();


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
      <p/>{res.map((pet, index) => (
        <h5>Pet Name: {pet.pet_name}Pet<br></br> Type: {pet.pet_type}</h5>
    ))}<p/>
    
    </div>
  );
}

export default PetProfilePage;