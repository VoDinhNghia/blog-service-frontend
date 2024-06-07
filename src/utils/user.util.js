import { getUserName } from "./util";

export const optionListOfUser = (users = []) => {
  return users.map((user) => {
    return {
      label: `${getUserName(user)} - ${user?.code}`,
      value: user?.id,
    };
  });
};

export const optionMultiUserStudySpace = (users = []) => {
  return users.map((user) => {
    return {
      name: getUserName(user),
      id: user?.id,
    };
  });
};
