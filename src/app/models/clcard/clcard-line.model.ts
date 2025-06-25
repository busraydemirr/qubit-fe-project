export interface ClCardLineModel {
    id?: number;
    clientref?: number;
    date?: string;
    modulenr?: number;
    trcode?: number;
    cyphcode?: string;
    tranno?: string;
    lineexp?: string;
    accounted?: number;
    amount?: number;
    trnet?: number;
    reportrate?: number;
    reportnet?: number;
    accficheref?: number;
    capiblockNameCreatedby?: string;
    capiblockCreatedby?: number;
    capiblockCreadeddate?: string;
    capiblockModifiedby?: number;
    capiblockModifieddate?: string | null;
    month?: number;
    year?: number;
    affectrisk?: number;
    sign?: number;
    sourcefref?: number;
    termInfo?: string;
  }