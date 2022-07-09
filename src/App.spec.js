import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {
  it("displays the landing page at '/' route", () => {
    render(<App />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });

  it("doesn't display Signup page at '/' route", () => {
    render(<App />);
    const signupPage = screen.queryByTestId("signup-page");
    expect(signupPage).not.toBeInTheDocument();
  });
});
