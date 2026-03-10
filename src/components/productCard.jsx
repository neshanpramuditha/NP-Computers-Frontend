import { Link } from "react-router-dom"
import getFormattedPrice from "../../pages/utils/price-format"

export default function ProductCard(props){
  const product = props.product

  return(
    <Link 
      to={"/overview/"+product.productID}
      className="group w-[220px] h-[360px] m-4 p-4 rounded-2xl border border-gray-100 shadow-md bg-white relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >

      {/* Image Container */}
      <div className="w-full h-[160px] mb-4 overflow-hidden rounded-xl relative bg-gray-50">

        {/* First Image */}
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
        />

        {/* Second Image */}
        <img
          src={product.images?.[1]}
          alt={product.name}
          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
        />

      </div>

      <div className="mb-2">
        <span className="text-[11px] tracking-wide text-gray-400">
          {product.productID}
        </span>

        <div className="text-base font-semibold text-gray-800 leading-snug mt-1 line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </div>
      </div>

      {/* Price Section */}
      <div className="mt-3">

        {
          product.labelledPrice > product.price &&
          <p className="text-sm text-red-500 line-through opacity-70">
            {getFormattedPrice(product.labelledPrice)}
          </p>
        }

        <p className="text-lg text-accent font-bold tracking-wide">
          {getFormattedPrice(product.price)}
        </p>

      </div>

    </Link>
  )
}