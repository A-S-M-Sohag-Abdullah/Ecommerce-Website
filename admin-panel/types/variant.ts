export type VariantType = "Size" | "Color";
export interface Variant {
  id: number;
  type: VariantType;
  sizes: string[];
  colors: string[];
  inputValue: string;
  selectedColor: string;
}
