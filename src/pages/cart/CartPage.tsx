import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import BackHome from '../../components/BackHome/BackHome';
import CartItem from './CartItem';
import './index.css';
import { loadCart } from './cartSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCart());
  }, []);

  const cartItems = useAppSelector((state) => state.cart.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      <BackHome />
      <div className="cardsList-from-cart">
        {cartItems.length ? (
          cartItems.map((el) => <CartItem key={el.id} product={el} />)
        ) : (
          <h4>Нет товаров в Корзине</h4>
        )}
      </div>
      <div className="cart-total">
        <p>Итого:</p>
        <span>{totalPrice} $</span>
      </div>
    </>
  );
};

export default CartPage;
