import React from 'react';
import './Avatar.scss';
import avatar from '../../assets/arenio.png';

const Avatar = () => {
  return <img className='avatar' src={avatar} alt="ReuniOnTime Avatar" />;
};

export default Avatar;