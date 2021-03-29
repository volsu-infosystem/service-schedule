function convertFields(fields) {
  return fields.reduce((p, c) => {
    p[c.key] = c.value;
    return p;
  }, {});
}

export { convertFields };
