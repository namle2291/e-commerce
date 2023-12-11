import React, { memo, useCallback, useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { IoStar } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { votes } from "../../utils/contants";
import { raitingProduct } from "../../apis/productApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function VoteModal({ product, showModal }) {
  const [comment, setComment] = useState("");
  const [voteStar, setVoteStar] = useState(0);

  const handleSubmit = useCallback(async () => {
    const payload = {
      star: voteStar,
      comment,
      pid: product._id,
    };
    try {
      const response = await raitingProduct(payload);
      if (response.success) {
        showModal(false);
        toast.success("Thank you for raiting!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.3)] z-50">
      <div className="absolute inset-center w-[650px] bg-white rounded-md p-[30px] flex flex-col gap-3">
        <img className="m-auto" src={logo} alt={product.title} />
        <span
          className="absolute right-4 top-3 cursor-pointer text-lg"
          onClick={() => showModal(false)}
        >
          <FaTimes />
        </span>
        <div className="mt-3">
          <h2>{product.title}</h2>
        </div>
        <div className="mt-3">
          <input
            value={comment}
            type="text"
            placeholder="Type something..."
            className="w-full p-3 border border-main_color outline-none"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <h2>How do you like product?</h2>
          <div className="grid grid-cols-5 gap-2 mt-3">
            {votes.map((el, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-3 rounded-md border-2 text-[13px] cursor-pointer"
                onMouseEnter={() => {
                  setVoteStar(index + 1);
                }}
                onClick={() => {
                  setVoteStar(index + 1);
                }}
              >
                <span>
                  <IoStar
                    className={`mx-auto ${
                      index + 1 <= voteStar
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  />
                </span>
                <span>{el.title}</span>
              </div>
            ))}
          </div>
          <div
            className="w-full text-center bg-main_color py-2 mt-3 text-white cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VoteModal);
