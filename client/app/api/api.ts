export const getAllBooks = async () => {
  const response = await fetch("https://api-dental.molaraiche.com/api/booking");
  const data = await response.json();
  return data.Booking;
};
