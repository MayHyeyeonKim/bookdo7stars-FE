import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AdminPermissionsModal = ({
  open,
  handleClose,
  adminData,
  newAdmin,
  handleEmailChange,
  handlePasswordChange,
  handleNameChange,
  handleRoleChange,
  handleDelete,
  handleAddAdmin,
  setNewAdmin,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>어드민 권한 관리</DialogTitle>
      <DialogContent>
        <DialogContentText>어드민의 이메일과 비밀번호를 추가 / 삭제할 수 있는 테이블</DialogContentText>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>비밀번호</TableCell>
                <TableCell>역할</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminData.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin._id}</TableCell>
                  <TableCell>
                    <TextField value={admin.userName} onChange={(event) => handleNameChange(admin._id, event)} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField value={admin.email} onChange={(event) => handleEmailChange(admin._id, event)} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={admin.password}
                      onChange={(event) => handlePasswordChange(admin._id, event)}
                      variant="outlined"
                      size="small"
                      type="password"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <InputLabel>역할</InputLabel>
                      <Select value={admin.role} onChange={(event) => handleRoleChange(admin._id, event)} label="역할">
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(admin._id)} color="secondary">
                      <DeleteIcon className="deleteIcon" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>새 ID</TableCell>
                <TableCell>
                  <TextField
                    value={newAdmin.userName}
                    onChange={(event) => setNewAdmin({ ...newAdmin, userName: event.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="새 어드민 이름"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newAdmin.email}
                    onChange={(event) => setNewAdmin({ ...newAdmin, email: event.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="새 어드민 이메일"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newAdmin.password}
                    onChange={(event) => setNewAdmin({ ...newAdmin, password: event.target.value })}
                    variant="outlined"
                    size="small"
                    placeholder="새 어드민 비밀번호"
                    type="password"
                  />
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel>역할</InputLabel>
                    <Select value={newAdmin.role} onChange={(event) => setNewAdmin({ ...newAdmin, role: event.target.value })} label="역할">
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="customer">Customer</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleAddAdmin}>
                    <AddIcon className="edit-icon " />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPermissionsModal;
