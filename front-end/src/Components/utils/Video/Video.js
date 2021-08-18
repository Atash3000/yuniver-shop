  import React from 'react'
  import mainVideo from './img/main-2.mp4';
  import './Video.scss';

  function Video() {
    return (
      <div className="Video">
        <video
          className="Video__content"
          autoPlay
          muted
          loop
          src={mainVideo}
        ></video>
      </div>
    )
  }
  
  export default Video
  