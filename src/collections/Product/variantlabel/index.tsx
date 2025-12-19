"use client";

import {
  useAllFormFields,
  useField,
  usePayloadAPI,
  useRowLabel,
} from "@payloadcms/ui";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export type VariantData = {
  id: string;
  values: string;
};

export type VariantSelection = {
  id: string;
  test: VariantData[];
};

export const VariantLabel = () => {
  const { path, rowNumber } = useRowLabel<VariantSelection>();
  const { value: defaultvalues } = useField<any>({
    path: `${path}.test`,
  });
  const [label, setLabel] = useState("Label");
  const mapped = defaultvalues
    ? defaultvalues.map((d) => d.values).filter((d) => Boolean(d))
    : [];

  useEffect(() => {
    if (mapped.length > 0) {
      const final = mapped.join("/");
      setLabel(final);
    } else {
      setLabel(`Attribute ${rowNumber! + 1}`);
    }
  }, [defaultvalues]);
  

  return (
    <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>{label}</p>
  );
};
