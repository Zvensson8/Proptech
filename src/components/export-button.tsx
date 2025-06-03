import React from "react";
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { exportToPDF, exportToExcel, exportToWord } from "../utils/export-utils";

interface ExportButtonProps {
  title: string;
  headers: string[];
  data: any[];
  filename: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ title, headers, data, filename }) => {
  const handleExport = (format: "pdf" | "excel" | "word") => {
    switch (format) {
      case "pdf":
        exportToPDF(title, headers, data, filename);
        break;
      case "excel":
        exportToExcel(headers, data, filename);
        break;
      case "word":
        exportToWord(title, headers, data, filename);
        break;
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="flat" 
          endContent={<Icon icon="lucide:chevron-down" />}
          startContent={<Icon icon="lucide:download" />}
        >
          Exportera
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Export options">
        <DropdownItem 
          key="pdf" 
          startContent={<Icon icon="lucide:file-text" />}
          onPress={() => handleExport("pdf")}
        >
          PDF
        </DropdownItem>
        <DropdownItem 
          key="excel" 
          startContent={<Icon icon="lucide:table" />}
          onPress={() => handleExport("excel")}
        >
          Excel
        </DropdownItem>
        <DropdownItem 
          key="word" 
          startContent={<Icon icon="lucide:file" />}
          onPress={() => handleExport("word")}
        >
          Word
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ExportButton;