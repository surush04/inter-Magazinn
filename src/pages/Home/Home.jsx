import React, { useEffect } from "react";
//swipers
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../App.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { getcategories, getproducts } from "../../api/Home/HomeApi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  // swiper
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getcategories());
  }, [dispatch]);

  const data = useSelector((store) => store.Home.data);
  const data2 = useSelector((store) => store.Home.data2);
  

  return (
    <div>
      <div className="w-[80%] m-auto h-[300px]  rounded-2xl my-[30px]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide className="flex items-center justify-center ">
            <div className="bg1"></div>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <div className="bg2"></div>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <div className="bg3">
              <h1 className="text-[40px] text-white">
                {" "}
                Joi baroi reclamai Shumo{" "}
              </h1>
              <h1 className="text-[40px] text-white">
                {" "}
                Reclama muhariki tijorat ast
              </h1>
            </div>
          </SwiperSlide>

          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="" ref={progressCircle}>
              <circle cx="" cy="" r=""></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
      {/*  Популярные категории */}
      <h1 className="text-[40px] font-semibold ml-[10%] mt-[200px] py-[3%]">
        Популярные категории
      </h1>
      <div className="py-[70px] flex gap-9 px-[100px] bg-white w-[80%] h-auto m-auto rounded-[40px] flex-wrap">
        {data2?.map((elem) => {
          return (
            <div className="flex flex-col items-center w-[250px]">
              <img
                src={`${import.meta.env.VITE_APP_FILES_URL}${
                  elem.categoryImage
                }`}
                alt=""
              />
              <p className="font-semibold">{elem?.categoryName}</p>
            </div>
          );
        })}
      </div>
      <h1 className="text-[40px] font-semibold ml-[10%] py-[3%]">
        Самые горячие скидки🔥
      </h1>
      <div className="py-[70px] flex gap-16 items-center px-[100px] bg-white w-[80%] h-auto m-auto rounded-[40px] flex-wrap">
        {data?.products?.map((elem) => {
          return (
            <>
              <div className="flex flex-col justify-center w-[250px]">
                <img
                  src={`${import.meta.env.VITE_APP_FILES_URL}${elem.image}`}
                  alt=""
                />

                <div className="flex gap-4">
                  <p className="font-extrabold my-[10px]">{elem?.price}</p>
                  <p
                    className="font-extrabold text-slate-500 text-d my-[10px]"
                    style={{ textDecoration: "line-through" }}
                  >
                    {elem?.discountPrice}
                  </p>
                </div>
                <h1 className="my-[10px] font-semibold">{elem?.productName}</h1>
                <Link to={"/Basket"}>
                  <Button
                    onClick={() => dispatch(addCart(el.id))}
                    variant="contained"
                    color="success"
                  >
                    <ShoppingCartOutlinedIcon className="hover:text-green-600 w-[200px]"></ShoppingCartOutlinedIcon>{" "}
                    В корзину
                  </Button>
                </Link>
              </div>
            </>
          );
        })}
      </div>
      <h1 className="text-[40px] font-semibold ml-[10%] py-[3%]">
        Без смартфона ни дня
      </h1>
    </div>
  );
};

export default Home;
