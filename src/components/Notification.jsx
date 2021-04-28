import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NotificationWrapper = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  width: 13%;
  height: 300px;
  transition: transform .4s cubic-bezier(0.95,-0.33, 0, 1.29);
  background: ${(props) => props.theme.cardBg.color};
  border: 1px solid ${(props) => props.theme.layoutBorder1.color};
  animation: toast-from-right .5s;

  @keyframes toast-from-right {
    0% {
      transform: translateX(150%);
    }
    25% {
      transform: translateX(70%)
    }
    75% {
      transform: translateX(55%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const NotificationHeader = styled.header`
  text-align: center;
  font-weight: bold;
  background: ${(props) => props.theme.layoutBg2.color};
`;

const NotificationContent = styled.div`
  padding: 1rem;
`;

function Notification({ children }) {
  return (
    <NotificationWrapper>
      <NotificationHeader>
        📢 알림 📢
      </NotificationHeader>
      <NotificationContent>
        {children}
      </NotificationContent>
    </NotificationWrapper>
  );
}

Notification.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Notification;
