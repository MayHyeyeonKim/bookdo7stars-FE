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
import EditIcon from '@mui/icons-material/Edit';

const UserPermissionsModal = ({ open, handleClose, userData, handleLevelChange, handleDelete, handleEdit }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>사용자 권한 관리</DialogTitle>
      <DialogContent>
        <DialogContentText>사용자를 보여주고 사용자의 정보를 수정할 수 있는 테이블</DialogContentText>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>역할</TableCell>
                <TableCell>레벨</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>
                    <TextField name="userName" value={user.userName} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <TextField name="role" value={user.role} label="역할" readOnly />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined" size="small" fullWidth>
                      <InputLabel>레벨</InputLabel>
                      <Select name="level" value={user.level} onChange={(event) => handleLevelChange(user._id, event)} label="레벨">
                        <MenuItem value="bronze">Bronze</MenuItem>
                        <MenuItem value="silver">Silver</MenuItem>
                        <MenuItem value="gold">Gold</MenuItem>
                        <MenuItem value="platinum">Platinum</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button color="primary" onClick={() => handleEdit(user._id)}>
                        변경
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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

export default UserPermissionsModal;
