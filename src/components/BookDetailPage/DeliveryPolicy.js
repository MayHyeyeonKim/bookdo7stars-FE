import React from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const DeliveryPolicy = () => {
  return (
    <Container>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography sx={{ fontWeight: 'bold', color: '#2E4B2E' }}>배송 안내</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table sx={{ outline: '1px solid #DFE4DF' }}>
          <TableBody sx={{ outline: '1px solid #DFE4DF' }}>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA' }}>배송 구분</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>이틀24 배송</TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA' }}>배송비</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>2,500원</TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA' }}>포장 안내</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                <Box> - 안전하고 철저한 포장을 위해 CCTV를 설치하여 운영하고 있습니다. </Box>
                <Box> - 고객님께 배송되는 모든 상품을 CCTV로 녹화하고 있으며, 철저한 모니터링을 통해 작업 과정에 문제가 없도록 최선을 다 하겠습니다.</Box>
                <Box sx={{ mb: 2 }}> - 목적 : 안전한 포장 관리 촬영범위 : 박스 포장 작업</Box>
                <Box>
                  <img style={{ marginRight: '1rem' }} src="https://image.yes24.com/sysimage/mV2/detail/thumb_deli01.jpg" alt="포장 이미지 1"></img>
                  <img style={{ marginRight: '1rem' }} src="https://image.yes24.com/sysimage/mV2/detail/thumb_deli02.jpg" alt="포장 이미지 2"></img>
                  <img style={{ marginRight: '1rem' }} src="https://image.yes24.com/sysimage/mV2/detail/thumb_deli03.jpg" alt="포장 이미지 3"></img>
                  <img style={{ marginRight: '1rem' }} src="https://image.yes24.com/sysimage/mV2/detail/thumb_deli04.jpg" alt="포장 이미지 4"></img>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography sx={{ fontWeight: 'bold', color: '#2E4B2E' }}>반품/교환 안내</Typography>
        <Typography sx={{ color: 'grey' }}>
          ※ 상품 설명에 반품/교환과 관련한 안내가 있는경우 아래 내용보다 우선합니다. (업체 사정에 따라 달라질 수 있습니다)
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table sx={{ outline: '1px solid #DFE4DF' }}>
          <TableBody sx={{ outline: '1px solid #DFE4DF' }}>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>반품/교환 방법</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                <Box>
                  {' '}
                  - 마이페이지 <a href="/mypage">반품/교환 신청 및 조회,</a> <a href="/contact">1:1 문의</a>, 고객만족센터(1544-3800), 중고샵(1566-4295)
                </Box>
                <Box> - 판매자 배송 상품은 판매자와 반품/교환이 협의된 상품에 한해 가능합니다.</Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>반품/교환 가능 기간</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                <Box> - 출고 완료 후 10일 이내의 주문 상품</Box>
                <Box> - 디지털 콘텐츠인 eBook의 경우 구매 후 7일 이내의 상품</Box>
                <Box> - 중고상품의 경우 출고 완료일로부터 6일 이내의 상품 (구매확정 전 상태)</Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>반품/교환 비용</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                <Box> - 고객의 단순변심 및 착오구매일 경우 상품 반송비용은 고객 부담임</Box>
                <Box> - 직수입양서/직수입일서중 일부는 변심 또는 착오로 취소시 해외주문취소수수료 20%를 부과할수 있음</Box>
                <Box sx={{ ml: 2 }}> 단, 아래의 주문/취소 조건인 경우, 취소 수수료 면제</Box>
                <Box> - 오늘 00시 ~ 06시 30분 주문을 오늘 오전 06시 30분 이전에 취소</Box>
                <Box> - 디지털 컨텐츠인 eBook, 오디오북 등을 1회 이상 다운로드를 받았을 경우</Box>
                <Box> - 오늘 06시 30분 이후 주문을 익일 오전 06시 30분 이전에 취소</Box>
                <Box> - 직수입 음반/영상물/기프트 중 일부는 변심 또는 착오로 취소 시 해외주문취소수수료 30%를 부과할 수 있음</Box>
                <Box sx={{ ml: 2 }}> 단, 당일 00시~13시 사이의 주문은 취소 수수료 면제</Box>
                <Box> - 박스 포장은 택배 배송이 가능한 규격과 무게를 준수하며, 고객의 단순변심 및 착오구매일 경우 상품의 반송비용은 박스 당 부과됩니다.</Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>반품/교환 불가 사유</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                <Box> - 소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우</Box>
                <Box> - 소비자의 사용, 포장 개봉에 의해 상품 등의 가치가 현저히 감소한 경우 : 예) 화장품, 식품, 가전제품, 전자책 단말기 등</Box>
                <Box> - 복제가 가능한 상품 등의 포장을 훼손한 경우 : 예) CD/LP, DVD/Blu-ray, 소프트웨어, 만화책, 잡지, 영상 화보집</Box>
                <Box> - 소비자의 요청에 따라 개별적으로 주문 제작되는 상품의 경우</Box>
                <Box> - 디지털 컨텐츠인 eBook, 오디오북 등을 1회 이상 다운로드를 받았을 경우</Box>
                <Box> - eBook 대여 상품은 대여 기간이 종료 되거나, 2회 이상 대여 했을 경우 취소 불가</Box>
                <Box> - 중고상품이 구매확정(자동 구매확정은 출고완료일로부터 7일)된 경우</Box>
                <Box> - LP상품의 재생 불량 원인이 기기의 사양 및 문제인 경우 (All-in-One 일체형 일부 보급형 오디오 모델 사용 등)</Box>
                <Box> - 시간의 경과에 의해 재판매가 곤란한 정도로 가치가 현저히 감소한 경우</Box>
                <Box> - 전자상거래 등에서의 소비자보호에 관한 법률이 정하는 소비자 청약철회 제한 내용에 해당되는 경우</Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>소비자 피해보상</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                - 상품의 불량에 의한 반품, 교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은 소비자분쟁해결기준(공정거래위원회 고시)에 준하여 처리됨
              </TableCell>
            </TableRow>
            <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>소비자 피해보상</TableCell>
              <TableCell sx={{ outline: '1px solid #DFE4DF' }}>
                - 대금 환불 및 환불 지연에 따른 배상금 지급 조건, 절차 등은 전자상거래 등에서의 소비자 보호에 관한 법률에 따라 처리
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DeliveryPolicy;
