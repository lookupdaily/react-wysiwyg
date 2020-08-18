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
    <div>
      <h1>Text Editor</h1>
      <div className="container editor">
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
          <Editable 
          renderElement={renderElement}
          onKeyDown={event => {
            if(!event.ctrlKey) {
              return
            }
            switch (event.key) {
              case '`': {
                event.preventDefault()
                const [match] = Editor.nodes(editor, {
                  match: n => n.type === 'code'
                })
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: n => Editor.isBlock(editor,n)}
                )
                break
              }

              case 'b': {
                event.preventDefault()
                Transforms.setNodes(
                  editor,
                  { bold: true },
                  { match: n => Text.isText(n), split: true }
                )
                break
              }
            }
          }}
          />
        </Slate>
      </div>
      <div className="container info">
        <h4>Shortcuts:</h4>
        <p><b>Ctrl + `</b> switch to code </p>
      </div>
    </div>
  );
};

export default App;
