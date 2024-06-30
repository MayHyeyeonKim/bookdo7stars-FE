import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SortMenu = ({ selectedSortOption, onSelectSortOption }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) {
      onSelectSortOption(option);
    }
  };

  return (
    <div>
      <Button
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          color: 'black',
          '&:hover': {
            color: 'brown',
          },
        }}>
        {selectedSortOption}
      </Button>
      <Menu id="sort-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
        <MenuItem onClick={() => handleClose('카트넣기순')}>카트넣기순</MenuItem>
        <MenuItem onClick={() => handleClose('상품명순')}>상품명순</MenuItem>
        <MenuItem onClick={() => handleClose('높은가격순')}>높은가격순</MenuItem>
        <MenuItem onClick={() => handleClose('낮은가격순')}>낮은가격순</MenuItem>
      </Menu>
    </div>
  );
};

export default SortMenu;
