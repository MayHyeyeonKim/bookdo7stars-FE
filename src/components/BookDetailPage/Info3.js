import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TableContainer, TableBody, Table, TableRow, TableCell, Paper, Container, Tabs, Tab, Box, Typography } from '@mui/material';
import { commentActions } from '../../action/commentAction';
import { useDispatch, useSelector } from 'react-redux';
import './Info3.css';
import DeliveryPolicy from './DeliveryPolicy';
import CommentSection from './CommentSection';
import AuthorSection from './AuthorBooksSection';
import BookCard from '../BookCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const yOffset = offset; // 오프셋 적용
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: yPosition, behavior: 'smooth' });
  }
};

const Info3 = ({ selectedBook, otherBooksByAuthor }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('bookDescription');
  const { user } = useSelector((state) => state.user);
  const { comments, createCommentSuccess, deleteCommentSuccess } = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const query = useQuery();
  const section = query.get('section');

  useEffect(() => {
    if (createCommentSuccess || deleteCommentSuccess) {
      dispatch(commentActions.getCommentsByBook(selectedBook._id));
    }
  }, [createCommentSuccess, dispatch, deleteCommentSuccess]);

  useEffect(() => {
    if (section && section !== activeTab) {
      setActiveTab(section);
      scrollToElement(section, -80); // 탭 높이만큼 오프셋 적용
    }
  }, [section, activeTab]);

  const handleTabChange = (event, newValue) => {
    if (newValue !== activeTab) {
      setActiveTab(newValue);
      navigate({ search: `?section=${newValue}` }, { replace: true });
      setTimeout(() => scrollToElement(newValue, -80), 0); // 탭 높이만큼 오프셋 적용
    }
  };

  useEffect(() => {
    dispatch(commentActions.getCommentsByBook(selectedBook._id));
  }, []);

  const deleteComment = (commentId) => {
    dispatch(commentActions.deleteComment(commentId, selectedBook._id));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['bookDescription', 'bookInfo', 'author', 'reviews', 'delivery'];
      let currentSection;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            currentSection = section;
          }
        }
      });
      if (currentSection && currentSection !== activeTab) {
        setActiveTab(currentSection);
        navigate({ search: `?section=${currentSection}` }, { replace: true });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, navigate]);

  return (
    <Container sx={{ mt: 5 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        scrollbuttons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ backgroundColor: '#DADFCE', opacity: '90%', position: 'sticky', top: '0', ml: '0', width: '100%', zIndex: 1000 }}>
        <Tab label="도서소개" value="bookDescription" />
        <Tab label="도서정보" value="bookInfo" />
        <Tab label="저자의 다른 책" value="author" />
        <Tab label="리뷰" value="reviews" />
        <Tab label="배송" value="delivery" />
      </Tabs>

      <Box id="bookDescription" my={4}>
        <Typography variant="h4">도서소개</Typography>
        <Box component={Paper} sx={{ mt: 2, mb: 2, outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '100%' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1">{selectedBook.description ? selectedBook.description : 'No description available'}</Typography>
          </Box>
        </Box>
      </Box>
      <Box id="bookInfo" my={4}>
        <Typography variant="h4">도서정보</Typography>
        <TableContainer component={Paper} sx={{ mt: 2, mb: 5 }}>
          <Table sx={{ outline: '1px solid #DFE4DF' }}>
            <TableBody sx={{ outline: '1px solid #DFE4DF' }}>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>ISBN</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{selectedBook.isbn}</TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>출판날짜</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{selectedBook.pubDate}</TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>카테고리</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{selectedBook.categoryName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box id="author" my={4}>
        <AuthorSection otherBooksByAuthor={otherBooksByAuthor} />
      </Box>

      <Box id="reviews" my={4}>
        <Typography variant="h4">리뷰</Typography>
        <CommentSection comments={comments} bookId={selectedBook._id} deleteComment={deleteComment} user={user} />
      </Box>

      <Box id="delivery" my={4}>
        <Typography variant="h4">배송/반품/교환 안내</Typography>
        <DeliveryPolicy />
      </Box>
    </Container>
  );
};

export default Info3;
