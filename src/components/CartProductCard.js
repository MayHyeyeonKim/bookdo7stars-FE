import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton, FormControl, Select, MenuItem, Checkbox, Divider, Hidden, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { currencyFormat } from '../utils/number';
import { cartActions } from '../action/cartActions';
import DeliveryEstimate from '../components/BookDetailPage/DeliveryEstimate';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const CartProductCard = ({ item, isSelected, onSelectItem, userLevel, deliveryAddress }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleQtyChange = (id, value) => {
    dispatch(cartActions.updateItemQty(id, value));
  };

  const handleDeleteClick = (id, qty) => {
    const confirmDelete = window.confirm('선택한 상품을 삭제 하시겠습니까?');
    if (confirmDelete) {
      dispatch(cartActions.deleteCartItem(id, qty));
    }
  };

  const getDiscountRate = (level) => {
    switch (level) {
      case 'silver':
        return 0.02;
      case 'gold':
        return 0.05;
      case 'platinum':
        return 0.07;
      default:
        return 0;
    }
  };

  const discountRate = getDiscountRate(userLevel);
  const book = item.bookId || {}; // item.bookId가 undefined일 경우 빈 객체 사용
  const originalPrice = (book.priceSales || 0) * item.qty; // book.priceSales가 undefined일 경우 0 사용
  const discountAmount = originalPrice * discountRate;
  const discountedPrice = originalPrice - discountAmount;

  const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-icon': {
      display: isMobile ? 'none' : 'block',
    },
  }));

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
        <Checkbox checked={isSelected} onChange={() => onSelectItem(item._id)} color="primary" />
        <Box display="flex" alignItems="center" width="25%">
          <img src={book.cover} width={isMobile ? 40 : 60} alt={book.title} />
          <Box ml={2}>
            <Hidden smDown>
              <Typography variant="body2">{book.title || '제목 없음'}</Typography>
            </Hidden>
            <Typography variant="body2" color="textSecondary" style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
              {book.stockStatus === '' ? '재고 있음' : book.stockStatus}
            </Typography>
            {book.stockStatus !== '' && (
              <Typography variant="body2" color="error" style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
                이 도서는 예약 판매 도서입니다
              </Typography>
            )}
          </Box>
        </Box>
        <FormControl variant="outlined" size="small" style={{ width: isMobile ? '10%' : '15%' }}>
          <CustomSelect onChange={(event) => handleQtyChange(item._id, event.target.value)} value={item.qty}>
            {[...Array(10).keys()].map((x) => (
              <MenuItem key={x + 1} value={x + 1} style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
                {x + 1}
              </MenuItem>
            ))}
          </CustomSelect>
        </FormControl>
        <Box display="flex" flexDirection="column" alignItems="center" width="15%">
          <Typography variant="body2" style={{ textDecoration: 'line-through', color: 'grey', fontSize: isMobile ? '0.8rem' : '1rem' }}>
            ₩ {currencyFormat(originalPrice)}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            style={{
              fontSize: isMobile ? '0.8rem' : '1rem',
              whiteSpace: isMobile ? 'normal' : 'nowrap', // isMobile에 따른 조건부 스타일 적용
            }}>
            ₩ {currencyFormat(discountedPrice)} ({(discountRate * 100).toFixed(0)}% 할인)
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" width="15%">
          <DeliveryEstimate address={deliveryAddress} isMobile={isMobile} /> {/* isMobile prop 추가 */}
        </Box>
        <IconButton onClick={() => handleDeleteClick(item._id, item.qty)} color="secondary" style={{ width: '5%' }}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1, width: '100%' }} />
    </>
  );
};

export default CartProductCard;
