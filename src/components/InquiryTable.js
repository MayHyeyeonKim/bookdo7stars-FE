import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InquiryTable = ({ style, inquiries }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={style}>문의유형</TableCell>
            <TableCell style={style}>이미지</TableCell>
            <TableCell style={style}>문의내용</TableCell>
            <TableCell style={style}>이메일로 응답</TableCell>
            <TableCell style={style}>SMS로 응답</TableCell>
            <TableCell style={style}>작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inquiry, index) => (
            <TableRow key={index}>
              <TableCell style={style}>{inquiry.inquiryType}</TableCell>
              <TableCell style={style}>{inquiry.image && <img src={inquiry.image} alt="Inquiry Image" style={{ width: 100, height: 'auto' }} />}</TableCell>
              <TableCell style={style}>{inquiry.inquiryContent}</TableCell>
              <TableCell style={style}>{inquiry.emailReply ? 'Yes' : 'No'}</TableCell>
              <TableCell style={style}>{inquiry.smsReply ? 'Yes' : 'No'}</TableCell>
              <TableCell style={style}>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InquiryTable;
