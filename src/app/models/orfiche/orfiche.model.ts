export interface OrficheModel {
    id?: number;
    ficheno?: string;
    clCard?: { definition?: string };
    clientref?: string;
    trcode?: number;
    date?: string;
    docode?: string;
    totaldiscounted?: number;
    totalvat?: number;
    grosstotal?: number;
    nettotal?: number;
    genexp1?: string;
    genexp2?: string;
    status?: number;
    capiblockCreadeddate?: string;
    trrate?: number;
    trnet?: number;
}
