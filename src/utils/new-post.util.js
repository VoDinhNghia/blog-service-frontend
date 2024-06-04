import { BsLock } from "react-icons/bs";
import { MdPublic } from "react-icons/md";

export const optionPrivateMode = [
  {
    value: true,
    label: "Riêng tư",
    icon: <BsLock />,
  },
  {
    value: false,
    label: "Mọi người",
    icon: <MdPublic />,
  },
];
