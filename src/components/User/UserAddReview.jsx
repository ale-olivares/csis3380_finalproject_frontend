import React, {useState} from "react";
import { FaTimes } from 'react-icons/fa';
import StarRatingComponent from './StarRating';
import { getCurrentUser } from "../../services/AuthService";
import { addReview as addReviewService } from '../../services/ReviewService';

const UserAddReviewComponent = ({ onClose, orderId, productId }) => {

    const [shortMessage, setShortMessage] = useState('');
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);
    
    const handleRating = (ratingValue) => {
        setUserRating(ratingValue);
    };

    const submitReview = () => {
        
        const user = getCurrentUser();
        addReviewService(user.id, productId, shortMessage, comment, userRating, orderId).then((response) => {
            if (response) {
                onClose();
            }
        }).catch((error) => {    
            console.error('Error while adding the review', error);
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-left">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Rating your order</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Share your experience with our product!</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Short Message</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input 
                                            type="text" 
                                            name="username" 
                                            id="username" 
                                            autoComplete="username" 
                                            className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={(e) => setShortMessage(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Comment</label>
                                <div className="mt-2">
                                    <textarea 
                                        id="about" 
                                        name="about" 
                                        rows="3" 
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setComment(e.target.value)}
                                        required    
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <h3 className="text-sm leading-6 font-medium text-gray-900">Rate from 1 to 5 stars</h3>
                                <StarRatingComponent maxRating={5} onRating={handleRating} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-center px-4 py-3">
                    <button
                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                        onClick={() => submitReview()}
                        disabled={userRating === 0 || !shortMessage || !comment}
                    >
                        Submit Review
                    </button>
                </div>
                <button
                    className="absolute top-0 right-0 m-3"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
}

export default UserAddReviewComponent;