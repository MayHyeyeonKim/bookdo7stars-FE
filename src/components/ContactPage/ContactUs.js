import React from 'react';
import { Box, Button, Tabs, Tab, Typography } from '@mui/material';

const ContactUs = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        1:1 문의내역
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="contact us tabs">
        <Tab label="북두칠성 문의" />
        <Tab label="중고샵 판매자 문의" />
      </Tabs>
      <Box p={3} border={1} borderColor="divider">
        {tabValue === 0 && (
          <Typography>
            최근 3개월간 문의 내역이 없습니다.
            <br />
            북두칠성에 대한 모든 궁금증은 1:1 문의하기로 부담없이 확인하세요.
          </Typography>
        )}
        {tabValue === 1 && (
          <Typography>
            최근 3개월간 문의 내역이 없습니다.
            <br />
            중고샵 판매자에 대한 모든 궁금증은 1:1 문의하기로 부담없이 확인하세요.
          </Typography>
        )}
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary">
          1:1 문의하기
        </Button>
      </Box>
    </Box>
  );
};

export default ContactUs;
