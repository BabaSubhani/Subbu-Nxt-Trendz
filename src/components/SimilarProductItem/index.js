import './index.css'

const SimilarProductItem = props => {
  const {product} = props
  const newProduct = {
    imageUrl: product.image_url,
    title: product.title,
    brand: product.brand,
    price: product.price,
    rating: product.rating,
  }
  const {imageUrl, title, brand, price, rating} = newProduct
  console.log(newProduct)
  return (
    <li className="products-li-container">
      <img src={imageUrl} alt="similar product" className="product-img" />
      <h1 className="title-name">{title}</h1>
      <p>
        by <span>{brand}</span>
      </p>
      <div className="price-and-rating-container">
        <p>{`Rs ${price}`}</p>
        <div className="rating-container">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
