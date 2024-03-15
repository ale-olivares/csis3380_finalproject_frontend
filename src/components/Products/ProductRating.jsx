import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const RatingStars = ({ rating, index }) => {
  // Determine the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Create an array to hold the star JSX elements
  const starElements = [];

  // Push full stars into the array
  for (let i = 0; i < fullStars; i++) {
    starElements.push(<BsStarFill key={`full-${i}-${index}`} className="text-yellow-400" />);
  }

  // Push half star into the array
  if (halfStars) {
    starElements.push(<BsStarHalf key={`half-0-${index}`} className="text-yellow-400" />);
  }

  // Push empty stars into the array
  for (let i = 0; i < emptyStars; i++) {
    starElements.push(<BsStar key={`empty-${i}-${index}`} className="text-yellow-400" />);
  }

  return (
    <>
    {/* <span className="ml-2">{rating}</span> */}
    <div className="flex items-center">
      {starElements}
     
    </div>
    </>
  );
};

export default RatingStars;