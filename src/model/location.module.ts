export interface LocationResponse {
  responseCode: number;
  responseMessage: string;
  status: boolean;
  countryList: CountryModel[];
  stateList: StateModel[];
  citiesList: CityModel[];
}

export interface CountryModel {
  id: string;
  name: string;
}

export interface StateModel {
  id: string;
  name: string;
}

export interface CityModel {
  id: string;
  name: string;
}
