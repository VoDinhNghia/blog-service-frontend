import { routes, typeFollowPage } from "../constants/constant";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsFillTrash3Fill, BsFillPersonCheckFill } from "react-icons/bs";

export const getImagesPesonelPage = (posts = [], currentUserId = "") => {
  const images = [];
  posts.forEach((item = {}) => {
    const { user = {}, attachments = {} } = item;
    if (user?.id === currentUserId) {
      images.push(...attachments);
    }
  });
  return images;
};

export const utilitiesList = (userInfo = {}) => {
  return [
    {
      id: "1u",
      linkTo: routes.FOLLOWED,
      state: {
        userId: userInfo?.id,
        type: typeFollowPage.FOLLOWED,
      },
      icon: <AiOutlineUsergroupAdd className="IconLeftHomePage" />,
      title: "Danh sách người theo dõi bạn",
    },
    {
      id: "2u",
      linkTo: routes.FOLLOWING,
      state: {
        userId: userInfo?.id,
        type: typeFollowPage.FOLLOWING,
      },
      icon: <AiOutlineUsergroupAdd className="IconLeftHomePage" />,
      title: "Danh sách người bạn theo dõi",
    },
    {
      id: "3u",
      linkTo: routes.HOME,
      state: {},
      icon: <FaShare className="IconLeftHomePage" />,
      title: "Danh sách bài chia sẻ",
    },
    {
      id: "4u",
      linkTo: routes.HOME,
      state: {},
      icon: <BsFillTrash3Fill className="IconLeftHomePage" />,
      title: "Thùng rác",
    },
    {
      id: "5u",
      linkTo: routes.HOME,
      state: {},
      icon: <BsFillPersonCheckFill className="IconLeftHomePage" />,
      title: "Thông tin cá nhân",
    },
  ];
};
