# Journal: TDD React mit Bashar Büyükkharahman

## 22-07-08

### 10:08

Man beachte, wie im aktuellen Commit `screen.getByTestId()` funktioniert:

```javascript
// in App.spec.js
const homePage = screen.getByTestId("home-page");

// will find this in the JSX of LandingPage.jsx
<div data-testid="home-page">...</div>
```


### 08:15

Im Kurs hab ich das Kapitel "Internationalisierung" übersprungen, um mich jetzt ganz dem Thema "Routing" zuzuwenden.
Einfach implementieren, Refaktorisieren und Fortschritte machen. Es muss nicht immer so anpruchsvoll sein wie mit `useReducer()`.



## 22-07-06

### 05:35

Habe aus eigener Kraft das Feature _"fails at sending wrong email to the backend"_ implementiert --
mit useReducer(). Es gab Fehler, und ich musste sie backtracken. Zwei Hauptfehler haben sich
herausgestellt:

```javascript
// in msw-server.js
switch action.type {
  case 'fail':
  // ERROR: use spread operator instead
  newState.errors = action.errors;

  // ...
}

// in Signup.spec.js
// ERRoR: use getByText instead
const infoMessage = screen.findByText("email in use");
```

Der zweite Fehler war besonders ärgerlich. Also nochmal zum Mitschreiben: `findBy...` sollte nur dann verwendet werden, wenn wir nach einem State-Update dasselbe Node-Element noch einmal prüfen wollen! Mehr dazu [hier.](https://testing-library.com/docs/queries/about#types-of-queries)

Bin sehr froh, dass ich es am Ende doch noch geschafft habe. War ein langer und harter Kampf!


## 2022-07-03

### 13:30: Konzept über Validierung mit TDD

Die nächsten Schritte wollen gut überlegt sein, deshalb hier ein schriftlicher Grundriss.

1. Die eigentliche Validierung findet immer auf dem Backend statt. Es ist deshalb von Vorteil, auf die Fehlermeldungen aus dem Backend zu reagieren und sie an der richtigen Stelle ins Frontend einzubauen.
2. Wenn ein Validierungsfehler vorliegt, ist eine _response_ mit folgenden Daten zu erwarten:
   - status: 400
   - Eine Fehlermeldung, in der genau beschrieben steht, welche Validierungsregel verletzt wurde.
3. Wir erwarten (expect!) von unserer App, dass sie die Validierungs-Fehlermeldung direkt unter dem Eingabefelt anzeigt, das den Validierungsfehler verursacht hat.

### Die nächsten Schritte

1. Klären, welche Response vom Backend-Server zurückgegeben wird, wenn ein Validierungsfehler auftritt, damit wir sie im MSW-Server mocken können.
2. Einen Test schreiben für einen ungültigen Username.
3. Einen Test schreiben für eine ungültige E-Mail.
4. Einen Test schreiben für ein ungültiges Passwort.

### 12:45

Nachtrag: MSW war ein voller Erfolg! Ich hab sogar Proxying und eine eigene MSW-Server-Datei bereitgelegt. Damit ist alles möglich! Der aktuelle Stand des MSW-Servers liegt auf `/src/msw-server.js`.

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
import userEvent from "@testing-library/user-event";

it("...", () => {
  const user = userEvent.setup();
  // ...
  user.type(passwd01, "test1234");
});
```

Mehr unter git@7a0fccb

## 2022-06-22 08:14

Folgender Code zeigt die häufigsten Markup-Selectors beim Testen an:

```javascript
// It's the text between the <tags>
const header = screen.getByText("Please Sign up!");

// It's the placeholder text inside an input field
const nameInput = screen.getByPlaceholderText("Enter your username");

// It's the label text attached to a form field
// The element will be the password input field attached to the label.
const passwd01Input = screen.getByLabelText("Enter your password");

// Applies to a normal button element
const submitButton = screen.getByRole("button", { name: "Submit" });
```

## 2022-06-21 08:16

Wir halten fest: testen passiert mit dem React-Test-Framework immer in drei Schritten:

1.  Rendern: `render(<Component />)`
2.  Auswählen: `const element = screen.getByRole("button", { name: "Submit" });`
3.  Testen: `expect(element).toBeInTheDocument`

Das Rendern lässt sich auch auslagern, wenn immer nur dasselbe Component gerendert wird:

```javascript
beforeEach(() => {
  render(<Component />);
});
```

Vergleiche dazu commit `#71b125f`.
