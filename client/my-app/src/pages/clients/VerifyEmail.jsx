import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { httpRequest } from "../../axios/custom-axios";
import { toast } from "react-toastify";

function VerifyEmail() {
  const [verifyCode, setVerifyCode] = useState("");

  const { isLogged } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, []);

  const handleSubmit = () => {
    httpRequest
      .post(
        "/users/verifyemail",
        { verifyCode },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.message) {
          toast.error(err.message, {
            position: "bottom-right",
          });
        }
      });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0
      bg-[url('https://4kwallpapers.com/images/walls/thumbs_3t/3644.jpg')]
       bg-no-repeat bg-fixed bg-cover bg-center"
    >
      <div className="absolute inset-center w-[400px] p-[25px] bg-[rgba(255,255,255,.3)]">
        <h2 className="mb-5 text-center text-[25px] text-gray-500">
          Verification Email
        </h2>
        <div className="border border-blue-300 mb-[20px]">
          <input
            value={verifyCode}
            type="text"
            className="w-full first-letter:text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
            onChange={(e) => setVerifyCode(e.target.value)}
          />
        </div>

        <div
          className="border bg-blue-500 hover:bg-blue-400 cursor-pointer p-[10px] text-center mb-[20px] text-white"
          onClick={handleSubmit}
        >
          Verify Email
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
