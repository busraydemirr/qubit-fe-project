export interface FilterRequestModel {
    sort?: FilterSortModel[];
    filter?: FilterFilterModel;
}

interface FilterSortModel {
    field: string;
    dir: string;
}

interface FilterFilterModel {
    field: string;
    value: string;
    operator?: string;
    logic?: string;
    filters?: FilterFilterModel;
}