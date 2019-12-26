const defaultState = {
  userrole: 0,
  user: undefined,
  authError: null,
  resetError: null
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'INVALID EMAIL/PASSOWORD'
      }

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        user: action.user,
        userrole: action.user.user.role,
        authError: null
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {};

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.msg
      }
    case 'RESET_SUCCESS':
      console.log('An email was sent to your email to reset the password')
      return {
        ...state,
        resetError: null
      }
    case 'UPDATE_SUCCESS':
      console.log('Profile updated')
      return {
        ...state,
        user: action.auth

      }
    case 'RESET_ERROR':
      console.log('Email is not in the system')
      return {
        ...state,
        resetError: 'Email is not in the system'
      }
    default:
      return state
  }
};

