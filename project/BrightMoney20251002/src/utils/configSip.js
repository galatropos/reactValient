export  const configSip=(image) => ({
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${image})`,
      transformOrigin: "center center",

    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      rotate:0,
      scale:1,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
 } 
}
);