import React from 'react'
import Header from '../components/common/Header'
import EditProfileForm from '../components/EditProfile';

function EditProfile() {

   

    return (
        <div>
            <Header />
            <div className='input-wrapper'>
                <EditProfileForm />
            </div>
        </div>
    )
}

export default EditProfile