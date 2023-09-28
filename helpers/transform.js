function addZero(x, n) {
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
}

exports.transform = () => {
  days = new Date();
  years = new Date().getFullYear();
  month = new Date().getMonth();
  hours = addZero(days.getHours(), 2);
  mins = addZero(days.getMinutes(), 2);
  seconds = addZero(days.getSeconds(), 2);
  mseconds = addZero(days.getMilliseconds(), 3);

  return `${years}${month}${days.getDate()}${hours}${mins}${seconds}${mseconds}${parseInt(
    Math.random() * 100
  )}`;
};
removeYearPrefix = (year) => {
  return `${year}`.substring(2);
};

exports.addCondations = (whereCluse) => {
  whereCluse.is_deleted = "0";
  whereCluse.is_active = "1";
  return whereCluse;
};
