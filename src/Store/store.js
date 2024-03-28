import { configureStore } from '@reduxjs/toolkit';
import gameSlice from '../features/Game/gameSlice';

export default configureStore({
    reducer: {
        game: gameSlice,
    },
})