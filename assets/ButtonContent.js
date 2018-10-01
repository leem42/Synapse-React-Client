import React from 'react';

export default (function (_ref) {
  var children = _ref.children,
      icon = _ref.icon;
  return React.createElement(
    'span',
    { style: { paddingRight: 10, fontWeight: 500, paddingLeft: icon ? 0 : 10, paddingTop: 10, paddingBottom: 10 } },
    children
  );
});