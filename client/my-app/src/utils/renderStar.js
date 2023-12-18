import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

export const renderStar = (number) => {
   if (!Number(number)) return;
   const stars = [];

   for (let i = 0; i < number; i++) {
      stars.push(
         <span key={i}>
            <IoStar />
         </span>
      );
   }

   if (number % 1 !== 0) {
      stars[Math.floor(number)] = (
         <span key={number}>
            <IoStarHalf />
         </span>
      );
   }

   for (let i = 5; i > number; i--) {
      stars.push(
         <span key={i}>
            <IoStarOutline />
         </span>
      );
   }
   return (
      <div className='flex gap-2'>
         {stars.map((el, index) => (
            <span className='text-yellow-500' key={index}>{el}</span>
         ))}
      </div>
   );
};
