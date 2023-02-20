import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";


function PetProfilePage() {
  
  let [ res , setRes]=useState([]);
  let api = useAxios();

  
  

  let handleSubmit = e => {
    e.preventDefault();
    
    let data = { 
      pet_name: e.target.pet_name.value,
      pet_type: e.target.pet_type.value
    };

    updateResponse(data);

  
  };


  let handleSubmitCreate = e => {
    e.preventDefault();
    
    let data = { 
      pet_name: e.target.pet_name.value,
      pet_type: e.target.pet_type.value
    };

    createResponse(data);

  
  };

  let createResponse = async (data) => {
    try {
      let response = await api.post('/petprofile/', JSON.stringify(data));
      console.log(response.data.response);
      // setRes(response.data.response);
    } catch {
      setRes("Something went wrong");
    }

  }  



  let updateResponse = async (data) => {
    try {
      let response = await api.put('/petprofile/', JSON.stringify(data));
      console.log(response.data.response);
      setRes(response.data.response);
    } catch {
      setRes("Something went wrong");
    }

  }  

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await api.get("/petprofile/");
        console.log("Line 68");
        console.log(response.data.response);
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <h1>Pet Profile Page</h1>
      <br></br>
      <ul>
        <h2>Pet Info</h2>
        {[res].map((r, id) => (
          <h6 key={id}> Pet Name: {r.pet_name}<br></br>Pet Type: {r.pet_type} </h6>
        ))}

      </ul>

      <section>
        <form onSubmit={handleSubmit}>
          <h2><br></br>Update Pet Info </h2>
          {/* <hr /> */}
          <label htmlFor="pet_name">Pet Name</label>
          <input type="text" id="pet_name" placeholder="Enter Pet Name" />
          <br></br>
          <label htmlFor="pet_type">Pet Type</label>
          <input type="text" id="pet_type" placeholder="Enter Pet Type" />
          {/* <Link to="/" /> */}
          <br></br>
          <button type="submit">Update Pet Info</button>
          {/* <Link/> */}
        </form>
    </section>
  
    <section>
        <form onSubmit={handleSubmitCreate}>
          <h2><br></br>Add a New Pet </h2>
          <hr />
          <label htmlFor="pet_name">Pet Name</label>
          <input type="text" id="pet_name" placeholder="Enter Pet Name" />
          <br></br>
          <label htmlFor="pet_type">Pet Type</label>
          <input type="text" id="pet_type" placeholder="Enter Pet Type" />
          {/* <Link to="/" /> */}
          <br></br>
          <button type="submit">Add New Pet</button>
          {/* <Link/> */}
        </form>
    </section>
    
    </div>
  );
}

export default PetProfilePage;