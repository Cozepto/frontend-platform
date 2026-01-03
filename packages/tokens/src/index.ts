import { BrandKey, BrandTokens } from "./types";
import { defaultBrand } from "./brands/default";
import { cozepto } from "./brands/cozepto";
import { edprinter } from "./brands/edprinter";

export * from "./types";

const BRANDS: Record<BrandKey, BrandTokens> = {
  default: defaultBrand,
  cozepto,
  edprinter,
};

export function getBrandTokens(brand: string): BrandTokens {
  const key = (brand || "default").toLowerCase() as BrandKey;
  return BRANDS[key] ?? BRANDS.default;
}
