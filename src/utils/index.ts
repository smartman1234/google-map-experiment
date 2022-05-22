import { notification } from "antd";

export function OpenNotification(desc: string) {
  notification.error({
    message: "Failure",
    description: desc,
    placement: "top",
    duration: 1.5,
  });
}
