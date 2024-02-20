import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const constantStatus = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class ProductItemDetails extends Component {
  state = {productItemList: {}, quantity: 1, status: ''}

  componentDidMount() {
    this.getProductsDetails()
  }

  getProductsDetails = async () => {
    this.setState({status: constantStatus.initial})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const newData = {
        availability: fetchedData.availability,
        brand: fetchedData.brand,
        description: fetchedData.description,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        pricing: fetchedData.price,
        rating: fetchedData.rating,
        similarProducts: fetchedData.similar_products,
        style: fetchedData.style,
        title: fetchedData.title,
        totalReviews: fetchedData.total_reviews,
      }
      console.log(newData)
      this.setState({productItemList: newData, status: constantStatus.success})
    } else {
      this.setState({status: constantStatus.failure})
      console.log('fail')
    }
  }

  decrementQuantity = () => {
    this.setState(prevState => ({
      quantity:
        prevState.quantity > 1 ? prevState.quantity - 1 : prevState.quantity,
    }))
  }

  incrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-view"
      />
      <h1>Product Not Found</h1>
      <button
        type="button"
        className="add-to-cart-btn"
        onClick={this.continueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {productItemList, quantity} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      pricing,
      rating,
      similarProducts,
      title,
      totalReviews,
    } = productItemList

    const similarProductsList = similarProducts ? (
      similarProducts.map(eachProduct => (
        <SimilarProductItem key={eachProduct.id} product={eachProduct} />
      ))
    ) : (
      <p>No similar products found</p>
    )

    return (
      <>
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-img" />
          <div className="product-details-text-container">
            <h1 className="product-title">{title}</h1>
            <p>{`RS ${pricing}`}</p>
            <div className="reviews-and-rating-container">
              <div className="rating-container">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-img"
                />
              </div>
              <p>{`${totalReviews} Reviews`}</p>
            </div>
            <p>{description}</p>
            <p>
              <span>Available:</span> {availability}
            </p>
            <p>
              <span>Brand:</span> {brand}
            </p>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                onClick={this.decrementQuantity}
                aria-label="Decrease quantity"
                data-testid="minus"
                className="icon-style-btn"
              >
                <BsDashSquare className="icon-style" />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                onClick={this.incrementQuantity}
                aria-label="Increase quantity"
                data-testid="plus"
                className="icon-style-btn"
              >
                <BsPlusSquare className="icon-style" />
              </button>
            </div>

            <button type="button" className="add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products-container">
          <h1>Similar Products</h1>
          <ul className="ul-similar-products-container">
            {similarProductsList}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    </>
  )

  renderMultipleViews = () => {
    const {status} = this.state

    switch (status) {
      case constantStatus.initial:
        return this.renderLoadingView()
      case constantStatus.success:
        return this.renderSuccessView()
      case constantStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-app-container">
          {this.renderMultipleViews()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
