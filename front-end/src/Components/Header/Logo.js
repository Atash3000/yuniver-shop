import React from 'react';
import { useHistory } from 'react-router-dom';

function Logo() {
  const history = useHistory();
  const handleClick = () => history.push('/');
  return (
    <div className="logo" onClick={handleClick}>
      <h1 className="logo__name">
        <span className="logo__name--main">yuniver</span>
        <span className="logo__name--sub">essentials</span>
      </h1>
    </div>
  )
}

export default Logo
