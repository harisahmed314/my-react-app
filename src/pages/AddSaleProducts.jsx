import React, { useState } from 'react';
import { storage, db } from '../config/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export const AddSaleProducts = () => {

    const [SaleProductName, setSaleProductName] = useState(''); // Updated names here
    const [SaleDetail, setSaleDetail] = useState(''); // and here
    const [SaleProductPrice, setSaleProductPrice] = useState(''); // and here

    const [saleDiscount, setSaleDiscount] = useState('');
    const [saleProductImg, setSaleProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const saleProductImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setSaleProductImg(selectedFile);
            setError('');
        } else {
            setSaleProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    const addSaleProduct = async (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `sale-product-images/${saleProductImg.name}`);
        try {
            await uploadBytes(storageRef, saleProductImg);
            const url = await getDownloadURL(storageRef);
            await addDoc(collection(db, 'SaleProducts'), {
                SaleProductName: SaleProductName,
                SaleDetail: SaleDetail,
                SaleProductPrice: SaleProductPrice,
                SaleDiscount: saleDiscount,
                SaleProductImg: url
            });

            // Resetting all fields after successful addition
            setSaleProductName('');
            setSaleDetail('');
            setSaleProductPrice('');
            setSaleDiscount('');
            setSaleProductImg(null);
            setError('');
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">ADD SALE PRODUCTS</h2>
                <hr className="border-t-2 border-gray-200 mb-6" />
            </div>

            <form className="max-w-lg mx-auto" onSubmit={addSaleProduct}>
                <div className="mb-4">
                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setSaleProductName(e.target.value)} value={SaleProductName} />

                </div>

                <div className="mb-4">
                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Detail</label>
                    <textarea type="text" rows="4" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setSaleDetail(e.target.value)} value={SaleDetail} />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">Product Price</label>
                    <input type="number" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setSaleProductPrice(e.target.value)} value={SaleProductPrice} />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-img" className="block text-sm font-medium text-gray-700">Product Image</label>
                    <input type="file" className="mt-1 p-2 w-full border rounded-md" id="file" required
                        onChange={saleProductImgHandler} />
                </div>

                <div className="mb-4">
                    <label htmlFor="sale-discount" className="block text-sm font-medium text-gray-700">Sale Discount (%)</label>
                    <input type="number" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setSaleDiscount(e.target.value)} value={saleDiscount} />
                </div>

                {/* ... */}
                <div className="text-center">
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">
                        ADD SALE PRODUCT
                    </button>
                </div>

                {error && <div className="mt-4 text-center text-red-500">{error}</div>}
            </form>
        </div>
    )
}
