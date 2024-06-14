export function getIatOneDayFromNow() {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
  const now = Date.now(); // Waktu saat ini dalam milidetik
  return Math.floor((now + oneDayInMilliseconds) / 1000); // Konversi ke detik
}
export const getDateNow = () => {
  const dateNow = new Date();
  return dateNow.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
export function getAmOrPm(timeString) {
  // Memecah waktu menjadi bagian-bagian
  const [hour, minute, second] = timeString.split(":").map(Number);

  // Menentukan periode berdasarkan jam
  if (hour >= 0 && hour < 12) {
    return "AM";
  } else if (hour >= 12 && hour <= 23) {
    return "PM";
  } else {
    throw new Error("Invalid time format");
  }
}
export function checkDatesInOrder(dates) {
  if (!Array.isArray(dates) || dates.length === 0) {
    throw new Error("Input harus berupa array tanggal yang tidak kosong");
  }

  // Mengonversi string tanggal ke objek Date dan mengurutkan
  const sortedDates = dates.map((date) => new Date(date)).sort((a, b) => a - b);

  for (let i = 1; i < sortedDates.length; i++) {
    // Mendapatkan tanggal sebelumnya dan tanggal saat ini
    const prevDate = sortedDates[i - 1];
    const currentDate = sortedDates[i];

    // Menambah satu hari ke tanggal sebelumnya
    const nextDay = new Date(prevDate);
    nextDay.setDate(prevDate.getDate() + 1);

    // Memeriksa apakah tanggal saat ini adalah satu hari setelah tanggal sebelumnya
    if (currentDate.getTime() !== nextDay.getTime()) {
      return false;
    }
  }

  return true;
}
