const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const userActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  LOAD_USER_FROM_STORAGE: 'LOAD_USER_FROM_STORAGE',
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case userActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case userActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case userActionTypes.LOGOUT:
      return {
        ...initialState,
      };
    case userActionTypes.LOAD_USER_FROM_STORAGE:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
