import { useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useResetCache = (data: any) => {
  const ref = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
};
