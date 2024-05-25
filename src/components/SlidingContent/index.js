import React, { useState, useEffect, useMemo } from 'react';
import './index.scss';

function SlidingContent(props = {}) {
  return (
    <div className="sliding-content">
      {/* {header}
      {body}
      {footer} */}
      {props.children}
    </div>
  );
}

const Header = (props) => {
  const { children, defaultStyle = true, style, ...other } = props;

  return (
    <div {...other} className="sliding-content-header" style={{ ...style }}>
      <p style={defaultStyle && { textAlign: 'center', fontSize: 18 }}>{children}</p>
    </div>
  );
};

const Body = (props) => {
  const { children, isBoxshow, ...other } = props;
  return (
    <div
      {...other}
      className={`sliding-content-body sliding-content-body-content ${isBoxshow && 'sliding-content-body-box-shadow'
        }`}
    >
      {children}
    </div>
  );
};

const Footer = (props) => {
  const { children, ...other } = props;
  return (
    <div {...other} className="sliding-content-footer sliding-content-footer-content">
      {children}
    </div>
  );
};

SlidingContent.Header = Header;
SlidingContent.Body = Body;
SlidingContent.Footer = Footer;

export default SlidingContent;
