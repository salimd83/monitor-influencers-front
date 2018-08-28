import Login from "./Login";

export const LoginConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        }
      }
    }
  },
  auth: ["guest"],
  routes: [
    {
      path: "/login",
      component: Login
    }
  ]
};
