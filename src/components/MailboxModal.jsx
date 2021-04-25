import React from "react";
import PropTypes from "prop-types";

import CustomModal from "./shared/CustomModal";
import MailboxList from "./MailboxList";
import MailForm from "./MailForm";

function MailboxModal({
  toggle,
  mailboxId,
  isMyMailbox,
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
  toggle: PropTypes.func.isRequired,
  mailboxId: PropTypes.string.isRequired,
  isMyMailbox: PropTypes.bool.isRequired,
};

export default MailboxModal;
