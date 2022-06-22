import { render, screen } from "@testing-library/react"
import Signup from "./Signup"

describe("Signup Component", () => {

  beforeEach(() => {
    render(<Signup/>)
  })

  describe("on HTML level", () => {
    it("has a header", () => {
      // render(<Signup></Signup>)
      const header = screen.getByText("Please Sign up!")
      expect(header).toBeInTheDocument()
    })

    it("has a user name input field", () => {
      // render(<Signup />)
      const nameInput = screen.getByPlaceholderText("Enter your username")
      expect(nameInput).toBeInTheDocument
    })

    it("has an email input field", () => {
      // render(<Signup />)
      const mailInput = screen.getByPlaceholderText("Enter your email address")
      expect(mailInput).toBeInTheDocument
    })

    it("has a password input field", () => {
      const passwd01Input = screen.getByLabelText("Enter your password")
      expect(passwd01Input).toBeInTheDocument()
    } )

    it("has a password retype field", () => {
      const passwd02Input = screen.getByLabelText("Re-enter your password")
      expect(passwd02Input).toBeInTheDocument()
    })

    it("has a submit button", () => {
      const submitButton = screen.getByRole("button", {name: "Submit"})
      expect(submitButton).toBeInTheDocument()
    })
  })
})
