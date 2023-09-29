import { Link } from "react-router-dom";
import { Products } from "../components/Products";
import sale from  '../Images/sale.jpeg'



export default function Home() {
    return (<div>
        <div className="bg-blue-500 relative overflow-hidden h-96">
            
            <img src={sale} alt="Sale" className="w-full h-full object-cover opacity-60" />

            {/* Text Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h2 className="text-white text-5xl font-bold mb-4">Summer Sale</h2>
                <p className="text-white text-lg mb-4">Up to 50% off on selected items</p>
                <Link to={'/saleproducts'} className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300">Shop Now</Link>
            </div>
        </div>

        <Products />
    </div>)
}