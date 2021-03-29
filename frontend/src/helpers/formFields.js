function convertFields(fields) {
  return fields.reduce((p, c) => {
    if (c.ignore) return p;
    if (c.reducer) {
      p[c.key] = c.reducer(c.value);
    } else {
      p[c.key] = c.value;
    }
    return p;
  }, {});
}

export { convertFields };
