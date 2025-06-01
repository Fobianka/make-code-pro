import { Link } from 'react-router-dom';

import ToFavoriteButton from './ToFavoriteButton/ToFavoriteButton';
import ToCartButton from './ToCartButton/ToCartButton';
import { ProductType } from '../types';

type Props = {
  product: ProductType;
};

const Card = ({ product }: Props) => {
  const { name, price, img, rating, id } = product;

  return (
    <div className="card">
      <Link to={`/product/${id}`}>
        <img src={img} alt={name} />
      </Link>
      <div className="card-box">
        <Link to={`/product/${id}`}>
          <div>
            <h3>{name}</h3>
            <div>Рейтинг: {rating}</div>
            <b>Цена: {price}$</b>
          </div>
        </Link>
        <div className="card-icons">
          <ToFavoriteButton product={product} />
          <ToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default Card;
