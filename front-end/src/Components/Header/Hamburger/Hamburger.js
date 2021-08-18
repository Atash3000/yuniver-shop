import React ,{useContext}from 'react'
import './Hamburger.scss';
import {headerContext} from '../../../Context/HeaderContext';

function Hamburger() {
  const {showMenu,open} = useContext(headerContext);
  // const [open ,setOpen] = useState('')
  // const openHamburger=()=>{
  //   setOpen('open');
  //   open && setOpen('') 
  // }
  return (              
    <div  className='hamburger' >
      <div onClick={showMenu} className={`hamburger__container hamburger__container--${open}`}>
      <div className='hamburger__line'>
        <span></span>
        <span></span>
      </div>
      <div className='hamburger__line'>
      <span></span>
      <span></span>
      </div>
      <div className='hamburger__line'>
      <span></span>
      <span></span>
      </div>      
      </div>
  
    </div>
  )
}

export default Hamburger
