import { CollectionConfig } from "payload";

export const ProductVariants: CollectionConfig = {
  slug: 'product-variants',
  admin: {
    useAsTitle: 'sku',
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'attributeValues',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'attribute',
          type: 'relationship',
          relationTo: 'attributes',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Value from the attribute (e.g., "red", "large")',
          },
        },
      ],
    },
    {
      name: 'priceAdjustment',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Price difference from base product price',
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Variant-specific images (optional)',
      },
    },
    {
      name: 'regionalAvailability',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'region',
          type: 'relationship',
          relationTo: 'regions' as any,
          required: true,
        },
        {
          name: 'isAvailable',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'stock',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 0,
        },
        {
          name: 'regionalPrice',
          type: 'number',
          admin: {
            description: 'Override price for this region (optional)',
          },
        },
        {
          name: 'lowStockThreshold',
          type: 'number',
          defaultValue: 10,
        },
      ],
    },
    {
      name: 'weight',
      type: 'number',
      admin: {
        description: 'Weight in grams',
      },
    },
    {
      name: 'dimensions',
      type: 'group',
      fields: [
        {
          name: 'length',
          type: 'number',
        },
        {
          name: 'width',
          type: 'number',
        },
        {
          name: 'height',
          type: 'number',
        },
      ],
    },
  ],
};