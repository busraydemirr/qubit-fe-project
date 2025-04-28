export enum TrCode {
    // Retail and Wholesale
    RETAIL_SALES_INVOICE = 1,              // Perakende Satış Faturası
    WHOLESALE_SALES_INVOICE = 2,           // Toptan Satış Faturası

    // Return Invoices
    PURCHASE_RETURN_INVOICE = 3,           // Alış İade Faturası
    SALES_RETURN_INVOICE = 4,              // Satış İade Faturası

    // Price Difference Invoices
    PURCHASE_PRICE_DIFF_INVOICE = 5,       // Alış Fiyat Farkı Faturası
    SALES_PRICE_DIFF_INVOICE = 6,          // Satış Fiyat Farkı Faturası

    // Service Invoices
    PURCHASE_SERVICE_INVOICE = 7,          // Alış Hizmet Faturası
    SALES_SERVICE_INVOICE = 8,             // Satış Hizmet Faturası
    PURCHASE_SERVICE_RETURN_INVOICE = 9,   // Alış İade Hizmet Faturası
    SALES_SERVICE_RETURN_INVOICE = 10,     // Satış İade Hizmet Faturası

    // Proforma Invoices
    PROFORMA_SALES_INVOICE = 11,           // Proforma Satış Faturası
    PROFORMA_PURCHASE_INVOICE = 12,        // Proforma Alış Faturası

    // Price Difference Return Invoices
    PURCHASE_PRICE_DIFF_RETURN_INVOICE = 13, // Alış Fiyat Farkı İade Faturası
    SALES_PRICE_DIFF_RETURN_INVOICE = 14,    // Satış Fiyat Farkı İade Faturası

    // Service Price Difference Invoices
    PURCHASE_SERVICE_PRICE_DIFF_INVOICE = 15,      // Alış Hizmet Fiyat Farkı Faturası
    SALES_SERVICE_PRICE_DIFF_INVOICE = 16,         // Satış Hizmet Fiyat Farkı Faturası
    PURCHASE_SERVICE_PRICE_DIFF_RETURN_INVOICE = 17, // Alış Hizmet Fiyat Farkı İade Faturası
    SALES_SERVICE_PRICE_DIFF_RETURN_INVOICE = 18,    // Satış Hizmet Fiyat Farkı İade Faturası

    // Commission Invoices
    PURCHASE_COMMISSION_INVOICE = 19,      // Alış Komisyon Faturası
    SALES_COMMISSION_INVOICE = 20          // Satış Komisyon Faturası
}