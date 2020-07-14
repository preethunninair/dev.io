export const MENUDATA = [
  {
    title: "Overview",
    icon: { family: "material-icon", name: "dashboard" },
    module: "Overview",
    path: "/overview",
    submenu: [],
    landingPage: true,
  },

  {
    title: "Tracking",
    icon: { family: "material-icon", name: "track_changes" },
    module: "tracking",
    path: "/tracking",
    submenu: [],
    landingPage: false,
  },
  {
    title: "Admin",
    icon: { family: "material-icon", name: "security" },
    module: "admin",
    path: "/admin",
    landingPage: false,
    submenu: [
      {
        title: "User Management",
        icon: { family: "material-icon", name: "supervisor_account" },
        module: "admin",
        path: "/admin/usermanagement",
        submenu: [],
      },
      {
        title: "Fleet Managament",
        icon: { family: "material-icon", name: "local_taxi" },
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
    landingPage: false,
    submenu: [],
  },
];
