const initialState = {
    todos: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return {...state, todos: action.data };
        case "CREATE_TODO":
            return {...state, todos: [...state.todos, action.data] };
        default:
            return state;
    }
};

export default rootReducer;