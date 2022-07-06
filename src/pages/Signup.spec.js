import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../msw-server";
import Signup from "./Signup";

describe("Signup Component", () => {
  
  describe("on HTML level", () => {
    it("has a header", () => {
      render(<Signup></Signup>)
      const header = screen.getByText("Please Sign up!");
      expect(header).toBeInTheDocument();
    });

    it("has a user name input field", () => {
      render(<Signup />)
      const nameInput = screen.getByPlaceholderText("Enter your username");
      expect(nameInput).toBeInTheDocument;
    });

    it("has an email input field", () => {
      render(<Signup />)
      const mailInput = screen.getByPlaceholderText("Enter your email address");
      expect(mailInput).toBeInTheDocument;
    });

    it("has a password input field", () => {
      render(<Signup />);
      const passwd01Input = screen.getByLabelText("Enter your password");
      expect(passwd01Input).toBeInTheDocument();
    });

    it("has a password retype field", () => {
      render(<Signup />);
      const passwd02Input = screen.getByLabelText("Re-enter your password");
      expect(passwd02Input).toBeInTheDocument();
    });

    it("has a submit button", () => {
      render(<Signup />);
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  describe("on Interaction level", () => {
    
    it("enables Signup button after entering valid passwords", async () => {
      render(<Signup />);
      const user = userEvent.setup();
      const passwd01 = screen.getByLabelText("Enter your password");
      const passwd02 = screen.getByLabelText("Re-enter your password");

      // entering valid passwords
      await user.type(passwd01, "test1234");
      await user.type(passwd02, "test1234");
      // NOW we select the signup Button, because it should be enabled by now.
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).toBeEnabled();
    });

    it("sends signup data to the backend", async () => {
      render(<Signup />);
      const myUsername = "Dickie Dick Dickens";
      const myEmail = "dickie@dickens.com";
      const myPasswd = "test1234";

      const user = userEvent.setup();

      const nameInput = screen.getByPlaceholderText("Enter your username");
      const emailInput = screen.getByPlaceholderText(
        "Enter your email address"
      );
      const passwd01Input = screen.getByLabelText("Enter your password");
      const passwd02Input = screen.getByLabelText("Re-enter your password");
      const submitButton = screen.getByRole("button", { name: "Submit" });

      await user.type(nameInput, myUsername);
      await user.type(passwd01Input, myPasswd);
      await user.type(emailInput, myEmail);
      await user.type(passwd02Input, myPasswd);

      await user.click(submitButton);

      // wait for re-rendering
      await new Promise((res, rej) => {
        setTimeout(res, 610);
      });

      const infoMessage = screen.getByText("Signup successful!");
      expect(infoMessage).toBeInTheDocument();


    });

    it("fails at sending wrong email to the backend", async () => {
      render(<Signup />);
      const myUsername = "Dickie Dick Dickens";
      const myEmail = "used.dickie@dickens.com";
      const myPasswd = "Test1234";

      const user = userEvent.setup();

      const nameInput = screen.getByPlaceholderText("Enter your username");
      const emailInput = screen.getByPlaceholderText(
        "Enter your email address"
      );
      const passwd01Input = screen.getByLabelText("Enter your password");
      const passwd02Input = screen.getByLabelText("Re-enter your password");
      const submitButton = screen.getByRole("button", { name: "Submit" });

      await user.type(nameInput, myUsername);
      await user.type(passwd01Input, myPasswd);
      await user.type(emailInput, myEmail);
      await user.type(passwd02Input, myPasswd);

      await user.click(submitButton);

      // wait for re-rendering
      await new Promise((res, rej) => {
        setTimeout(res, 1110);
      });

      const infoMessage = screen.getByText("email in use");
      expect(infoMessage).toBeInTheDocument();
    });
  });
});


