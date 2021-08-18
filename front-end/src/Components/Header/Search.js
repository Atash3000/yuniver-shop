import React from 'react'
import Icon from '../Icon/Icon';




function Search() {

  return (
    <form  className='form'>
      <div className="form__container">
      <input  type="text" className='form__input' placeholder='search'/>
      <button type='button'  className='form__button'  >
      <Icon className='form__icon' icon="search" size={21} color="white" />;
      </button>
      </div>
    </form>
  )
}

export default Search
