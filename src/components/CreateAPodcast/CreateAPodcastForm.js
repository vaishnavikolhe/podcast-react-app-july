import React, { useState } from 'react'
import InputComponent from '../common/Input'
import Button from '../common/Button'
import { toast } from 'react-toastify'
import FileInput from '../common/Input/FileInput'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import './styles.css';
function CreateAPodcastForm() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [displayImage, setDisplayImage] = useState()
    const [bannerImage, setBannerImage] = useState()
    const [podcastGenre,setPodcastGenre]= useState();
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async () => {
        if (title && desc && displayImage && bannerImage) {
            try {
                setLoading(true)
                //banner Image
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef)
                //Display Image
                const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(displayImageRef, displayImage);
                const displayImageUrl = await getDownloadURL(displayImageRef)

                const podcastData = {
                    title: title,
                    desciption: desc,
                    bannerImage: bannerImageUrl,
                    displayImage: displayImageUrl,
                    createdBy: auth.currentUser.uid,
                    Genre : podcastGenre
                }

                await addDoc(collection(db, 'podcasts'), podcastData);
                setTitle('')
                setDesc('')
                setPodcastGenre('');
                setDisplayImage(null)
                setBannerImage(null)
                setLoading(false)
                toast.success('Podcast Created !')
            } catch (e) {
                setLoading(false)
                toast.error(e.message)
                console.log(e)
            }
        } else {
            setLoading(false)
            toast.error('All fields are mandatory !')
        }
    }
    const displayImageHandle = (file) => {
        setDisplayImage(file)
    }
    const bannerImageHandle = (file) => {
        setBannerImage(file)
    }
    return (
        <>
            <InputComponent
                state={title}
                setState={setTitle}
                placeholder={"Title"}
                type={'text'}
                required={true}
            />
            <InputComponent
                state={desc}
                setState={setDesc}
                placeholder={"Decription"}
                type={'text'}
                required={true}
            />
            <FileInput
                accept={'image/*'}
                id={'display-image-input'}
                fileHandleFnc={displayImageHandle}
                text={'Upload Display Image'}
            />
            <FileInput
                accept={'image/*'}
                id={'banner-image-input'}
                fileHandleFnc={bannerImageHandle}
                text={'Upload Banner Image'}
            />
            <select className='genre-dropdown' id="main-genre-dropdown" onChange={(e)=>{setPodcastGenre(e.target.value)}}>
                <option defaultValue="" selected disabled>Select Genre of your podcast</option>
                <option value="arts_culture">Arts & Culture</option>
                <option value="business">Business & Entrepreneurship</option>
                <option value="comedy">Comedy</option>
                <option value="education">Education</option>
                <option value="health_fitness">Health & Fitness</option>
                <option value="history">History</option>
                <option value="true_crime">True Crime</option>
                <option value="news_politics">News & Politics</option>
                <option value="science_technology">Science & Technology</option>
                <option value="society_culture">Society & Culture</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="personal_development">Personal Development</option>
                <option value="food_cooking">Food & Cooking</option>
                <option value="gaming">Gaming</option>
                <option value="literature">Literature</option>
                <option value="parenting_family">Parenting & Family</option>
                <option value="spirituality_religion">Spirituality & Religion</option>
                <option value="travel_places">Travel & Places</option>
                <option value="hobbies_interests">Hobbies & Interests</option>
            </select>
            <Button
                text={loading ? "Loading.." : "Create Podcast"}
                onClick={handleSubmit}
                disabled={loading}
            />
        </>
    )
}

export default CreateAPodcastForm