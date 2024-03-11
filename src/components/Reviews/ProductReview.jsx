import React from 'react';
import defaultUserImageFemale from '../../assets/img/pic1.png'
import defaultUserImageMale from '../../assets/img/pic2.png'

const ProductReviewComponent = ({ reviewData }) => {

    return (
        <article className='pb-5'>
            <div className="flex items-center mb-4">
                <img className="w-10 h-10 me-4 rounded-full" src={reviewData.user.gender === 'Male' ? defaultUserImageMale : defaultUserImageFemale} alt="" />
                <div className="font-medium">
                    <p>{reviewData.user.firstname}<time dateTime={reviewData.user.created_at} className="block text-sm text-gray-500">
                        Joined on {new Date(reviewData.user.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </time></p>
                </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                {[...Array(reviewData.rating)].map((_, index) => (
                    <svg className="w-4 h-4 text-yellow-300" key={index} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                ))}
                {[...Array(5 - reviewData.rating)].map((_, index) => (
                    <svg key={index + reviewData.rating} className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                <h3 className="ms-2 text-sm font-semibold text-gray-900">{reviewData.title}</h3>
            </div>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{reviewData.comment}</p>
        </article>
    )

}

export default ProductReviewComponent;