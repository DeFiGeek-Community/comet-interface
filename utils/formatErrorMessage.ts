export const formatErrorMessage = (message: any): string => {
  const stringMessage = String(message);
  // Remove any occurrence of process.env.NEXT_PUBLIC_ALCHEMY_ID
  const cleanedMessage = stringMessage.replace(
    process.env.NEXT_PUBLIC_ALCHEMY_ID || "",
    "",
  );
  console.log("formatErrorMessage", stringMessage);

  // Truncate the message to 1500 characters, appending "..." if truncated
  return cleanedMessage.length > 1500
    ? cleanedMessage.substr(0, 1500) + "..."
    : cleanedMessage;
};

export const logErrorMessage = (message: any) => {
  const stringMessage = String(message);
  // Remove any occurrence of process.env.NEXT_PUBLIC_ALCHEMY_ID
  const cleanedMessage = stringMessage.replace(
    process.env.NEXT_PUBLIC_ALCHEMY_ID || "",
    "",
  );
  console.log("logErrorMessage", cleanedMessage);
};
