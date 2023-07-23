import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../common/Input';
import FileInput from '../common/Input/FileInput';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';


function EditProfileForm() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  
  async function handleOnClick() {
    setLoading(true)
    const updatedData={
      email:email,
      name:fullname,
      profilePic:fileURL
    }
    try { 
      await setDoc(doc(db, "users", user.uid),updatedData);
      toast.success('Profile Updated !')
      setLoading(false)
      
    } catch (e) {
      console.log("Error = ",e)
      toast.error(e.message)
      setLoading(false)
    }
  }

  //adding profile picture to storage and generate url .
  const profileImageHandle = async (file) => {
    setLoading(true);
    try {
      const imageRef = ref(storage, `profile/${Date.now()}`);
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      setFileURL(imageURL);
      setLoading(false);
      toast.success("Image Uploaded!");
    } catch (e) {
      console.log(e);
      toast.error("Error Occurred!");
    }
  }

  return (
    <>
      <InputComponent
        state={fullname}
        setState={setFullname}
        placeholder='Update Name'
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder='Update Email'
        type="email"
        required={true}
      />
      <FileInput
        accept={'image/*'}
        id={'profile-image-input'}
        fileHandleFnc={profileImageHandle}
        text={'Upload Updated Profile Picture'}
      />
      <Button
        text={loading ? "Loading.." : "Edit Profile"}
        onClick={handleOnClick}
        disabled={loading}
      />
    </>
  )
}

export default EditProfileForm