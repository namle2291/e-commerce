import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import checkout from '../../assets/img/checkout.jpg';

import PayPalButton from 'components/Common/PayPalButton';
import ReactConfetti from 'react-confetti';
import { formatPrice } from 'utils/formatPrice';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Checkout() {
  const { register, control } = useForm();

  const { currentCart } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);

  const { address } = useWatch({ control, address: 'address' });

  const navigate = useNavigate();
  let timer = useRef();

  useEffect(() => {
    if (isSuccess) {
      timer.current = setTimeout(() => {
        Swal.fire({
          title: 'Order successful!',
          text: 'Thank you so much for your order!',
          icon: 'success',
        }).then(() => {
          setIsSuccess(false);
          navigate('/');
        });
      }, 5000);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isSuccess]);

  return (
    <>
      {isSuccess && <ReactConfetti />}
      <div className="pt-[20px] px-[20px]">
        <div>
          <img
            src={
              'https://img.freepik.com/free-vector/e-wallet-concept-illustration_114360-7561.jpg?w=740&t=st=1704200358~exp=1704200958~hmac=d60afcb0d3f7735dfbd4293ae27be6fa78f05db488d18e8abd0c38c77e05ace0'
            }
            alt="checkout"
            className="rounded-md w-[200px] mx-auto"
          />
        </div>
        <div className="w-[1200px] mx-auto grid grid-cols-2 gap-6 mt-3">
          <div>
            <h2 className="font-semibold text-[25px]">Checkout Your Order</h2>
            <div className="flex justify-between items-center bg-stone-100 py-2 px-1 mt-3">
              <div className="w-[55%] line-clamp-1">Title</div>
              <div className="w-[20%]">Quantity</div>
              <div className="w-[15%] text-end">Price</div>
            </div>
            {currentCart &&
              currentCart.map((el) => (
                <div
                  key={el._id}
                  className="flex justify-between items-center py-2 px-1"
                >
                  <div className="w-[55%] line-clamp-1">{el.title}</div>
                  <div className="w-[10%]">{el.quantity}</div>
                  <div className="w-[25%] text-end">
                    {formatPrice(el.price)} VND
                  </div>
                </div>
              ))}
            <div className="mt-3">
              <Link
                to={'/member/my-cart'}
                className="px-3 py-2 bg-red-600 rounded-sm text-white"
              >
                Back
              </Link>
            </div>
          </div>
          <div>
            <div>
              <span>Subtotal: </span>{' '}
              <span className="ml-3 text-red-600 font-semibold">
                {formatPrice(
                  currentCart?.reduce((sum, el) => {
                    return el.quantity * el.price + sum;
                  }, 0),
                )}
                {' VND'}
              </span>
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="">Your address:</label>
              <input
                type="text"
                {...register('address')}
                placeholder="Please type your address..."
                className="mt-2 border p-2 outline-none hover:border hover:border-blue-600"
              />
            </div>
            <div className="mt-4">
              {address && (
                <PayPalButton
                  setIsSuccess={setIsSuccess}
                  amount={
                    +Math.round(
                      currentCart?.reduce((sum, el) => {
                        return el.quantity * el.price + sum;
                      }, 0) / 24300,
                    )
                  }
                  payload={{
                    products: currentCart,
                    total: +Math.round(
                      currentCart?.reduce((sum, el) => {
                        return el.quantity * el.price + sum;
                      }, 0) / 24300,
                    ),
                    address,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
