// Readable temporary password: no 0/O or 1/l/I, so it survives being read out or texted.
export const generatePassword = (length = 10) => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
};
