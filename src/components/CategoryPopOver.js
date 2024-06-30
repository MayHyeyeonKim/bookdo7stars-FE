import { ClickAwayListener, Fade, Paper, Typography, Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popper } from '@mui/base';

const CategoryPopOver = ({ handlePopperClose, secondAllSubCategories, thirdAllSubCategories, anchorEl, id, open }) => {
  const navigate = useNavigate();
  const encodeCategoryPath = (path) => encodeURIComponent(path);

  const clickSub3Category = useCallback(
    (firstCategory, secondCategory, thirdCategory) => {
      const newPath = [firstCategory, secondCategory, thirdCategory];
      let categoryPath = newPath.join('>');
      categoryPath = '국내도서>' + categoryPath;
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      handlePopperClose();
    },
    [navigate, handlePopperClose],
  );

  const clickSub2Category = useCallback(
    (firstCategory, secondCategory) => {
      const newPath = [firstCategory, secondCategory];
      let categoryPath = newPath.join('>');
      categoryPath = '국내도서>' + categoryPath;
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      handlePopperClose();
    },
    [navigate, handlePopperClose],
  );

  const clickSubCategory = useCallback(
    (firstCategory) => {
      const newPath = [firstCategory];
      let categoryPath = newPath.join('>');
      categoryPath = '국내도서>' + categoryPath;
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      handlePopperClose();
    },
    [navigate, handlePopperClose],
  );

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition style={{ zIndex: 1500 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              width: '300px',
              maxHeight: '600px',
              overflowY: 'auto',
              padding: '10px',
              boxShadow: 3,
              borderRadius: '8px',
              backgroundColor: 'background.paper',
            }}
            {...TransitionProps}>
            <ClickAwayListener onClickAway={() => handlePopperClose()}>
              <Box>
                {Object.keys(secondAllSubCategories).map((firstCategory, index) => (
                  <Box key={index} sx={{ marginBottom: '10px' }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      onClick={() => clickSubCategory(firstCategory)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}>
                      <strong>{firstCategory}</strong>
                    </Typography>
                    {secondAllSubCategories[firstCategory].map((secondCategory, idx) => (
                      <Box key={idx} sx={{ paddingLeft: '10px', marginBottom: '5px' }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          onClick={() => clickSub2Category(firstCategory, secondCategory)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}>
                          {secondCategory}
                        </Typography>
                        {thirdAllSubCategories[firstCategory][secondCategory].map((thirdCategory, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            onClick={() => clickSub3Category(firstCategory, secondCategory, thirdCategory)}
                            sx={{
                              cursor: 'pointer',
                              paddingLeft: '20px',
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}>
                            {thirdCategory}
                          </Typography>
                        ))}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default CategoryPopOver;
