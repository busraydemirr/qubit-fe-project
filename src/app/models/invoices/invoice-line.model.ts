export interface InvoiceLineModel {
    id?: number;                 // Transaction ID
    clCardDefinition?: string;   // Client card definition (company/customer name)
    itemCode?: string;           // Product item code
    itemName?: string;           // Product name
    unitName?: string;           // Unit of measurement
    stockref?: number;           // Stock reference number
    linetype?: number;           // Line type
    trcode?: number;             // Transaction code
    date?: string;               // Transaction date
    iocode?: number;             // Input/Output code
    invoiceref?: number;         // Invoice reference
    clientref?: number;          // Client reference
    delvrycode?: string;         // Delivery code
    amount?: number;             // Quantity amount
    price?: number;              // Unit price
    total?: number;              // Total price
    prcurr?: number;             // Price currency
    reportrate?: number;         // Report rate
    lineexp?: string;            // Line explanation
    uomref?: number;             // Unit of measurement reference
    plnamount?: number;          // Planned amount
    vat?: number;                // VAT percentage
    vatamnt?: number;            // VAT amount
    vatmatrah?: number;          // VAT base amount
    billed?: number;             // Billing status (1 for billed)
    linenet?: number;            // Line net amount
    prrate?: number;             // Price rate
    ordficheref?: number;        // Order reference
    month?: number;              // Transaction month
    year?: number;               // Transaction year
    affectrisk?: number;         // Risk affect flag
}