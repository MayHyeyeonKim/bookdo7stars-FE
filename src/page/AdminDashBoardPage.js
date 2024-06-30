import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../style/adminDashboardPageStyles.css';
import AdminDashboardCard from '../components/AdminDashboardCard';
import { userActions } from '../action/userActions';
import { orderActions } from '../action/orderActions'; // 추가된 부분
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

  // Redux 상태에서 데이터 가져오기
  const adminData = useSelector((state) => state.user.users);
  const orderData = useSelector((state) => state.order.orderList); // 추가된 부분
  const [localUserData, setLocalUserData] = useState([]);
  const [localAdminData, setLocalAdminData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]); // 월별 매출을 저장할 상태
  const [orderStatusCounts, setOrderStatusCounts] = useState([0, 0, 0, 0]); // 주문 상태 개수 저장

  useEffect(() => {
    // 페이지가 로드될 때 사용자와 어드민 데이터를 불러옴
    dispatch(userActions.getAllUser());
    dispatch(userActions.adminUser());
    dispatch(orderActions.getOrderList()); // 모든 주문 조회
  }, [dispatch]);

  useEffect(() => {
    if (adminData) {
      setLocalUserData(adminData.filter((user) => user.role !== 'admin'));
      setLocalAdminData(adminData.filter((admin) => admin.role === 'admin'));
    }
  }, [adminData]);

  // 월별 매출 계산 함수
  const calculateMonthlySales = (orders) => {
    const sales = Array(12).fill(0); // 12개월을 0으로 초기화
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.getMonth(); // 0이 1월
      sales[month] += order.totalPrice;
    });
    return sales;
  };

  // 주문 상태 개수 계산 함수
  const calculateOrderStatusCounts = (orders) => {
    const statusCounts = { preparing: 0, shipping: 0, delivered: 0, refund: 0 };
    orders.forEach((order) => {
      if (statusCounts[order.status] !== undefined) {
        statusCounts[order.status]++;
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
    labels: ['Preparing', 'Shipping', 'Delivered', 'Refund'],
    datasets: [
      {
        label: '주문 상태',
        data: orderStatusCounts, // 계산된 주문 상태 개수를 사용
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#f44336'],
      },
    ],
  };

  const inquiryData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: '고객 문의 수',
        data: [2, 4, 6, 8],
        backgroundColor: '#FF6384',
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
        backgroundColor: ['#ff9800', '#4caf50', '#2196f3', '#f44336'],
        barThickness: 15,
      },
    ],
  };

  const salesData = {
    labels: monthNames,
    datasets: [
      {
        label: '총 매출',
        data: monthlySales, // 월별 매출 데이터를 사용
        borderColor: '#3e95cd',
        fill: false,
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

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Container className="containerStyled" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <AdminDashboardCard title="총 매출" content={<Line data={salesData} />} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminDashboardCard title="주문 상태" content={<Pie data={orderStatusData} />} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminDashboardCard title="총 주문 수" content={orderData.length} />
            </Grid>

            <Grid item xs={12}>
              <AdminDashboardCard title="최근 주문" content="최근 주문 내역을 여기에 표시합니다." />
            </Grid>

            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="신규 가입 고객" content={<Bar data={signupData} />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="고객 문의" content={<Bar data={inquiryData} />} />
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

export default AdminDashBoardPage;
