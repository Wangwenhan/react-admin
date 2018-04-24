export const menuData = [
  {
    name: "DashBoard",
    icon: "chart",
    path: "dashboard"
  }, {
    name: "chart",
    icon: "chart",
    path: "chart",
    children: [
      {
        name: "chart1",
        icon: "chart",
        path: "char1"
      },
      {
        name: "chart2",
        icon: "chart",
        path: "char2"
      }
    ]
  }, {
    name: "table",
    icon: "chart",
    path: "table",
    children: [
      {
        name: "table1",
        icon: "chart",
        path: "table1",
        children: [
          {
            name: "table1-1",
            icon: "chart",
            path: "table1-1"
          },
          {
            name: "table1-2",
            icon: "chart",
            path: "table1-2"
          }
        ]
      },
      {
        name: "table2",
        icon: "chart",
        path: "table2"
      }
    ]
  }
]