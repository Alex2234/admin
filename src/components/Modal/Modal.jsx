import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import  ModalOverlay from "./Modal-overlay/ModalOverlay";
import { FaX } from "react-icons/fa6";
import { Box } from "@chakra-ui/react";

const Modal = (props) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${
        props.isActive ? styles.modal_active : ""
      }`}>
      <ModalOverlay onClose={props.onClose} />
      <div className={styles.wrapper}>
        <Box className={`${styles.head} pt={10}`}>
          <Box className={`${styles.icon} pr={10}`} onClick={props.onClose}>
            <FaX />
          </Box>
        </Box>
        {props.children}
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default Modal;
