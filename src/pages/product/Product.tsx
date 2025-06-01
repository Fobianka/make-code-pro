import { useParams } from 'react-router-dom';

import BackHome from '../../components/BackHome/BackHome';
import ToCartButton from '../../components/ToCartButton/ToCartButton';
import ToFavoriteButton from '../../components/ToFavoriteButton/ToFavoriteButton';
import ProductComments from './productComments/ProductComments';
import { useGetProductQuery } from '../../queries/brandsApi';
import './Product.css';

const Product = () => {
  const { id } = useParams();

  const { data: product } = useGetProductQuery(id!, { skip: !id });

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, img, rating, price, description } = product;

  return (
    <div>
      <BackHome />
      <div className="product-card">
        <img src={img} alt={name} />
        <div className="product-card-box">
          <h3>{name}</h3>
          <div>Рейтинг: {rating}</div>
          <b>Цена: {price}$</b>
          <p>{description}</p>
          <div className="card-icons">
            <ToFavoriteButton product={product} />
            <ToCartButton product={product} />
          </div>
        </div>
      </div>
      <ProductComments productId={product.id} />
    </div>
  );
};

export default Product;
