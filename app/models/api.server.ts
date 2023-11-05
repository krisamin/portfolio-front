export interface Project {
  id: string;
  key: string;
  name: string;
  description: string;
  teams: Team[];
  awards: Award[];
}

export interface Team {
  id: string;
  key: string;
  name: string;
  description: string;
  projects: Project[];
  awards: Award[];
}

export interface Award {
  id: string;
  key: string;
  name: string;
  period: string;
  by: string;
  date: string;
  teams: Team[];
  projects: Project[];
}

interface Portfolio {
  projects: Project[];
  teams: Team[];
  awards: Award[];
}

type PortfolioResponse = () => Promise<Portfolio>;

export const getPortfolio: PortfolioResponse = async () => {
  const res = await fetch(
    "https://api.isamin.kr"
  ).then((res) => res.json());

  return res;
}