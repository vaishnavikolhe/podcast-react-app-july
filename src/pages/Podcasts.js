import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts } from '../slices/podcastSlice';
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase';
import PodcastCard from '../components/Podcasts/PodcastsCard';
import InputComponent from '../components/common/Input'
import { toast } from 'react-toastify';
function PodcastsPage() {
    const [serchByGenre, setSerchByGenre] = useState('');
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts.podcasts)
    const [search, setSearch] = useState('');
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'podcasts')),
            (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) => {
                    podcastsData.push({ id: doc.id, ...doc.data() });
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error) => {
                console.log('Error fetching podcasts:', error)
            }
        );
        return () => {
            unsubscribe();
        };

    }, [dispatch]);

    // filter podcast by title and by genre 
    var filteredPodcasts = podcasts.filter((item) =>{
            if(item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) && item.Genre.trim().toLowerCase().includes(serchByGenre.trim().toLowerCase())) 
                return true
        }
    );


    return (
        <div>
            <Header />
            <div className="input-wrapper">
                <h1>Discover Podcasts</h1>
                <InputComponent
                    state={search}
                    setState={setSearch}
                    placeholder='Search By Title'
                    type="text"
                />
                <select className='genre-dropdown' id="main-genre-dropdown" onChange={(e) => { setSerchByGenre(e.target.value) }}>
                    <option defaultValue="" selected disabled>Filter Podcast By Genre</option>
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
                {filteredPodcasts.length > 0
                    ?
                    <div className='podcasts-flex' style={{ marginTop: '1.5rem' }}>
                        {
                            filteredPodcasts.map((podcast) => (
                                <PodcastCard
                                    key={podcast.id}
                                    id={podcast.id}
                                    title={podcast.title}
                                    displayImage={podcast.displayImage}
                                />
                            ))
                        }
                    </div>
                    : <p>{search ? 'Podcast Not Found' : 'No Podcast On The Platform'}</p>
                }
            </div>
        </div>
    )
}

export default PodcastsPage