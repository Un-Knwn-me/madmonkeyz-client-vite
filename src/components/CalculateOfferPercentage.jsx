import React from 'react'

const CalculateOfferPercentage = ({originalPrice, discountedPrice}) => {
    const offerPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return offerPercentage;
}

export default CalculateOfferPercentage