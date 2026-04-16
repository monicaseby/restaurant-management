import {
  LayoutDashboard,
  Receipt,
  ShoppingCart,
  Users,
  Settings,
  Utensils,
  Building2,
  Bell
} from "lucide-react";

export const sidebarMenu = [

  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    name: "Organization",
    icon: Building2,
    path: "/organization",
  },

  {
    name: "Menu",
    icon: Utensils,

    children: [

      {
        name: "All Items",
        path: "/inventory/menu?type=All",
      },

      {
        name: "Veg",
        path: "/inventory/menu?type=Veg",
      },

      {
        name: "Non-Veg",
        path: "/inventory/menu?type=Non-Veg",
      },

    ],
  },

  {
    name: "Billing",
    icon: Receipt,
    path: "/billing",
  },

  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/orders",
  },

  
  {
    name: "Notifications",
    icon: Bell,
    path: "/communication/alerts",
  },

  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },

];