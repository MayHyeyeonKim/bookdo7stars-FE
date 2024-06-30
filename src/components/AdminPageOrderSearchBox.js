import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Select, MenuItem, InputLabel, useMediaQuery } from '@mui/material';
import { format, isValid, startOfDay, endOfDay } from 'date-fns';
import DateFilter from './DateFilter';
import { display } from '@mui/system';

const AdminPageOrderSearchBox = ({ searchQuery, setSearchQuery, resetSearch }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('orderNum');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSearch = (event) => {
    event.preventDefault();
    if (startDate && endDate && isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      const formattedStartDate = startOfDay(new Date(startDate));
      const formattedEndDate = endOfDay(new Date(endDate));

      setSearchQuery({
        ...searchQuery,
        startDate: format(formattedStartDate, 'yyyy-MM-dd HH:mm:ss'),
        endDate: format(formattedEndDate, 'yyyy-MM-dd HH:mm:ss'),
      });
    } else {
      setSearchQuery({ ...searchQuery, startDate: null, endDate: null });
    }
  };

  return (
    <Box ml={2} mb={4}>
      <Grid container spacing={2}>
        <InputLabel sx={{ mt: 2, height: isMobile ? {} : '4ch' }}>조회 기간</InputLabel>
        <DateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        {/* 세부 주문 검색 */}
        <InputLabel sx={{ height: isMobile ? '3ch' : '4ch', marginTop: isMobile ? 1 : 0 }}>상세 조건</InputLabel>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Select
              value={selectedOption}
              onChange={(event) => {
                setSelectedOption(event.target.value);
              }}
              fullWidth>
              <MenuItem value="orderNum">주문 번호</MenuItem>
              <MenuItem value="userName">구매자</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              // label={selectedOption}
              label={selectedOption === 'orderNum' ? '주문 번호' : '구매자'}
              variant="outlined"
              fullWidth
              value={searchQuery[selectedOption] || ''}
              placeholder="값을 입력해주세요."
              InputLabelProps={{ shrink: true }}
              onChange={(event) => setSearchQuery({ ...searchQuery, [selectedOption]: event.target.value })}
            />
          </Grid>

          {/* 검색 버튼 */}
          <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginLeft: isMobile ? 0 : 1, width: isMobile ? '100%' : '30ch', height: '55px' }}
                onClick={handleSearch}>
                Search
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth sx={{ ml: -13, width: isMobile ? '100%' : '30ch', height: '55px' }} onClick={resetSearch}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPageOrderSearchBox;
