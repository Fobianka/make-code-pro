import { useEffect } from 'react';

import Card from '../../components/Card';
import BackHome from '../../components/BackHome/BackHome';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import { fetchFavorites } from './favoritesSlice';

const FavoritePage = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  return (
    <>
      <BackHome />
      <div className="cards-list">
        {favorites.length ? (
          favorites.map((el) => <Card key={el.id} product={el} />)
        ) : (
          <h4>Нет товаров в Избранном</h4>
        )}
      </div>
    </>
  );
};

export default FavoritePage;
