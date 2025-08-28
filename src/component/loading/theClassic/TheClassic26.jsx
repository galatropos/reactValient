import React from "react";

const TheClassic26 = ({ text = "Loading..." }) => (
  <>
    <style>{`
      .loader {
        width: fit-content;
        font-weight: bold;
        font-family: monospace;
        font-size: 30px;
        animation: l26 2s infinite;
      }
      .loader::before {
        content:"${text}";
      }
      @keyframes l26{
        0%,10%  {transform:perspective(200px) rotateX(0)      rotateY(0)      scale(1)}
        30%,36% {transform:perspective(200px) rotateX(180deg) rotateY(0)      scale(1)}
        63%,69% {transform:perspective(200px) rotateX(180deg) rotateY(180deg) scale(1)}
        90%,100%{transform:perspective(200px) rotateX(180deg) rotateY(180deg) scale(-1)}
      }
    `}</style>
    <div className="loader" />
  </>
);

export default TheClassic26;
