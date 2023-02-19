import { message  } from "antd";
import { useEffect } from "react";

interface Props {
  type: "success" | "error" | "warning";
  content: string;
  onClose?: () => void;
}

const AlertMessage: React.FC<Props> = ({ type, content, onClose }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.open({
      type,
      content,
      onClose,
    });
  }, []);

  return <>{contextHolder}</>;
};

export default AlertMessage;
