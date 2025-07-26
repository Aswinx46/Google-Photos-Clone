import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import UserSlice from './slices/userSlice'
import TokenSlice from './slices/tokenSlice'

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['token']
}

const rootReducer = combineReducers({
    token: TokenSlice,
    user: UserSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>