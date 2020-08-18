import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import './App.css';

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Update this text.' }],
    },
  ]);
  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
      <Editable />
    </Slate>
  );
};

export default App;
