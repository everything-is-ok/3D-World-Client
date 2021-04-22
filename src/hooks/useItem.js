import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItems, itemSelector } from "../reducers/itemSlice";

export default function useItem(itemList) {
  // const dispatch = useDispatch();
  // const initial = useSelector(itemSelector);
  const [items, setItems] = useState(itemList);

  // useEffect(() => {
  //   dispatch(getItems());
  // }, [id]);

  function handleChangeItem(itemId, position) {
    // items.itemId.position = position;
    const newItems = [...items];
    newItems[itemId].position = position;
    setItems(newItems);
  }

  return {
    items,
    handleChangeItem,
  };
}
