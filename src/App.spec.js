import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Routing", () => {
  const routes = [
    { path: "/", testID: "home-page" },
    { path: "/activate/442", testID: "activate-page" },
    { path: "/activate/110", testID: "activate-page" },
    { path: "/login", testID: "login-page" },
    { path: "/signup", testID: "signup-page" },
    { path: "/user/1", testID: "user-page" },
    { path: "/user/22", testID: "user-page" },
  ];
  const nullRoutes = [
    { path: "/", testID: "signup-page" },
    { path: "/", testID: "activate-page" },
    { path: "/signup", testID: "home-page" },
    { path: "/login", testID: "home-page" },
    { path: "/user/22", testID: "home-page" },
    { path: "/user/22", testID: "landing-page" },
  ];

  const navbarLinks = [
    { init: "/", path: "/", roleName: "Home", testID: "home-page"},
    { init: "/", path: "/login", roleName: "Login", testID: "login-page"},
    { init: "/", path: "/signup", roleName: "Signup", testID: "signup-page" },
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

  it.each(navbarLinks)(
    "shows the '$testID' after clicking the '$roleName' link",
    async ({ init, roleName, testID }) => {
      window.history.pushState({}, "", init);
      const user = userEvent.setup();
      render(<App />);

      const link = screen.getByRole("link", { name: roleName });
      user.click(link);
      // wait for re-rendering
      await new Promise((res) => {
        setTimeout(res, 50);
      });
      expect(screen.getByTestId(testID)).toBeInTheDocument();
    }
  );
});
