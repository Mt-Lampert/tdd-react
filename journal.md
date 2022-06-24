# Journal TDD React with Bashar Büyükkharahman


## 2022-06-23

### 06:38

Die Geschichte mit Axios-Mock von gestern war keine gute Idee. Ich steige heute fürs Mocking auf MSW um.




## 2022-06-23 



### 07:21

Ich hab mal wieder was verwegenes vor: Ich werde Axios von Anfang an durch den Axios-Mock-Adapter ersetzen. Das wird sicher auch für das BOOM-Projekt von Vorteil sein. Hier eine 
[kleine Einführung](https://nicedoc.io/ctimmerm/axios-mock-adapter)
dazu.

```sh
$ npm install axios-mock-adapter --save-dev
```

## 2022-06-22 

### 19:32

Hab die Formatierung vorgezogen. War sehr lehrreich mit Bulma. Ein bisschen Kampf war auch dabei.
Hätte z.B. nie gedacht, dass ein Button in Bulma ein Flexbox-Container ist. Ist es aber.
Außerdem kann man sich nur insoweit auf Bulma verlassen als man in der `main.scss` die benötigten
`.sass`-Dateien aus `node-modules` wirklich hineinlädt. 

Aber am Ende hat es sich gelohnt, mit Bulma zu kämpfen.


## 2022-06-22 09:05

Ich musste `@testing-library/user-event` auf Version 14 updaten!(nach Rezept der
[offiziellen Dokumentation](https://testing-library.com/docs/user-event/intro))
Hat sich aber nicht
negativ auf das bestehende Projekt ausgewirkt. 

Hier nochmal, wie ich `@testing-library/user-event` bei seinem ersten Einsatz in meine Tests eingebunden habe

```javascript
import userEvent from "@testing-library/user-event"

it("...", ()=>{
  const user = userEvent.setup()
  // ...
  user.type(passwd01, "test1234")
})
```

Mehr unter git@7a0fccb 


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

Das Rendern lässt sich auch auslagern, wenn immer nur dasselbe Component gerendert wird:

```javascript
beforeEach(() => {
  render(<Component />)
})
```

Vergleiche dazu commit `#71b125f`.