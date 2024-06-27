# React Testing Library and Jest Notes

## 1️⃣ Test Writing Process

1. Pick one component to test all by itself

2. Make a test file for the component if one does not exist

3. Decide WHAT THE IMPORTANT PARTS of the component are?

4. Write a TEST to make sure EACH PART WORKS AS EXPECTED!

5. Run tests at the command line

## 2️⃣ The Element Query System

<details>

There is NO browser involved when you run test.

We run test in Node env.

Whenever we render our component by calling the `render` method, a fake browser env is being created by lib call `jsdom`

After that, we can access elements that have been placed or rendered in there by using `screen` object.

A super important part of testing is finding elements that our component has created.

Need to test form submission? => Need to find a button to CLICK

Need test navigation => Need a FIND A LINK TO CLICK

Need to make a header visible => Need find a header.

BAD NEWS - the system we use to find elements is a little tedious.

The React Testing Lib Query system is a collection of around 48 methods are used to FIND elements.

We don't need to memorize all of them.

</details>

## 3️⃣ ARIA Role

- ARIA roles CLARIFY the PURPOSE of an HTML Element

- Traditionally used by (screen readers) - softwares to help people understand the content on the screen.

- Many HTML elements have an "Implicit" or Automatically assigned role.

- Elements CAN BE manually assigned a ROLE. Even trained engineers do this incorrectly

- <strong> React Testing Lib prefer way of finding elements by role. </strong>

For example:

h1, h2, h3, h4, h5, h6 => have ARIA Role `heading`

ul, li => have ARIA ROLE of `list`

`button` => button

`link` => a tag

`textbox` => `input type = "text"`

- With table

thead => role: `rowgroup`

tbody => role: `rowgroup`

tr => role: row

th => Role: columnheader

td => role: cell

## 4️⃣ Mocking Functions

<details>
- In english, 'mock' equal 'NOT REAL'

- Fake function that DOESN"T do ANYTHING

- Records WHENEVER it gets called, and the `arguments` it was called with.

- Used VERY OFTEN when we need to make sure a Component CALLS a callback!

</details>

Example:

```javascript
const mock = jest.fn();

render(<SomeComponent onSubmit={mock} />);

expect(mock).toHaveBeenCalled(); // expect to be called!

expect(mock).toHaveBeenCalledWith({
  name: 'john',
  email: 'blabla@email.com',
});

// and expect to be called with appropriate arguments.
```

## 🔵 Querying Elements by Labels

```html
<label htmlFor="email">Enter your Email</label> <input id="email" />
```

- Normal HTML Stuff (not React specific)

- If a labels 'for' attribute matches an Input 'id' => Clicking on the LABEL will FOCUS THE INPUT.

=> Input can be Selected with this approaches.

`screen.getByLabelText(/enter your email/i)` <br />
`screen.getByRole('textbox', {name: /enter your email/i})`

## 🔵 Getting Help with Query Functions

- The Problem: Memorizing ALL the query functions to Find Elements + Roles is HARD

- To get help with finding a particular element, USE this HELPER function

`screen.logTestingPlaygroundURL()`

=> This function will takes the HTML currently rendered by your component and creates a LINK to view that HTML in `Testing Playground` tool website.

- Testing Playground will recommend the queries (function to find elements)

## Query Function Escape Hatches 🤯

- Sometimes, finding elements by ROLE (prefer approach) JUST DOEN"T WORK WELL!

- TIP: DON'T OBSESS OVER getting the RIGHT QUERY

- 2 Escape Hatches => Ways to find elements when preferred 'Role' approach DOESN'T WORK!

1. `data-testid`

👉 we have to modify our component (add the data-testid property to our component) for the purpose to do the test. => in my opinion, that's not good

2. `container.querySelector()`

```js
// eslint-disable-next-line
const rows = container.querySelectorAll('tbody tr');
```

## Using `screen.debug()` to view all the current state of our code to make sure we're on the right path.

## When we don't want to put plain text inside an element.

## We need to Directly assigning an Accessible Name to an Element.

```js
function IconButons() {
  return (
    <div>
      <button aria-label='sign in'>
        <svg />
      </button>

      <button aria-label='sign out'>
        <svg />
      </button>
    </div>
  );
}

test('find elements based on label', () => {
  render(<IconButtons />);

  const signInButton = screen.getByRole('button', { name: /sign in/i });
  const signOutButton = screen.getByRole('button', { name: /sign out/i });

  expect(signInButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
});
```

## 🌟 Query Functions

### Looking for a SINGLE Element? ==> Use: getBy, queryBy, findBy

### Looking for a MULTIPLE Elements? ==> Use: getAllBy, queryAllBy, findAllBy

### Code Example:

```js
import { render, screen } from '@testing-library-react';

function ColorList() {
  return (
    <ul>
      <li>Red</li>
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}
```

```js
test('findBy, getBy, queryBy finding 0 element', async () => {
  render(<ColorList />);
  // getByRole
  expect(() => screen.getByRole('textbox')).toThrow();

  // queryByRole
  expect(screen.queryByRole('textbox')).toEqual(null);

  // findByRole
  let errThrow = false;
  try {
    await screen.findByRole('textbox');
  } catch (err) {
    errThrow = true;
  }
  expect(errThrow).toBe(true);
});

test('getBy, queryBy, findBy when they find 1 element', async () => {
  render(<ColorList />);

  expect(screen.getByRole('list')).toBeInTheDocument();

  expect(screen.queryByRole('list')).toBeInTheDocument();

  expect(await screen.findByRole('list')).toBeInTheDocument();
});

test('getBy, queryBy, findBy when they find MORE THAN 1 element', async () => {
  render(<ColorList />);
  // getByRole
  expect(() => screen.getByRole('listitem')).toThrow();

  // queryByRole
  expect(() => screen.queryByRole('listitem')).toThrow();

  // findByRole
  let errThrow = false;
  try {
    await screen.findByRole('listitem');
  } catch (err) {
    errThrow = true;
  }
  expect(errThrow).toBe(true);
});

test('getAllBy, queryAllBy, findAllBy', async () => {
  render(<ColorList />);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  expect(screen.queryAllByRole('listitem')).toHaveLength(3);

  expect(await screen.findAllByRole('listitem')).toHaveLength(3);
});
```

## 🙋‍♂️ WHEN to use Each?

### 👉 Prove an element exists => Use: getBy, getAllBy

Because when cannot get the element, these functions will throw an error, test will fail.

```js
test('favor using getBy to prove an element exists', () => {
  render(<ColorList />);

  const element = screen.getByRole('list');

  expect(element).toBeInTheDocument(); 😁✅
});
```

### 👉 Prove an element DOES NOT exist => Use: queryBy, queryAllBy

```js
test('favor using queryBy to prove an element does NOT exists', () => {
  render(<ColorList />);

  const element = screen.queryByRole('textbox'); // returned value : null

  // expect(element).toBeNull()
  expect(element).not.toBeInTheDocument();
});
```

### 👉 Make sure an element eventually exists => Use: findBy, findAllBy (ASYNC Querries)

### Code Example:

```js
import { useState, useEffect } from 'react';

function fakeFetchColors() {
  return Promise.resolve(['red', 'green', 'blue']);
}

function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors().then(setColors);
  }, []);

  return (
    <ul>
      {colors.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}

render(<LoadableColorList />);
```

```js
test('favor findBy or findAllBy when data fetching - waiting for some elements to show up!', async () => {
  render(<LoadableColorList />);

  const element = await screen.findAllByRole('listitem');

  expect(element).toHaveLength(3);
});
```

## 5️⃣ Write Custom Matcher

### Code Example:

```js
import { screen, render, within } from '@testing-library/react';

function FormData() {
  return (
    <div>
      <button>GO BACK</button>

      <form aria-label='form'>
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}

/// Custom matcher
function toContainRole(container, role, quantity = 1) {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`,
  };
}
// IMPORTANT PART to Receive the `container` prop inside the `toContainRole` function
expect.extend({ toContainRole });

test('the form displays two buttons', () => {
  render(<FormData />);

  const form = screen.getByRole('form');

  // Before have custom matcher
  // const buttons = within(form).getAllByRole("button");
  // expect(buttons).toHaveLength(2);

  // expect(form).toContainRole('button', 2) ✅
  // expect(form).toContainRole('link', 0) ✅
  // expect(form).toContainRole('button', 4) 🚨 ❌
});
```

## MOST of testing is ABOUT FIGURING OUT CODE that other engineers wrote!

## 1️⃣ How People Think Testing Works

<details> 
  <summary>Open to Read</summary>

1. Write Code

2. Immediately write tests with Perfect Knowledge of the Code.

3. Everything is super easy and works the first time.

</details>

## 2️⃣ Testing in Reality

<details> 
  <summary>Open to Read</summary>

1. Users complain to ur companies support team about a bug

2. Support team gives a workaround to the bug

3. Support team gets tired of the 1 million tickets being filed and tells a PM about the bug

4. PM tells an Engineering manager that the bug needs to be fixed.

5. Engineering manager teels engineer to fix the bug, probably without a lot of details

6. You need to find the bug, fix it, and write `a test to confirm it is fixed`

</details>

## 🐛 A Process for Debugging

## Overall - The Bug Fixing Process

<details> 
  1. Find the relevant components in the code base

2. Figure out How the component is getting its data / state / props

3. Use a debugger, console.log, or documentation to understand the Data

4. Test the fix first (TDD - Test Driven Development) - the test is gonna failed!

5. Implement a fix to pass the test.

</details>

### Ways of Finding Relevant Components

<details> 
  <summary>Open to Read</summary>
  1. React Dev Tools

2. Search the codebase for text/icons/classNames that the component producing

3. If an err is being thrown, look at the Stack trace

4. Ask another engineer
</details>

### Understanding the Data

<details> 
  <summary>Open to Read</summary>
  1. Set a console.log to print out the data

2. Set a debugger and manually inspect the data

3. User React Dev Tools to view the props and state

4. Watch network request log and inspect the API response
</details>

## Three Of the HARDEST ASPECTS of TESTING

### 1) Module Mocks

### 2) Navigation

### 3) 'Act' function

### 4) - I added my own take - is test DATA Fetching

## 🚨 Act() Warnings

- Little frustrating because you need to understand 3-4 different topics to understand the warning.

- <strong> Will occur frequently if you're doing DATA FETCHING in useEffect. </strong>

### Important Items to understand Act() warnings

<details> 
  <summary>Open to READ</summary>

1. Unexpected state updates in tests are BAD

2. The act function defines a WINDOW in time, where state updates can an shoud OCCUR.

3. React testing lib uses `act` behind the scenes for you!

For example: screen.findBy... , screen.findAllBy... , waitFor, user.click, user.keyboard

=> This is the PREFERRED way of using `act` when using RTL. These methods will AUTOMATICALLY call `act` for you!

4. To solve `act warnings`, you should use a `findBy`. USALLY you don't want to follow the advice of the warning!

- When you see an `act` warning, you almost always DON'T WANT TO ADD an `act` to your test.

- The message says you SHOULD, DON'T DO IT. Just get the context where the error occurred, and move on!

- Instead, we will use one of RTL's functions instead!
</details>

### Options for Solving Act Warnings

<details>

1 - Use `findBy` or `findAllBy` to DETECT WHEN the component has FINSHED its data fetching! (BEST WAY)

2 - Use an `act` to control WHEN the data-fetching request gets RESOLVED.

3 - Use a module mock to avoid rendering in troublesome component!

4 - Use an `act` with a `pause` (WORST!)

</details>

## Data Fetching in Tests

<details> 
  <summary>Open to Read ✅</summary>

1. We dont want our Components to make ACTUAL NETWORK REQUESTS

2. SLOW! Data might CHANGE!

3. We FAKE (MOCK) data fetching in TESTS
<details>

### Options for Data Fetching

<details> 
  <summary>Open to Read ✅</summary>

1. Mock the file that contains the data fetching code <br />
   👉 Convinience, Easier to test, We dont have to understand what the Hook (function fetch the data from API) does

   👉 Downside: Interaction between the hook + component is UNTESTED. Who knows if we're using the hook correctly

2. Use a library to "MOCK" Axios (fetch) - get axios to return fake data

   👉 Very popular technique, using `msw` lib.

3. Create a manual mock for axios

Mock = make a FAKE copy

<details>

### MSW Setup

<details> 
  <summary>Open to Read ✅</summary>

- Create a test file

- Understand the exact URL, method, and the return value of requests that your component will make

- Create a MSW handler to intercept that request, return some fake data for your component to use.

- Set up beforeAll, beforeEach, and afterAll hooks in your test file.

- In a test, render the component. Wait for an element to be visible.

<details>
