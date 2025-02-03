import { CosmographInputConfig} from "@cosmograph/react";
import { GraphLink, GraphNode } from "@/utils/data";

export const cosmographBaseConfig: CosmographInputConfig<GraphNode, GraphLink> = {
    backgroundColor: "#fff",
    simulationDecay: 50000,
    simulationFriction: 0.85,
    simulationLinkDistance: 5,
    simulationLinkSpring: 0.3,
    simulationGravity: 0.5,
    simulationRepulsion: 2,
    linkVisibilityMinTransparency: 0.5,
    linkArrowsSizeScale: 0.5,
    initialZoomLevel: 1,
    showTopLabels: false,
    showDynamicLabels: false,
    linkColor: "#D1D8E4",
    nodeColor: '#2680EB',
    nodeSize: 2,
    linkVisibilityDistanceRange: [20, 1200],
    nodeLabelAccessor: (node: GraphNode) => node.id,
    nodeGreyoutOpacity: 0.3,
    spaceSize: 8192,
  };
