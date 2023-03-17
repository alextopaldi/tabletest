import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TableSlice from "./reducers/TableSlice";

const rootReduser = combineReducers({
    TableSlice
})

export const setupStore = () => {
    return configureStore ({
        reducer: rootReduser
    })
}

export type RootState = ReturnType<typeof rootReduser>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']