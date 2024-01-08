import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import Modal from "../Modal/Modal";

const ModalBtn = ({ text, confirm, notConfirm, closeModal, modalOpen }) => {
  return (
    <Modal onClose={closeModal} isActive={modalOpen}>
      <Text m={5} fontSize={21}>{text}</Text>
      <ButtonGroup m={5}  columnGap={5}>
        <Button p={5} colorScheme="green" onClick={confirm}>
          Да
        </Button>
        <Button  colorScheme="red" onClick={notConfirm}>Нет</Button>
      </ButtonGroup>
    </Modal>
  );
};

export default ModalBtn;
