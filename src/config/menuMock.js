export const menuData = [
  {
    name: "DashBoard",
    icon: "chart",
    path: "dashboard",
    hideInMenu: false
  }, {
    name: "chart",
    icon: "chart",
    path: "chart",
    hideInMenu: false,
    children: [
      {
        name: "chart1",
        icon: "chart",
        path: "char1",
        hideInMenu: false
      },
      {
        name: "chart2",
        icon: "chart",
        path: "char2",
        hideInMenu: false
      }
    ]
  }, {
    name: "table",
    icon: "chart",
    path: "table",
    hideInMenu: false,
    children: [
      {
        name: "table1",
        icon: "chart",
        path: "table1",
        hideInMenu: false,
        children: [
          {
            name: "table1-1",
            icon: "chart",
            path: "table1-1",
            hideInMenu: false
          },
          {
            name: "table1-2",
            icon: "chart",
            path: "table1-2",
            hideInMenu: false
          }
        ]
      },
      {
        name: "table2",
        icon: "chart",
        path: "table2",
        hideInMenu: false
      }
    ]
  }
]