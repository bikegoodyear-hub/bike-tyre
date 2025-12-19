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
import { RefreshCw } from "lucide-react";

export interface SelectProps {
  id: string;
  label: string;
  value: string;
}

export const ValueSelect = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string[]>({ path });
  const [field] = useAllFormFields();

  // Extract the index from path (e.g., "attributeValues.0.sele" -> "0")
  const pathParts = path.split(".");
  const index = pathParts[1];

  const { value: attributeId, setValue: setAttri } = useField<string>({
    path: `attributeValues.${index}.attribute`,
  });

  const [options, setOptions] = useState<SelectProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOptions = useCallback(async () => {
    if (!attributeId) {
      setOptions([]);
      if (value && value.length > 0) {
        setValue([]);
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get("/api/attributes", {
        params: { where: { id: { equals: attributeId } } },
      });

      const fetchedOptions = response.data.docs[0]?.values || [];
      setOptions(fetchedOptions);
    } catch (error) {
      console.error("Error fetching attribute values:", error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, [attributeId]);

  useEffect(() => {
    fetchOptions();
  }, [attributeId]);

  const handleChange = useCallback(
    (selected: any) => {
      const newValues = selected ? selected.map((opt) => opt.value) : [];
      setValue(newValues);
    },
    [setValue]
  );

  const handleReload = async () => {
    await fetchOptions();
  };

  // Ensure value is always an array
  const currentValue = Array.isArray(value) ? value : [];

  const selectedOptions = currentValue
    .map((val) => {
      const option = options.find((opt) => opt.value === val);
      if (option) {
        return {
          label: option.label,
          value: option.value,
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <div className="flex w-full flex flex-1 flex-row items-end gap-3">
      {/* Field + Select */}
      <div className="my-auto ml-0 flex h-fit w-[90%] flex-col gap-[5px]">
        <FieldLabel label="Value" />

        {!attributeId && (
          <p className="mb-1 text-sm text-gray-500">
            Please select an attribute first
          </p>
        )}

        <Select
          value={selectedOptions}
          onChange={handleChange}
          options={options.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
          isMulti
          isClearable
          disabled={!attributeId || isLoading}
          placeholder={
            isLoading
              ? "Loading options..."
              : !attributeId
                ? "Select an attribute first"
                : "Select values..."
          }
        />
      </div>

      {/* Reload button */}
      <button
        type="button"
        onClick={handleReload}
        disabled={!attributeId || isLoading}
        className="mb-[2px] flex h-11 w-11 items-center justify-center rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        title="Reload values"
      >
        <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
};
