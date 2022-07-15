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
});
