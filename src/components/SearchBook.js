import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Box, Button, InputAdornment, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(({ theme, isMobile }) => ({
  '& .MuiOutlinedInput-root': {
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    borderTopRightRadius: isMobile ? '50px' : '0px',
    borderBottomRightRadius: isMobile ? '50px' : '0px',
    height: isMobile ? '30px' : '40px',
    borderWidth: isMobile ? '1px' : '2px',
    borderStyle: 'solid',
    borderColor: isMobile ? theme.palette.grey[400] : theme.palette.primary.main,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: isMobile ? '8px 10px' : '12px 14px',
    fontSize: isMobile ? '0.55rem' : '1rem',
  },
  flexGrow: 1,
  flexShrink: 1,
  width: isMobile ? 'calc(100% - 40px)' : 'calc(100% - 60px)',
}));

const StyledButton = styled(Button)(({ isMobile }) => ({
  borderTopRightRadius: '50px',
  borderBottomRightRadius: '50px',
  height: isMobile ? '20px' : '40px', // 모바일과 데스크탑 높이 조정
  width: isMobile ? '40px' : '60px', // 버튼 고정 너비 설정
  fontSize: isMobile ? '0.75rem' : '1rem', // 버튼 텍스트 크기 조정
  minWidth: 0,
  padding: 0, // 패딩 제거
}));

const SearchBook = ({ searchQuery, setSearchQuery, fields, resetSearch }) => {
  const [selectedField, setSelectedField] = useState(fields[0]);

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleSearch = () => {
    const queryValue = searchQuery[selectedField] || '';
    if (queryValue.trim() === '') {
      navigate('/');
      setSearchQuery('');
    } else {
      const searchPath = `/search?${selectedField}=${queryValue}`;
      // Reset the search query to keep only the selected field
      const newSearchQuery = { [selectedField]: queryValue };
      setSearchQuery(newSearchQuery);
      navigate(searchPath);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: '100%', p: isMobile ? 1 : 2 }}>
      <form
        style={{ display: 'flex', alignItems: 'center', width: '100%' }}
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}>
        <StyledTextField
          placeholder="찾으시는 상품을 검색하세요."
          color="success"
          focused
          value={searchQuery[selectedField] || ''}
          onChange={(event) => setSearchQuery({ ...searchQuery, [selectedField]: event.target.value })}
          onKeyPress={handleKeyPress}
          isMobile={isMobile}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: isMobile ? { fontSize: '0.75rem' } : {}, // 모바일에서 글자 크기 조정
          }}
        />
        {!isMobile && (
          <StyledButton variant="contained" color="primary" type="submit">
            검색
          </StyledButton>
        )}
      </form>
    </Box>
  );
};

export default SearchBook;
