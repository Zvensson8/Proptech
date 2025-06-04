import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  HeadingLevel,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

// Fallback implementation in case file-saver is unavailable at runtime
// (should rarely happen since it is bundled with the app)
const fallbackSaveAs = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

const saveFile = typeof saveAs === "function" ? saveAs : fallbackSaveAs;

// Helper function to convert data to PDF
export const exportToPDF = (
  title: string,
  headers: string[],
  data: any[],
  filename: string
) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  
  // Add date
  doc.text(
    `Exporterad: ${new Date().toLocaleDateString()}`,
    14,
    30
  );
  
  // Format data for autoTable
  const tableData = data.map(item => {
    return headers.map(header => {
      // Convert header to camelCase or check direct property
      const key = header.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase());
      
      // Try multiple ways to find the data
      if (item[key] !== undefined) return item[key].toString();
      if (item[header] !== undefined) return item[header].toString();
      
      // For complex objects like status that might be nested
      if (typeof item === 'object') {
        for (const prop in item) {
          if (prop.toLowerCase() === key.toLowerCase() || 
              prop.toLowerCase() === header.toLowerCase().replace(/ /g, "_")) {
            return item[prop].toString();
          }
        }
      }
      
      return "";
    });
  });
  
  // Generate table
  autoTable(doc, {
    head: [headers],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};

// Helper function to convert data to Excel
export const exportToExcel = (
  headers: string[],
  data: any[],
  filename: string
) => {
  // Format data for Excel
  const excelData = data.map(item => {
    const row: Record<string, any> = {};
    headers.forEach(header => {
      // Try multiple ways to find the data
      const key = header.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase());
      
      if (item[key] !== undefined) {
        row[header] = item[key];
      } else if (item[header] !== undefined) {
        row[header] = item[header];
      } else {
        // For complex objects or differently named properties
        for (const prop in item) {
          if (prop.toLowerCase() === key.toLowerCase() || 
              prop.toLowerCase() === header.toLowerCase().replace(/ /g, "_")) {
            row[header] = item[prop];
            break;
          }
        }
        
        // If still not found
        if (row[header] === undefined) {
          row[header] = "";
        }
      }
    });
    return row;
  });
  
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
  // Generate Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

// Helper function to convert data to Word
export const exportToWord = async (
  title: string,
  headers: string[],
  data: any[],
  filename: string
) => {
  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Exporterad: ${new Date().toLocaleDateString()}`,
                color: "666666",
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Table({
            rows: [
              new TableRow({
                children: headers.map(
                  header =>
                    new TableCell({
                      children: [new Paragraph({ text: header })],
                      shading: {
                        fill: "3498db",
                        color: "3498db",
                      },
                    })
                ),
              }),
              ...data.map(
                item =>
                  new TableRow({
                    children: headers.map(header => {
                      // Try multiple ways to find the data
                      const key = header.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase());
                      let value = "";
                      
                      if (item[key] !== undefined) {
                        value = item[key].toString();
                      } else if (item[header] !== undefined) {
                        value = item[header].toString();
                      } else {
                        // For complex objects or differently named properties
                        for (const prop in item) {
                          if (prop.toLowerCase() === key.toLowerCase() || 
                              prop.toLowerCase() === header.toLowerCase().replace(/ /g, "_")) {
                            value = item[prop].toString();
                            break;
                          }
                        }
                      }
                      
                      return new TableCell({
                        children: [
                          new Paragraph({
                            text: value,
                          }),
                        ],
                      });
                    }),
                  })
              ),
            ],
          }),
        ],
      },
    ],
  });

  // Generate and save document
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  saveFile(blob, `${filename}.docx`);
};