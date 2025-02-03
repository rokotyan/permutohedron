import {
  Cosmograph,
  CosmographInputConfig,
  CosmographProvider,
  CosmographRef,
} from "@cosmograph/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GraphData, GraphNode, GraphLink } from "@/utils/data";
import { FaPlay, FaPause} from "react-icons/fa6";

import s from "./styles.module.css";
import { cosmographBaseConfig } from "./config";
import { colors } from "@/pages/main/constants";

export type GraphProps = CosmographInputConfig<GraphNode, GraphLink> & {
  data: GraphData | undefined;
  zoomLevel?: number;
  onClick?: (node?: GraphNode) => void;
  allowNodesSelection?: boolean;
  fitViewNodeIds?: string[];
  showLabelsZoomLevel?: number;
  disableAutoFitView?: boolean;
  startGlobalZoom?: boolean;
  className?: string;
};

export const Graph: React.FC<GraphProps> = (props) => {
  const cosmograph = useRef<CosmographRef<GraphNode, GraphLink>>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [linkWidth, setLinkWidth] = useState(1);

  useEffect(() => {
    if (!cosmograph.current || !props.data) return;

    const graph = cosmograph.current;
    graph.unselectNodes();
    setIsPlaying(true);
    graph.setZoomLevel(cosmographBaseConfig.initialZoomLevel as number)

    if (props.disableAutoFitView) {
      graph.setZoomLevel(1)
      return;
    }

    setTimeout(() => {
      if (props.fitViewNodeIds?.length) {
        graph.fitViewByNodeIds(props.fitViewNodeIds, 1500);
      } else {
        graph.fitView(2500);
      }
    }, 1500);
  }, [props.data, cosmograph.current]);


  // Set zoom level if it has changed
  useEffect(() => {
    if (props.zoomLevel) cosmograph.current?.setZoomLevel(props.zoomLevel ?? 1);
  }, [props.zoomLevel]);

  useEffect(() => {
    if (props.startGlobalZoom) cosmograph.current?.fitView(2500);
  }, [props.startGlobalZoom]);


  // Override onClick from Main to add adjacent node selection feature
  const onNodeClick = (clickedNode?: GraphNode) => {
    if (props.onClick) {
      props.onClick(clickedNode);
    }
    if (props.allowNodesSelection) {
      if (clickedNode) {
        cosmograph.current?.selectNode(clickedNode, true);
      } else {
        cosmograph.current?.unselectNodes();
      }
      setSelectedNode(clickedNode)
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      cosmograph.current?.pause();
    } else {
      cosmograph.current?.start();
    }

    setIsPlaying(!isPlaying);
  };

  const handleZoomEnd = useCallback(({ transform }: { transform: { k: number } }) => {
    const shouldShowLabels = props.showDynamicLabels
      ? transform.k > (props.showLabelsZoomLevel ?? 1.2)
      : false;
    if (shouldShowLabels !== showLabels) {
      setShowLabels(shouldShowLabels);
      setLinkWidth(shouldShowLabels ? 1.5 : 1);
    }
  }, [showLabels, props.showDynamicLabels]);


  if (!props.data?.nodes) {
    return <></>;
  }

  return (
    <div className={`${s.graph} ${props.className || ''}`}>
      <CosmographProvider>
        <Cosmograph
          {...cosmographBaseConfig}
          nodes={props.data.nodes}
          links={props.data.links}
          linkWidth={linkWidth}
          linkArrowsSizeScale={linkWidth * (cosmographBaseConfig.linkArrowsSizeScale ?? 1)}
          ref={cosmograph}
          {...props}
          onClick={onNodeClick}
          onLabelClick={onNodeClick}
          onZoom={handleZoomEnd}
          showDynamicLabels={showLabels}
          renderLinks={true}
          showLabelsFor={showLabels ? props.showLabelsFor ? props.showLabelsFor?.concat(selectedNode ?? []) : selectedNode ? [selectedNode] : undefined : undefined}
        />
      </CosmographProvider>

      <div className={s.playPauseButton}>
        { !isPlaying
          ? <FaPlay color={colors.accent} onClick={togglePlayPause}/>
          : <FaPause color={colors.accent} onClick={togglePlayPause}/>
        }
      </div>
    </div>
  );
};
