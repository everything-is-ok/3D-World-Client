import React from "react";
import PropTypes from "prop-types";

import CustomModal from "./shared/CustomModal";
import MailboxList from "./MailboxList";
import MailForm from "./MailForm";

function MailboxModal({
  mailboxId,
  isMyMailbox,
  toggle,
}) {
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
  mailboxId: PropTypes.string.isRequired,
  isMyMailbox: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default MailboxModal;
