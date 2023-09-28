const text = /^[a-zA-Z0-9\'\ \%\:\|\/\-\_\,\&\$\@\.\(\)\<\>\n\r]{1,1000}$/;
const textAr = /^[a-zA-Z0-9\,\ \.\_\n\:\(\)\-\/\?&\u0600-\u06FF-/]{0,1000}$/;
const htmlText = /^[a-zA-Z0-9\ \:\|\/\-\_\,\&\$\@\.\(\)\<\>\\\'\"]{3,10000}$/;
const phone = /^[0-9]{8,11}$/;
const name = /^[a-zA-Z\ \-]{1,45}$/;
const numbers = /^[0-9]{15,25}$/;
const email =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{1,40}(?:\.[a-zA-Z0-9-]+){1,3}$/;

module.exports = {
  text,
  phone,
  name,
  email,
  htmlText,
  numbers,
  textAr,
};
