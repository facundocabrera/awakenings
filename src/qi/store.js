import { configureStore } from '@reduxjs/toolkit';

import parameterReducer from './inputs/state';

export default configureStore({
    reducer: {
        parameters: parameterReducer
    },
});
