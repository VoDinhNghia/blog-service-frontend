import { getUserName } from "./util";

export const optionListOfUser = (users = []) => {
  return users.map((user) => {
    return {
      label: `${getUserName(user)} - ${user?.code}`,
      value: user?.id,
    };
  });
};
