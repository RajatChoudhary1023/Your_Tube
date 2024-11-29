const currentuserreducer=(state=null,action)=>{
    switch (action.type) {
        case "FETCH_CURRENT_USER":
            return action.payload
            case "UPDATE_USER_PREMIUM_STATUS":
                return {
                  ...state,
                  result: {
                    ...state.result,
                    ispremium: action.payload,
                  },
                };
                
        default:
            return state;
    }
}
export default currentuserreducer;