import { CollectionConfig } from "payload";

export const ProductNew: CollectionConfig = {
  slug: "products",
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
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "richText",
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      hasMany: true,
    },

    {
      type: "tabs",
      tabs: [
        {
          label: "Product Details",
          fields: [
            {
              name: "basePrice",
              type: "number",
              required: true,
              admin: {
                description: "Base price for the product",
              },
            },
            {
              name: "status",
              type: "select",
              options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" },
              ],
              defaultValue: "draft",
              required: true,
            },
            {
              name: "categories",
              type: "relationship",
              relationTo: "categories",
              hasMany: true,
            },
            {
              name: "brandimage",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
        {
          label: "Attributes",
          fields: [
            {
              name: "attributeValues",
              type: "array",
              label: "Attribute Values",
              required: true,
              minRows: 1,
              admin: {
                description:
                  "Define the attribute combination for this variant",
                components: {
                  RowLabel: "@/collections/Product/Label#Label",
                },
                // components: {
                //   RowLabel: "@/collections/Product/variantlabel#VariantLabel",
                // },
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "attribute",
                      type: "relationship",
                      relationTo: "attributes",
                      required: true,
                      maxDepth: 2,
                    },
                    {
                      name: "sele",
                      type: "json", // Changed from 'select' to 'json'
                      required: false,
                      defaultValue: [],
                      admin: {
                        components: {
                          Field: "@/collections/Product/components#ValueSelect",
                        },
                      },
                    },
                  ],
                },
                {
                  name: "variationuse",
                  type: "checkbox",
                  label: "Used for Variation",
                },
                {
                  name: "specificationuse",
                  type: "checkbox",
                  label: "Used for Specification Also",
                },
              ],
            },
          ],
        },
        {
          label: "Variants & Inventory",
          fields: [
            {
              name: "enableVariants",
              label: "Enable variants",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description:
                  "Enable if this product has variants (e.g., different colors, sizes)",
              },
            },
            {
              type: "ui",
              name: "customgeneratebutton",
              admin: {
                components: {
                  Field: "@/collections/Product/generatebutton#GenerateButton",
                },
              },
            },
            {
              name: "variants",
              type: "array",
              label: "Product Variants",
              admin: {
                condition: (data) => data.enableVariants === true,
                description:
                  "Create variants for different attribute combinations",
                components: {
                  RowLabel: "@/collections/Product/variantlabel#VariantLabel",
                },
              },
              fields: [
                {
                  type: "group",
                  label: "Variation Selection",
                  fields: [
                    {
                      name: "test",
                      type: "json",
                      admin: {
                        components: {
                          Field:
                            "@/collections/Product/variations#VariantSelect",
                        },
                      },
                    },
                  ],
                },
                {
                  type: "group",
                  label: "Specification Selection",
                  fields: [
                    {
                      name: "specifications",
                      type: "json",
                      admin: {
                        components: {
                          Field:
                            "@/collections/Product/specification#Selectspecification",
                        },
                      },
                    },
                  ],
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "sku",
                      type: "text",
                      required: true,
                      unique: true,
                      admin: {
                        description: "Unique identifier for this variant",
                      },
                    },

                    {
                      name: "gtin",
                      type: "text",
                      unique: true,
                      admin: {
                        description: "Unique identifier for this variant",
                      },
                      label: "GTIN, UPC, EAN, or ISBN",
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "regularprice",
                      type: "number",
                      defaultValue: 0,
                      label: "Regular Price",
                    },
                    {
                      name: "saleprice",
                      type: "number",
                      defaultValue: 0,
                      label: "Sale Price",
                    },
                    {
                      name: "stock",
                      type: "number",
                      required: true,
                      min: 0,
                      defaultValue: 0,
                    },
                    {
                      name: "lowStockThreshold",
                      type: "number",
                      defaultValue: 10,
                    },
                  ],
                },

                {
                  type: "row",
                  fields: [
                    {
                      name: "weight",
                      type: "number",
                      admin: {
                        description: "Weight in grams (optional)",
                      },
                    },
                    {
                      name: "length",
                      type: "number",
                    },
                    {
                      name: "width",
                      type: "number",
                    },
                    {
                      name: "height",
                      type: "number",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
};
