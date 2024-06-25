# React Testing Library and Jest Notes

## Test Writing Process

1. Pick one component to test all by itself

2. Make a test file for the component if one does not exist

3. Decide WHAT THE IMPORTANT PARTS of the component are?

4. Write a TEST to make sure each part works as expected

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

- React Testing Lib prefer way of finding elements by role.

For example:

h1, h2, h3, h4, h5, h6 => have ARIA Role `heading`

ul, li => have ARIA ROLE of `list`

`button` => button

`link` => a tag

`textbox` => `input type = "text"`

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
