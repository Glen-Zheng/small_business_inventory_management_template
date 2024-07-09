import React, { useState, useEffect } from "react";
import { addToCart } from "@/store_redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store_redux/slices/cartSlice";

const TempErrorMessage = ({ setStockLimitError }: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setStockLimitError(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  if (!isVisible) return null;

  return <p className=" text-center">Stock not currently available</p>;
};

const ItemPopUp = ({
  id,
  item_name,
  item_price,
  item_stock,
  item_size,
  item_units,
  setOpenModal,
}: any) => {
  const dispatch = useDispatch();
  const itemSelectedCart = useSelector(
    (state: any) =>
      state.cart.cart[
        state.cart.cart.findIndex((element: any) => element.id === id)
      ]
  );

  const [stockLimitError, setStockLimitError] = useState<boolean>(false);

  const handleItemAddClick = (
    id: any,
    name: any,
    price: any,
    stock: any,
    size: any,
    units: any,
    quantity: number = 1
  ) => {
    dispatch(
      addToCart({
        id: id,
        item_name: name,
        item_price: price,
        item_stock: stock,
        item_size: size,
        item_units: units,
        quantity: quantity,
      })
    );
  };
  const handleItemRemoveClick = (id: any) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpenModal(false);
        }
      }}
    >
      <div className="bg-white px-8 pt-6 pb-3 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold  text-gray-800">{item_name}</h2>
          <button
            className="text-gray-600 hover:text-gray-800 transition duration-150"
            onClick={() => setOpenModal(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <p className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span>${item_price}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Size:</span>
            <span>{item_size}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Units/Case:</span>
            <span>{item_units}</span>
          </p>
          {itemSelectedCart && itemSelectedCart.quantity > 0 ? (
            <p className="flex justify-between font-bold">
              <span className="text-turqoise">Total Price:</span>
              <span className="underline decoration-amber-500">
                ${(itemSelectedCart.quantity * item_price).toFixed(2)}
              </span>
            </p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
        <div className="mt-6 flex items-center justify-center w-full">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleItemRemoveClick(id)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition duration-150"
            >
              -
            </button>
            <div className="px-4 py-2 bg-white text-center min-w-[3rem]">
              {itemSelectedCart ? itemSelectedCart.quantity : 0}
            </div>
            <button
              onClick={
                !item_stock ||
                (itemSelectedCart && itemSelectedCart.quantity >= item_stock)
                  ? () => {
                      setStockLimitError(true);
                    }
                  : () =>
                      handleItemAddClick(
                        id,
                        item_name,
                        item_price,
                        item_stock,
                        item_size,
                        item_units
                      )
              }
              className={`px-4 py-2 
                ${
                  !item_stock ||
                  (itemSelectedCart && itemSelectedCart.quantity >= item_stock)
                    ? "bg-gray-500 text-gray-800 font-medium cursor-auto"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition duration-150"
                }`}
            >
              +
            </button>
          </div>
        </div>
        {stockLimitError ? (
          <TempErrorMessage setStockLimitError={setStockLimitError} />
        ) : (
          <p>
            <br />
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemPopUp;
