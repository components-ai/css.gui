import { useTheme } from "@emotion/react";
import { FontFamily } from "../types/css";
import { EditorProps } from "./editors/types";

interface Props extends EditorProps<FontFamily> {
  label: string,
  defaultValue?: FontFamily
}

export function FontFamilyInput({
  label,
  value,
  onChange,
}: Props) {
  const theme = useTheme()

  return (
    <div>
      This is my div
    </div>
  )
}