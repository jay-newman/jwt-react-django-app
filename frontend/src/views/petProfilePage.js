import { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import UserInfo from "../components/UserInfo";



function PetProfilePage() {
  
  let [ profileList, setProfilelist] = useState([]);
  let api = useAxios();
  const { user } = useContext(AuthContext);

  
  

  let handleSubmit = e => {
    e.preventDefault();
    
    let data = { 
      pet_name: e.target.pet_name.value,
      pet_type: e.target.pet_type.value,
      pet_oldName: e.target.pet_id.value

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
      // console.log(response.data.response);
      setProfilelist(response.data.response);
      console.log(profileList);
    } catch {
      setProfilelist("Something went wrong");
    }

  }  



  let updateResponse = async (data) => {
    try {
      let response = await api.put('/petprofile/', JSON.stringify(data));
      console.log(response.data.response);
      let newData = JSON.parse(response.data.response);
      // setProfilelist(JSON.stringify(newData));
      setProfilelist(newData);
    } catch {
      setProfilelist("Something went wrong");
    }

  }  

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await api.get("/petprofile/");
        // var finalData = str.replace(/\\/g, "");
        console.log(response.data.response);
        let newData = JSON.parse(response.data.response);
        // setProfilelist(JSON.stringify(newData));
        setProfilelist(newData);

        console.log(newData);
      } catch {
        setProfilelist("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getPetList (petlist) {
    const profileObj = JSON.parse(petlist)
    return profileObj
  }

  return (
    <div>
      <h1>Pet Profile Page</h1>
      <br></br>
      {/* <ul> */}
        {user && <UserInfo user={user} />}
        <h2> Pet Info</h2>

        <>
          <div className="petProfile-container">

            {profileList.map((data, key) => {
              return (
                <div key={key}>
                  {data.pet_name +
                    " , " +
                    data.pet_type +
                    " ," +
                    key +
                    data.id
                    }
                </div>
                  );
                })}
          </div>
        </>

    

      <section>
        <form onSubmit={handleSubmit}>
          <h2><br></br>Update Pet Info </h2>
          {/* <hr /> */}
          <label htmlFor="pet_id">Pet Old Name</label>
          <input type="text" id="pet_id" placeholder="Enter Pet ID" />
          <br></br>
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