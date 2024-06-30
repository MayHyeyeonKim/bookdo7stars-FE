export function getSubCategories(categoryHierarchy, categoryName) {
  const category = categoryHierarchy[categoryName];
  if (!category) {
    return [];
  }
  return Object.keys(category);
}
