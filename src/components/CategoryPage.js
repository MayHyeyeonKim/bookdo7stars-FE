import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Drawer, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';
import CategoryList from './CategoryList/CategoryList';
import BooksGroupContainer from './BooksGroupPage/BooksGroupContainer';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);
  const navigate = useNavigate();
  const encodeCategoryPath = (path) => encodeURIComponent(path.join('>'));
  const [selectedPath, setSelectedPath] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [totalCategories, setTotalCategories] = useState([]);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const params = useParams();
  const [openCategories, setOpenCategories] = useState({ ['국내도서']: true });

  useEffect(() => {
    if (/^\d+$/.test(params.categoryid)) {
      dispatch(bookActions.getBookListByCategory(params.categoryid));
    }
  }, [params.categoryid, dispatch]);

  useEffect(() => {
    const categories = [...new Set(bookList.map((book) => book.categoryName))];
    setTotalCategories(categories);
  }, [bookList]);

  const onCategoryClick = useCallback(
    (categoryPath) => {
      // 카테고리를 '>'로 분리하여 배열로 변환
      const splitPath = categoryPath.split('>');

      // selectedPath 업데이트
      setSelectedPath(splitPath);
      setOpenCategories((prevOpen) => ({
        ...prevOpen,
        [categoryPath]: true,
      }));
      const categoryid = encodeCategoryPath(splitPath);
      navigate(`/books/all/category/${categoryid}`);
      if (isMobile) {
        setIsDrawerOpen(false);
      }
    },
    [navigate, isMobile],
  );

  useEffect(() => {
    if (selectedPath.length > 0) {
      const categoryid = encodeCategoryPath(selectedPath);
      navigate(`/books/all/category/${categoryid}`);
    }
  }, [selectedPath, navigate]);

  const handlePathClick = (index) => {
    const newPath = selectedPath.slice(0, index + 1);
    setSelectedPath(newPath);
    const categoryid = encodeCategoryPath(newPath);
    navigate(`/books/all/category/${categoryid}`);
  };

  const booksByCategory = bookList.filter((book) => book.categoryName.includes(params.categoryid));
  const title = params.categoryid + ` (${booksByCategory.length})`;

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  if (!bookList || !booksByCategory) {
    return null;
  }

  return (
    <Container
      sx={{
        maxWidth: '100%',
        '@media (min-width: 800px)': {
          maxWidth: '1000px',
          margin: 'auto',
        },
        '@media (min-width: 1000px)': {
          maxWidth: '1200px',
          margin: 'auto',
        },
        '@media (min-width: 1200px)': {
          maxWidth: '1400px',
          margin: 'auto',
        },
        '@media (min-width: 1400px)': {
          maxWidth: '1600px',
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        padding: 0,
        margin: 'auto',
      }}>
      <Grid container spacing={2}>
        {!isMobile && (
          <Grid item xs={2}>
            <Box>
              <Box sx={{ overflowX: 'auto', marginLeft: '10px', marginTop: '10px', fontSize: '12px' }}>
                {selectedPath.map((pathItem, index) => (
                  <span key={index}>
                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handlePathClick(index)}>
                      {pathItem}
                    </span>
                    {index < selectedPath.length - 1 && ' > '}
                  </span>
                ))}
              </Box>
              <CategoryList
                totalCategories={totalCategories}
                onCategoryClick={onCategoryClick}
                selectedPath={selectedPath} // setSelectedPath 전달
                openCategories={openCategories}
                setOpenCategories={setOpenCategories}
              />
            </Box>
          </Grid>
        )}
        {isMobile && (
          <>
            <Box sx={{ marginLeft: '10px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleDrawer(true)} color="primary" aria-label="filter">
                <MenuIcon />
              </IconButton>
              <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                {selectedPath.map((pathItem, index) => (
                  <span key={index}>
                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handlePathClick(index)}>
                      {pathItem}
                    </span>
                    {index < selectedPath.length - 1 && ' > '}
                  </span>
                ))}
              </Box>
            </Box>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <CategoryList
                totalCategories={totalCategories}
                onCategoryClick={onCategoryClick}
                selectedPath={selectedPath} // setSelectedPath 전달
                openCategories={openCategories}
                setOpenCategories={setOpenCategories}
              />
            </Drawer>
          </>
        )}
        <Grid item xs={12} sm={10}>
          <Box>
            <BooksGroupContainer bookList={booksByCategory} title={title} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage;
