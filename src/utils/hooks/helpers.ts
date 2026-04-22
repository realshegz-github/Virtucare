export const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const extractIdFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : url;
};
