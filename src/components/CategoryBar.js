import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, MenuItem, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { categoryActions } from '../action/categoryActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryPopOver from './CategoryPopOver';
import { getCategoryHierarchy } from '../_helper/getCategoryHierarchy';
import { getSubCategories } from '../_helper/getSubCategories';
import { getKeyByValue } from '../_helper/getKeyByValue';
import { getBookGroupArray } from '../_helper/getBookGroupArray';
import MenuIcon from '@mui/icons-material/Menu';

const CategoryBar = ({ bookList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(categoryActions.getCategoryList());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handlePopperClose = () => {
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const totalCategories = [];
  bookList.map((book) => {
    return totalCategories.push(book.categoryName);
  });

  const categoryHierarchy = getCategoryHierarchy(totalCategories);
  const firstSubCategories = getSubCategories(categoryHierarchy, '국내도서').sort();
  const secondAllSubCategories = {};
  const thirdAllSubCategories = {};

  firstSubCategories.forEach((firstCategory) => {
    const secondSubCategories = getSubCategories(categoryHierarchy['국내도서'], firstCategory).sort();
    secondAllSubCategories[firstCategory] = secondSubCategories;
    thirdAllSubCategories[firstCategory] = {};
    secondSubCategories.forEach((secondCategory) => {
      const thirdSubCategories = getSubCategories(categoryHierarchy['국내도서'][firstCategory], secondCategory).sort();
      thirdAllSubCategories[firstCategory][secondCategory] = thirdSubCategories;
    });
  });

  const queryTypes = ['ItemNewAll', 'ItemNewSpecial', 'BestSeller', 'BlogBest'];
  const bookGroups = {
    ItemNewAll: '새로 나온 책',
    ItemNewSpecial: '화제의 신간',
    BestSeller: '베스트 셀러',
    BlogBest: '블로그 베스트',
  };

  const groups = getBookGroupArray(queryTypes, bookGroups);
  groups.push('전체 도서', '에디터 추천');
  const index = groups.indexOf('전체 도서');

  if (index > -1) {
    const [item] = groups.splice(index, 1);
    groups.unshift(item);
  }

  const goToAllBooksOfGroup = (group) => {
    if (group === '전체 도서') {
      navigate('/books/all');
    } else if (group === '에디터 추천') {
      navigate('books/editor-recommend');
    } else {
      const queryType = getKeyByValue(bookGroups, group);
      navigate(`/books/group/${queryType}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', borderBottom: '2px solid #035036', borderTop: '2px solid #035036' }}>
      <Toolbar sx={{ padding: { xs: '0 8px', sm: '0 16px' } }}>
        <Box>
          <CategoryPopOver
            anchorEl={anchorEl}
            secondAllSubCategories={secondAllSubCategories}
            thirdAllSubCategories={thirdAllSubCategories}
            handlePopperClose={handlePopperClose}
            id={id}
            open={open}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}>
          <Box
            sx={{
              display: isMobile ? 'grid' : 'flex',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'none',
              gap: 1,
              flexWrap: isMobile ? 'none' : 'wrap',
              width: '100%',
            }}>
            {groups.map((group, index) => (
              <MenuItem key={index} onClick={() => goToAllBooksOfGroup(group)}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' }, cursor: 'pointer', color: '#035036', fontWeight: 'bold' }}>
                  {group}
                </Typography>
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton
              onClick={handlePopperClick}
              sx={{
                color: 'primary.main',
                width: { xs: 40, sm: 50 },
                height: { xs: 40, sm: 50 },
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CategoryBar;
