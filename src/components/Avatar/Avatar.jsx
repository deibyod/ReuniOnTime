import React from 'react';
import './Avatar.scss';

const Avatar = ({ avatarUrl }) => {
  return <img className='avatar' src={avatarUrl} alt="ReuniOnTime Avatar" />;
};

export default Avatar;