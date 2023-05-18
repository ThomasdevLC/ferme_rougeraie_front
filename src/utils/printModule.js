export const handlePrint = () => {
  const printTable = document.getElementById("printTable");
  if (printTable) {
    const printContent = printTable.outerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              td {
                padding: 30px; 
              }
            }
          
              ul {
                list-style: none;
            }
            }
          </style>
        </head>
        <body>${printContent}</body>
        </html>
      `);
    printWindow.document.close();
    printWindow.print();
  }
};
