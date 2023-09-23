import React, { useState } from 'react'
import { storage, db } from '../config/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [detail, setDetail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    const addProduct = (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `product-images/${productImg.name}`);
        uploadBytes(storageRef, productImg).then(snapshot => {
            console.log('Uploaded', snapshot.bytesTransferred, 'bytes.');

            getDownloadURL(storageRef).then(url => {
                db.collection('Products').add({
                    ProductName: productName,
                    Detail: detail,
                    ProductPrice: Number(productPrice),
                    ProductImg: url
                }).then(() => {
                    setProductName('');
                    setDetail('');
                    setProductPrice(0)
                    setProductImg('');
                    setError('');
                    document.getElementById('file').value = '';
                }).catch(err => setError(err.message))
            });
        }).catch(err => setError(err.message));
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">ADD PRODUCTS</h2>
                <hr className="border-t-2 border-gray-200 mb-6" />
            </div>

            <form className="max-w-lg mx-auto" onSubmit={addProduct}>
                <div className="mb-4">
                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setProductName(e.target.value)} value={productName} />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Detail</label>
                    <textarea type="text" rows="4" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setDetail(e.target.value)} value={detail} />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">Product Price</label>
                    <input type="number" className="mt-1 p-2 w-full border rounded-md" required
                        onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                </div>

                <div className="mb-4">
                    <label htmlFor="product-img" className="block text-sm font-medium text-gray-700">Product Image</label>
                    <input type="file" className="mt-1 p-2 w-full border rounded-md" id="file" required
                        onChange={productImgHandler} />
                </div>

                <div className="text-center">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">
                        ADD
                    </button>
                </div>

                {error && <div className="mt-4 text-center text-red-500">{error}</div>}
            </form>
        </div>


    )
}