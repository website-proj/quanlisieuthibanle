export const getStatusColor = (status) => {
    switch (status) {
      case 'Đang giao':
        return {
          color: 'primary.main',
          backgroundColor: '#90caf9',
        };
      case 'Đã giao':
        return {
          color: 'success.main',
          backgroundColor: '#e8f5e9',
        };
      case 'Đã hủy':
        return {
          color: 'error.main',
          backgroundColor: '#ffebee',
        };
      default:
        return {
          color: 'text.primary',
          backgroundColor: 'background.default',
        };
    }
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