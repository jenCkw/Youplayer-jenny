import React from 'react'
import Videocard from '../VideoCard'
import './Video.css';
// UC8butISFwT-Wl7EV0hUK0BQ
function Video({ videos }) {
  return (
    <div className='video'>
      {
        videos?.length === 0 ? (
          <h1>Loading ....</h1>
        ): videos?.map((video, i)=>(
            <Videocard 
            key={i}
            videoId={video.id ? video.id : video.id.videoId }
            thumnail={video.snippet.thumbnails.high.url}
            title={video.snippet.title}
            author={video.snippet.channelTitle}
            />
       ))
      }
    </div>
  )
}

export default Video
