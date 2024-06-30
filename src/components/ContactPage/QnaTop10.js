import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const QnaTop10 = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = [
    {
      question: '[리뷰/한줄평] 어떻게 작성하나요?',
      answer: (
        <div>
          <Typography>리뷰/한줄평은 다음의 방법을 통해 작성하실 수 있습니다.</Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>마이페이지(PC) - 나의 리뷰/한줄평 - 작성 가능한 리뷰/한줄평 - [리뷰쓰기] 버튼 가기</li>
            <li>상품 페이지(PC/M) - 리뷰쓰기</li>
            <li>내폴더(PC/M) - 클릭> '리뷰' 카테고리 선택 - 상품 직접 검색하여 작성</li>
          </ul>
          <Typography>한줄평</Typography>
          <ol style={{ listStyleType: 'none', padding: 0 }}>
            <li>마이페이지(PC) - 나의 리뷰/한줄평 - 작성 가능한 리뷰/한줄평 - [한줄평쓰기] 버튼 가기</li>
            <li>상품 페이지(PC/M) - [한줄평쓰기]</li>
          </ol>
          <Box mt={2}>
            <Typography>
              FAQ를 통해 궁금증이 해결되셨나요?{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                예
              </Button>{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                아니오
              </Button>
            </Typography>
            <Typography>
              추가로 문의할 사항이 있다면 1:1 문의를 이용해주세요.{' '}
              <Button variant="contained" color="primary" size="small" sx={{ margin: 1 }}>
                1:1 문의
              </Button>
            </Typography>
          </Box>
        </div>
      ),
    },
    {
      question: '[리뷰/한줄평] 포인트는 언제 받을 수 있나요?',
      answer: (
        <div>
          <Typography>등록된 리뷰/한줄평 포인트는 모니터링을 거쳐 2일 이내 적립됩니다. (영업일 기준)</Typography>
          <Typography>금, 토, 일요일에 작성된 건은 다음 주 월요일에 포인트 적립됩니다.</Typography>
          <Typography>
            단, 예약 판매 기간 중에 등록된 리뷰/한줄평은 출고 완료 후 익일에 포인트가 적립됩니다. 출고 완료일이 영업일이 아닌 경우에는 그 다음 영업일에 포인트가
            적립됩니다.
          </Typography>
          <Box mt={2}>
            <Typography>
              FAQ를 통해 궁금증이 해결되셨나요?{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                예
              </Button>{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                아니오
              </Button>
            </Typography>
            <Typography>
              추가로 문의할 사항이 있다면 1:1 문의를 이용해주세요.{' '}
              <Button variant="contained" color="primary" size="small" sx={{ margin: 1 }}>
                1:1 문의
              </Button>
            </Typography>
          </Box>
        </div>
      ),
    },
    {
      question: '[많이 묻는 질문]주문 확인,주소 변경,배송 확인,교환/반품/환불 방법/취소 방법,회수 조회 방법 안내드립니다.',
      answer: (
        <div>
          <Typography>가장 많이 궁금해하시는 아래 문의를 확인해주시고 문의 전 참고 부탁드립니다.</Typography>
          <ol style={{ listStyleType: 'none', padding: 0 }}>
            <li>주문 : 마이페이지에서 주문내역에서 확인이 가능합니다.</li>
            <li>주소 변경: 마이페이지 주문 내역에서 상품 준비 중 상태까지 직접 가능합니다.</li>
            <li>배송: 마이페이지/주문내역/배송조회에서 조회하실 수 있으며, 배송 조회가 가능합니다.</li>
            <li>교환: 마이페이지/주문내역에서 환불 및 교환 신청 시 내역에서 조회가 가능합니다.</li>
            <li>환불: 마이페이지/주문내역에서 환불 및 교환 신청 시 내역에서 조회가 가능합니다.</li>
            <li>취소: 마이페이지에서 주문 취소 후 환불/교환 신청 시 내역에서 조회가 가능합니다. 단 부분 취소는 PC 버전에서 처리됩니다.</li>
            <li>회수: 회수 접수 내역 및 상품 배송은 마이페이지/주문내역에서 반송장 확인이 가능합니다.</li>
          </ol>
          <Box mt={2}>
            <Typography>
              FAQ를 통해 궁금증이 해결되셨나요?{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                예
              </Button>{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                아니오
              </Button>
            </Typography>
            <Typography>
              추가로 문의할 사항이 있다면 1:1 문의를 이용해주세요.{' '}
              <Button variant="contained" color="primary" size="small" sx={{ margin: 1 }}>
                1:1 문의
              </Button>
            </Typography>
          </Box>
        </div>
      ),
    },
    {
      question: '[배송] 총알배송 서비스란 무엇인가요?',
      answer: (
        <div>
          <Typography>
            총알배송이란, 상품생성 페이지에서 [총알배송], [당일배송], [하루배송] 표시가 된 상품을 대상으로 지역에 따라 총알배송 가능한 시간대에 주문하실 경우
            당일, 다음날 아침, 다음날까지 배송해 드리는 서비스입니다.
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>서울: 당일배송 - 월~금 오전 11시, 총알배송 - 월~금 오후 1시</li>
            <li>수도권: 당일배송 - 월~금 오전 11시, 총알배송 - 월~금 오후 1시</li>
            <li>부산: 당일배송 - 월~금 오전 11시, 총알배송 - 월~금 오후 1시</li>
            <li>대구: 당일배송 - 월~금 오전 11시, 총알배송 - 월~금 오후 1시</li>
            <li>광주: 당일배송 - 월~금 오전 11시, 총알배송 - 월~금 오후 1시</li>
            <li>대전: 당일배송 - 월~금 오전 11시, 총알배송 - 월~금 오후 1시</li>
          </ul>
          <Typography>총알배송의 자세한 사항은 고객센터를 통해 문의해 주세요.</Typography>
          <Box mt={2}>
            <Typography>
              FAQ를 통해 궁금증이 해결되셨나요?{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                예
              </Button>{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                아니오
              </Button>
            </Typography>
            <Typography>
              추가로 문의할 사항이 있다면 1:1 문의를 이용해주세요.{' '}
              <Button variant="contained" color="primary" size="small" sx={{ margin: 1 }}>
                1:1 문의
              </Button>
            </Typography>
          </Box>
        </div>
      ),
    },
    {
      question: '[중고샵 판매자] 중고상품을 판매하고 싶어요. 판매자로 어떻게 가입하나요?',
      answer: (
        <div>
          <Typography>
            북두칠성 중고샵은 본인인증이 된 회원이라면 판매자 회원 가입을 통해 판매자로 등록 가능하며 자유롭게 상품을 판매하실 수 있습니다.
          </Typography>
          <Typography>[마이페이지 > 나의 중고샵관리 > 내 가게에서 팔기 > 판매자 회원가입]</Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>개인인증(필수): PC 웹에서 본인인증을 거쳐 회원가입 후 개인 인증이 완료된 회원만 판매가 가능합니다.</li>
            <li>판매자 회원인증(필수): PC 웹에서 인증 후 개설된 본인 전자 가게에서 인증이 완료된 후 상품 판매가 가능합니다.</li>
          </ul>
          <Typography>
            가입시 입력한 내용은 나중에 가독성 좋게 변경하실 수 있으며 판매하기 버튼을 통해 상품 등록이 가능합니다. 상품 등록 후 상품을 판매하실 수 있습니다.
          </Typography>
          <Box mt={2}>
            <Typography>
              FAQ를 통해 궁금증이 해결되셨나요?{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                예
              </Button>{' '}
              <Button variant="outlined" size="small" sx={{ margin: 1 }}>
                아니오
              </Button>
            </Typography>
            <Typography>
              추가로 문의할 사항이 있다면 1:1 문의를 이용해주세요.{' '}
              <Button variant="contained" color="primary" size="small" sx={{ margin: 1 }}>
                1:1 문의
              </Button>
            </Typography>
          </Box>
        </div>
      ),
    },
    // Add more questions and answers as needed
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        자주 묻는 질문 TOP 10
      </Typography>
      {questions.map((item, index) => (
        <Accordion key={index} expanded={expandedIndex === index} onChange={() => handleToggle(index)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default QnaTop10;
