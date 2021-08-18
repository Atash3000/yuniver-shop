import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon';



function FooterNav() {
  return (
    <div className='FooterNav'>
      <ul className="FooterNav--menu">
		    <li className="FooterNav--item"><Link className="FooterNav--link" to="/">FAQ</Link></li>
		    <li className="FooterNav--item"><Link className="FooterNav--link" to="/">Delivery & returns</Link></li>
		    <li className="FooterNav--item"><Link className="FooterNav--link" to="/">Contact us</Link></li>
        <li className="FooterNav--item"><Link className="FooterNav--link" to="/">Privacy  Policy</Link></li>
        <li className="FooterNav--item"><Link className="FooterNav--link" to="/">Cookie  Policy</Link></li>
        <li className="FooterNav--item"><Link className="FooterNav--link" to="/">Terms & Conditions</Link></li>
        <li className="FooterNav--item"><Link className="FooterNav--link" to="/">Delivery & Returns</Link></li>
			</ul>
    </div>
  )
}




export const FooterSocial = ()=>{
  return (
    <div className="FooterSocial"> 
      <a  rel="noreferrer" target="_blank" className='FooterSocial-link' href='https://www.facebook.com/'>
      <Icon className='FooterSocial-icon' icon="facebook" size={30} color="white" />
      </a>
       <a  rel="noreferrer" target="_blank" className='FooterSocial-link' href='https://www.facebook.com/'>
      <Icon className='FooterSocial-icon' icon="instagram" size={30} color="white" />
      </a>
       <a  rel="noreferrer" target="_blank" className='FooterSocial-link'  href='https://www.facebook.com/'>
      <Icon className='FooterSocial-icon' icon="twitter" size={30} color="white" />
      </a>
     </div>
  
  )
}

export default FooterNav
