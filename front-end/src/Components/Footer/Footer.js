import React from 'react'
import './Footer.scss';
import {Link} from 'react-router-dom';
import FooterNav,{FooterSocial} from './FooterNav';


function Footer() {
  return (
		
    <footer className='Footer'>
      <div className="Footer-top">
			<Link to="/" className="Footer-top--link">yuniver esntls</Link>
	  	</div>
       <div className="Footer-main">
         <div className="Footer-navigation">
					 <FooterNav/>
	  	    </div>
        <div className="Footer-social">
					<h3 className="Footer-social--header">
						follow us 
					</h3>
				<FooterSocial/>
	  	  </div>
	  	</div>
			<div className="Footer-bottom">
			<h3 className="Footer-bottom--header">
				Yuniver Limited & Co 2021 &#169; all rights reserved
				eCommerce Website Design By Atamurad Babakulyyev
			</h3>
			</div>
    </footer>
  )
}

export default Footer
