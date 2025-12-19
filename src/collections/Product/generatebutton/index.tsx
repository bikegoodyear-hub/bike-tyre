"use client";

import {
  FieldLabel,
  Select,
  useAllFormFields,
  useField,
  useForm,
} from "@payloadcms/ui";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  variantstofields,
  variantStructure,
} from "../utlis/getVariantStructure";
import { generateCombinations } from "../utlis/getCombination";
import { getNonExistingCombinations } from "../utlis/checkMatchingCombination";

export const GenerateButton = ({ path }: { path: string }) => {
  const { addFieldRow, getFields, getSiblingData } = useForm();
  const { value, rows } = useField({ path: "variants" });
  const [fields, dispatchFields] = useAllFormFields();
  const siblingdata = getSiblingData(path);

  const handleAddRow = () => {
    const t: any = Object.entries(variantStructure(fields));
    const totalVariants: any = Object.entries(variantstofields(fields));
    // const totalVariants =
    //   siblingdata.variants == 0 ? [] : siblingdata.variants.map((d) => d.test);
    const combinations = generateCombinations(t);
    const len = totalVariants.length;
    const newCombination = getNonExistingCombinations(
      totalVariants,
      combinations
    );

    newCombination.forEach((d, idx) => {
      addFieldRow({
        path: "variants",
        schemaPath: "variants",
        rowIndex: len + idx, // or omit to add at the end
        subFieldState: {
          test: {
            initialValue: d,
            value: d,
            valid: true,
          },
          sku: {
            initialValue: `SKU ${idx}`,
            value: `SKU ${idx}`,
            valid: true,
          },
        },
      });
    });
  };

  return (
    <div className="my-auto ml-0 flex h-fit flex-1 flex-row gap-[5px]">
      <button
        className="
    inline-flex items-center justify-center
    rounded-lg bg-black px-6 py-2.5
    text-sm font-semibold text-white
    transition-all duration-200
    hover:bg-gray-900 hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
    active:scale-95
    shadow-md
  "
        onClick={handleAddRow}
      >
        Generate Variant
      </button>
    </div>
  );
};
