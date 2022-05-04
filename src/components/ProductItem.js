import './css/ProductsItem.css'

const ProductsItem = (props) => {
    let productData = props.productData
    return (
        <div className="product-item">
            <span className='product-item-category'>{productData.category}</span>
            <span className='product-item-name'>{productData.name}</span>
            <span className='product-item-price'>{productData.price}</span>
            <button className='product-item-buy' onClick={() => props.buy(props.productData.index)}>Buy</button>
        </div>
    )
}

export default ProductsItem;