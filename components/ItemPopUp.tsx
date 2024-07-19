import React, { useState, useEffect } from "react";
import { addToCart } from "@/store_redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

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

  return <p className=" text-center">Out of stock.</p>;
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
  const router = useRouter();
  const dispatch = useDispatch();
  const itemSelectedCart = useSelector((state: any) => {
    if (state.cart.cart.length === 0) return null;
    return state.cart.cart[
      state.cart.cart.findIndex((element: any) => element && element.id === id)
    ];
  });

  const [stockLimitError, setStockLimitError] = useState<boolean>(false);
  interface SelectedItem {
    id: number;
    item_name: string;
    item_price: number;
    item_stock: number;
    item_size: string;
    item_units: string;
    quantity: number;
  }
  const [selected, setSelected] = useState<SelectedItem | null>(null);

  const handleItemAddClick = () => {
    setSelected((prevSelected) => {
      const baseItem = prevSelected || itemSelectedCart;
      if (baseItem) {
        return {
          ...baseItem,
          quantity: baseItem.quantity + 1,
        };
      }

      return {
        id,
        item_name,
        item_price,
        item_stock,
        item_size,
        item_units,
        quantity: 1,
      };
    });
  };
  const handleItemRemoveClick = () => {
    setSelected((prevSelected) => {
      const baseItem = prevSelected || itemSelectedCart;
      if (baseItem) {
        if (baseItem.quantity > 1) {
          return {
            ...baseItem,
            quantity: baseItem.quantity - 1,
          };
        } else {
          return {
            ...baseItem,
            quantity: 0,
          };
        }
      }
    });
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

          {selected ? (
            <p className="flex justify-between font-bold">
              <span className="text-turqoise">Total Price:</span>
              <span className="underline decoration-amber-500">
                ${(selected.quantity * item_price).toFixed(2)}
              </span>
            </p>
          ) : itemSelectedCart ? (
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
              onClick={() => handleItemRemoveClick()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition duration-150"
            >
              -
            </button>
            <div className="px-4 py-2 bg-white text-center min-w-[3rem]">
              {selected
                ? selected.quantity
                : itemSelectedCart
                ? itemSelectedCart.quantity
                : 0}
            </div>
            <button
              onClick={
                !item_stock ||
                (selected && selected.quantity >= item_stock) ||
                (!selected &&
                  itemSelectedCart &&
                  itemSelectedCart.quantity >= item_stock)
                  ? () => {
                      setStockLimitError(true);
                    }
                  : () => handleItemAddClick()
              }
              className={`px-4 py-2 
                ${
                  !item_stock ||
                  (selected && selected.quantity >= item_stock) ||
                  (!selected &&
                    itemSelectedCart &&
                    itemSelectedCart.quantity >= item_stock)
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
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              if (selected && selected.quantity > 0)
                dispatch(addToCart(selected));
              setOpenModal(false);
              setSelected(null);
            }}
            className="group w-5/12 relative overflow-hidden px-2 py-2 bg-turqoise text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          >
            <span className="relative z-10">Confirm & continue shopping</span>
            <span className="absolute inset-0 overflow-hidden">
              <span className="shimmer-wave"></span>
            </span>
          </button>
          <button
            onClick={() => {
              if (selected && selected.quantity > 0)
                dispatch(addToCart(selected));
              setOpenModal(false);
              setSelected(null);
              router.push("/cart");
            }}
            className="group w-5/12 relative overflow-hidden px-2 py-2 bg-purple-950 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          >
            <span className="relative z-10">Confirm & checkout</span>
            <span className="absolute inset-0 overflow-hidden">
              <span className="shimmer-wave"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPopUp;
