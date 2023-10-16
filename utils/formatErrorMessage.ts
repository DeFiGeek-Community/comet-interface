export const formatErrorMessage = (message: string): string => {
  // Remove any occurrence of process.env.NEXT_PUBLIC_ALCHEMY_ID
  const cleanedMessage = message.replace(
    process.env.NEXT_PUBLIC_ALCHEMY_ID || "",
    "",
  );
  console.log("formatErrorMessage", message);

  // Truncate the message to 1500 characters, appending "..." if truncated
  return cleanedMessage.length > 1500
    ? cleanedMessage.substr(0, 1500) + "..."
    : cleanedMessage;
};
