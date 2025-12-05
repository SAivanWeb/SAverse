export default {

  handleSuccess(response) {
    return {
      data: response.data?.data || null,
      status: response.status,
    };
  },

  handleError(error) {
    if (error.response) {
      return {
        error: {
          code: error.response.data?.error?.code || 'SERVER_ERROR',
          message: error.response.data?.error?.message || 'Unknown server error',
          status: error.response.status,
        }
      };
    }

    return {
      error: {
        code: 'NETWORK_ERROR',
        message: error.message || 'Network error occurred',
        originalError: error
      }
    };
  }
};