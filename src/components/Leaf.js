import React from 'react';

export const Leaf = props => {
  return (
    <span {...props.attributes}
    style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      { props.children }
    </span>
  )
}