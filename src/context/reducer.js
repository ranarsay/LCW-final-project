export const actionType = {
    SET_USER: 'SET_USER',
    SET_CLOTHING_ITEMS: 'SET_CLOTHING_ITEMS',
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_CLOTHING_ITEMS:
            return {
                ...state,
                clothingItems: action.clothingItems,
            };
        default:
            return state;
    }
};

export default reducer;