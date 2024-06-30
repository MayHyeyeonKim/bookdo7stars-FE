import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, ButtonGroup, Button } from '@mui/material';

const FilterBar = ({ onFilterChange, onShowAllBooks, isDrawerOpen, toggleDrawer }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortOrder, setSortOrder] = useState('asc');

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortOrderChange = (order) => {
    if (isDrawerOpen) {
      setSortOrder(order);
      onFilterChange({ priceRange, sortOrder: order });
    }
  };

  const handleFilterApply = () => {
    onFilterChange({ priceRange, sortOrder });
    toggleDrawer(); // Drawer 닫기
  };

  const commonWidth = '150px'; // Slider와 ButtonGroup의 공통 너비

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '10px',
        '& .MuiButtonBase-root': {
          fontSize: '12px',
        },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography variant="body2" sx={{ marginRight: '10px', fontSize: '12px' }}>
          가격 범위:
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          max={50000}
          sx={{ width: commonWidth }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '10px' }}>
        <Typography variant="body2" sx={{ marginRight: '10px', fontSize: '12px' }}>
          출판일로부터:
        </Typography>
        <ButtonGroup variant="contained" aria-label="sort order" sx={{ marginBottom: '10px' }}>
          <Button
            sx={{ width: '80px', bgcolor: sortOrder === 'asc' ? 'primary.main' : 'primary.light', color: 'black', fontSize: '12px' }}
            onClick={() => handleSortOrderChange('asc')}>
            최신
          </Button>
          <Button
            sx={{ width: '80px', bgcolor: sortOrder === 'desc' ? 'primary.main' : 'primary.light', color: 'black', fontSize: '12px' }}
            onClick={() => handleSortOrderChange('desc')}>
            오래된
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '10px' }}>
        <Typography variant="body2" sx={{ marginRight: '10px', fontSize: '12px' }}>
          필터:
        </Typography>
        <ButtonGroup variant="outlined" aria-label="filter actions" sx={{ marginBottom: '10px' }}>
          <Button onClick={handleFilterApply} size="small" sx={{ width: '80px', fontSize: '12px' }}>
            적용
          </Button>
          <Button onClick={onShowAllBooks} size="small" sx={{ width: '80px', fontSize: '12px' }}>
            초기화
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default FilterBar;
