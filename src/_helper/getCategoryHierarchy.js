export function getCategoryHierarchy(categories) {
  const root = {};

  categories.forEach((category) => {
    const parts = category.split('>');
    let current = root;

    parts.forEach((part) => {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    });
  });

  return root;
}
