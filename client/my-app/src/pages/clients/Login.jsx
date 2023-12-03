import React, { useEffect, useState } from "react";

import { httpRequest } from "../../axios/custom-axios";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = { email, password };

    if (isLogin) {
      httpRequest
        .post("/users/login", payload)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-right",
          });
        });
    } else {
      payload.first_name = first_name;
      payload.last_name = last_name;
      payload.mobile = mobile;

      httpRequest
        .post("/users/register", payload)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "bottom-right",
          });
        });
    }
  };

  const clearData = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setMobile("");
    setPassword("");
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0
      bg-[url('https://4kwallpapers.com/images/walls/thumbs_3t/3644.jpg')]
       bg-no-repeat bg-fixed bg-cover bg-center"
    >
      <div className="absolute inset-center w-[400px] p-[25px] bg-[rgba(255,255,255,.3)]">
        <h2 className="mb-5 text-center text-[25px] text-gray-500">
          SIGN {isLogin ? "IN" : "UP"}
        </h2>
        <div className="border border-blue-300 mb-[20px]">
          <input
            value={email}
            type="text"
            placeholder="Email"
            className="w-full first-letter:text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!isLogin && (
          <>
            <div className="border border-blue-300 mb-[20px]">
              <input
                value={first_name}
                type="text"
                placeholder="First Name"
                className="w-full text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="border border-blue-300 mb-[20px]">
              <input
                value={last_name}
                type="text"
                placeholder="Last Name"
                className="w-full text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="border border-blue-300 mb-[20px]">
              <input
                value={mobile}
                type="text"
                placeholder="Mobile"
                className="w-full text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="border border-blue-300 mb-[20px]">
          <input
            value={password}
            type="password"
            placeholder="Password"
            className="w-full text-gray-500 bg-transparent outline-none px-[20px] py-[10px]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="border bg-blue-500 hover:bg-blue-400 cursor-pointer p-[10px] text-center mb-[20px] text-white"
          onClick={() => {
            handleSubmit();
            clearData();
          }}
        >
          SIGN {isLogin ? "IN" : "UP"}
        </div>
        <div className="text-[13px] flex justify-around">
          {isLogin && <Link>Forgot password?</Link>}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin);
              clearData();
            }}
          >
            SIGN {!isLogin ? "IN" : "UP"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
