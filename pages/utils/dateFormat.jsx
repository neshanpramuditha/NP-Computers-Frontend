export default function getFormattedDate(timestamp) {
   const date = new Date(timestamp);

  const options = {
    timeZone: "Asia/Colombo",
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  };

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

  const day = parts.find(p => p.type === "day").value;
  const weekday = parts.find(p => p.type === "weekday").value;
  const month = parts.find(p => p.type === "month").value;
  const hour = parts.find(p => p.type === "hour").value;
  const minute = parts.find(p => p.type === "minute").value;
  const dayPeriod = parts.find(p => p.type === "dayPeriod").value;

  function getOrdinal(n) {
    n = Number(n);
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  return `${day}${getOrdinal(day)} ${weekday} of ${month} ${hour}:${minute} ${dayPeriod}`;
}