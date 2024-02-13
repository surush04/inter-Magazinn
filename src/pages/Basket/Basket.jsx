import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  deleteCart,
  getproductsfromcart,
} from "../../api/Basket/BasketApi";

const Basket = () => {
  let dispatch = useDispatch();

  const data3 = useSelector((store) => store.Home.data3);
  const cart = useSelector((store) => store.Home.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(getproductsfromcart());
  }, [dispatch]);

  return (
    <div className="px-[200px] flex flex-col flex-wrap ">
      {data3?.length > 0 ? (
        <>
          <button
            className="bg-[#48a067] w-[100px] rounded-[5px] text-white py-[5px]"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear all
          </button>

          {data3?.map((e) => {
            console.log(e);
            return (
              <>
                <div
                  className="flex items-center px-[5% h-[300px] gap-[50px] bg-white my-[5%] rounded-[30px] flex-wrap sm:justify-center sm:items-center"
                  key={e.id}
                >
                  <div className="w-[30%]">
                    <img
                      src={`${import.meta.env.VITE_APP_FILES_URL}${
                        e.product?.image
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[20px] flex-wrap sm:justify-center ">
                    <h1 className="text-[28px] font-semibold">
                      {e.product?.productName.slice(0, 39)}
                    </h1>
                    <div className="flex items-start gap-[5px]">
                      <h1 className="font-[700] tracking-[0.5px] text-[22px]">
                        {e.product?.price} c.
                      </h1>
                      <p
                        className="text-[18px] text-[#80808083] tracking-[1px]"
                        style={{ textDecoration: "line-through" }}
                      >
                        {e.product?.discountPrice}
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <button
                        className="bg-[#a0b0a5] hover:bg-[#48a067] w-[25px] rounded-[50%] text-white"
                        onClick={() => dispatch(putMinus(e.id))}
                      >
                        -
                      </button>
                      <p>{e.quantity}</p>
                      <button
                        className="bg-[#a0b0a5] hover:bg-[#48a067] w-[25px] rounded-[50%] text-white"
                        onClick={() => dispatch(putPlus(e.id))}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-[red] text-white rounded-[8px] px-[30px] py-[5px] cursor-pointer"
                      onClick={() => dispatch(deleteCart(e.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          <div>
            <h1 className="text-[40px] ml-[10%] font-semibold">Корзина</h1>
            <div className="flex justify-center items-center flex-col py-[30px] flex-wrap">
              <div className="flex flex-col items-center justify-center ">
                <Link to={"/"}>
                  <img
                    src="src/img/logotip.jpg"
                    alt=""
                    className="w-[300px] rounded-[50px]"
                  />
                </Link>
                <h1 className="text-[green] text-[50px]  relative bottom-16 font-serif">
                  Surush
                </h1>
              </div>
              <h1 className="text-[40px] font-semibold">
                Внутри пока нет товаров
              </h1>
              <p className="text-[22px] clear-start m-[20px]">
                Перейдите в раздел с товарами, чтобы оставить заявку
              </p>
              <Button variant="contained" color="success">
                Success
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
