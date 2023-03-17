import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export function useAppDispatch() {
    return useDispatch<AppDispatch>()
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector