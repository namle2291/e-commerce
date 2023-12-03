import React, { useRef } from "react";
import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { httpRequest } from "../../axios/custom-axios";
import { formatPrice } from "../../utils/formatPrice";
import Slider from "react-slick";
import Star from "../../components/Star/Star";
import { ArrowLongLeftIcon } from "../../components/Icons/Icon";
import ProductExtrainfo from "../../components/ProductExtrainfo/ProductExtrainfo";
import { FaShieldAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import { BiSolidShare } from "react-icons/bi";
import { GiRotaryPhone } from "react-icons/gi";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";

const tabs = [
  {
    id: 1,
    title: "DESCRIPTION",
  },
  {
    id: 2,
    title: "WARRANTY",
  },
  {
    id: 3,
    title: "DELIVERY",
  },
  {
    id: 4,
    title: "PAYMENT",
  },
  {
    id: 5,
    title: "CUSTOMER REVIEW",
  },
];

const extrainfo = [
  {
    icon: <FaShieldAlt />,
    title: "Guarantee",
    detail: "Quality Checked",
  },
  {
    icon: <MdLocalShipping />,
    title: "Free Shipping",
    detail: "Free On All Products",
  },
  {
    icon: <FaGift />,
    title: "Special Gift Cards",
    detail: "Special Gift Cards",
  },
  {
    icon: <BiSolidShare />,
    title: "Free Return",
    detail: "Within 7 Days",
  },
  {
    icon: <GiRotaryPhone />,
    title: "Consultancy",
    detail: "Lifetime 24/7/356",
  },
];

function ProductDetail() {
  const [product, setProduct] = useState();
  const [productImage, setProductImage] = useState("");
  const [activedTab, setActivedTab] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const { pid } = useParams();
  const imageRef = useRef();

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.background = `url(${productImage}) center center no-repeat`;
      imageRef.current.style.backgroundSize = "contain";
    }
  }, [productImage]);

  useEffect(() => {
    httpRequest
      .get(`/products/${pid}`)
      .then((res) => {
        if (res) {
          setProduct(res.product);
          setProductImage(res.product.thumb);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pid]);

  return (
    <>
      {product && (
        <div>
          {/* Product images */}
          <div className="py-[15px] mb-[20px]">
            <h3 className="font-semibold mb-[10px]">{product.title}</h3>
            <nav className="text-[14px] flex items-center gap-1 text-gray-500">
              <Link to={"/"}>Home</Link>
              <span>{">"}</span>
              <Link>{product.category.title}</Link>
              <span>{">"}</span>
              <span>{product.title}</span>
            </nav>
          </div>
          {/* Product info */}
          <div className="flex">
            <div className="flex flex-col">
              <div
                ref={imageRef}
                className="w-[460px] h-[460px] border mb-[30px] duration-200"
              ></div>
              {product.images.length > 0 && (
                <div className="max-w-[460px]">
                  <Slider
                    slidesToShow={3}
                    infinite={false}
                    speed={1000}
                    afterChange={(index) =>
                      setProductImage(product?.images[index])
                    }
                  >
                    {product?.images?.map((item, index) => (
                      <div
                        key={index}
                        className="h-[100px] border cursor-pointer"
                        onClick={() => setProductImage(item)}
                      >
                        <img
                          className="w-full h-full object-contain"
                          key={index}
                          src={item}
                          alt={index}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
            <div className="flex justify-between flex-1 pl-[45px]">
              <div className="flex-1">
                <div className="mb-[20px]">
                  <span className="text-[30px] font-semibold">
                    {formatPrice(product.price)} VND
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <Star totalRaitings={product.totalRaitings} fs={18} />
                  <span className="text-[14px] text-gray-500">
                    {product.raitings.length} review
                  </span>
                </div>
                <form action="" method="post">
                  <div className="mt-[20px] mb-[20px]">
                    <ul className="list-disc pl-[20px]">
                      {product?.description?.map((item, index) => (
                        <li key={index} className="text-[14px] text-gray-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 mb-[20px]">
                    <label className="font-semibold"> Color</label>
                    <span>{product.color}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-[20px]">
                    <label className="font-semibold"> Quantity</label>
                    <div className="relative w-[100px]">
                      <button
                        type="button"
                        className="absolute border-r-2 h-full w-[25px] hover:bg-gray-300"
                        onClick={() => {
                          if (quantity > 1) {
                            setQuantity((prev) => prev - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        min={1}
                        value={quantity}
                        max={product.quantity}
                        className="w-full py-[5px] px-[25px] text-center outline-none"
                        onChange={() => {}}
                      />
                      <button
                        type="button"
                        className="absolute border-l-2 right-0 h-full w-[25px] hover:bg-gray-300"
                        onClick={() => {
                          if (quantity < product.quantity) {
                            setQuantity((prev) => prev + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button className="uppercase w-full bg-main_color text-white px-[15px] py-[10px]">
                      Add to cart
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <ul>
                  {extrainfo.map((item, index) => (
                    <ProductExtrainfo key={index} data={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Back */}
          <div className="text-[13px] uppercase hover:text-main_color">
            <Link to={""} className="flex justify-center items-center gap-2">
              <span>
                <ArrowLongLeftIcon />
              </span>{" "}
              <span>Back to {product.category.title}</span>
            </Link>
          </div>
          <div className="border my-[30px]">
            {/* Tabs */}
            <div className="flex gap-1">
              {tabs.map((item) => (
                <span
                  key={item.id}
                  className={`cursor-pointer uppercase px-[20px] py-[9px] inline-block
                  ${
                    activedTab === item.id ? "bg-gray-100" : "bg-gray-200"
                  } hover:bg-gray-100
                  `}
                  onClick={() => setActivedTab(item.id)}
                >
                  {item.title}
                </span>
              ))}
            </div>
            {/* Reviewers */}
            <div className="p-[20px]">
              <h2 className="font-semibold">CUSTOMER REVIEWS</h2>
              <div className="mt-[20px]">
                {product?.raitings?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 mb-[20px]"
                  >
                    <div className="w-[40px] h-[40px] text-white bg-blue-500 rounded-full flex justify-center items-center">
                      <span>{item.postedBy.first_name.slice(0, 1)}</span>
                    </div>
                    {/* <div>{item.createdAt}</div> */}
                    <div key={index} className="flex flex-col">
                      <Star totalRaitings={item.star} />
                      <p className="text-gray-500 font-open_sans">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Related Product */}
          <RelatedProduct />
        </div>
      )}
    </>
  );
}
export default memo(ProductDetail);
