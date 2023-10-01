

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../Global/productcontext';

const ProductView = () => {
    const { id } = useParams();
    const { products } = useContext(ProductsContext);
    const product = products.find(item => item.ProductID === id);

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <img className="w-full h-64 object-cover rounded" src={product.ProductImg} alt={product.ProductName} />
                <h2 className="mt-6 mb-2 text-2xl font-bold text-gray-700">{product.ProductName}</h2>
                <p className="mb-4 text-xl text-gray-600">Rs {product.ProductPrice}.00</p>
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductView;
