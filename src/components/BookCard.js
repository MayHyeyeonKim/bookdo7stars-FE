import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as types from '../constants/book.constants';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';
import { favoriteActions } from '../action/favoriteActions';
import { cartActions } from '../action/cartActions';
import { commonUiActions } from '../action/commonUiAction';

const BookCard = ({ book, favorite, sx }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const clickBookCard = (book) => {
    dispatch({ type: types.SET_SELECTED_BOOK, payload: book });
    navigate(`/book/${book._id}`);
  };

  const handleFavoriteClick = () => {
    if (user) {
      dispatch(favoriteActions.addFavorite(book._id));
    } else {
      dispatch(commonUiActions.showToastMessage('로그인이 필요합니다!', 'error'));
    }
  };

  const deleteFavoriteClick = () => {
    dispatch(favoriteActions.deleteFavorite(book._id));
  };

  const handleCartClick = () => {
    if (user) {
      dispatch(cartActions.addToCart(book, 1, '')); // 배송 정보 추가
    } else {
      dispatch(commonUiActions.showToastMessage('로그인이 필요합니다!', 'error'));
    }
  };

  return (
    <Card
      sx={{
        ...sx,
        width: 230,
        height: 370,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}>
      <CardMedia
        component="img"
        image={book.cover}
        alt={book.title}
        sx={{
          height: 275,
          objectFit: 'cover',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          cursor: 'pointer',
        }}
        onClick={() => clickBookCard(book)}
      />
      <CardContent sx={{ height: 95, width: '100%', padding: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '100%',
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '100%',
              textAlign: 'left',
            }}>
            {book.author}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <Typography variant="body2" color="text.primary">
              {`₩${book.priceStandard}`}
            </Typography>
            <Box>
              {favorite ? (
                <IconButton onClick={deleteFavoriteClick} sx={{ padding: '5px' }}>
                  <FavoriteBorderIcon fontSize="small" sx={{ color: pink[500] }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleFavoriteClick} sx={{ padding: '5px' }}>
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton onClick={handleCartClick} sx={{ padding: '5px' }}>
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
