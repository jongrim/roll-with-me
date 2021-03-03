export interface HexSpaceConfig {
  backgroundImage?: string;
  fill?: string;
  notes?: string;
  rotation: number;
  position: string;
  x: number;
  y: number;
}

export interface GridConfig {
  [point: string]: HexSpaceConfig;
}

export function createEmptyHexSpaceConfig({
  x,
  y,
}: {
  x: number;
  y: number;
}): HexSpaceConfig {
  return {
    backgroundImage: '',
    fill: '',
    notes: '',
    rotation: 0,
    position: `${x}-${y}`,
    x,
    y,
  };
}

export interface BackgroundImage {
  id: string;
  path: string;
  title: string;
  alt: string;
}

export interface ParsedHexMapModule {
  id: string;
  gridConfiguration: GridConfig;
  backgroundImages: BackgroundImage[];
  createdAt: string;
  updatedAt: string;
}
