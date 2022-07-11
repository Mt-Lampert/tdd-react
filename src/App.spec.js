import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {
  it("displays the landing page at '/' route", () => {
    render(<App />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });

  it("displays the Signup page at '/signup' route", () => {
    // access the right end point (JavaScript-internally)
    window.history.pushState({}, "", "/signup")
    // now <App> knows it has been accessed by calling the
    // '/signup' endpoint; proxy-setting in package.json helps here.
    render(<App />);
    const signupPage = screen.getByTestId("signup-page");
    expect(signupPage).toBeInTheDocument();
  });

  it("doesn't display Signup page at '/' route", () => {
    // access the right end point (JavaScript-internally)
    window.history.pushState({}, "", "/")
    render(<App />);
    const signupPage = screen.queryByTestId("signup-page");
    expect(signupPage).not.toBeInTheDocument();
  });

  it("doesn't display the landing page at '/signup' route", () => {
    // access the right end point (JavaScript-internally)
    window.history.pushState({}, "", "/signup")
    render(<App />);
    const landingPage = screen.queryByTestId("home-page");
    expect(landingPage).not.toBeInTheDocument();
  });



});
