export function getBookGroupArray(queryTypes, bookGroups) {
  const groups = [];

  queryTypes.map((q) => {
    if (bookGroups[q]) {
      return groups.push(bookGroups[q]);
    }
  });
  return groups;
}
