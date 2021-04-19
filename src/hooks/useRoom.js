import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomById, roomSelector } from "../reducers/roomSlice";

export default function useRoom(id) {
  const dispatch = useDispatch();
  const room = useSelector(roomSelector);

  useEffect(() => {
    dispatch(getRoomById(id));
  }, [id]);

  return {
    room,
  };
}
