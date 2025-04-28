import { CardType, CreditType } from "../models/bncard/card-type.enum";
import { Currency, CurrencyCode } from "../models/bncard/currency.enum";
import { ClCardType } from "../models/clcard/clcard-type.enum";
import { IoCode } from "../models/invoices/io-code.enum";
import { LineType } from "../models/invoices/line-type.enum";
import { TrCode } from "../models/invoices/tr-code.enum";
import { AccountedInfo, OrficheStatus, RectStatus, Sign, Status } from "../models/shared/status.enum";

export function renderRectStatus(value: number): RectStatus | '' {
    switch (value) {
        case 0: return RectStatus.NEW;
        case 1: return RectStatus.CHANGED;
        case 2: return RectStatus.APPROVED;
        case 3: return RectStatus.CANCELLED;
        default: return '';
    }

}

export function renderStatus(status: number): Status | '' {
    switch (status) {
        case 0: return Status.PASSIVE;
        case 1: return Status.ACTIVE;
        default: return '';
    }
}

export function renderOrficheStatus(status: number): OrficheStatus | '' {
    switch (status) {
        case 0: return OrficheStatus.WAITING;
        case 1: return OrficheStatus.APPROVED;
        case 2: return OrficheStatus.HALF_COMPLETED;
        case 3: return OrficheStatus.COMPLETED;
        case 4: return OrficheStatus.CLOSED;
        default: return '';
    }
}

export function renderSign(status: number): Sign | '' {
    switch (status) {
        case 0: return Sign.DEBT;
        case 1: return Sign.RECEIVABLE;
        default: return '';
    }
}

export function renderAccountedInfo(value: number): AccountedInfo | '' {
    switch (value) {
        case 0: return AccountedInfo.NOT_ACCOUNTED;
        case 1: return AccountedInfo.ACCOUNTED;
        default: return '';
    }
}

export function renderCurrency(currency: number): Currency | '' {
    switch (currency) {
        case 0: return Currency.TRY;
        case 1: return Currency.USD;
        case 20: return Currency.EUR;
        case 30: return Currency.GBP;
        case 40: return Currency.JPY;
        default: return '';
    }
}

export function renderCurrencyCode(currency: number): CurrencyCode | '' {
    switch (currency) {
        case 0: return CurrencyCode.TRY;
        case 1: return CurrencyCode.USD;
        case 20: return CurrencyCode.EUR;
        case 30: return CurrencyCode.GBP;
        case 40: return CurrencyCode.JPY;
        default: return '';
    }
}

export function renderCardType(cardType: number): CardType | '' {
    switch (cardType) {
        case 1: return CardType.BankaHesabı;
        case 2: return CardType.KrediKartı;
        case 3: return CardType.SanalPos;
        default: return '';
    }
}

export function renderClCardType(cardType: number): ClCardType | '' {
    switch (cardType) {
        case 1: return ClCardType.Musteri;
        case 2: return ClCardType.Satıcı;
        case 3: return ClCardType.Calisan;
        case 4: return ClCardType.Diğer;
        case 5: return ClCardType.Banka;
        default: return '';
    }
}

export function renderCreditType(type: number): CreditType | '' {
    switch (type) {
        case 1: return CreditType.PERSONEL;
        case 2: return CreditType.COMMERCIAL;
        case 3: return CreditType.CREDIT_CARD;
        case 4: return CreditType.OTHER;
        default: return '';
    }
}

export function renderLineType(type: number): LineType | '' {
    /* 0 Malzeme; 1 Promosyon; 2 İndirim; 3 Masraf; 4 Hizmet; 5 Depozit; 6 Karma koli; 7 Karma koli satırı; 8 Sabit kıymet; 9 Ek Malzeme; 10 Malzeme sınıfı; 11 Fason1 */
    switch (type) {
        case 0: return LineType.MALZEME;
        case 1: return LineType.PROMOSYON;
        case 2: return LineType.INDIRIM;
        case 3: return LineType.MASRAF;
        case 4: return LineType.HIZMET;
        case 5: return LineType.DEPOZIT;
        case 6: return LineType.KARMA_KOLI;
        case 7: return LineType.KARMA_KOLI_SATIRI;
        case 8: return LineType.SABIT_KIYMET;
        case 9: return LineType.EK_MALZEME;
        case 10: return LineType.MALZEME_SINIFI;
        case 11: return LineType.FASON;
        default: return '';
    }
}

export function renderTrCode(code: number): string {
    switch (code) {
        case TrCode.RETAIL_SALES_INVOICE:
            return "Perakende Satış Faturası";
        case TrCode.WHOLESALE_SALES_INVOICE:
            return "Toptan Satış Faturası";
        case TrCode.PURCHASE_RETURN_INVOICE:
            return "Alış İade Faturası";
        case TrCode.SALES_RETURN_INVOICE:
            return "Satış İade Faturası";
        case TrCode.PURCHASE_PRICE_DIFF_INVOICE:
            return "Alış Fiyat Farkı Faturası";
        case TrCode.SALES_PRICE_DIFF_INVOICE:
            return "Satış Fiyat Farkı Faturası";
        case TrCode.PURCHASE_SERVICE_INVOICE:
            return "Alış Hizmet Faturası";
        case TrCode.SALES_SERVICE_INVOICE:
            return "Satış Hizmet Faturası";
        case TrCode.PURCHASE_SERVICE_RETURN_INVOICE:
            return "Alış İade Hizmet Faturası";
        case TrCode.SALES_SERVICE_RETURN_INVOICE:
            return "Satış İade Hizmet Faturası";
        case TrCode.PROFORMA_SALES_INVOICE:
            return "Proforma Satış Faturası";
        case TrCode.PROFORMA_PURCHASE_INVOICE:
            return "Proforma Alış Faturası";
        case TrCode.PURCHASE_PRICE_DIFF_RETURN_INVOICE:
            return "Alış Fiyat Farkı İade Faturası";
        case TrCode.SALES_PRICE_DIFF_RETURN_INVOICE:
            return "Satış Fiyat Farkı İade Faturası";
        case TrCode.PURCHASE_SERVICE_PRICE_DIFF_INVOICE:
            return "Alış Hizmet Fiyat Farkı Faturası";
        case TrCode.SALES_SERVICE_PRICE_DIFF_INVOICE:
            return "Satış Hizmet Fiyat Farkı Faturası";
        case TrCode.PURCHASE_SERVICE_PRICE_DIFF_RETURN_INVOICE:
            return "Alış Hizmet Fiyat Farkı İade Faturası";
        case TrCode.SALES_SERVICE_PRICE_DIFF_RETURN_INVOICE:
            return "Satış Hizmet Fiyat Farkı İade Faturası";
        case TrCode.PURCHASE_COMMISSION_INVOICE:
            return "Alış Komisyon Faturası";
        case TrCode.SALES_COMMISSION_INVOICE:
            return "Satış Komisyon Faturası";
        default:
            return "";
    }
}


export function renderIoCode(code: number): string {
    switch (code) {
        case IoCode.INPUT:
            return "Girdi";
        case IoCode.WAREHOUSE_IN:
            return "Ambardan giriş";
        case IoCode.WAREHOUSE_OUT:
            return "Ambardan çıkış";
        case IoCode.OUTPUT:
            return "Çıktı";
        default:
            return "";
    }
}