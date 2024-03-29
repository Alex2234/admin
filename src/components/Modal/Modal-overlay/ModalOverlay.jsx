import styles from "./modalOverlay.module.css";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={props.onClose}></div>;
};

export default ModalOverlay;
