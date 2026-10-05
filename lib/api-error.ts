
export const apiErrorMessage = (err: unknown, fallback = "Something went wrong. Please try again.") => {
  const message = (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
  if (Array.isArray(message)) return message.join(". ");
  return message || (err instanceof Error && err.message) || fallback;
};
