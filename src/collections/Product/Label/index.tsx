"use client";

import { useAllFormFields, usePayloadAPI, useRowLabel } from "@payloadcms/ui";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export type AttributeSelection = {
  id: string;
  sele: string[];
  attribute: string;
  specificationuse: boolean;
};

export const Label = () => {
  const { data } = useRowLabel<AttributeSelection>();
  const [field] = useAllFormFields();
  const [label, setLabel] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!data.attribute) {
          setLabel("Label");
          return;
        }
        const res = await axios.get("/api/attributes", {
          params: {
            where: {
              id: {
                equals: data.attribute,
              },
            },
          },
        });
        const name = res.data.docs[0].name;
        setLabel(name);
      } catch (error) {
        console.error(error);
        setLabel("Error loading label");
      } finally {
        setLoading(false);
      }
    })();
  }, [data.attribute]);

  return (
    <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : label}
    </p>
  );
};
