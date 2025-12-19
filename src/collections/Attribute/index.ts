import { slugField } from "@/fields/slug";
import { type CollectionConfig } from "payload";

export const Attributes: CollectionConfig = {
  slug: "attributes",
  admin: {
    useAsTitle: "name",
    group: "Products",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    ...slugField("name"),
    {
      name: "values",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
