export interface MapSymbol {
  type: string;
  color: string | number[];
  outline?: Outline;
  width?: number;
  style?: string;
}

export interface Outline {
  color: string | number[];
  width: number;
  style?: string;
}
