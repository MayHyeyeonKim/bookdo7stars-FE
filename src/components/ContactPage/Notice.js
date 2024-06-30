import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Notice = () => {
  const notices = [
    {
      title: '개인정보처리방침 개정안내 (v7.2) 2024.03.28',
      content: (
        <div>
          <Typography>안녕하세요, 북두칠성입니다.</Typography>
          <Typography>
            개인정보처리방침이 아래와 같이 개정되어 안내드립니다. 개정된 방침은 2024년 3월 28일부터 시행됩니다. 주요 개정 내용은 다음과 같습니다.
          </Typography>
          <Typography variant="h6">1. 수집하는 개인정보 항목</Typography>
          <Typography>이전: 이름, 이메일, 전화번호</Typography>
          <Typography>변경: 이름, 이메일, 전화번호, 주소</Typography>
          <Typography variant="h6">2. 개인정보의 이용 목적</Typography>
          <Typography>이전: 회원관리, 서비스 제공 변경: 회원관리, 서비스 제공, 마케팅 활용</Typography>
          <Typography variant="h6">3. 개인정보의 보유 및 이용 기간</Typography>
          <Typography>이전: 회원 탈퇴 시 파기</Typography>
          <Typography>변경: 법령에 따른 보존기간 동안 보유</Typography>
          <Typography>기타 개정된 내용은 북두칠성 홈페이지에서 확인하실 수 있습니다. 감사합니다.</Typography>
        </div>
      ),
    },
    {
      title: '24년 6월 신용카드 결제 무이자할부 안내 2024.06.03',
      content: (
        <div>
          <Typography>안녕하세요, 북두칠성입니다.</Typography>
          <Typography>다음과 같이 2024년 6월 신용카드 무이자 할부 행사를 시행하오니 많은 관심과 참여 부탁드립니다.</Typography>
          <Typography>아래 무이자할부는 결제 시 신용카드를 선택하면 자동 적용됩니다.</Typography>
          <Typography variant="h6">BC카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: BC카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography variant="h6">신한카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: 신한카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography variant="h6">현대카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: 현대카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography variant="h6">KB국민카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: KB국민카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography variant="h6">삼성카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: 삼성카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography variant="h6">하나카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: 하나카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography variant="h6">NH농협카드 2~6개월 무이자 할부</Typography>
          <Typography>- 대상기간: 2024년 6월 1일 ~ 6월 30일 - 조건: NH농협카드 결제금액 5만원 이상인 경우 - 단, 법인/체크/기프트/선불카드 제외</Typography>
          <Typography>무이자 할부에 대한 상세카드는 카드사 홈페이지에서 확인하세요.</Typography>
          <Typography>감사합니다.</Typography>
        </div>
      ),
    },
    {
      title: '이용약관 개정안내 (2024년 2월 16일) 2024.02.06',
      content: (
        <div>
          <Typography>안녕하세요, 북두칠성입니다.</Typography>
          <Typography>북두칠성 서비스 이용 약관이 아래와 같이 개정되었으니 참고하시기 바랍니다. 시행일자: 2024년 2월 16일</Typography>
          <Typography variant="h6">주요 개정 내용</Typography>
          <Typography variant="h6">제2조(서비스의 제공)</Typography>
          <Typography>
            - 개정 전: 회사는 회사가 제공하는 다양한 서비스, 커뮤니티 서비스, 프리미엄 콘텐츠 서비스 등에서 회원 가입을 통해 서비스를 이용할 수 있습니다. - 개정
            후: 회사는 회사가 제공하는 다양한 서비스, 커뮤니티 서비스, 프리미엄 콘텐츠 서비스, 블로그 서비스 등을 통해 회원 가입을 통해 서비스를 이용할 수
            있습니다.
          </Typography>
          <Typography variant="h6">제15조(회원의 의무)</Typography>
          <Typography>
            - 개정 전: 회원은 회사의 서비스 이용과 관련하여 법령 및 회사의 공지사항 등을 준수해야 합니다. - 개정 후: 회원은 회사의 서비스 이용과 관련하여 법령
            및 회사의 공지사항, 이용약관 등을 준수해야 합니다.
          </Typography>
          <Typography variant="h6">제23조(계약의 해지)</Typography>
          <Typography>
            - 개정 전: 회원은 언제든지 회사에 계약 해지를 요청할 수 있으며, 회사는 법령에 따라 이를 처리합니다. - 개정 후: 회원은 언제든지 회사에 계약 해지를
            요청할 수 있으며, 회사는 법령 및 이용약관에 따라 이를 처리합니다.
          </Typography>
          <Typography>기타 개정된 내용은 북두칠성 홈페이지에서 확인하실 수 있습니다. 감사합니다.</Typography>
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        공지사항
      </Typography>
      {notices.map((notice, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography>{notice.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{notice.content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Notice;
