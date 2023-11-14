const initialState = {notations: JSON.parse(localStorage.getItem('notations')) || []};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_STATE':
            const data = [...state.notations, action.payload];
            localStorage.setItem('notations', JSON.stringify(data));
            return {
                ...state,
                notations: [...state.notations, action.payload]
            }
        case 'FILTERED_STATE':
            const filteredData = state.notations.filter(item => item.id !== action.payload);
            localStorage.setItem('notations', JSON.stringify(filteredData));
            return {
                ...state,
                notations: state.notations.filter(item => item.id !== action.payload)
            }
        default:
            return state;
    }
}

export default reducer;