import styles from "./domains.module.css";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDomains } from "../../services/actions/domains";
import { useTable } from "react-table";
import { TailSpin } from "react-loader-spinner";

const Domains = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDomains());
  }, [dispatch]);

  const domains = useSelector((store) => store.domains.domains);
  const domainsRequest = useSelector((store) => store.domains.domainsRequest);

  console.log(domains);

  const data = useMemo(() => domains, [domains]);

  const columns = useMemo(
    () => [
      {
        Header: "Название",
        accessor: "name",
      },
      {
        Header: "Дата создания",
        accessor: "created_at",
      },
    ],
    []
  );

  console.log(columns);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Проверка Доменов</h2>
      {domainsRequest ? (<div className={styles.spinner}>
        <TailSpin color="#00BFFF" height={150} width={150} />
      </div>) : (<div className={styles.tableDomains}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td  {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default Domains;
