const initialState: string = null;

function tokenReducer (token = initialState, action: { type: string, payload: { token: string } }): string {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TOKEN':
      return payload.token;

    case 'UPDATE_TOKEN':
      return payload.token;

    default:
      return token;
  };
  // case GET_ARTICLES:
  //   return payload;

  // case DELETE_ARTICLE:
  //   return articles.filter(({ id }) => id !== payload.id);
}

export default tokenReducer;
