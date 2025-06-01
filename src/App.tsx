// import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Main from './pages/main/Main';
import FavoritePage from './pages/favorite/FavoritePage';
import CartPage from './pages/cart/CartPage';
import Product from './pages/product/Product';
// import { fetchFavorites } from './pages/favorite/favoritesSlice';
// import { loadCart } from './pages/cart/cartSlice';
import Admin from './pages/admin/Admin';
// import { useAppDispatch } from './reduxHooks';

function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchFavorites());
  //   dispatch(loadCart());
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
