import styles from "./domains.module.css";
import { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDomains, deleteDomain } from "../../services/actions/domains";
import { TailSpin } from "react-loader-spinner";
import { Box, Heading, Text } from "@chakra-ui/react";
import { differenceInDays, parseISO, addYears } from "date-fns";
import { FaTrash } from "react-icons/fa";
import Table from "../../components/Table/Table";
import ModalBtn from "../../components/ModalBtn/ModalBtn";

const Domains = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDomains());
  }, [dispatch]);

  const domains = useSelector((store) => store.domains.domains);
  const domainsRequest = useSelector((store) => store.domains.domainsRequest);

  const data = useMemo(() => domains, [domains]);

  const determineTextStatus = (remainingDays) => {
    if (remainingDays < 0) {
      return "Истек";
    } else if (remainingDays === 1) {
      return `Остался ${remainingDays} день`;
    } else if (remainingDays >= 2 && remainingDays <= 4) {
      return `Осталось ${remainingDays} дня`;
    } else if (remainingDays >= 5) {
      return `Осталось ${remainingDays} дней`;
    }
  };

  const calculateRemainingDays = (registrationDate) => {
    // Парсим дату регистрации
    const startDate = parseISO(registrationDate);

    // Добавляем один год к дате регистрации
    const expiryDate = addYears(startDate, 1);

    // Текущая дата
    const today = new Date();

    // Вычисляем разницу в днях
    const remainingDays = differenceInDays(expiryDate, today);

    return remainingDays; // Теперь возвращает число
  };

  const determineBgColor = (remainingDays) => {
    if (remainingDays < 1) {
      return "#f73e3e"; // Красный цвет для истекших доменов
    } else if (remainingDays <= 30) {
      return "#c8c975"; // Желтый цвет для доменов, срок которых скоро истечет
    } else {
      return "#72e084"; // Зеленый цвет для доменов с достаточным сроком
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [idDomain, setIdDomain] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = (domainName, id) => {
    setDomainName(domainName);
    setModalOpen(true);
    setIdDomain(id);
  };

  const notConfirm = () => {
    setModalOpen(false);
    setIdDomain("");
  };

  const deleteConfirm = () => {
    if (idDomain) {
      dispatch(deleteDomain(idDomain));
      setModalOpen(false);
      setIdDomain("");
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Домен",
      size: 350,
      cell: (props) => (
        <Text p={1} textAlign={"center"} fontSize={18}>
          {props.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: "group",
      header: "Баер",
      size: 300,
      cell: (props) => (
        <Text p={1} textAlign={"center"} fontSize={18}>
          {props.getValue() === "No group" ? "" : props.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Кол-во активных дней",
      size: 350,
      enableSorting: false,
      cell: (props) => {
        const remainingDays = calculateRemainingDays(props.getValue());
        const bgColorStatus = determineBgColor(remainingDays);
        const formattedRemainingDays = determineTextStatus(remainingDays);
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            columnGap={20}
            bg={bgColorStatus}>
            <Text p={1} textAlign={"center"} fontSize={18}>
              {formattedRemainingDays}
            </Text>
            {remainingDays < 0 ? (
              <Box
                ml={20}
                onClick={() =>
                  handleDeleteClick(
                    props.row.original.name,
                    props.row.original.id
                  )
                }>
                <FaTrash className={styles.deleteBtn} />
              </Box>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
  ];

  console.log(data);

  return (
    <div className={styles.container}>
      <Heading mb={5}>Проверка Доменов</Heading>
      <Box>
        {domainsRequest ? (
          <div className={styles.spinner}>
            <TailSpin color="#00BFFF" height={150} width={150} />
          </div>
        ) : (
          <Box>
            <Table columns={columns} data={data} />
          </Box>
        )}
      </Box>
      <ModalBtn
        text={`Точно удалить домен ${domainName}`}
        modalOpen={modalOpen}
        closeModal={closeModal}
        notConfirm={notConfirm}
        confirm={() => deleteConfirm(idDomain)}
      />
    </div>
  );
};

export default Domains;
