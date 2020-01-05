export default (number: number) => {
  const newString = Number(number).toString();
  return newString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
