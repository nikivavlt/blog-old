export const setToken = (token: string): { type: string, payload: { token: string }} => {
    return {
    type: 'SET_TOKEN',
    payload: { token }
  };
};
