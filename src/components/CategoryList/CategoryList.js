import React, { useMemo } from 'react';
import { Collapse, IconButton, List, ListItemText, ListItem } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { getCategoryHierarchy } from '../../_helper/getCategoryHierarchy';

const CategoryList = ({ totalCategories, onCategoryClick, selectedPath, openCategories, setOpenCategories }) => {
  const categoryHierarchy = useMemo(() => getCategoryHierarchy(totalCategories), [totalCategories]);

  const handleClick = (categoryPath, hasSubCategories) => {
    setOpenCategories((prevOpen) => ({
      ...prevOpen,
      [categoryPath]: !prevOpen[categoryPath],
    }));
  };

  if (!categoryHierarchy) return null;

  const renderCategories = (categories, parentPath = '') => {
    return Object.keys(categories).map((category, index) => {
      const subCategories = categories[category];
      const hasSubCategories = Object.keys(subCategories).length > 0;
      const categoryPath = parentPath ? `${parentPath}>${category}` : category;

      return (
        <div key={index}>
          <ListItem
            button
            onClick={() => onCategoryClick(categoryPath)}
            sx={{
              backgroundColor: selectedPath.join('>') === categoryPath ? 'primary.light' : 'inherit',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
              cursor: 'pointer',
              minWidth: '200px',
              '@media (max-width: 600px)': {
                minWidth: '150px',
                '& .MuiTypography-root': {
                  fontSize: '0.8rem',
                },
                '& .MuiIconButton-root': {
                  padding: '4px',
                },
              },
            }}>
            <ListItemText primary={category} />
            {hasSubCategories && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(categoryPath, hasSubCategories);
                }}>
                {openCategories[categoryPath] ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
              </IconButton>
            )}
          </ListItem>
          {hasSubCategories && (
            <Collapse in={openCategories[categoryPath]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderCategories(subCategories, categoryPath)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <List>{renderCategories(categoryHierarchy)}</List>
    </div>
  );
};

export default CategoryList;
