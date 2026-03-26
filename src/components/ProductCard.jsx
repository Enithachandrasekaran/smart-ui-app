import "./ProductCard.css";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="card-img" />

      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>

      <div className="price bg-black">
        <span className="original" class="bg-blue-800">₹{product.originalPrice}</span>
        <span className="text-red-500 text-3xl">₹{product.offerPrice}</span>
      </div>

      <div className="btn-group">
        <button onClick={() => addToCart(product)} className="btn-primary">
          Add to Cart
        </button>

        <button className="btn-wishlist">❤️</button>
      </div>
    </div>
  );
}