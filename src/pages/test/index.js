import { useEffect, useState } from "react";
import styles from "../../styles/test.module.css"
const EditableTable = () => {
  const [data, setData] = useState(
    Array.from({ length: 6 }, () => Array(4).fill(""))
  );
  const [highlightRows, setHighlightRows] = useState([]);

  const handleChange = (rowIndex, colIndex, value) => {
    const newData = data.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : cell
      )
    );
    setData(newData);
  };

  const handleSave = () => {
    const findRows = data.map((row, rowIndex) => {
      const emptyCount = row.filter(cell => cell === "").length;
      return emptyCount <= 3 ? rowIndex : null;
    }).filter(index => index !== null);
    setHighlightRows(findRows);
    console.log("Rows with 3 or fewer empty columns:", findRows);
  };

  return (
    <div className={styles.tableContainer}>
      <button onClick={handleSave} className={styles.saveButton}>Save</button>
      <table className={styles.editableTable}>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    className={`${styles.inputField} ${highlightRows.includes(rowIndex) && cell === "" ? styles.highlight : ""}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EditableTable;
