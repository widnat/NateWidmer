import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { StoreState, StoreDispatch } from "./store";

type DispatchFunc = () => StoreDispatch;
export const useStoreDispatch: DispatchFunc = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
