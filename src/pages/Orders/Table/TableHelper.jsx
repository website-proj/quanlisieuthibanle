export const getStatusColor = (status) => {
  if (status === 'Processing') {
    return {
      backgroundColor: '#90caf9', // Màu nền pastel xanh dương
      color: '#0063ED', // Màu chữ xanh dương đậm
    };
  }
  if (status === 'Delivered') {
    return {
      backgroundColor: '#A8D5BA', // Màu nền pastel xanh lá
      color: '#2F7D3F', // Màu chữ xanh lá đậm
    };
  }
  if (status === 'Canceled') {
    return {
      backgroundColor: '#F2A1A1', // Màu nền pastel đỏ
      color: '#D32F2F', // Màu chữ đỏ đậm
    };
  }
  return {};
};

  export const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  
  const descendingComparator = (a, b, orderBy) => {
    if (a[orderBy] < b[orderBy]) return -1;
    if (a[orderBy] > b[orderBy]) return 1;
    return 0;
  };