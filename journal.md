# Journal TDD React with Bashar Büyükkharahman

## 2022-06-22 08:14

Folgender Code zeigt die häufigsten Markup-Selectors beim Testen an:

```javascript
// It's the text between the <tags>
const header = screen.getByText("Please Sign up!")

// It's the placeholder text inside an input field
const nameInput = screen.getByPlaceholderText("Enter your username")

// It's the label text attached to a form field
// The element will be the password input field attached to the label.
const passwd01Input = screen.getByLabelText("Enter your password")

// Applies to a normal button element
const submitButton = screen.getByRole("button", {name: "Submit"})
```

## 2022-06-21 08:16

 Wir halten fest: testen passiert mit dem React-Test-Framework immer in drei Schritten:


 1. Rendern: `render(<Component />)`
 2. Auswählen: `const element = screen.getByRole("button", { name: "Submit" });`
 3. Testen: `expect(element).toBeInTheDocument`

Das Rendern lässt sich auch auslagern, wenn es immer wieder dasselbe Component ist, das gerendert wird:

```javascript
beforeEach(() => {
  render(<Component />)
})
```

Vergleiche dazu commit `#71b125f`.