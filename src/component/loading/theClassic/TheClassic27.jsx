import React from "react";

const TheClassic27 = () => (
  <>
    <style>{`
      .loader {
        font-weight: bold;
        font-family: monospace;
        font-size: 30px;
        display: inline-flex;
      }
      .loader::before {
        content:"Loadi";
        animation: l27 2s infinite;
      }
      .loader::after {
        content:"ng...";
        animation: l27 2s infinite 1s;
      }
      @keyframes l27{
        50%,100%{transform:rotate(1turn)}
      }
    `}</style>
    <div className="loader" />
  </>
);

export default TheClassic27;
