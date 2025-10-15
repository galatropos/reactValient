import React from "react";
import Card from "../../../../src/component/Card";

const Disclaimer = ({color=false,option=true}) => {
  const configDisclaimer = {
    style: {
      flexDirection: "column",
      gap: 0,
      color: color ? "#787F88" : "#000",
      // si Card centra por defecto, esto ayuda:
    },
    portrait: {
      fontSize: 2.5,
      x: 50,
      y: 93,
      width: 95,
      height: 95,
      anchor: "middle",
    },
    landscape: {
      fontSize: 1.2,
      x: option?70:50,
      y: option?89:95,
      width: option?40:80,
      height: 40,
      anchor: "middle",

    },
  };




  const block = {
    margin: 0,
    marginTop: 4,
    lineHeight: 1.35,
    textWrap: "pretty",
  };

  return (
    <Card {...configDisclaimer} aria-label="Disclaimer">
      <div >

        <div style={{ ...block, fontStyle: "italic" }}>
        Cash Advance offers are provided by Network Partners and third parties, not Bright Money. Terms, eligibility, fees, and approval are determined by the partners. Please refer to the respective Network Partner’s app for complete terms and conditions.
        </div>

      </div>
    </Card>
  );
};

export default Disclaimer;
