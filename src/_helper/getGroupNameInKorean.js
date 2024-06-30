export function getGroupNameInKorean(groupName) {
  const koreanGroupNames = ['신간', '화제의 신간', '베스트 셀러', '블로거 추천 도서'];
  let groupNameInKorean;
  if (groupName === 'ItemNewAll') {
    groupNameInKorean = koreanGroupNames[0];
  } else if (groupName === 'ItemNewSpecial') {
    groupNameInKorean = koreanGroupNames[1];
  } else if (groupName === 'BestSeller') {
    groupNameInKorean = koreanGroupNames[2];
  } else {
    groupNameInKorean = koreanGroupNames[3];
  }

  return groupNameInKorean;
}
