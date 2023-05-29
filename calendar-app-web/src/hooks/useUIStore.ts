import { onCloseDateModal, onOpenDateModal, useAppDispatch, useAppSelector } from "../store";


export const useUIStore = () => {
  const dispatch = useAppDispatch();
  const isDateModelOpen = useAppSelector((state) => state.ui.isDateModelOpen);
  const openDateModal = () => dispatch(onOpenDateModal());
  const closeDateModal = () => dispatch(onCloseDateModal());
  return { isDateModelOpen, openDateModal, closeDateModal };
};