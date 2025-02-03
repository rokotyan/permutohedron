import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router";

import { fetchGraphData } from "@/utils/fetch";
import { GraphData, GraphNode } from "@/utils/data";

import { Graph } from "@/components/graph";
import { getCosmographConfig } from "@/pages/main/configuration";

import datasetJson from "@/dataset.json";

import s from "./styles.module.css";

export const MainPage: React.FC = () => {
  const urlParams = useParams();
  const files = Object.keys(datasetJson);
  const dataset = (urlParams.dataset || files[0]);
  const [data, setData] = useState<GraphData | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedNode, setSelectedNode] = useState<GraphNode | undefined>(undefined);
  const [startGlobalZoom, setStartGlobalZoom] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStartGlobalZoom(false)
    setSelectedNode(undefined);
    setMounted(false);
    async function fetchData() {
      const data = await fetchGraphData('data/' + dataset);
      console.log(dataset, data);
      setData(data);
      setMounted(true);
    }

    fetchData();
  }, [dataset]);

  const cosmographConfig = getCosmographConfig();

  const onNodeClick = (node: GraphNode | undefined) => {
    setSelectedNode(node);
  };


  return (
    <div className={s.mainPage}>
      <Graph
        data={data}
        {...cosmographConfig}
        onClick={onNodeClick}
        onLabelClick={onNodeClick}
        startGlobalZoom={startGlobalZoom}
        className={s.graph}
      />
      <div className={`${s.datasets} ${mounted ? s.visible : ''}`}>
        {files.map((filename, i, arr) => (
          <span key={filename}>
            <NavLink to={`/${filename}`}>{
              datasetJson[filename as keyof typeof datasetJson]
            }</NavLink>
            {i < arr.length - 1 && <span style={{padding: 2}}>{' | '}</span>}
          </span>
        ))}
      </div>
      <div className={`${s.datasetLabel} ${s.visible}`}>
        {datasetJson[dataset as keyof typeof datasetJson] || dataset} {mounted ? '' : '⏳'}
      </div>
    </div>
  );
};
