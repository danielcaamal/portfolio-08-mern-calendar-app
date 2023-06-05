

export const getErrorMessageFromResponse = (error: any): string | undefined => {
  let messageToDisplay = undefined;
  if (error?.response?.data?.message) {
    const errorMessage = error.response.data.message;
    messageToDisplay = errorMessage;
    if (Array.isArray(errorMessage)) {
      messageToDisplay = errorMessage.join(', ');
    }
  }
  return messageToDisplay;
}