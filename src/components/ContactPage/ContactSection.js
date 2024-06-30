import React from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}));

const contacts = [
  {
    title: '도서/음반 문의',
    phone: '1544-3800',
    hours: '평일 09:00 - 18:00\n토,일요일 및 공휴일 휴무',
  },
  {
    title: '중고샵 문의',
    phone: '1566-4295',
    hours: '평일 09:00 - 18:00\n토,일요일 및 공휴일 휴무',
  },
  {
    title: '티켓예매 문의',
    phone: '1544-6399',
    hours: '평일 09:00 - 18:00\n토요일 09:00 - 17:00\n일요일 12:00 - 13:00\n공휴일 휴무',
  },
  {
    title: 'eBook 문의',
    phone: '',
    hours: '',
    extra: '1:1 문의하기',
  },
];

const ContactSection = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {contacts.map((contact, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Item>
              <Box mb={2}>
                <Typography variant="h6">{contact.title}</Typography>
              </Box>
              <Box mb={2}>
                <Typography>{contact.phone}</Typography>
                <Typography>
                  {contact.hours.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </Box>
              {contact.extra && (
                <Box mt="auto">
                  <Typography variant="button">{contact.extra}</Typography>
                </Box>
              )}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContactSection;
