import { GroupOutlined, Hotel } from "@material-ui/icons";
import { CalendarTodaySharp, Payment } from "@mui/icons-material";
import { PiHandCoinsDuotone } from "react-icons/pi";

export const SidebarData = [
  {
    title: "مدیریت کاربران",
    path: "/admin/users",
    icon: <GroupOutlined />,
    cName: "nav-text",
  },
  {
    title: "مدیریت تسهیلات",
    path: "/admin/loans",
    icon: <Payment />,
    cName: "nav-text",
  },
  {
    title: "درخواست وام",
    path: "/admin/loanrequest",
    icon: <PiHandCoinsDuotone />,
    cName: "nav-text",
  },
  {
    title: "مدیریت اقامتگاه‌ها",
    path: "/admin/places",
    icon: <Hotel />,
    cName: "nav-text",
  },
  {
    title: "تقویم اقامتگاه‌ها",
    path: "/admin/calendar",
    icon: <CalendarTodaySharp />,
    cName: "nav-text",
  },
  // {
  //     title: "تقویم غذایی",
  //     path: "/admin/calendar",
  //     icon: <DateRange />,
  //     cName: "nav-text"
  // },
  // {
  //     title: "تاریخچه سفارشات",
  //     path: "/admin/foods",
  //     icon: <History />,
  //     cName: "nav-text"
  // },
  // {
  //     title: "تنظیمات",
  //     path: "/admin/settings",
  //     icon: <Settings />,
  //     cName: "nav-text"
  // },
  // {
  //     title: "ثبت غذا در تقویم",
  //     path: "/admin/deffoodcalendar",
  //     icon: <CalendarToday />,
  //     cName: "nav-text"
  // }
];
