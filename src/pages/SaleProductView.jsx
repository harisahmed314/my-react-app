import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SaleProductsContext } from '../Global/saleproductcontext';

const SaleProductView = () => {
    const { id } = useParams();
    const { saleProducts } = useContext(SaleProductsContext);
    const product = saleProducts.find(item => item.ProductID === id);

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className="p-6 bg-red-100 min-h-screen"> {/* Sale theme with a different background */}
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md relative">
                {/* Adding a "Sale" ribbon at the top right corner of the product */}
                <div className="absolute top-0 right-0 bg-red-500 text-white uppercase text-xs font-bold py-1 px-4 rounded-bl">Sale</div>

                <img className="w-full h-64 object-cover rounded" src={product.ProductImg} alt={product.ProductName} />
                <h2 className="mt-6 mb-2 text-2xl font-bold text-gray-700">{product.ProductName}</h2>
                <p className="mb-4 text-xl text-red-600">Rs {product.ProductPrice}.00</p> {/* Sale theme with a different text color */}
                <button className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300">Add to Cart</button>
            </div>
        </div>
    );
};

export default SaleProductView;
