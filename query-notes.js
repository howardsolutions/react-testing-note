[
  {
    content:
      "## Welcome to RTLBook\n\nThis is an interactive coding environment where you can explore the following libraries:\n\n| Name      | Docs |\n| ----------- | ----------- |\n| React      | [docs](https://reactjs.org/)       |\n| @testing-library/react   |  [docs](https://testing-library.com/docs/react-testing-library/intro/)        |\n| @testing-library/user-event |   [docs](https://testing-library.com/docs/user-event/intro)  |\n| @testing-library/react-hooks |  [docs](https://github.com/testing-library/react-hooks-testing-library)  |\n| @testing-library/jest-dom | [docs](https://github.com/testing-library/jest-dom#custom-matchers) |\n| expect |  [docs](https://jestjs.io/docs/expect)  |\n\nIn between each 'cell' there are buttons that can add in a new code editor or a text section.",
    type: 'text',
    id: '12frm',
  },
  {
    content:
      "import {render, screen } from '@testing-library-react';\n\nfunction ColorList() {\n  return (\n    <ul>\n      <li>Red</li>\n      <li>Blue</li>\n      <li>Green</li>\n    </ul>\n  )\n};\n\nrender(<ColorList />)",
    type: 'code',
    id: '116xw',
  },
  {
    content:
      'test("findBy, getBy, queryBy finding 0 element", async () => {\n  render(<ColorList />)\n  // getByRole\n  expect(() => screen.getByRole("textbox")).toThrow();\n\n  // queryByRole\n  expect(screen.queryByRole("textbox")).toEqual(null);\n\n  // findByRole\n  let errThrow = false;\n  try {\n    await screen.findByRole("textbox");\n  } catch(err) {\n    errThrow = true;\n  }\n  expect(errThrow).toBe(true);\n});',
    type: 'code',
    id: '3gm5t',
  },
  {
    content:
      'test("getBy, queryBy, findBy when they find 1 element", async () => {\n  render(<ColorList />);\n\n  expect(\n    screen.getByRole("list")\n  ).toBeInTheDocument();\n\n  expect(\n    screen.queryByRole("list")\n  ).toBeInTheDocument();\n\n  expect(\n    await screen.findByRole("list")\n  ).toBeInTheDocument()\n});',
    type: 'code',
    id: 'ko1o6',
  },
  {
    content:
      'test("getBy, queryBy, findBy when they find MORE THAN 1 element", async () => {\n  render(<ColorList />)\n  // getByRole\n  expect(() => screen.getByRole("listitem")).toThrow();\n\n  // queryByRole\n  expect(() => screen.queryByRole("listitem")).toThrow();\n\n  // findByRole\n  let errThrow = false;\n  try {\n    await screen.findByRole("listitem");\n  } catch(err) {\n    errThrow = true;\n  }\n  expect(errThrow).toBe(true);\n});',
    type: 'code',
    id: 'anpja',
  },
  {
    content:
      'test("favor using getBy to prove an element exists", () => {\n  render(<ColorList />);\n\n  const element = screen.getByRole("list");\n\n  expect(element).toBeInTheDocument()\n})',
    type: 'code',
    id: 'xqrhh',
  },
  {
    content:
      'test("favor using queryBy to prove an element does NOT exists", () => {\n  render(<ColorList />);\n\n  const element = screen.queryByRole("textbox"); // returned value : null\n\n  // expect(element).toBeNull() \n  expect(element).not.toBeInTheDocument()\n})',
    type: 'code',
    id: '3huwb',
  },
  {
    content:
      "import {useState, useEffect} from \"react\";\n\nfunction fakeFetchColors() {\n  return Promise.resolve(['red', 'green', 'blue']);\n}\n\nfunction LoadableColorList() {\n  const [colors, setColors] = useState([]);\n\n  useEffect(() => {\n    fakeFetchColors().then(setColors)\n  }, []);\n\n  return <ul>\n    {colors.map(c => <li key={c}>{c}</li>)}\n  </ul>\n}\n\nrender(<LoadableColorList />)",
    type: 'code',
    id: 'cuwns',
  },
  {
    content:
      'test("favor findBy or findAllBy when data fetching - waiting for some elements to show up!", async () => {\n  render(<LoadableColorList />);\n\n  const elements = await screen.findAllByRole(\'listitem\');\n\n  expect(elements).toHaveLength(3);\n});\n',
    type: 'code',
    id: '2kkm6',
  },
];
