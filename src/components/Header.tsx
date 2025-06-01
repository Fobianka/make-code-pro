import { RiMenu2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { Button, Input, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { useAppSelector } from '../reduxHooks';
import ToCartButton from './ToCartButton/ToCartButton';
import ToFavoriteButton from './ToFavoriteButton/ToFavoriteButton';
import Login from './Login/Login';

type Props = {
  searchParams: URLSearchParams;
  handleMenuOpen: () => void;
  handleChangeFilters: (a: string, b: string) => void;
};

const Header = ({
  handleChangeFilters,
  handleMenuOpen,
  searchParams,
}: Props) => {
  const debouncedHandler = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChangeFilters('q', e.target.value),
    700
  );

  const cart = useAppSelector((state) => state.cart.cart);
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const productCartQty = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const productFavoriteQty = favorites.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const filters =
    searchParams.get('category') ||
    searchParams.get('price_gte') ||
    searchParams.get('price_lte');

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="header">
      <Button
        size="large"
        type="text"
        onClick={() => setOpenModal(true)}
        icon={<UserOutlined style={{ fontSize: 25, color: '#dd6262' }} />}
      />
      <img
        src="https://img.freepik.com/premium-vector/letters-with-flash-logo-lightning-thunder-letter-logo-design_617472-5359.jpg"
        alt="logo"
      />
      <div className="menu-btn-wrapper">
        {filters && <div className="circle" />}
        <RiMenu2Fill className="menu-btn" onClick={handleMenuOpen} />
      </div>
      <Input
        onChange={debouncedHandler}
        defaultValue={searchParams.get('q') || ''}
      />
      <div className="header-basket-box">
        <Link to="/cart">
          <ToCartButton />
        </Link>
        {!!productCartQty && <div className="basket-num">{productCartQty}</div>}
      </div>
      <div className="favorite-box-wrap">
        <Link to="/favorites">
          <ToFavoriteButton />
        </Link>
        {!!productFavoriteQty && (
          <div className="favorite-num">{productFavoriteQty}</div>
        )}
      </div>
      <Modal
        onCancel={closeModal}
        open={openModal}
        footer={null}
        destroyOnHidden
      >
        <Login />
      </Modal>
    </div>
  );
};

export default Header;
