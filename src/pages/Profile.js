import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import PodcastCard from '../components/Podcasts/PodcastsCard'
import { collection, getDocs, query, where } from 'firebase/firestore';

function Profile() {

  const user = useSelector((state) => state.user.user);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(
        collection(db, "podcasts"),
        where("createdBy", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPodcasts(docsData);
    };

    if (user) {
      fetchDocs();
    }

  }, [user]);

  if (!user) {
    return <Loader />
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success('user logged out !');
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <PodcastCard title={user.name} displayImage={user.profilePic} />
        </div>

        <h1 style={{ marginBottom: "rem" }}>My Podcasts</h1>
        <div className="podcast-flex">
          {podcasts.length == 0 ? (
            <p style={{ fontSize: "1.2rem" }}>You Have Zero Podcasts</p>
          ) : (
            <>
              {podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  displayImage={podcast.displayImage}
                />
              ))}
            </>
          )}
        </div>
        <Button
          width='5rem'
          text={'Logout'} onClick={handleLogout} />
      </div>
    </div>
  )
}

export default Profile