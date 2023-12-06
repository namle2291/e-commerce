import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { httpRequest } from "../../axios/custom-axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = () => {
    httpRequest
      .put("/users/reset-password", {
        password,
        token,
      })
      .then((res) => {
        Swal.fire({ icon: "success", text: res.message }).then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        toast.info(err.message);
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
          New Password
        </h2>
        <div className="border border-blue-300 mb-[20px]">
          <input
            value={password}
            type="password"
            className="w-full first-letter:text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          className="border bg-blue-500 hover:bg-blue-400 cursor-pointer p-[10px] text-center mb-[20px] text-white"
          onClick={handleSubmit}
        >
          Change
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
