import React, { useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import './App.css';

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([]);
  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)} />
  );
};

export default App;
