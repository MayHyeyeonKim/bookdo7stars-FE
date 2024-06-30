import React from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { Popup } from '@mui/base/Unstable_Popup/Popup';

const PopUp = ({ closePopup }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001,
      }}>
      <Box
        sx={{
          width: 500,
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          position: 'relative',
        }}>
        <Button onClick={closePopup} sx={{ position: 'absolute', top: 8, right: 8 }}>
          X
        </Button>
        <Typography variant="h6" gutterBottom>
          안녕하세요 대표 인터넷 서점 북두칠성입니다.
        </Typography>
        <Typography variant="body1" gutterBottom>
          문의하실 문의 유형을 선택해 주세요.
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Paper sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>배송 문의</Typography>
              <Typography variant="h6">1번</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>반품/교환 문의</Typography>
              <Typography variant="h6">2번</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>eBook 문의</Typography>
              <Typography variant="h6">3번</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>중고 문의</Typography>
              <Typography variant="h6">4번</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>휴대폰 번호 입력</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>Ai 상담사 연결 (준비중)</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          안내 내용을 다시 듣고싶으시다면 별표(*)를 눌러주세요.
        </Typography>
      </Box>
    </Box>
  );
};

export default PopUp;
