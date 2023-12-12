import React from 'react'
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
        <span style={{ color: '#FFD700' }}>
        {value >= 1 ? <StarIcon/> : value >= 0.5 ? <StarHalfIcon/> : <StarBorderIcon/>}
        </span>
        <span style={{ color: '#FFD700' }}>
        {value >= 2 ? <StarIcon/> : value >= 1.5 ? <StarHalfIcon/> : <StarBorderIcon/>}
        </span>
        <span style={{ color: '#FFD700' }}>
        {value >= 3 ? <StarIcon/> : value >= 2.5 ? <StarHalfIcon/> : <StarBorderIcon/>}
        </span>
        <span style={{ color: '#FFD700' }}>
        {value >= 4 ? <StarIcon/> : value >= 3.5 ? <StarHalfIcon/> : <StarBorderIcon/>}
        </span>
        <span style={{ color: '#FFD700' }}>
        {value >= 5 ? <StarIcon/> : value >= 4.5 ? <StarHalfIcon/> : <StarBorderIcon/>}
        </span>

        <p style={{ marginLeft: '15px', fontSize: '12px' }}>{text && text}</p>
    </div>
  )
}

export default Rating