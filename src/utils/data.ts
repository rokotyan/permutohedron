export type CSVDataRecord = {
  row: string;
  col: string;
  val: string;
  pair: string;
};

export type GraphNode = {
  id: string;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export const convertCSVToGraph = (data: CSVDataRecord[]): GraphData => {
  const nodesMap: Record<string, GraphNode> = {};
  const links: GraphLink[] = [];

  data.forEach(row => {
    if (!nodesMap[row.row]) nodesMap[row.row] = { id: row.row };
    if (!nodesMap[row.col]) nodesMap[row.col] = { id: row.col };
    links.push({ source: row.row, target: row.col });
  });

  return { nodes: Object.values(nodesMap), links };
};
