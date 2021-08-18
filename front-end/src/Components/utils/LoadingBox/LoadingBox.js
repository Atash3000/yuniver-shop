import React from 'react'
import Spinner from '../Spinner/Spinner'
import './LoadingBox.scss';

function LoadingBox() {

  return (
    <div className='LoadingBox'>
     
      <Spinner/>
    </div>
  )
}

export default LoadingBox
