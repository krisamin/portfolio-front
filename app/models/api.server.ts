export const getPortfolio = async () => {
  const res = await fetch(
    "https://api.isamin.kr"
  ).then((res) => res.json());

  return res;
}