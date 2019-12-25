export default function reducers(state,action){
  const { payload } = action
  switch(action.type)
  {
    case 'setUserName':
      return {
        ...state,
        username: payload
      }
    default:
      return state
  }
}