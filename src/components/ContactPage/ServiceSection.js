import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SecurityIcon from '@mui/icons-material/Security';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const services = [
  {
    title: '주문내역/배송조회',
    description: '최근 3개월간의 "주문/배송" 정보를 바로 확인하실 수 있습니다.',
    icon: <LocalShippingIcon />,
  },
  {
    title: '교환/반품 신청 및 조회',
    description: '구매하신 상품의 반품/교환/추가배송 신청 및 내역을 조회하실 수 있습니다.',
    icon: <SwapHorizIcon />,
  },
  {
    title: '세금계산서 신청/발급',
    description: '“받으신 주문” 된 주문에 한하여 1회 신청이 가능합니다. 바로 출력하실 수 있습니다.',
    icon: <ReceiptIcon />,
  },
  {
    title: '배송지연 보상제도',
    description: '“이사/동반/하루배송” 주문이 주문약속 시점에 안내된 도착예상일보다 지연된 경우 주문 건당 YES포인트 2,000원을 보상해 드립니다.',
    icon: <SecurityIcon />,
  },
  {
    title: '이벤트 당첨자 발표',
    description: '북두칠성에서 진행 중인 다양한 이벤트 당첨 결과를 안내해드립니다. 많은 혜택을 받고 확인해 주세요.',
    icon: <EventAvailableIcon />,
  },
  {
    title: '북두칠성 환전소',
    description: '상품권이나 외부 포인트를 북두칠성 상품권으로 환전하시고, 북두칠성에서 현업의 제도를 그대로, 편리하게 결제할 수 있습니다.',
    icon: <CreditCardIcon />,
  },
];

const ServicesSection = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              border={1}
              borderColor="grey.300"
              minHeight="200px" // Set a minimum height to align all boxes
              textAlign="center">
              <Box mb={2}>{service.icon}</Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>
                <Typography>{service.description}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
