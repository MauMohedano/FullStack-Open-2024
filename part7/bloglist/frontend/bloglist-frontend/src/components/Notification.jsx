/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

/* eslint-disable react/react-in-jsx-scope */
const Notification = () => {

    const message = useSelector(state => state.notification);

    const messageStyle = {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      color: !message ? null : message.type === 'error' ? 'red' : 'green',
      marginBottom: 10,
    };
  
    return message ? (
      <div
        className={message.type === 'error' ? 'error' : 'success'}
        style={messageStyle}
      >
        {message.message}
      </div>
    ) : null;
  };
  
  export default Notification;