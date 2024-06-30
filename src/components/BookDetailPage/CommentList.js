import React, { Fragment } from 'react';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentList = ({ comments, onDelete, user }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('kr-KR');
  };

  return (
    <List>
      {comments.map((comment) => (
        <ListItem key={comment.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>{comment.userId.userName?.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}>
                  <Typography variant="body2" color="text.primary">
                    {comment.content}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ marginRight: '16px' }}>
                    {formatDate(comment.createdAt)}
                  </Typography>
                  {comment.userId._id === user?._id && (
                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(comment.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
export default CommentList;
