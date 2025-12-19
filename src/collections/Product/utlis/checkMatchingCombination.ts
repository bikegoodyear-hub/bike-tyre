export const getNonExistingCombinations = (
  prevCombinations,
  newCombinations
) => {
  const mapped = prevCombinations.map((d) => d[1]);
  return newCombinations.filter((newComb) => {
    const exists = mapped.some((prevComb) => {
      // if (prevComb.length !== newComb.length) return false;

      return prevComb.every((item) =>
        newComb.some(
          (nItem) => nItem.id === item.id && nItem.values === item.values
        )
      );
    });

    return !exists;
  });
};
