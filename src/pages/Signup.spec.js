import { render, screen } from "@testing-library/react"
import Signup from "./Signup"

describe("Signup Component", () => {
  describe("on HTML level", () => {
    it("has a header", () => {
      render(<Signup></Signup>)
      const header = screen.getByText("Please Sign up!")
      expect(header).toBeInTheDocument()
    })

    it("has a user name input field", () => {
      render(<Signup />)
      const nameInput = screen.getByPlaceholderText("Enter your username")
      expect(nameInput).toBeInTheDocument
    })

    it("has an email input field", () => {
      render(<Signup />)
      const mailInput = screen.getByPlaceholderText("Enter your email address")
      expect(mailInput).toBeInTheDocument
    })
  })
})
