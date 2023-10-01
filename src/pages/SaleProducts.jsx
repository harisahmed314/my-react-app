import React, { useContext } from 'react';
import { SaleProductsContext } from '../Global/saleproductcontext';
import { CartContext } from '../Global/CartContext';
import { Link } from 'react-router-dom';


export const SaleProducts = () => {
    const { saleProducts } = useContext(SaleProductsContext);
    const { dispatch } = useContext(CartContext);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {saleProducts.length !== 0 && <h1 className="text-3xl font-semibold mb-6">Sale Products</h1>}
            <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saleProducts.length === 0 ?
                    <div className="col-span-full bg-white p-6 rounded-md shadow-md text-center text-gray-600">Slow internet... no sale products to display</div>
                    :
                    saleProducts.map(product => (
                        <Link to={`/saleproduct/${product.ProductID}`} key={product.ProductID}>


                            <div className="product-card bg-white rounded-lg shadow-md p-4" key={product.ProductID}>
                                <div className="product-img mb-4">
                                    <img className="mx-auto rounded-md object-cover h-48 w-full" src={product.ProductImg} alt="Product on Sale" />
                                </div>
                                <div className="product-name text-xl font-medium mb-2 text-center">
                                    {product.ProductName}
                                </div>
                                <div className="product-price text-lg font-semibold mb-4 text-center text-red-600"> {/* Changed text color to red for sale items */}
                                    Rs {product.ProductPrice}.00
                                </div>
                                <button className="addcart-btn w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-all duration-300" onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>
                                    ADD TO CART
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};
