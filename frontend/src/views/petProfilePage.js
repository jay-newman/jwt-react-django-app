import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import petProfileList from "../components/ListProfiles";

function PetProfilePage() {
  
  // let [ profileList , setProfilelist]=useState([
  //   {
  //     id: "",
  //     user_id: "",
  //     pet_name: "",
  //     pet_type: "",
     
  //   }
  // ]);
  let [ profileList, setProfilelist] = useState([]);
  let api = useAxios();


  let profileObj = {
    id: "",
    user_id: "",
    pet_name: "",
    pet_type: "",
   
  }

  
  

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
      setProfilelist(response.data.response);
    } catch {
      setProfilelist("Something went wrong");
    }

  }  

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await api.get("/petprofile/");
        // var finalData = str.replace(/\\/g, "");
        let newData = JSON.parse(response.data.response);
        // setProfilelist(JSON.stringify(newData));
        setProfilelist(newData);

        console.log(profileList);
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

  // function petProfiles({ res }) {
  // return (
  //   <div>
  //     { res.map((user, i) => {
  //       return (
  //         <div key={i} class="user-card">
  //           <h2>{user.pet_name}</h2>
  //           <p>{user.pet_type}</p>
  //           {/* <img src={`/img/users/${user.image}`} width="50" height="50" /> */}
  //         </div>
  //       );
  //     }) }
  //   </div>
  // );
  // }; 
  // function listPetProfiles({ petList }) {
  //   return (
  //     <div>
  //       {petList.map(petprofile => {
  //         const { key, pet_name, pet_type } = petprofile;
  //         return <PetProfile key={key} pet_name={pet_name} pet_type={pet_type} />
  //       })}
  //     </div>
  //    );
  //}

  // Accepts an object - returns some JSX to be rendered
  // function PetProfile({ pet_name, pet_type }) {
  //   return (
  //     <div>
  //       <p>{pet_name}</p>
  //       <p>{pet_type}</p>
  //     </div>
  //   );
  // }

  // const petProfileList = res.map(profile => 
  //   <PetProfile> key={profile.id} profile={profile}</PetProfile>
  // ) 





  return (
    <div>
      <h1>Pet Profile Page</h1>
      <br></br>
      {/* <ul> */}
        <h2>Pet Info</h2>
        {/* {JSON.stringify(profileList)} */}
        {/* {profileList} */}
        
        <div>

          {/* {JSON.parse(profileList)} */}


        </div>
        <>

      <div className="stock-container">

        {profileList.map((data, key) => {

          return (

            <div key={key}>

              {data.pet_name +

                " , " +

                data.pet_type +

                " ," +
                key

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