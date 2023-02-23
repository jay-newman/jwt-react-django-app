import React from 'react'


function PetProfile(profiles) {
    return (
        <div> 
            {
                profiles.map(profile => {
                    return( 
                        <div key={profile.id}>
                            <h2>Hello Pet</h2>
                            <p>
                            
                                {profile.pet_name}
                                {profile.pet_type}
                            </p>

                        </div>
                    )
                })
            }
        
            
        </div>
    )
}

export default PetProfile;