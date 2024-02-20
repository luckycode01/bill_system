export const getTimeData = (data) => {
  const time = data ? new Date(data) : new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  const weekday = time.getDay();
  return {
    year,
    month,
    day,
    hours,
    min,
    sec,
    weekday,
  };
};

// 表格末行统计
export const handleSummaries = (param, noCountList = []) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
      return;
    }
    const values = data.map((item) => Number(item[column.property]));
    if (noCountList.includes(column.label)) return (sums[index] = "--");
    if (!values.every((value) => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
    } else {
      sums[index] = "--";
    }
  });
  return sums;
};
