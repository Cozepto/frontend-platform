export type HexColor = `#${string}`;

export type BrandKey = "default" | "cozepto" | "edprinter";

export type BrandTokens = {
  color: {
    intent: {
      primary: HexColor;
      secondary?: HexColor;
      success: HexColor;
      warning: HexColor;
      danger: HexColor;
      info?: HexColor;
    };
    surface: {
      default: HexColor;
      raised: HexColor;
      sunken?: HexColor;
    };
    text: {
      primary: HexColor;
      secondary?: HexColor;
      muted: HexColor;
      inverse?: HexColor;
    };
    border: {
      default: HexColor;
      strong?: HexColor;
      subtle?: HexColor;
    };
  };
  radius?: {
    sm: number;
    md: number;
    lg: number;
  };
  typography?: {
    fontFamily: string;
  };
};
