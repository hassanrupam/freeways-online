import { Modal, notification } from "antd";

const defaultTimeOutSeconds = 5;


notification.config({
  placement: "top", // Options: 'top', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
  duration: defaultTimeOutSeconds, // Default duration (in seconds)
  showProgress:true,
});

const getNotificationClass = (type: string) => {
    switch (type) {
      case "success":
        return "custom-notification-success";
      case "error":
        return "custom-notification-error";
      case "info":
        return "custom-notification-info";
      case "warning":
        return "custom-notification-warning";
      default:
        return "custom-notification-default";
    }
  };


const useNotification = () => {
  const notify = (type: "success" | "error" | "info" | "warning", message: string, description?: string, autoClose: boolean = true, btn?: React.ReactNode) => {
    notification[type]({
      message,
      description,
      duration: autoClose ? defaultTimeOutSeconds : 0, // Set duration 0 to keep it open
      btn,
      className: `${getNotificationClass(type)}`,
    });
  };

  const confirmAction = (
    title: string,
    content: string,
    onConfirm: () => void,
    okText?: string,
    cancelText?: string,
    onCancel?: () => void
  ) => {
    Modal.confirm({
      title,
      content,
      closable:true,
      onOk: onConfirm, // Run this function if user confirms
      onCancel: onCancel || (() => {}), // Run this if user cancels
      okText: okText || "Okay",
      cancelText: cancelText || "Cancel",
      wrapClassName:"backdrop-blur-md",
      className:"custom-notification-confirm",
      cancelButtonProps: {
        rootClassName: 'w-24',
        className: `text-sm quick-transition rounded-full bg-theme text-theme-text p-2
        border-[1px] border-theme-text shadow-down hover:shadow-deep-down disabled:bg-theme-disabled disabled:border-2 disabled:shadow-down 
        disabled:text-theme-disabled-text important`},
      okButtonProps: {
        rootClassName: 'w-24',
        className: `text-sm quick-transition rounded-full bg-theme-highlight border-theme-text text-theme p-2
        border-[1px]  shadow-down hover:shadow-deep-down disabled:bg-theme-disabled disabled:border-2 disabled:shadow-down 
        disabled:text-theme-disabled-text important`}
    });
  };

  return {
    successNotification: (message: string, description?: string, autoClose?: boolean, btn?: React.ReactNode) =>
      notify("success", message, description, autoClose, btn),

    errorNotification: (message: string, description?: string, autoClose?: boolean, btn?: React.ReactNode) =>
      notify("error", message, description, autoClose, btn),

    infoNotification: (message: string, description?: string, autoClose?: boolean, btn?: React.ReactNode) =>
      notify("info", message, description, autoClose, btn),

    warningNotification: (message: string, description?: string, autoClose?: boolean, btn?: React.ReactNode) =>
      notify("warning", message, description, autoClose, btn),

    confirmAction,
  };
};

export default useNotification;