export const formatResponse = (data, pagination = null) => {
  const response = { data };
  if (pagination) {
    response.pagination = pagination;
  }
  return response;
};
