import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { eventSlice } from "../../features/events/eventSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        event: eventSlice.reducer,
    },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStore>();