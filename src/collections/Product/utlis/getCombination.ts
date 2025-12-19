export type RawAttribute = [
  string,
  {
    attribute: { value: string };
    sele: { value?: string[] };
    variationuse?: { value?: boolean };
  },
];

export type CombinationItem = {
  id: string;
  values: string;
};

export function generateCombinations(
  data: RawAttribute[]
): CombinationItem[][] {
  // 1. Normalize data
  const normalized = data
    .filter(([, v]) => v.sele?.value?.length)
    .filter(([, v]) => v.variationuse?.value)
    .map(([, v]) => ({
      id: v.attribute.value,
      values: v.sele.value!,
    }));

  // 2. Cartesian product
  const cartesian = normalized.reduce<CombinationItem[][]>((acc, curr) => {
    if (acc.length === 0) {
      return curr.values.map((val) => [{ id: curr.id, values: val }]);
    }

    return acc.flatMap((combo) =>
      curr.values.map((val) => [...combo, { id: curr.id, values: val }])
    );
  }, []);

  return cartesian;
}