import React, { useState } from "react";

const ExpandableTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((row) => row !== index)
        : [...prev, index]
    );
  };

  const handleInputChange = (rowIndex, subRowIndex, colIndex, value) => {
    setInputValues((prev) => ({
      ...prev,
      [rowIndex]: {
        ...(prev[rowIndex] || {}),
        [subRowIndex]: {
          ...(prev[rowIndex]?.[subRowIndex] || {}),
          [colIndex]: value,
        },
      },
    }));
  };

  const handleSubmit = (rowIndex, subRowIndex) => {
    const rowData = inputValues[rowIndex]?.[subRowIndex] || {};
    console.log(`Enviando datos de fila ${rowIndex}, subfila ${subRowIndex}:`, rowData);
    alert(`Datos enviados: ${JSON.stringify(rowData)}`);
  };

  return (
    <table border="1" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>Título -- Principal</th>
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr>
              <td onClick={() => toggleRow(rowIndex)} style={{ cursor: "pointer" }}>
                {row.title} {expandedRows.includes(rowIndex) ? "▲" : "▼"}
              </td>
            </tr>
            {expandedRows.includes(rowIndex) && row.subtable && (
              <>
                {/* Fila de subtítulos */}
                <tr>
                  <td colSpan={row.subtable.headers.length}>
                    <table border="1" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          {row.subtable.headers.map((header, colIndex) => (
                            <th key={colIndex}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {row.subtable.rows.map((subRow, subRowIndex) => (
                          <tr key={subRowIndex}>
                            {subRow.map((placeholder, colIndex) => (
                              <td key={colIndex}>
                                <input
                                  type="text"
                                  placeholder={placeholder}
                                  onChange={(e) =>
                                    handleInputChange(rowIndex, subRowIndex, colIndex, e.target.value)
                                  }
                                  value={
                                    inputValues[rowIndex]?.[subRowIndex]?.[colIndex] || ""
                                  }
                                />
                              </td>
                            ))}
                            <td>
                              <button
                                onClick={() => handleSubmit(rowIndex, subRowIndex)}
                              >
                                Enviar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

// Ejemplo de uso
const tableData = {
  rows: [
    {
      title: "Título 1",
      subtable: {
        headers: ["Columna 1", "Columna 2", "Columna 3", "Acción"],
        rows: [
          ["Input A1", "Input A2", "Input A3"],
          ["Input B1", "Input B2", "Input B3"]
        ]
      }
    },
    {
      title: "Título 2",
      subtable: {
        headers: ["Campo 1", "Campo 2", "Campo 3", "Enviar"],
        rows: [
          ["Input C1", "Input C2", "Input C3"]
        ]
      }
    },
    {
      title: "Título 5",
      subtable: {
        headers: ["Campo 1", "Campo 2", "Campo 3", "Enviar"],
        rows: [
          ["Input C1", "Input C2", "Input C3"]
        ]
      }
    }
  ]
};

const App = () => {
  return <ExpandableTable data={tableData} />;
};

export default App;
