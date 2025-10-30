const hexadecimalToRgba = (c, a) => {
    // acepta "#RRGGBB" o "rgb(r,g,b)"
    if (c.startsWith("#")) {
      const r = parseInt(c.slice(1,3),16);
      const g = parseInt(c.slice(3,5),16);
      const b = parseInt(c.slice(5,7),16);
      return `rgba(${r},${g},${b},${a})`;
    }
    return c.replace(/^rgb\(([^)]+)\)$/, `rgba($1,${a})`);
  };

  export default hexadecimalToRgba;