import React from 'react';
import { Container, Grid, Paper, Typography, Avatar, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: 180,
  height: 270,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    margin: 'auto',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginLeft: 20,
  marginRight: 20,
  width: 160,
  height: 160,
  [theme.breakpoints.down('sm')]: {
    margin: 'auto',
  },
}));

const CenteredGridItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

const DOMAIN = 'http://localhost:3000';
// const DOMAIN = 'https://book-do-7-stars.netlify.app'; // For deployment

const EditorPage = () => {
  const { bookList } = useSelector((state) => state.book);

  const getBooksByQueryType = (queryType) => {
    return bookList.filter((book) => book.queryType === queryType);
  };

  const editors = [
    {
      name: '에디터 효안',
      illustration: '/image/hyoan.png',
      bookQueryType: 'BestSeller',
      comment:
        '<b>효안의 추천 책:</b> 이 책은 독자를 매료시키는 흥미진진한 이야기와 감동적인 메시지를 담고 있습니다. ' +
        '각각의 페이지는 깊은 통찰력과 인간의 본성에 대한 이해를 제공합니다. 다양한 캐릭터와 사건들이 ' +
        '조화롭게 어우러져 있으며, 독자는 처음부터 끝까지 책에서 눈을 뗄 수 없을 것입니다. 이 책은 모든 ' +
        '독자들에게 삶의 중요한 가치를 일깨워주며, 깊은 감동을 안겨줍니다. 따라서 이 책을 통해 새로운 ' +
        '시각과 통찰을 얻을 수 있을 것입니다. 꼭 읽어보시기를 추천드립니다. 재미와 감동이 넘치는 이 ' +
        '책을 통해 많은 것을 배울 수 있습니다.',
    },
    {
      name: '에디터 메이',
      illustration: '/image/may.png',
      bookQueryType: 'BestSeller',
      comment:
        '<b>메이의 추천 책:</b> 이 책은 독자에게 큰 영감을 주는 내용으로 가득합니다. 작가의 독특한 시각과 ' +
        '필력은 독자를 새로운 세계로 인도합니다. 각 장마다 펼쳐지는 이야기는 독자의 마음을 사로잡고, ' +
        '깊은 감동을 선사합니다. 이 책을 읽으면 자신의 삶에 대해 다시 생각하게 되고, 더 나은 사람이 ' +
        '되고자 하는 의지를 불러일으킬 것입니다. 또한, 책 속의 캐릭터들은 매우 매력적이며, 그들의 ' +
        '이야기에 빠져들게 됩니다. 이 책을 통해 많은 것을 배우고, 새로운 영감을 얻으실 수 있습니다. ' +
        '강력히 추천드립니다.',
    },
    {
      name: '에디터 제인',
      illustration: '/image/jane.png',
      bookQueryType: 'BestSeller',
      comment:
        '<b>제인의 추천 책:</b> 이 책은 독자의 마음을 울리는 감동적인 이야기를 담고 있습니다. 작가의 뛰어난 ' +
        '이야기 구성과 생생한 묘사는 독자를 책 속으로 끌어당깁니다. 이 책을 읽는 동안 독자는 다양한 ' +
        '감정을 경험하게 될 것이며, 책을 다 읽고 나서도 그 여운이 오래도록 남을 것입니다. 이 책은 ' +
        '삶의 중요한 가치와 의미를 되새기게 하며, 독자에게 깊은 감동을 안겨줍니다. 다양한 캐릭터와 ' +
        '사건들이 잘 어우러져 있으며, 독자는 처음부터 끝까지 흥미롭게 읽을 수 있을 것입니다. 이 책을 ' +
        '꼭 읽어보시기를 추천드립니다.',
    },
    {
      name: '에디터 헌준',
      illustration: '/image/hunjoon.png',
      bookQueryType: 'BestSeller',
      comment:
        '<b>현준의 추천 책:</b> 이 책은 독자에게 큰 영감을 주는 이야기와 감동적인 메시지를 담고 있습니다. ' +
        '작가의 뛰어난 필력과 독특한 시각은 독자를 책 속으로 끌어당깁니다. 각 장마다 펼쳐지는 이야기는 ' +
        '독자의 마음을 사로잡고, 깊은 감동을 선사합니다. 이 책을 읽는 동안 독자는 다양한 감정을 ' +
        '경험하게 될 것이며, 책을 다 읽고 나서도 그 여운이 오래도록 남을 것입니다. 이 책은 삶의 ' +
        '중요한 가치와 의미를 되새기게 하며, 독자에게 깊은 감동을 안겨줍니다. 이 책을 통해 많은 것을 ' +
        '배우고, 새로운 영감을 얻으실 수 있습니다. 강력히 추천드립니다.',
    },
  ];

  const defaultDescriptions = [
    '이 책은 삶의 새로운 관점을 열어줍니다. 강력 추천합니다!',
    '깊이 있는 내용과 감동적인 이야기로 가득 찬 작품입니다.',
    '흥미진진한 전개와 매력적인 캐릭터들로 눈을 뗄 수 없습니다.',
    '마음에 오래 남을 만큼 인상적인 책입니다. 꼭 읽어보세요!',
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        에디터 추천 페이지
      </Typography>
      {getBooksByQueryType('BlogBest')
        .slice(0, editors.length)
        .map((book, index) => (
          <StyledPaper key={index} elevation={3}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <CenteredGridItem item xs={12} sm={3} md={2}>
                <StyledAvatar src={editors[index].illustration} />
                <Typography variant="h6" component="div" align="center">
                  {editors[index].name}
                </Typography>
              </CenteredGridItem>
              <CenteredGridItem item xs={12} sm={3} md={2}>
                <StyledBox>
                  <img
                    src={book.cover}
                    alt={`Book cover ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'inherit' }}
                  />
                </StyledBox>
              </CenteredGridItem>
              <CenteredGridItem item xs={12} sm={6} md={8}>
                <Card>
                  <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="h5" component="div">
                      {book.title || defaultDescriptions[index % defaultDescriptions.length]}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {book.description || defaultDescriptions[index % defaultDescriptions.length]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      <a href={`${DOMAIN}/book/${book._id}`}>책 주문하기</a>
                    </Typography>
                  </CardContent>
                </Card>
              </CenteredGridItem>
            </Grid>
          </StyledPaper>
        ))}
    </Container>
  );
};

export default EditorPage;
