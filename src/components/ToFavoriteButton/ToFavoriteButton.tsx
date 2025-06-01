import { IoHeart } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import {
  addToFavorites,
  deleteFavorite,
} from '../../pages/favorite/favoritesSlice';
import { ProductType } from '../../types';

const ToFavoriteButton = ({ product }: { product?: ProductType }) => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const dispatch = useAppDispatch();

  const onClickFavorites = () => {
    if (!Array.isArray(favorites) || !product) return;

    if (favorites.some((el) => el?.id === product?.id)) {
      dispatch(deleteFavorite(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const isFavorite =
    favorites?.some((item) => item?.id === product?.id) || false;

  return (
    <IoHeart
      className={`favorite-icon ${isFavorite ? 'active' : ''}`}
      onClick={onClickFavorites}
    />
  );
};

export default ToFavoriteButton;
