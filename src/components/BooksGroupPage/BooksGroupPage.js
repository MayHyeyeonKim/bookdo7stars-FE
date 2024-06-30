import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Grid, Drawer, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';
import BooksGroupContainer from './BooksGroupContainer';
import CategoryList from '../CategoryList/CategoryList';
import { getGroupNameInKorean } from '../../_helper/getGroupNameInKorean';

const BooksGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookList, groupBooks } = useSelector((state) => state.book);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 드로어 열림 상태
  const [selectedPath, setSelectedPath] = useState(['국내도서']); // 선택된 카테고리 경로 상태
  const isMobile = useMediaQuery('(max-width: 600px)'); // 모바일 여부 확인
  const [query, setQuery] = useState(new URLSearchParams(location.search)); // 쿼리 파라미터 상태 관리
  const [categoryQuery, setCategoryQuery] = useState('국내도서'); // 초기값 설정
  const { bookGroup } = useParams();
  const totalCategories = bookList.map((book) => book.categoryName); // bookList가 있을 때만 사용
  const [openCategories, setOpenCategories] = useState({ ['국내도서']: true });
  const [subtitle, setSubtitle] = useState(query.get('subtitle') || null);

  // 쿼리 파라미터에서 categoryPath 초기값 설정
  useEffect(() => {
    const path = query.get('categoryPath');
    if (path) {
      const decodedPath = decodeURIComponent(path);
      setCategoryQuery(decodedPath);
      setSelectedPath(decodedPath.split('>'));
    } else {
      setCategoryQuery('국내도서');
      setSelectedPath(['국내도서']);
    }
  }, [query]);

  // bookGroup 및 categoryQuery가 변경될 때 책 목록 가져오기
  useEffect(() => {
    if (bookGroup && categoryQuery) {
      dispatch(bookActions.getBookListByGroup(bookGroup, { categoryQuery }));
    }
  }, [bookGroup, dispatch, categoryQuery]);

  // categoryPath가 변경될 때 선택된 경로 업데이트
  useEffect(() => {
    if (location.search) {
      const path = new URLSearchParams(location.search).get('categoryPath');
      if (path) {
        setSelectedPath(path.split('>'));
      }
      const subtitleQuery = new URLSearchParams(location.search).get('subtitle');
      if (subtitleQuery) {
        setSubtitle(decodeURIComponent(subtitleQuery));
      }
    }
  }, [location.search]);

  // 데이터가 없을 경우 처리
  if (!bookList || !groupBooks || !bookGroup) return null;

  const groupNameInKorean = getGroupNameInKorean(bookGroup);

  // 카테고리 클릭 시 처리
  const onCategoryClick = useCallback(
    (categoryPath) => {
      setSubtitle(categoryPath);
      const splitPath = categoryPath.split('>'); // 카테고리를 '>'로 분리하여 배열로 변환
      setSelectedPath(splitPath); // selectedPath 업데이트
      setOpenCategories((prevOpen) => ({
        ...prevOpen,
        [categoryPath]: true,
      }));
      const categoryId = splitPath.join('>'); // 인코딩하지 않음
      const newQuery = new URLSearchParams(location.search);
      newQuery.set('categoryPath', categoryId);
      newQuery.set('subtitle', encodeURIComponent(categoryPath));
      setQuery(newQuery);
      navigate(`/books/group/${bookGroup}?${newQuery.toString()}`, { replace: true });
      if (isMobile) {
        setIsDrawerOpen(false); // 모바일에서는 드로어 닫기
      }
    },
    [navigate, isMobile, bookGroup, location.search],
  );

  // 드로어 열기/닫기 토글
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // 경로 클릭 시 처리
  const handlePathClick = (index) => {
    const newPath = selectedPath.slice(0, index + 1);
    setSubtitle(newPath.join('>'));
    setSelectedPath(newPath);
    const categoryId = newPath.join('>'); // 인코딩하지 않음
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('categoryPath', categoryId);
    newQuery.set('subtitle', encodeURIComponent(newPath.join('>')));
    setQuery(newQuery);
    navigate(`/books/group/${bookGroup}?${newQuery.toString()}`, { replace: true });
  };

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
            <Box sx={{ overflowX: 'auto', fontSize: '12px', marginLeft: '10px' }}>
              {selectedPath.map((pathItem, index) => (
                <span key={index}>
                  <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handlePathClick(index)}>
                    {decodeURIComponent(pathItem)}
                  </span>
                  {index < selectedPath.length - 1 && ' > '}
                </span>
              ))}
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
                      {decodeURIComponent(pathItem)}
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
            <BooksGroupContainer bookList={groupBooks} title={groupNameInKorean} subtitle={subtitle} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BooksGroupPage;
