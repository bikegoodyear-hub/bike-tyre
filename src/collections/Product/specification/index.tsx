"use client";

import { FieldLabel, Select, useField, useForm } from "@payloadcms/ui";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { variantStructure } from "../utlis/getVariantStructure";

export const Selectspecification = ({ path }: { path: string }) => {
  const { value: defaultvalues, setValue } = useField<any>({ path });
  const pathParts = path.split(".");
  const index = pathParts[1];
  const [attributeids, setAttributeIds] = useState<any[]>([]);

  const { getFields } = useForm();
  const field = getFields();

  useEffect(() => {
    const fetchOptions = async () => {
      const objectforattribute = Object.keys(field)
        .filter((d) => {
          if (
            d.includes("attributeValues") &&
            d.includes(".attribute") &&
            d !== "attributeValues"
          ) {
            return d;
          }
        })
        .map((d) => field[d].value);
      try {
        const response = await axios.get("/api/attributes", {
          params: { where: { id: { in: objectforattribute } } },
        });

        const fetchedOptions = response.data.docs || [];
        setAttributeIds(fetchedOptions);
      } catch (error) {
        console.error("Error fetching attribute values:", error);
      }
    };

    fetchOptions();
  }, []);

  const t: any = Object.entries(variantStructure(field));

  const normalized = t
    .filter(([, v]) => v.sele?.value?.length)
    .filter(([, v]) => v.specificationuse?.value);


  // Fix: Initialize with an empty array if defaultvalues is not an array
  const [combination, setCombination] = useState<any>(
    Array.isArray(defaultvalues) ? defaultvalues : []
  );

  // Update combination when defaultvalues changes
  useEffect(() => {
    if (Array.isArray(defaultvalues)) {
      setCombination(defaultvalues);
    }
  }, [defaultvalues]);

  const handleChange = (selected: any, id: string): any => {
    const val = selected ?? "";
    // Fix: Ensure combination is always an array before spreading
    const comb = Array.isArray(combination) ? [...combination] : [];
    const index = comb.find((d) => d.id == id);

    if (index) {
      index.values = val.value;
    } else {
      comb.push({ id: id, values: val.value });
    }

    setCombination(comb);
    setValue(comb);
  };

  return (
    <div className="my-auto ml-0 flex h-fit flex-1 flex-row gap-[5px]">
      {normalized.map((d: any) => {
        const { sele, attribute, variationuse } = d[1];
        const { value: id } = attribute;
        const label =
          attributeids.length > 0
            ? attributeids.find((d) => d.id == id).name
            : id;
        const { value } = sele;
        const mapped = value.map((d: any) => {
          return {
            value: d,
            label: d,
          };
        });

        const foundItem = Array.isArray(defaultvalues)
          ? defaultvalues.find((d) => d.id == id)
          : undefined;

        const values = foundItem?.values;

        let finalval = values
          ? {
              label: values,
              value: values,
            }
          : {
              label: "",
              value: "",
            };

        return (
          <div
            key={d[0]}
            className="my-auto ml-0 flex h-fit flex-1 flex-col gap-[5px]"
          >
            <FieldLabel label={label} />
            <Select
              value={finalval}
              onChange={(selected) => handleChange(selected, id)}
              options={mapped}
            />
          </div>
        );
      })}
    </div>
  );
};
