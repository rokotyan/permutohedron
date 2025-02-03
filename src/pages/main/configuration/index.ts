import { GraphProps } from "@/components/graph";

export const getCosmographConfig = (): Omit<GraphProps, 'data'> => {
  const config: Omit<GraphProps, 'data'> = {
    // showTopLabels: false,
    // showDynamicLabels: false,
    // nodeColor: '#f85',
    // nodeSize: 5,
    // renderLinks: true,
    // zoomLevel: 0.5,
    // simulationDecay: 10000,
    // simulationFriction: 0.95,
    // simulationLinkDistance: 10,
    // simulationLinkSpring: 0.3,
    // simulationGravity: 0.25,
    // simulationRepulsion: 5,
    // linkColor: '#555',
    // showLabelsZoomLevel: 0.5,
  }

  return config
};
