import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import { Drawer, Pagination, Card as CardAntd } from 'antd';
import { useSearchParams } from 'react-router-dom';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Sort from '../../components/Sort/Sort';
import { fetchFavorites } from '../favorite/favoritesSlice';
import { loadCart } from '../cart/cartSlice';
import { fetchProducts } from './productsSlice';

const Main = () => {
  const { products, loading } = useAppSelector((state) => state.products);

  const [openNavbar, setOpenNavbar] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const copyParams = new URLSearchParams(searchParams);

  const handleChangeFilters = (key: string, value: string) => {
    if (copyParams.get(key) === value || !value) {
      copyParams.delete(key);
      key === '_order' && copyParams.delete('_sort');
    } else if (key === '_order') {
      copyParams.set('_sort', 'price');
      copyParams.set('_order', value);
    } else {
      copyParams.set(key, value);
    }

    if (key !== '_page') {
      copyParams.set('_page', '1');
    }

    setSearchParams(copyParams);
  };

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchProducts(searchParams.toString()));
    }
  }, [searchParams]);

  const handleMenuOpen = () => {
    setOpenNavbar(!openNavbar);
  };

  useEffect(() => {
    copyParams.set('_page', '1');
    setSearchParams?.(copyParams);

    dispatch(fetchFavorites());
    dispatch(loadCart());
  }, []);

  return (
    <>
      <Header
        searchParams={searchParams}
        handleChangeFilters={handleChangeFilters}
        handleMenuOpen={handleMenuOpen}
      />
      <Drawer
        open={openNavbar}
        placement="left"
        onClose={() => setOpenNavbar(false)}
      >
        <Navbar
          handleChangeFilters={handleChangeFilters}
          searchParams={searchParams}
        />
      </Drawer>
      <Sort
        searchParams={searchParams}
        handleChangeFilters={handleChangeFilters}
      />

      <div className="cards-list">
        {loading ? (
          <div style={{ display: 'flex', margin: 30, gap: 30 }}>
            {[...Array(5).keys()].map((i) => (
              <CardAntd key={i} loading style={{ minWidth: 270 }} />
            ))}
          </div>
        ) : (
          <>
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
      <Pagination
        current={
          searchParams.get('_page') ? Number(searchParams.get('_page')) : 1
        }
        total={23}
        onChange={(page) => handleChangeFilters('_page', String(page))}
      />
    </>
  );
};

export default Main;
