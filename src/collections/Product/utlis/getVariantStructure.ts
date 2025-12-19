import axios from "axios";

export function variantStructure(fields) {
  const tt = Object.keys(fields).filter((d) => {
    if (
      d.includes("attributeValues") &&
      (d.includes(".attribute") ||
        d.includes(".sele") ||
        d.includes(".variationuse") ||
        d.includes(".specificationuse")) &&
      d !== "attributeValues"
    ) {
      return d;
    }
  });

  const structured = tt.reduce<Record<number, Record<string, string>>>(
    (acc, path) => {
      const [, index, key] = path.match(/^attributeValues\.(\d+)\.(.+)$/) || [];
      if (!index || !key) return acc;

      const i = Number(index);
      acc[i] ??= {};
      acc[i][key] = path;

      return acc;
    },
    {}
  );

  let keys = Object.keys(structured);

  for (let key of keys) {
    const obj = structured[key];
    let innerkeys = Object.keys(obj);
    for (let innerkey of innerkeys) {
      const objj = obj[innerkey];
      const values = fields[objj].value;
      obj[innerkey] = {
        key: objj,
        value: values,
      };
    }
  }

  return structured;
}

export function variantstofields(fields) {
  const tt = Object.keys(fields)
    .filter((d) => {
      if (d.includes("test")) {
        return true;
      }
    })
    .map((d) => {
      return [...fields[d].value];
    });

  return tt;

  // return structured;
}
