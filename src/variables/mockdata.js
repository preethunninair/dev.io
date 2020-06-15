export const MENUDATA = [
  {
    title: "Overview",
    icon: { family: "material-icon", name: "dashboard" },
    module: "Overview",
    path: "/overview",
    submenu: [],
    active: false,
  },

  {
    title: "Tracking",
    icon: { family: "material-icon", name: "track_changes" },
    module: "tracking",
    path: "/tracking",
    submenu: [],
    active: false,
  },
  {
    title: "Admin",
    icon: { family: "material-icon", name: "security" },
    module: "admin",
    path: "/admin",
    active: false,
    submenu: [
      {
        title: "User Management",
        icon: { family: "material-icon", name: "track_changes" },
        module: "admin",
        path: "/admin/usermanagement",
        submenu: [],
      },
      {
        title: "Fleet Managament",
        icon: { family: "material-icon", name: "track_changes" },
        module: "admin",
        path: "/admin/fleetmanagement",
        submenu: [],
      },
    ],
  },
  {
    title: "Reports",
    icon: { family: "material-icon", name: "bar_chart" },
    module: "reports",
    path: "/reports",
    active: false,
    submenu: [],
  },
];
