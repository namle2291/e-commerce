import { IoStar, IoStarOutline } from "react-icons/io5";

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
  for (let i = 5; i > number; i--) {
    stars.push(
      <span key={i}>
        <IoStarOutline />
      </span>
    );
  }
  return stars;
};
