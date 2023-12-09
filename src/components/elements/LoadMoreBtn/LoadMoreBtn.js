import React from 'react';
import './LoadMoreBtn.css';

const LoadMoreBtn = ({text, onClick}) => {
  return (
    <div className="rmdb-loadmorebtn" onClick={onClick}>
      <p>{text}</p>
    </div>
  )
}

export default LoadMoreBtn