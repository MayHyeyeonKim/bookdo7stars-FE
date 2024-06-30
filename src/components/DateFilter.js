import React from 'react';
import { Button, Grid, InputLabel } from '@mui/material';
import { subDays } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleDateRange = (range) => {
    const today = new Date();
    let start, end;
    switch (range) {
      case 'today':
        start = new Date(today);
        end = new Date(today);
        break;
      case 'week':
        start = subDays(today, 7);
        end = new Date(today);
        break;
      case 'month':
        start = subDays(today, 30);
        end = new Date(today);
        break;
      case '3months':
        start = subDays(today, 90);
        end = new Date(today);
        break;
      default:
        start = null;
        end = null;
    }
    if (start) {
      start.setHours(0, 0, 0, 0);
    }
    if (end) {
      end.setHours(23, 59, 59, 999);
    }
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* 날짜 지정 검색 */}
      <Grid container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Grid container mt={1} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Grid item xs={3} md={3}>
                <Button variant="outlined" fullWidth onClick={() => handleDateRange('today')}>
                  오늘
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button variant="outlined" fullWidth onClick={() => handleDateRange('week')}>
                  일주일
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button variant="outlined" fullWidth onClick={() => handleDateRange('month')}>
                  일개월
                </Button>
              </Grid>
              <Grid item xs={3} md={3}>
                <Button variant="outlined" fullWidth onClick={() => handleDateRange('3months')}>
                  삼개월
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <DesktopDatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DesktopDatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default DateFilter;
