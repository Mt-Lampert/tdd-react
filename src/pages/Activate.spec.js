import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
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
    routedRender("/activate/4567");
    const notification = screen.getByText("Your token: 4567");
    expect(notification).toBeInTheDocument();
  });

  describe("on successful activation", () => {
    const validToken = "1234";

    it("has a 'Activation successful' message", () => {
      // 1234 is a valid token
      routedRender(`/activate/${validToken}`);
      const success = screen.getByText("Activation successful!");
      expect(success).toBeInTheDocument();
      expect(success.classList.contains("notification")).toBe(true);
      expect(success.classList.contains("is-success")).toBe(true);
    });
  });

  // describe("on failing activation", () => {

  // })
});
