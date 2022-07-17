import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
// will also activate the server!
import { server } from "../msw-server";
import Activate from "./Activate";

describe("Activate page", () => {
  function routedRender(url) {
    render(
      <Router initialEntries={[url]}>
        <Routes>
          <Route path="/activate/:token" element={<Activate />} />
        </Routes>
      </Router>
    );
  }

  it("has access to URL params", () => {
    routedRender("/activate/1234");
    const notification = screen.getByText("Your token: 1234");
    expect(notification).toBeInTheDocument();
  });

  describe("on successful activation", () => {
    const validToken = "1234";

    it("has an 'Activation successful' message", async () => {
      routedRender(`/activate/${validToken}`);
      // await + findByText is necessary to account for re-rendering the
      // <Activate> component after HTTP request and state update
      const success = await screen.findByText("Activation successful!");
      expect(success).toBeInTheDocument();
      expect(success.classList.contains("notification")).toBe(true);
      expect(success.classList.contains("is-success")).toBe(true);
    });
  });

  describe("on failing activation", () => {
    const invalidToken = "9999";

    it("has an 'Activation failed' message", async () => {
      routedRender(`/activate/${invalidToken}`);
      // await + findByText() is necessary to account for re-rendering the
      // <Activate> component after HTTP request and state update
      const failure = await screen.findByText("Activation failed!");
      expect(failure).toBeInTheDocument();
      expect(failure.classList.contains("notification")).toBe(true);
      expect(failure.classList.contains("is-danger")).toBe(true);
    });

  });
});
