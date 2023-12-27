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
