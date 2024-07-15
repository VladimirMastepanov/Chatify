const normalizeData = (data) => {
  const ids = [];
  const entities = {};
  data.forEach((el) => {
    ids.push(el.id);
    entities[el.id] = el;
  });
  return { ids, entities };
};

export default normalizeData;
