import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import CustomModal from "./shared/CustomModal";
import MailboxList from "./MailboxList";
import MailForm from "./MailForm";
import useMailbox from "../hooks/useMailbox";
import { getItems } from "../reducers/itemSlice";

function MailboxModal({
  toggle,
  mailboxId,
  isMyMailbox,
  // mailboxRef,
}) {
  // const dispatch = useDispatch();
  // const [isToggled, setIsToggled] = useState(mailboxRef.current.isToggled);

  // useEffect(() => {
  //   if (!isMyMailbox) return;

  //   dispatch(getItems());
  // }, [isMyMailbox]);

  // function toggle(e) {
  //   e.preventDefault();

  //   // setIsToggled((prev) => !prev);
  //   mailboxRef.current.isToggled = !mailboxRef.current.isToggled;
  // }

  // console.log(mailboxRef.current.isToggled);

  return (
    <CustomModal handleClose={toggle}>
      {isMyMailbox ? (
        <MailboxList toggle={toggle} />
      ) : (
        <MailForm
          mailboxId={mailboxId}
          toggle={toggle}
        />
      )}
    </CustomModal>
  );
}

MailboxModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  mailboxId: PropTypes.string.isRequired,
  isMyMailbox: PropTypes.bool.isRequired,
  // mailboxRef: PropTypes.any.isRequired,
};

export default MailboxModal;
