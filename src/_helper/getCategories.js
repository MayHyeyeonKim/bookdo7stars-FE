export function getCategories(bookList) {
  const categoriesOfGroup = bookList.map((book) => {
    return book.categoryName.split('>')[1];
  });

  const _categories = [];
  categoriesOfGroup.map((cat) => {
    if (!_categories.includes(cat)) {
      _categories.push(cat);
    }
  });

  const categories = [];
  const all = { id: '전체', label: '전체' };
  categories.push(all);
  _categories.map((c) => {
    const cat = { id: c, label: c };
    return categories.push(cat);
  });
  return categories;
}
