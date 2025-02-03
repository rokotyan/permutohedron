import Papa from "papaparse";
import { convertCSVToGraph, GraphData, CSVDataRecord } from "./data";

export const fetchGraphData = async (csvFile: string): Promise<GraphData> => {
  try {
    const response = await fetch(csvFile);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${csvFile}: ${response.statusText}`);
    }
    const csvText = await response.text();
    console.log(csvFile);
    return new Promise((resolve, reject) => {
      Papa.parse<CSVDataRecord>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const graphData = convertCSVToGraph(results.data);
          resolve(graphData);
        },
        error: (error: Error) => {
          console.error("Error parsing CSV:", error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    throw error;
  }
};
