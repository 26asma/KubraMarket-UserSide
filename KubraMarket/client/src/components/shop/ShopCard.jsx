import { Link } from "wouter";
import { Shop } from "@shared/schema";

/**
 * @typedef {Object} ShopCardProps
 * @property {import('@shared/schema').Shop} shop
 */

/**
 * @param {ShopCardProps} props
 */
export default function ShopCard({ shop }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-light relative overflow-hidden">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Link to={`/shop/${shop.id}`}>
            <button className="bg-white text-primary py-2 px-4 rounded-full font-medium">
              Visit Shop
            </button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-poppins font-bold text-lg mb-1">{shop.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{shop.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-amber-400 mr-1"><i className="bi bi-star-fill"></i></span>
            <span className="text-sm font-medium">{shop.rating}</span>
            <span className="text-gray-400 text-sm ml-1">({shop.reviewCount})</span>
          </div>
          <span className="text-xs text-gray-500">{shop.productCount} Products</span>
        </div>
      </div>
    </div>
  );
}
