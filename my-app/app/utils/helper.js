function formatDateTime(isoString) {
  const dateObj = new Date(isoString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // e.g., "Thursday"
    year: "numeric",
    month: "long", // e.g., "February"
    day: "numeric",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObj);

  return {
    date: formattedDate, // "Thursday, February 27, 2025"
    time: formattedTime, // "05:37:58 AM"
  };
}

function getDateCategory(isoString) {
  if (!isoString) return "Invalid Date";

  const dateObj = new Date(isoString);
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  // Get today's date at midnight (to compare only date part)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get yesterday and tomorrow
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Get given date at midnight
  const givenDate = new Date(dateObj);
  givenDate.setHours(0, 0, 0, 0);

  // Compare
  if (givenDate.getTime() === today.getTime()) {
    return "Today";
  } else if (givenDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else if (givenDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  }
}

export { formatDateTime, getDateCategory };
