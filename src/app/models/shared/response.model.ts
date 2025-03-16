export interface ResponseModel<T> {
    isSuccess: boolean;
    data: T;
    errorMessage: string;
}

export interface BaseResponseData<T> {
    size: number; // 1 sayfada gösterilcek data sys
    index: number; // page
    count: number; // toplam data
    pages: number; // toplam page
    items: T[];
    hasPrevious: boolean;
    hasNext: boolean;
}


// ResponseModel<BaseResponseData<T>>>