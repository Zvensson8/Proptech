import React from "react";
import { Chip } from "@heroui/react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pågående":
        return "warning";
      case "klar":
      case "aktiv":
        return "success";
      case "ej påbörjad":
        return "default";
      case "avbruten":
      case "inaktiv":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Chip 
      color={getStatusColor(status)} 
      size={size}
      variant="flat"
    >
      {status}
    </Chip>
  );
};

export default StatusBadge;