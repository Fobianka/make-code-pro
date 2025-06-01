import { useAppDispatch } from '../../reduxHooks';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { deleteFromCart, updateProductCart } from './cartSlice';
import { ProductType } from '../../types';
import './index.css';

type Props = {
  product: ProductType;
};

const CartItem = ({ product }: Props) => {
  const { name, price, img, id, quantity } = product;

  const dispatch = useAppDispatch();

  const handleChangePlusQuantity = () => {
    const newProduct = { ...product, quantity: quantity + 1 };
    dispatch(updateProductCart(newProduct));
  };

  const handleChangeMinusQuantity = () => {
    if (quantity > 1) {
      const newProduct = { ...product, quantity: quantity - 1 };
      dispatch(updateProductCart(newProduct));
    }
  };

  return (
    <div className="card-from-cart">
      <Link to={`/product/${id}`}>
        <img src={img} alt={name} />
      </Link>
      <Link to={`/product/${id}`}>
        <h3>{name}</h3>
      </Link>
      <div className="card-box">
        <div className="quantity-box">
          <button onClick={handleChangePlusQuantity}>+</button>
          <span>{quantity}</span>
          <button onClick={handleChangeMinusQuantity}>-</button>
        </div>
        <b>{price * quantity}$</b>
        <MdDeleteForever
          className="delete-icon"
          onClick={() => dispatch(deleteFromCart(id))}
        />
        {/* <div className="card-icons">
          <IoHeart
            className={`favorite-icon ${addedFavorites ? 'active' : ''}`}
            onClick={() => onClickFavorites(product)}
          />

          {cartIds && (
            <TbShoppingCartFilled
              className={`card-basket ${cartIds.includes(id) ? 'active' : ''}`}
              onClick={() => onClickToCart(product)}
            />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CartItem;
