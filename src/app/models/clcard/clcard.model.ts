export interface ClCardItemModel {
    select?: boolean;
    id?: number;
    active?: number;
    cardType?: number; // enum yapılmalı
    code?: string;
    definition?: string;
    addr1?: string;
    addr2?: string;
    country?: string;
    city?: string;
    town?: string;
    district?: string;
    specode2?: string;
    specode4?: string;
    specode5?: string;
    inCharge?: string;
    postCode?: string;
    telNrs1?: string;
    telNrs2?: string;
    faxNr?: string;
    taxNr?: string;
    recStatus?: number;
    taxOffice?: string;
    emailAddr?: string;
    capiBlock_CreatedDate?: Date;
    capiblockNameCreatedby?: string;
    capiBlock_CreatedBy?: string;
    paymentRef?: number;
}
