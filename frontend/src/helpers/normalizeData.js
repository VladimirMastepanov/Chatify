const normalizeData = (data) => {
  console.log(data);
  const ids = [];
  const entities = {};

  data.forEach((el) => {
    ids.push(el.id);
    entities[el.id] = el;
  });
  console.log(ids, entities);

  return { ids, entities };
};

export default normalizeData;
