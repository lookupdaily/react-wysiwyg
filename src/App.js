import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import './App.css';
import { CodeElement, DefaultElement } from './components/Elements';

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Update this text.' }],
    },
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code': 
        return <CodeElement {...props} />
      default: 
        return <DefaultElement {...props} />
    }
  },[])
  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
      <Editable 
      renderElement={renderElement}
      onKeyDown={event => {
        if(event.key === '`' && event.ctrlKey) {
          event.preventDefault()
          const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code'
          })
          Transforms.setNodes(
            editor,
            { type: match ? 'paragraph' : 'code' },
            { match: n => Editor.isBlock(editor,n)}
          )
        }
      }}
      />
    </Slate>
  );
};

export default App;
