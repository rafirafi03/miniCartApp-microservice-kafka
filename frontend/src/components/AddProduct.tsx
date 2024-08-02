import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/100' },
];

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState<{ name: string; price: string; image: string }>({
    name: '',
    price: '',
    image: '',
  });

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, price, image } = newProduct;
    if (name && price && image) {
      const newProductId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, { id: newProductId, name, price: parseFloat(price), image }]);
      setNewProduct({ name: '', price: '', image: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
        <form onSubmit={addProduct} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-4"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-4"
              placeholder="Product Price"
              required
              step="0.01"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="border rounded-lg py-2 px-4"
              placeholder="Image URL"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
