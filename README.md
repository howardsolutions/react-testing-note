# React Testing Library and Jest Notes

## Test Writing Process

1. Pick one component to test all by itself

2. Make a test file for the component if one does not exist

3. Decide WHAT THE IMPORTANT PARTS of the component are?

4. Write a TEST to make sure EACH PART WORKS AS EXPECTED!

5. Run tests at the command line

## The Element Query System

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

## ARIA Role

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

## Mocking Functions

- In english, 'mock' equal 'NOT REAL'

- Fake function that DOESN"T do ANYTHING

- Records WHENEVER it gets called, and the `arguments` it was called with.

- Used VERY OFTEN when we need to make sure a Component CALLS a callback!

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

## Querying Elements by Labels

```html
<label htmlFor="email">Enter your Email</label> <input id="email" />
```

- Normal HTML Stuff (not React specific)

- If a labels 'for' attribute matches an Input 'id' => Clicking on the LABEL will FOCUS THE INPUT.

=> Input can be Selected with this approaches.

`screen.getByLabelText(/enter your email/i)` <br />
`screen.getByRole('textbox', {name: /enter your email/i})`

## Getting Help with Query Functions

- The Problem: Memorizing ALL the query functions to Find Elements + Roles is HARD

- To get help with finding a particular element, USE this HELPER function

`screen.logTestingPlaygroundURL()`

=> This function will takes the HTML currently rendered by your component and creates a LINK to view that HTML in `Testing Playground` tool website.

- Testing Playground will recommend the queries (function to find elements)

## Query Function Escape Hatches

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
