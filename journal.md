# Journal: TDD React mit Bashar Büyükkharahman

<!-- ## TODO: -->

## 2022-07-19

Ich habe nach längerem Überlegen beschlossen, den Kurs an dieser Stelle zu unterbrechen,
da ich mein Ziel erreicht habe. Mein Ziel war es, Test-Driven-Development mit React
zu lernen und zu üben.

Der Kurs von BB bringt mir nichts neues mehr bei. Die Themen, die jetzt noch dran sind,
vervollständigen das Projekt, bringen mir in der Sache aber nichts mehr.  Ich kann bei
BB nichts mehr lernen, was ich nicht besser bei Academind oder Dmitri Pavlutin oder Robin
Wieruch lernen kann. Oder bei den 30 React-Projekten, die ich demnächst in Angriff 
nehmen werde.

Ich habe Grund, mich bei BB zu bedanken für all das Wissen und all die Erfahrung, die er
mir geschenkt hat; auf der anderen Seite hatte ich aber auch reichlich Grund, mich über
ihn zu ärgern. Das betrifft besonders seine Art, keine Use Cases, keine Wireframes und 
keine Specs anzubieten, sondern einfach aus dem Bauch raus loszukodieren, so dass dumme
Menschen wie ich immer erst hinterher darauf kommen mussten, was er eigentlich wollte und
warum er den Weg gewählt hat, den er gewählt hat.

Hier ist also erst mal schluss; vielleicht komme ich ja nochmal zurück. "Schau' mer mal", 
wie Franz Beckenbauer zu sagen pflegte.


## 2022-07-16

### 07:30

Hab den ersten Teil des neuen Features implementiert. Die Userin bekommt wahrheitsgemäß 
angezeigt, ob die Aktivierung erfolgreich war oder daneben gegangen ist.

__Anmerkungen:__

Erstens: Der MSW-Server ist so gut, dass man ihn nur noch konfigurieren muss (wie in 
`/src/msw-server.js` geschehen). Dann ist er schon fix und fertig einsatzfähig, 
_wenn man ihn nur importiert!_

```javascript
// in Activate.spec.js
import { server } from "../msw-server";
```

Zweitens: Hatte beim Testen ein bisschen zu kämpfen mit einem state-update in `useEffect()`.
Der Trick war am Ende, dass ich im Test `await` und `findByXXX()` verwendet habe. Da
ging dann alles reibungslos.

```javascript
it("has an 'Activation successful' message", async () => {
  routedRender("/activate/1234");
  // await + findByText is necessary to account for re-rendering the
  // <Activate> component after HTTP request and state update
  const success = await screen.findByText("Activation successful!");
  expect(success).toBeInTheDocument();
});
```



## 2022-07-15

### 17:20

Wir haben ein neues Scenario

```gherkin
Feature: User Activation

  Scenario: Activation successful
    When the user clicks on the link in the activation email
    And the link has a valid token
    Then the Activation page opens in the browser
    And she sees a message saying "Activation successful"
    And she finds herself being logged in.

  Scenario: Activation failing
    When the user clicks on the link in the activation email
    And the link does not have a valid token
    Then the Activation page opens in the browser
    And she sees a message saying "Activation failed"
    And she finds herself being logged out.
```



### 19:10

Das `<Activate>`-Component mit der richtigen Route in Projekt und Tests zu integrieren, war der leichtere Teil.

Der schwierigere war, im `<Activate>`-Component die Sache mit dem Token richtig testen zu können. So sah es aus:

```javascript
import { useParams } from "react-router-dom";

export default function Activate(props) {
  const params = useParams();
  return (
    <div data-testid="activate-page">
      <h1 className="title">This is the activation page!</h1>
      <p>Your token: {params.token}</p>
    </div>
  )
};
```

`params.token` sind davon abhängig, dass der Router sie zur Verfügung stellt. Zum Glück haben die Macher von _react-router-dom_ auch daran gedacht. Sie haben einen Mock-Router in ihr Paket eingebaut: `MemoryRouter`. Das Beispiel zeigt, wie man ihn benutzt.

```javascript
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";

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
```

Der entscheidende Punkt ist die URL, die an `routedRender()` übergeben wird. Sie ist die URL, die vor dem Rendern im `<Activate>`-Component ankommt. aus ihr entnimmt `useParams()` den Token und baut ihn ins JSX ein.


### 11:35 

Wir implementieren jetzt ein neues Feature: __Aktivierung.__  Dabei ist an folgendes Szenario gedacht:
Ein Benutzer hat sich neu registriert und bekommt eine Aktivierungs-Mail mit einem Link, der seinen 
Account aktiviert, wenn er ihn anklickt. Wenn er das tut, sendet ihn sein Browser an den Endpunkt 
`/activate/:token`.


## 2022-07-13

### 17:30

Wir haben jetzt Problem mit diesem Test:

```javascript
 1 it("shows the 'signup' page after clicking the 'signup' link", async () => {
 2   window.history.pushState({}, "", "/")
 2   const user = userEvent.setup();
 3   render(<App />)
 4
 5   const link = screen.getByRole("link", {name: "Signup"})
 6   user.click(link)
 7   // wait 50ms for re-rendering!
 8   await new Promise((res, rej) => { setTimeout(res, 50); });
 9   expect(screen.getByTestId('signup-page')).toBeInTheDocument()
10 })
```

Wenn in Z.6 auf den Link geklickt wird, findet innerhalb der Testumgebung leider kein Re-Rendering statt; im Browser dagegen schon: Bei einem Klick auf einen Link wird die komplette Seite noch einmal in den Browser geladen. _Das ist aber nicht das, was wir bei einer Single-Page-Application wollen!_ Wir wollen, dass die Page-Components _intern_ ausgetauscht und neu gerendert werden, wenn man auf einen _internen_ (!!) Link klickt. Dazu dient der jetzt kommende Schritt bei diesem selbst gebastelten Routing: 

1. Wir bauen einen Event-Handler, der mit dem internen Link verknüpfen
0. Wir verwenden State-Management, um das entsprechende Component nachzuladen.

Den genauen Code kann man dem aktuellen Commit entnehmen.



### 11:55

Gefordert war dieser Test:

```javascript
 1 it.each(routes)("has link to '$testID' on the navbar", ({ path }) => {
 2   window.history.pushState({}, "", path);
 3   render(<App />);
 4   const link = screen.getByRole("link", { name: "Home" });
 5   expect(link).toBeInTheDocument();
 6 });
```

Das Suchkriterium `name: "Home"` konnten wir im Component am Ende mit diesem Element befriedigen:

```xml
<a href="/" title="Home">Hoaxify</a>
``` 

Das `"Home"` im `title`-Attribut hat genügt.



## 2022-07-11

### 08:45

Das Refactoring ist meine erste Begegnung mit Jest's `test.each()`. Möge die Übung gelingen!

### 09:15

Die Übung IST gelungen, wie das aktuelle Commit zeigt. Hier das Beispiel aus dem Projekt mit Anmerkungen:

```js
 1 const routes = [
 2   { path: "/", testID: "home-page" },
 3   { path: "/signup", testID: "signup-page" },
 4 ];
 5
 6 it.each(routes)(
 7   "addresses endpoint '$path' and finds test ID '$testID'",
 8   ({ path, testID }) => {
 9     window.history.pushState({}, "", path);
10     render(<App />);
11     const myComponent = screen.getByTestId(testID);
12     expect(myComponent).toBeInTheDocument();
13   }
14 );
```
#### __Anmerkungen:__
- In der _description_ (Z.7) entsprechen die Variablen `$path` und `$testID` den Objekt-Keys des aktuell übergebenen `routes`-Objekts.
- In Z.8 kommt _object destructuring_ zum Einsatz. Das zerlegte Objekt ist das aktuell übergebene Objekt aus dem `routes`-Array.

## 2022-07-09

### 06:01

Der aktuelle Commit simuliert Routing! Im Test wird dafür ein Endpoint ausgewählt:

```js
  // in App.spec.js

it( "whatever...", () => {
  // access the "/signup" end point (JavaScript-internally)
  window.history.pushState({}, "", "/signup")
})
```

... und dann im Component überprüft, über welche URL die App angesteuert wurde: 

```js
// in App.jsx
export default function App(props) {
  // ...
  return (
    {/* if the current URL ends with '/signup', render <Signup> */}
    {window.location.pathname === "/signup" && <Signup />}
  );
}
```


### 04:58

Der aktuelle Commit zeigt den Einsatz von `screen.queryByXXX()`. `screen.queryByXXX()` wird 
verwendet, wenn wir sicherstellen wollen, dass ein bestimmtes Element NICHT im DOM gefunden wird.

```javascript
it("doesn't display Signup page at '/' route", () => {
  render(<App />);
  const signupPage = screen.queryByTestId("signup-page");
  expect(signupPage).not.toBeInTheDocument();
});
```


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
