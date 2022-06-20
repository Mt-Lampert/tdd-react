import { render, screen } from "@testing-library/react"
import Signup from "./Signup"

describe("Signup Component", () => {
  describe("on HTML level", () => {
    it("has a header", () => {
      render(<Signup></Signup>)
      const header = screen.getByText("Please Sign up!")
      expect(header).toBeInTheDocument()
    })
  })
})
