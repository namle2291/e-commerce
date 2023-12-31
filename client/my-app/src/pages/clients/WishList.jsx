import NewArrivalProduct from 'components/Product/NewArrivalProduct';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const WishList = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div>
      {userInfo && userInfo?.wishlist?.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {userInfo?.wishlist.map((el) => (
            <div>
              <NewArrivalProduct data={el.product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No products in wishlist!
        </div>
      )}
    </div>
  );
};

export default memo(WishList);
