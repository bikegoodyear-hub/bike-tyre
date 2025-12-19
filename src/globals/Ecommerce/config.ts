import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const ShopConfiguration: GlobalConfig = {
  slug: "shop-configuration",
  label: {
    en: "Shop Configuration",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Shop settings",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "ShopSettings",
          label: "Shop Settings",
          fields: [
            {
              name: "shops",
              label: "Shops",
              type: "array",
              fields: [
                // ===============================
                // BASIC SHOP INFO
                // ===============================
                // {
                //   name: "shopName",
                //   type: "text",
                //   required: true,
                // },

                // ===============================
                // STORE ADDRESS
                // ===============================
                {
                  name: "address",
                  type: "group",
                  label: "Store Address",
                  fields: [
                    { name: "addressLine1", type: "text", required: true },
                    { name: "addressLine2", type: "text" },
                    { name: "city", type: "text", required: true },
                    {
                      name: "country",
                      type: "select",
                      required: true,
                      options: [
                        { label: "United Kingdom", value: "UK" },
                        { label: "India", value: "IN" },
                        { label: "United States", value: "US" },
                      ],
                    },
                    { name: "postcode", type: "text", required: true },
                  ],
                },

                // ===============================
                // SELLING & SHIPPING
                // ===============================
                {
                  name: "sellingLocations",
                  type: "select",
                  options: [
                    { label: "Sell to all countries", value: "all-countries" },
                    {
                      label: "Sell to all countries, except for...",
                      value: "expected-countries",
                    },
                    {
                      label: "Sell to specific countries",
                      value: "specific-countries",
                    },
                  ],
                },

                {
                  name: "specific-countries",
                  type: "select",
                  label: "Select Specific Countries",
                  options: [
                    { label: "United Kingdom", value: "UK" },
                    { label: "India", value: "IN" },
                    { label: "United States", value: "US" },
                  ],
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.sellingLocations == "specific-countries",
                  },
                },

                {
                  name: "expected-countries",
                  type: "select",
                  label: "Select Countries expect",
                  options: [
                    { label: "United Kingdom", value: "UK" },
                    { label: "India", value: "IN" },
                    { label: "United States", value: "US" },
                  ],
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.sellingLocations == "expected-countries",
                  },
                },

                {
                  name: "shippingLocations",
                  type: "select",
                  hasMany: true,
                  options: [
                    { label: "Ship to all selling countries", value: "ALL" },
                    { label: "Specific countries", value: "SPECIFIC" },
                  ],
                },

                // ===============================
                // TAX & COUPONS
                // ===============================
                // {
                //   name: "taxSettings",
                //   type: "group",
                //   fields: [
                //     {
                //       name: "enableTaxes",
                //       type: "checkbox",
                //       defaultValue: true,
                //     },
                //     {
                //       name: "enableCoupons",
                //       type: "checkbox",
                //       defaultValue: true,
                //     },
                //     {
                //       name: "sequentialCoupons",
                //       type: "checkbox",
                //       defaultValue: false,
                //     },
                //   ],
                // },

                // ===============================
                // CURRENCY SETTINGS
                // ===============================
                {
                  name: "currency",
                  type: "group",
                  fields: [
                    {
                      name: "availableCurrencies",
                      type: "select",
                      hasMany: true,
                      required: true,
                      admin: {
                        description: "First currency will be used as default",
                      },
                      options: [
                        { label: "USD", value: "USD" },
                        { label: "EUR", value: "EUR" },
                        { label: "GBP", value: "GBP" },
                        { label: "INR", value: "INR" },
                      ],
                    },
                    {
                      name: "currencyFormat",
                      type: "group",
                      fields: [
                        {
                          name: "symbolPosition",
                          type: "select",
                          defaultValue: "left",
                          options: [
                            { label: "Left", value: "left" },
                            { label: "Right", value: "right" },
                          ],
                        },
                        {
                          name: "thousandSeparator",
                          type: "text",
                          defaultValue: ",",
                        },
                        {
                          name: "decimalSeparator",
                          type: "text",
                          defaultValue: ".",
                        },
                        {
                          name: "decimals",
                          type: "number",
                          defaultValue: 2,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Payments",
          label: "Payments",
          fields: [
            {
              name: "paymentMethods",
              label: "Payment Methods",
              type: "array",
              // required: true,
              fields: [
                {
                  name: "provider",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Stripe", value: "stripe" },
                    { label: "PayPal", value: "paypal" },
                    { label: "COD", value: "cod" },
                  ],
                },

                // ===============================
                // STRIPE CONFIG
                // ===============================
                {
                  name: "stripe",
                  type: "group",
                  label: "Stripe Settings",
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.provider === "stripe",
                  },
                  fields: [
                    {
                      name: "publishableKey",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "secretKey",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "webhookSecret",
                      type: "text",
                    },
                    {
                      name: "testMode",
                      type: "checkbox",
                      defaultValue: true,
                    },
                  ],
                },

                // ===============================
                // PAYPAL CONFIG
                // ===============================
                {
                  name: "paypal",
                  type: "group",
                  label: "PayPal Settings",
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.provider === "paypal",
                  },
                  fields: [
                    {
                      name: "clientId",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "clientSecret",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "environment",
                      type: "select",
                      defaultValue: "sandbox",
                      options: [
                        { label: "Sandbox", value: "sandbox" },
                        { label: "Live", value: "live" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Shipping",
          label: "Shipping",
          fields: [
            {
              name: "shippingZones",
              label: "Shipping Zones",
              type: "array",
              required: true,
              fields: [
                // ===============================
                // ZONE INFO
                // ===============================
                {
                  name: "zoneName",
                  type: "text",
                  required: true,
                },

                {
                  name: "countries",
                  type: "select",
                  hasMany: true,
                  required: true,
                  options: [
                    { label: "United Kingdom", value: "UK" },
                    { label: "India", value: "IN" },
                    { label: "United States", value: "US" },
                  ],
                },

                // ===============================
                // SHIPPING METHODS
                // ===============================
                {
                  name: "methods",
                  label: "Shipping Methods",
                  type: "array",
                  required: true,
                  fields: [
                    {
                      name: "method",
                      type: "select",
                      required: true,
                      options: [
                        { label: "Flat Rate", value: "flat_rate" },
                        { label: "Free Shipping", value: "free_shipping" },
                        { label: "Local Pickup", value: "local_pickup" },
                        {
                          label: "Carrier (USPS / FedEx / DHL)",
                          value: "carrier",
                        },
                      ],
                    },

                    // ===============================
                    // FLAT RATE
                    // ===============================
                    {
                      name: "flatRate",
                      type: "group",
                      label: "Flat Rate Settings",
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.method === "flat_rate",
                      },
                      fields: [
                        {
                          name: "title",
                          type: "text",
                          defaultValue: "Flat Rate",
                        },
                        {
                          name: "cost",
                          type: "number",
                          required: true,
                        },
                        {
                          name: "taxable",
                          type: "checkbox",
                          defaultValue: true,
                        },
                      ],
                    },

                    // ===============================
                    // FREE SHIPPING
                    // ===============================
                    {
                      name: "freeShipping",
                      type: "group",
                      label: "Free Shipping Settings",
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.method === "free_shipping",
                      },
                      fields: [
                        {
                          name: "title",
                          type: "text",
                          defaultValue: "Free Shipping",
                        },
                        {
                          name: "minimumOrderAmount",
                          type: "number",
                        },
                      ],
                    },

                    // ===============================
                    // LOCAL PICKUP
                    // ===============================
                    {
                      name: "localPickup",
                      type: "group",
                      label: "Local Pickup Settings",
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.method === "local_pickup",
                      },
                      fields: [
                        {
                          name: "title",
                          type: "text",
                          defaultValue: "Local Pickup",
                        },
                        {
                          name: "pickupAddress",
                          type: "text",
                        },
                      ],
                    },

                    // ===============================
                    // CARRIER PICKUP
                    // ===============================

                    {
                      name: "carrier",
                      type: "group",
                      label: "Carrier Shipping Settings",
                      admin: {
                        condition: (_, siblingData) =>
                          siblingData?.method === "carrier",
                      },
                      fields: [
                        {
                          name: "carrierType",
                          type: "select",
                          required: true,
                          options: [
                            { label: "USPS", value: "usps" },
                            { label: "FedEx", value: "fedex" },
                            { label: "UPS", value: "ups" },
                            { label: "DHL", value: "dhl" },
                          ],
                        },

                        {
                          name: "title",
                          type: "text",
                          defaultValue: "Carrier Shipping",
                        },

                        {
                          name: "enabled",
                          type: "checkbox",
                          defaultValue: true,
                        },

                        {
                          name: "testMode",
                          type: "checkbox",
                          defaultValue: true,
                        },

                        // ===============================
                        // USPS SETTINGS
                        // ===============================
                        {
                          name: "usps",
                          type: "group",
                          label: "USPS Settings",
                          admin: {
                            condition: (_, siblingData) =>
                              siblingData?.carrierType === "usps",
                          },
                          fields: [
                            {
                              name: "userId",
                              type: "text",
                              required: true,
                            },
                            {
                              name: "serviceTypes",
                              type: "select",
                              hasMany: true,
                              options: [
                                { label: "Priority Mail", value: "priority" },
                                {
                                  label: "First-Class Mail",
                                  value: "first_class",
                                },
                                { label: "Express Mail", value: "express" },
                              ],
                            },
                          ],
                        },

                        // ===============================
                        // FEDEX SETTINGS
                        // ===============================
                        {
                          name: "fedex",
                          type: "group",
                          label: "FedEx Settings",
                          admin: {
                            condition: (_, siblingData) =>
                              siblingData?.carrierType === "fedex",
                          },
                          fields: [
                            {
                              name: "accountNumber",
                              type: "text",
                              required: true,
                            },
                            {
                              name: "apiKey",
                              type: "text",
                              required: true,
                            },
                            {
                              name: "apiSecret",
                              type: "text",
                              required: true,
                            },
                            {
                              name: "services",
                              type: "select",
                              hasMany: true,
                              options: [
                                { label: "Ground", value: "ground" },
                                { label: "2Day", value: "2day" },
                                { label: "Overnight", value: "overnight" },
                              ],
                            },
                          ],
                        },

                        // ===============================
                        // DHL / UPS (pattern repeatable)
                        // ===============================
                      ],
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
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
