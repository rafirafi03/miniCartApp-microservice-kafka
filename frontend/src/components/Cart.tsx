import React, { useState } from 'react';
import { FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/100' },
  ]);

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl mx-auto mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center">
            <FaArrowLeft className="inline mr-2" />
            Your Cart
          </h2>
          <Link
            to="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
          >
            <FaArrowLeft />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-6">
          {cart.length === 0 && <p className="text-center text-gray-600">Your cart is empty.</p>}
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(index)}>
                <FaTrashAlt size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Total and Checkout */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <p className="text-lg font-semibold text-gray-800">Total: <span className="text-indigo-500">${total}</span></p>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
