import React from 'react'
import Header from '../components/common/Header'
import CreateAPodcastForm from '../components/CreateAPodcast/CreateAPodcastForm'
function CreateAPodcastPage() {
  return (
    <div>
      <Header></Header>
      <div className='input-wrapper'>
          <h1>Create A Podcast</h1>
          <CreateAPodcastForm/>
      </div>
    </div>
  )
}

export default CreateAPodcastPage