export type SearchHistory = {
  key: string;
  location: string;
  coordinate: Coordinate;
  timeZone: string;
  localTime: string;
};

export type Coordinate = {
  key?: string;
  lat: number;
  lng: number;
};

export type SelfCoordinate = {
  loaded: boolean;
} & Coordinate;

export type LocationSearchProp = {
  onSearch: (val: string) => Promise<void>;
  onLocate: () => void;
  onShow: (val?: boolean) => void;
  visible: boolean;
};
export type LocationTableProp = {
  historyData: SearchHistory[];
  onDelete: (key: React.Key[]) => Promise<void>;
  onShow: (val?: boolean) => void;
  visible: boolean;
};

export type LocationMapProp = {
  location: Coordinate;
  markers: Coordinate[];
};
