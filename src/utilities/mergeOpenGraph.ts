import { getServerSideURL } from "./getURL";

import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
 
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: "Goodyear Bike",
  title: "Goodyear Bike",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ?? defaultOpenGraph.images,
  };
};
