import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, Tabs, Tab } from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../style/adminDashboardPageStyles.css';
import AdminDashboardCard from '../components/AdminDashboardCard';
import { userActions } from '../action/userActions';
import { orderActions } from '../action/orderActions';
import { contactActions } from '../action/contactActions';
import UserPermissionsModal from '../components/UserPermissionsModal';
import AdminPermissionsModal from '../components/AdminPermissionsModal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
  },
});

function AdminDashBoardPage() {
  const dispatch = useDispatch();
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ userName: '', email: '', password: '', role: 'admin' });
  const [selectedTab, setSelectedTab] = useState(0);
  const orderTableHead = ['주문번호', '주문일자', '구매자', '도서명', '총 주문액'];

  // Redux 상태에서 데이터 가져오기
  const adminData = useSelector((state) => state.user.users);
  const orderData = useSelector((state) => state.order.orderList);
  const contacts = useSelector((state) => state.contact.contacts);
  const requestList = useSelector((state) => state.order.requestList);
  const [localUserData, setLocalUserData] = useState([]);
  const [localAdminData, setLocalAdminData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]); // 월별 매출을 저장할 상태
  const [orderStatusCounts, setOrderStatusCounts] = useState([0, 0, 0, 0]); // 주문 상태 개수 저장

  useEffect(() => {
    // 페이지가 로드될 때 사용자와 어드민 데이터를 불러옴
    dispatch(userActions.getAllUser());
    dispatch(userActions.adminUser());
    dispatch(orderActions.getOrderList());
    dispatch(contactActions.getAllContacts());
    dispatch(orderActions.getRequestList());
  }, [dispatch]);

  useEffect(() => {
    if (adminData) {
      setLocalUserData(adminData.filter((user) => user.role !== 'admin'));
      setLocalAdminData(adminData.filter((admin) => admin.role === 'admin'));
    }
  }, [adminData]);

  // 월별 매출 계산 함수
  const calculateMonthlySales = (orderData) => {
    const sales = Array(12).fill(0); // 12개월을 0으로 초기화
    orderData.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.getMonth(); // 0이 1월
      sales[month] += order.totalPrice;
    });

    // 3월과 4월의 가짜 매출 데이터 추가
    sales[2] += 50000; // 3월 매출
    sales[3] += 70000; // 4월 매출

    return sales;
  };

  // 주문 상태 개수 계산 함수
  const calculateOrderStatusCounts = (orders) => {
    const statusMapping = {
      '준비 중': 'preparing',
      '배송 중': 'shipping',
      배송완료: 'delivered',
      환불: 'refund',
    };

    const statusCounts = { preparing: 0, shipping: 0, delivered: 0, refund: 0 };

    orders.forEach((order) => {
      const englishStatus = statusMapping[order.status];
      if (statusCounts[englishStatus] !== undefined) {
        statusCounts[englishStatus]++;
      }
    });

    return [statusCounts.preparing, statusCounts.shipping, statusCounts.delivered, statusCounts.refund];
  };

  // 주문 데이터가 변경될 때 월별 매출과 주문 상태 개수 계산
  useEffect(() => {
    if (orderData && orderData.length > 0) {
      const sales = calculateMonthlySales(orderData);
      setMonthlySales(sales);

      const statusCounts = calculateOrderStatusCounts(orderData);
      setOrderStatusCounts(statusCounts);
    }
  }, [orderData]);

  const orderStatusData = {
    labels: ['준비 중', '배송 중', '배송완료', '환불'],
    datasets: [
      {
        label: '주문 상태',
        data: orderStatusCounts, // 계산된 주문 상태 개수를 사용
        backgroundColor: ['#9BD5FF', '#FFC0CB', '#CDA7FE', '#FF7F7F'],
      },
    ],
  };

  const getMonthlySignups = (year, month) => {
    return localUserData.filter((user) => {
      const date = new Date(user.createdAt);
      return date.getFullYear() === year && date.getMonth() === month;
    }).length;
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const lastMonth = (currentMonth - 1 + 12) % 12;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const twoMonthsAgo = (currentMonth - 2 + 12) % 12;
  const twoMonthsAgoYear = currentMonth <= 1 ? currentYear - 1 : currentYear;

  const threeMonthsAgo = (currentMonth - 3 + 12) % 12;
  const threeMonthsAgoYear = currentMonth <= 2 ? currentYear - 1 : currentYear;

  const currentMonthSignups = getMonthlySignups(currentYear, currentMonth);
  const lastMonthSignups = getMonthlySignups(lastMonthYear, lastMonth);
  const twoMonthsAgoSignups = getMonthlySignups(twoMonthsAgoYear, twoMonthsAgo);
  const threeMonthsAgoSignups = getMonthlySignups(threeMonthsAgoYear, threeMonthsAgo);

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const signupData = {
    labels: [monthNames[threeMonthsAgo], monthNames[twoMonthsAgo], monthNames[lastMonth], monthNames[currentMonth]],
    datasets: [
      {
        label: `${currentYear}년 가입자 수`,
        data: [threeMonthsAgoSignups, twoMonthsAgoSignups, lastMonthSignups, currentMonthSignups],
        backgroundColor: ['#9BD5FF'],
        barThickness: 15,
      },
    ],
  };

  // 가짜 가입자 수 데이터 추가
  signupData.datasets[0].data[1] += 5; // 3월 가입자 수
  signupData.datasets[0].data[2] += 10; // 4월 가입자 수

  const salesData = {
    labels: monthNames,
    datasets: [
      {
        label: '총 매출',
        data: monthlySales, // 월별 매출 데이터를 사용
        borderColor: '#9BD5FF',
        fill: true,
      },
    ],
  };

  const handleClickOpenUserModal = () => {
    setOpenUserModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  const handleClickOpenAdminModal = () => {
    setOpenAdminModal(true);
  };

  const handleCloseAdminModal = () => {
    setOpenAdminModal(false);
  };

  const handleUserChange = (id, event) => {
    const { name, value } = event.target;
    setLocalUserData((prevUserData) => prevUserData.map((user) => (user._id === id ? { ...user, [name]: value } : user)));
  };

  const handleDelete = (id) => {
    setLocalAdminData(localAdminData.filter((admin) => admin._id !== id));
    setLocalUserData(localUserData.filter((user) => user._id !== id));
  };

  const handleAddAdmin = () => {
    dispatch(userActions.registerAdmin(newAdmin));
    setNewAdmin({ userName: '', email: '', password: '', role: 'admin' });
  };

  const handleEdit = (id) => {
    const user = localUserData.find((user) => user._id === id);
    if (user) {
      dispatch(userActions.updateUserLevel(user._id, user.level));
    }
  };

  const adminCardContent = localAdminData.length > 0 ? `${localAdminData[0].userName} 외 ${localAdminData.length - 1}명` : 'No admins';
  const userCardContent = localUserData.length > 0 ? `Total: ${localUserData.length}명` : 'No users';

  const pendingContacts = requestList.filter((request) => request.request.status === '대기 중').length;
  const refundOrders = orderData.filter((order) => order.status === '환불').length;
  const newOrders = orderData.filter((order) => order.status === '준비 중').length;
  const shippingCounts = orderData.filter((order) => order.status === '배송 중').length;
  const deliveredCounts = orderData.filter((order) => order.status === '배송완료').length;
  const newSignups = localUserData.filter((user) => {
    const date = new Date(user.createdAt);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;
  const inquiries = contacts.length;

  const totalTasks = newOrders + refundOrders + pendingContacts + newSignups + inquiries;

  const taskItems = [
    { title: '신규 주문', count: newOrders },
    { title: '환불 주문', count: refundOrders },
    { title: '환불/반품 대기', count: pendingContacts },
    { title: '신규 가입', count: newSignups },
    { title: '문의', count: inquiries },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredOrderData = orderData?.filter((order) => {
    switch (selectedTab) {
      case 0:
        return order.status === '준비 중';
      case 1:
        return order.status === '배송 중';
      case 2:
        return order.status === '배송완료';
      case 3:
        return order.status === '환불';
      default:
        return true;
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Container className="containerStyled" maxWidth="lg">
          <Box mb={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '10px' }}>
                  오늘의 할일
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red' }}>
                  {totalTasks}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {taskItems.map((item, index) => (
                  <Grid item key={index}>
                    <Typography variant="body1">
                      {item.title} {item.count}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
          <Grid container spacing={3}>
            {/* 매출 및 주문 상태 */}
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="총 매출" content={<Line data={salesData} />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <AdminDashboardCard title="신규 가입 고객" content={<Bar data={signupData} />} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* 고객 문의 */}
            <Grid item xs={12}>
              <AdminDashboardCard title="고객 문의" content={<ContactTable contacts={contacts} />} />
            </Grid>

            <Grid item xs={12}>
              <AdminDashboardCard
                title="주문 상태"
                content={
                  <>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label="order status tabs">
                      <Tab label={`준비 중 (${newOrders})`} />
                      <Tab label={`배송 중 (${shippingCounts})`} />
                      <Tab label={`배송완료 (${deliveredCounts})`} />
                      <Tab label={`환불 (${refundOrders})`} />
                    </Tabs>
                    <StatusTable orderTableHead={orderTableHead} orderData={filteredOrderData} />
                  </>
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="사용자 권한 관리" content={userCardContent} onClick={handleClickOpenUserModal} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="어드민 권한 관리" content={adminCardContent} onClick={handleClickOpenAdminModal} />
            </Grid>

            <UserPermissionsModal
              open={openUserModal}
              handleClose={handleCloseUserModal}
              userData={localUserData}
              handleLevelChange={handleUserChange}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />

            <AdminPermissionsModal
              open={openAdminModal}
              handleClose={handleCloseAdminModal}
              adminData={localAdminData}
              newAdmin={newAdmin}
              handleEmailChange={handleUserChange}
              handlePasswordChange={handleUserChange}
              handleNameChange={handleUserChange}
              handleRoleChange={handleUserChange}
              handleDelete={handleDelete}
              handleAddAdmin={handleAddAdmin}
              setNewAdmin={setNewAdmin}
            />
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

const cellStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '150px',
};

// ContactTable 컴포넌트
const ContactTable = ({ contacts }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={cellStyle}>고객 이름</TableCell>
          <TableCell style={cellStyle}>상품 사진</TableCell>
          <TableCell style={cellStyle}>문의 내용</TableCell>
          <TableCell style={cellStyle}>문의 날짜</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact._id}>
            <TableCell style={cellStyle}>{contact.userId.userName}</TableCell>
            <TableCell style={cellStyle}>
              {' '}
              <img src={contact.image} alt={contact.inquiryContent} style={{ width: '70px', height: '50px' }} />
            </TableCell>
            <TableCell style={cellStyle}>{contact.inquiryContent}</TableCell>
            <TableCell style={cellStyle}>{contact.createdAt.slice(5, 10)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const StatusTable = ({ orderTableHead, orderData }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {orderTableHead?.map((head, index) => (
            <TableCell style={cellStyle} key={index}>
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {orderData?.map((order) => (
          <TableRow key={order._id}>
            <TableCell style={cellStyle}>{order.orderNum}</TableCell>
            <TableCell style={cellStyle}>{order.createdAt.slice(5, 10)}</TableCell>
            <TableCell style={cellStyle}>{order.contact.name}</TableCell>
            <TableCell style={cellStyle}>{order.items.map((item) => item.bookId.title).join(', ')}</TableCell>
            <TableCell style={cellStyle}>{order.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AdminDashBoardPage;
