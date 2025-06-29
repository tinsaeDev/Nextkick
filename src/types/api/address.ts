export type getAddressOptions = {
  success: boolean;
  data: {
    id: string;
    name: string;
    isoCode: string;
    states: [
      {
        id: string;
        name: string;
        code: null;
        cities: [
          {
            id: string;
            name: string;
            slug: string;
          }
        ];
      }
    ];
  }[];
};
