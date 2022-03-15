import { createClient } from "next-sanity";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  useCDN: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);
