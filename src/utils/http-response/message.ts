const savedSuccess = (modelName: string): string => {
  return `The ${modelName} has been saved successfully.`;
};

const updatedSuccess = (modelName: string): string => {
  return `The ${modelName} has been updated successfully.`;
};

const deletedSuccess = (modelName: string): string => {
  return `The ${modelName} has been deleted successfully.`;
};

const notFound = (modelName: string): string => {
  return `The ${modelName} cannot be found.`;
};

const changeStatusSuccess = (modelName: string): string => {
  return `The ${modelName} status has been changed successfully.`;
};

export const httpResponseMessages = {
  savedSuccess,
  updatedSuccess,
  deletedSuccess,
  notFound,
  changeStatusSuccess,
};
