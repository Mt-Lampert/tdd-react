import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {
  const routes = [
    { path: "/", testID: "home-page" },
    { path: "/signup", testID: "signup-page" },
    { path: "/login", testID: "login-page" },
    { path: "/user/1", testID: "user-page" },
    { path: "/user/22", testID: "user-page" },
  ];
  const nullRoutes = [
    { path: "/", testID: "signup-page" },
    { path: "/signup", testID: "home-page" },
    { path: "/login", testID: "home-page" },
    { path: "/user/22", testID: "home-page" },
    { path: "/user/22", testID: "landing-page" },
  ];

  const navbarLinks = [
    { path: "/", roleName: "Home" },
    { path: "/signup", roleName: "Signup" },
  ];

  it.each(routes)(
    "addresses endpoint '$path' and finds test ID '$testID'",
    ({ path, testID }) => {
      window.history.pushState({}, "", path);
      render(<App />);
      const myComponent = screen.getByTestId(testID);
      expect(myComponent).toBeInTheDocument();
    }
  );

  it.each(nullRoutes)(
    "addresses endpoint '$path' and won't find test ID '$testID'",
    ({ path, testID }) => {
      window.history.pushState({}, "", path);
      render(<App />);
      const myComponent = screen.queryByTestId(testID);
      expect(myComponent).not.toBeInTheDocument();
    }
  );

  it.each(navbarLinks)(
    "has link to '$roleName' on the navbar",
    ({ path, roleName }) => {
      window.history.pushState({}, "", path);
      render(<App />);
      const link = screen.getByRole("link", { name: roleName });
      expect(link).toBeInTheDocument();
    }
  );

});
