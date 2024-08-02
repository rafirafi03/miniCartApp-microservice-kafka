import React, { useState } from 'react';
import { FaTrashAlt, FaShoppingCart, FaPlusCircle } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/100' },
];

const ListProduct: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          <FaShoppingCart className="inline mr-2" />
          Your Cart
        </h2>

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

        {/* Products List */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
                  onClick={() => addToCart(product)}
                >
                  <FaPlusCircle />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
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

export default ListProduct;
