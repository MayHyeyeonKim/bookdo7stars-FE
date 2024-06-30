import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { text: 'FAQ', link: '#faq' },
    { text: '주문/배송', link: '/mypage/orderlist' },
    { text: '교환/반품', link: '/mypage/orderclaimlist' },
    { text: '취소', link: '/mypage/ordercancellist' },
    { text: '리뷰', link: '/mypage/myreview' },
    { text: '찜', link: '/mypage/wishlist' },
    { text: '티켓', link: '/tickets' },
    { text: 'eBook', link: '/ebook' },
    { text: '기타', link: '/others' },
    { text: '공지사항', link: '/notices' },
  ];

  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        marginTop: 5,
        marginLeft: 3,
        marginRight: 1,
        backgroundColor: '#ebedeb',
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        borderRadius: '10px',
      }}>
      <Typography variant="h6" gutterBottom>
        고객센터
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={RouterLink} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
