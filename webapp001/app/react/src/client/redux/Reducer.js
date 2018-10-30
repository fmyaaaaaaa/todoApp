const initialState = {
    sample: 1
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { sample: state.sample + 1};
        // Reduxにおいてこの「default」が一番最初に呼ばれ、「initialState」が初期Stateとして登録される
        default:
            return state
    }
}
