import { TbShoppingCartFilled } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';

import { addToCart, deleteFromCart } from '../../pages/cart/cartSlice';
import { ProductType } from '../../types';

const ToCartButton = ({ product }: { product?: ProductType }) => {
  const cartItems = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  const onClickToCart = () => {
    if (!Array.isArray(cartItems) || !product) return;

    if (cartItems.some((el) => el?.id === product?.id)) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const checkedItem =
    cartItems?.some((item) => item?.id === product?.id) || false;

  return (
    <TbShoppingCartFilled
      className={`card-basket ${checkedItem ? 'active' : ''}`}
      onClick={onClickToCart}
    />
  );
};

export default ToCartButton;
