import { CardType, CreditType } from "../models/bncard/card-type.enum";
import { Currency, CurrencyCode } from "../models/bncard/currency.enum";
import { ClCardType } from "../models/clcard/clcard-type.enum";
import { IoCode } from "../models/invoices/io-code.enum";
import { LineType } from "../models/invoices/line-type.enum";
import { TrCode } from "../models/invoices/tr-code.enum";
import { CurrencyType } from "../models/shared/currency.enum";
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
        case 0: return Status.ACTIVE;
        case 1: return Status.PASSIVE;
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


export function renderCurrStat(value: number): any {
    switch (value) {
        case 1: return 'Portföyde';
        case 2: return 'Ciro Edildi';
        case 3: return 'Teminata Verildi';
        case 4: return 'Tahsile Verildi';
        case 5: return 'Protestolu Tahsile Verildi';
        case 6: return 'İade Edildi';
        case 7: return 'Protesto Edildi';
        case 8: return 'Tahsil Edildi';
        case 9: return 'Kendi Çekimiz';
        case 10: return 'Borç Senedimiz';
        case 11: return 'Karşılığı Yok';
        case 12: return 'Tahsil Edilemiyor';
        default: return '';
    }
}

export function renderBankProcType(value: number): string | '' {
    switch (value) {
        case 1: return 'Banka İşlem Fişi';
        case 2: return 'Banka Virman Fişi';
        case 3: return 'Gelen Havale - EFT';
        case 4: return 'Gönderilen EFT/Havale';
        case 5: return 'Banka Açılış Fişi';
        case 6: return 'Banka Kur Farkı Fişi';
        case 16: return 'Banka Alınan Hizmet Faturası';
        case 17: return 'Banka Verilen Hizmet Faturası';
        case 18: return 'Bankadan Çek Ödemesi';
        case 19: return 'Bankadan Senet Ödemesi';
        default: return '';
    }
}

// Döviz türlerinin tanımlarını getiren yardımcı fonksiyon
export function renderCurrency(currencyType: CurrencyType): any {
    switch (currencyType) {
        case CurrencyType.TRY0: return "Türk Lirası (TRY)";
        case CurrencyType.USD: return "ABD Doları (USD)";
        case CurrencyType.DEM: return "Alman Markı (DEM)";
        case CurrencyType.AUD: return "Avustralya Doları (AUD)";
        case CurrencyType.ATS: return "Avusturya Şilini (ATS)";
        case CurrencyType.BEF: return "Belçika Frangı (BEF)";
        case CurrencyType.DKK: return "Danimarka Kronu (DKK)";
        case CurrencyType.FIM: return "Fin Markkası (FIM)";
        case CurrencyType.FRF: return "Fransız Frangı (FRF)";
        case CurrencyType.NLG: return "Hollanda Florini (NLG)";
        case CurrencyType.SEK: return "İsveç Kronu (SEK)";
        case CurrencyType.CHF: return "İsviçre Frangı (CHF)";
        case CurrencyType.ITL: return "İtalyan Lireti (ITL)";
        case CurrencyType.JPY: return "Japon Yeni (JPY)";
        case CurrencyType.CAD: return "Kanada Doları (CAD)";
        case CurrencyType.KWD: return "Kuveyt Dinarı (KWD)";
        case CurrencyType.NOK: return "Norveç Kronu (NOK)";
        case CurrencyType.GBP: return "İngiliz Sterlini (GBP)";
        case CurrencyType.SAR: return "S. Arabistan Riyali (SAR)";
        case CurrencyType.XEU: return "Avrupa Para Birimi (XEU)";
        case CurrencyType.EUR: return "Euro (EUR)";
        case CurrencyType.AZM: return "Azerbaycan Manatı (AZM)";
        case CurrencyType.BRL: return "Brezilya Cruzeirosu (BRL)";
        case CurrencyType.BGN: return "Bulgar Levası (BGN)";
        case CurrencyType.CZK: return "Çek Kuronu (CZK)";
        case CurrencyType.CNY: return "Çin Yüeni (CNY)";
        case CurrencyType.EEK: return "Estonya Kuronu (EEK)";
        case CurrencyType.GEL: return "Gürcistan Larisi (GEL)";
        case CurrencyType.INR: return "Hindistan Rupisi (INR)";
        case CurrencyType.HKD: return "Hongkong Doları (HKD)";
        case CurrencyType.IQD: return "Irak Dinarı (IQD)";
        case CurrencyType.IRR: return "İran Riyali (IRR)";
        case CurrencyType.IEP: return "İrlanda Lirası (IEP)";
        case CurrencyType.ESP: return "İspanyol Pesetası (ESP)";
        case CurrencyType.ILS: return "İsrail Şekeli (ILS)";
        case CurrencyType.ISK: return "İzlanda Kuronu (ISK)";
        case CurrencyType.CYP: return "Kıbrıs Lirası (CYP)";
        case CurrencyType.KGS: return "Kırgızistan Somu (KGS)";
        case CurrencyType.LVL: return "Letonya Latsı (LVL)";
        case CurrencyType.LYD: return "Libya Dinarı (LYD)";
        case CurrencyType.LBP: return "Lübnan Lirası (LBP)";
        case CurrencyType.LTL: return "Litvanya Litası (LTL)";
        case CurrencyType.LUF: return "Lüksemburg Frangı (LUF)";
        case CurrencyType.HUF: return "Macaristan Forinti (HUF)";
        case CurrencyType.MYR: return "Malezya Ringgiti (MYR)";
        case CurrencyType.MXN: return "Meksika Pesosu (MXN)";
        case CurrencyType.EGP: return "Mısır Lirası (EGP)";
        case CurrencyType.BBD: return "Barbados Doları (BBD)";
        case CurrencyType.PLN: return "Polonya Zlotisi (PLN)";
        case CurrencyType.PTE: return "Portekiz Escudosu (PTE)";
        case CurrencyType.ROL: return "Romen Leyi (ROL)";
        case CurrencyType.RUB: return "Rus Rublesi (RUB)";
        case CurrencyType.TWD: return "Tayvan Doları (TWD)";
        case CurrencyType.TRY1: return "Türk Lirası (TRY)";
        case CurrencyType.JOD: return "Ürdün Dinarı (JOD)";
        case CurrencyType.GRD: return "Yunan Drahmisi (GRD)";
        case CurrencyType.ARS: return "Arjantin Pesosu (ARS)";
        case CurrencyType.LAK: return "Laos Kipi (LAK)";
        case CurrencyType.ADP: return "Andorra Pesetası (ADP)";
        case CurrencyType.AED: return "BAE Dirhemi (AED)";
        case CurrencyType.AFN: return "Afganistan Afganisi (AFN)";
        case CurrencyType.ALL: return "Arnavutluk Leki (ALL)";
        case CurrencyType.ANG: return "Hollanda Antilleri Florini (ANG)";
        case CurrencyType.AOA: return "Angola Kwanzası (AOA)";
        case CurrencyType.BDT: return "Bengaldeş Takası (BDT)";
        case CurrencyType.BHD: return "Bahreyn Dinarı (BHD)";
        case CurrencyType.BIF: return "Burundi Frangı (BIF)";
        case CurrencyType.BMD: return "Bermuda Doları (BMD)";
        case CurrencyType.BND: return "Brunei Doları (BND)";
        case CurrencyType.BOB: return "Bolivya Bolivianosu (BOB)";
        case CurrencyType.BSD: return "Bahama Doları (BSD)";
        case CurrencyType.BTN: return "Butan Lirası (BTN)";
        case CurrencyType.BWP: return "Botswana Pulası (BWP)";
        case CurrencyType.BZD: return "Belize Doları (BZD)";
        case CurrencyType.CLP: return "Şili Pesosu (CLP)";
        case CurrencyType.COP: return "Kolombiya Pesosu (COP)";
        case CurrencyType.CRC: return "Kosta Rika Kolonu (CRC)";
        case CurrencyType.CUP: return "Küba Pesosu (CUP)";
        case CurrencyType.CVE: return "Cape Verde Esküdosu (CVE)";
        case CurrencyType.DJF: return "Cibuti Frangı (DJF)";
        case CurrencyType.DOP: return "Dominik Pesosu (DOP)";
        case CurrencyType.DZD: return "Cezayir Dinarı (DZD)";
        case CurrencyType.ECS: return "Ekvator Sucresi (ECS)";
        case CurrencyType.ETB: return "Etyopya Birri (ETB)";
        case CurrencyType.FJD: return "Fiji Adaları Doları (FJD)";
        case CurrencyType.FKP: return "Falkland Adaları Sterlini (FKP)";
        case CurrencyType.GHS: return "Gana Cedisi (GHS)";
        case CurrencyType.GIP: return "Cebelitarık Sterlini (GIP)";
        case CurrencyType.GMD: return "Gambia Dalasisi (GMD)";
        case CurrencyType.GNF: return "Gine Frangı (GNF)";
        case CurrencyType.GTQ: return "Guatemala Quetzali (GTQ)";
        case CurrencyType.GWP: return "Gine-Bisse Pesosu (GWP)";
        case CurrencyType.GYD: return "Guyana Doları (GYD)";
        case CurrencyType.HNL: return "Honduras Lempirası (HNL)";
        case CurrencyType.HTG: return "Haiti Gourdesi (HTG)";
        case CurrencyType.IDR: return "Endonezya Rupisi (IDR)";
        case CurrencyType.JMD: return "Jamaika Doları (JMD)";
        case CurrencyType.KES: return "Kenya Şilingi (KES)";
        case CurrencyType.KHR: return "Kamboçya Rieli (KHR)";
        case CurrencyType.KMF: return "Komor Frangi (KMF)";
        case CurrencyType.KPW: return "Kuzey Kore Wonu (KPW)";
        case CurrencyType.KRW: return "Güney Kore Wonu (KRW)";
        case CurrencyType.KYD: return "Cayman Adaları Doları (KYD)";
        case CurrencyType.LKR: return "Sri Lanka Rupisi (LKR)";
        case CurrencyType.LRD: return "Liberya Doları (LRD)";
        case CurrencyType.LSL: return "Lesoto Lotisi (LSL)";
        case CurrencyType.MAD: return "Fas Dirhemi (MAD)";
        case CurrencyType.MNT: return "Moğol Tugriki (MNT)";
        case CurrencyType.MOP: return "Macau Patacası (MOP)";
        case CurrencyType.MRO: return "Moritanya Ogiyası (MRO)";
        case CurrencyType.MTL: return "Malta Lirası (MTL)";
        case CurrencyType.MUR: return "Mauritius Rupisi (MUR)";
        case CurrencyType.MVR: return "Maldiv Rufiyası (MVR)";
        case CurrencyType.MWK: return "Malavi Kwachası (MWK)";
        case CurrencyType.MZN: return "Mozambik Meticali (MZN)";
        case CurrencyType.NGN: return "Nijerya Nairası (NGN)";
        case CurrencyType.NIO: return "Nikaragua Cordoba Orosu (NIO)";
        case CurrencyType.NPR: return "Nepal Rupisi (NPR)";
        case CurrencyType.NZD: return "Yeni Zelanda Doları (NZD)";
        case CurrencyType.OMR: return "Umman Riyali (OMR)";
        case CurrencyType.PAB: return "Panama Balboası (PAB)";
        case CurrencyType.PEN: return "Peru Solu (PEN)";
        case CurrencyType.PGK: return "Papua Yeni Gine Kinası (PGK)";
        case CurrencyType.PHP: return "Filipin Pesosu (PHP)";
        case CurrencyType.PKR: return "Pakistan Rupisi (PKR)";
        case CurrencyType.PYG: return "Paraguay Guaranisi (PYG)";
        case CurrencyType.QAR: return "Katar Riyali (QAR)";
        case CurrencyType.RWF: return "Ruanda Frangı (RWF)";
        case CurrencyType.SBD: return "Solomon Adaları Doları (SBD)";
        case CurrencyType.SCR: return "Seyşel Adaları Rupisi (SCR)";
        case CurrencyType.SDG: return "Sudan Dinarı (SDG)";
        case CurrencyType.SGD: return "Singapur Doları (SGD)";
        case CurrencyType.SHP: return "St. Helen Lirası (SHP)";
        case CurrencyType.SLL: return "Sierra Leone Leonesi (SLL)";
        case CurrencyType.SOS: return "Somali Şilini (SOS)";
        case CurrencyType.SRD: return "Surinam Florini (SRD)";
        case CurrencyType.STD: return "Sao Tome Dobrası (STD)";
        case CurrencyType.SVC: return "El Salvador Colonu (SVC)";
        case CurrencyType.SYP: return "Suriye Lirası (SYP)";
        case CurrencyType.SZL: return "Swaziland Lilangenisi (SZL)";
        case CurrencyType.THB: return "Tayland Bahtı (THB)";
        case CurrencyType.TND: return "Tunus Dinarı (TND)";
        case CurrencyType.TPE: return "Doğu Timor Esküdosu (TPE)";
        case CurrencyType.TTD: return "Trinidad ve Tobago Doları (TTD)";
        case CurrencyType.TZS: return "Tanzanya Şilini (TZS)";
        case CurrencyType.UGX: return "Uganda Şilini (UGX)";
        case CurrencyType.UYU: return "Uruguay Pesosu (UYU)";
        case CurrencyType.VEB: return "Venezuella Bolivarı (VEB)";
        case CurrencyType.VND: return "Vietnam Dongu (VND)";
        case CurrencyType.WST: return "Samoa Talası (WST)";
        case CurrencyType.YDD: return "Yemen Dinarı (YDD)";
        case CurrencyType.YER: return "Yemen Riyali (YER)";
        case CurrencyType.YUD: return "Yugoslav Dinarı (YUD)";
        case CurrencyType.ZAR: return "Güney Afrika Randı (ZAR)";
        case CurrencyType.ZWL: return "Zimbabwe Doları (ZWL)";
        case CurrencyType.KZT: return "Kazak Tengesi (KZT)";
        case CurrencyType.UAH: return "Ukrayna Grevniyası (UAH)";
        case CurrencyType.TMT: return "Türkmenistan Manatı (TMT)";
        case CurrencyType.UZS: return "Özbekistan Somu (UZS)";
        case CurrencyType.TL: return "Türk Lirası (TL)";
        case CurrencyType.RON: return "Romen Yeni Leyi (RON)";
        case CurrencyType.AZN: return "Azerbaycan Yeni Manatı (AZN)";
        case CurrencyType.AMD: return "Ermeni Dramı (AMD)";
        case CurrencyType.AWG: return "Aruba Florini (AWG)";
        case CurrencyType.BAM: return "Konvertibıl Mark (BAM)";
        case CurrencyType.BYR: return "Beyaz Rusya Rublesi (BYR)";
        case CurrencyType.CDF: return "Kongo Frangı (CDF)";
        case CurrencyType.ERN: return "Eritre Nakfası (ERN)";
        case CurrencyType.HRK: return "Hırvatistsan Kunası (HRK)";
        case CurrencyType.MDL: return "Moldova Leyi (MDL)";
        case CurrencyType.MGA: return "Malgaş Ariarysi (MGA)";
        case CurrencyType.MKD: return "Makedonya Dinarı (MKD)";
        case CurrencyType.MMK: return "Kyat (MMK)";
        case CurrencyType.NAD: return "Namibya Doları (NAD)";
        case CurrencyType.RSD: return "Sırp Dinarı (RSD)";
        case CurrencyType.TJS: return "Somoni (TJS)";
        case CurrencyType.TOP: return "Pa'anga (TOP)";
        case CurrencyType.VEF: return "Venezuela Bolivarı (VEF)";
        case CurrencyType.VUV: return "Vanuatu Vatusu (VUV)";
        case CurrencyType.XAF: return "Orta Afrika CFA Frangı (XAF)";
        case CurrencyType.XCD: return "Doğu Karayip Doları (XCD)";
        case CurrencyType.XOF: return "CFA Frangı (XOF)";
        case CurrencyType.XPF: return "CFP Frangı (XPF)";
        case CurrencyType.AU: return "Altın (AU)";
        case CurrencyType.AG: return "Gümüş (AG)";
        case CurrencyType.PT: return "Platin (PT)";
        case CurrencyType.PD: return "Paladyum (PD)";
        default: "";
    }
}

export function renderCurrencyCode(currency: CurrencyType): string {
    switch (currency) {
        case CurrencyType.TRY0: return "TRY";
        case CurrencyType.USD: return "USD";
        case CurrencyType.DEM: return "DEM";
        case CurrencyType.AUD: return "AUD";
        case CurrencyType.ATS: return "ATS";
        case CurrencyType.BEF: return "BEF";
        case CurrencyType.DKK: return "DKK";
        case CurrencyType.FIM: return "FIM";
        case CurrencyType.FRF: return "FRF";
        case CurrencyType.NLG: return "NLG";
        case CurrencyType.SEK: return "SEK";
        case CurrencyType.CHF: return "CHF";
        case CurrencyType.ITL: return "ITL";
        case CurrencyType.JPY: return "JPY";
        case CurrencyType.CAD: return "CAD";
        case CurrencyType.KWD: return "KWD";
        case CurrencyType.NOK: return "NOK";
        case CurrencyType.GBP: return "GBP";
        case CurrencyType.SAR: return "SAR";
        case CurrencyType.XEU: return "XEU";
        case CurrencyType.EUR: return "EUR";
        case CurrencyType.AZM: return "AZM";
        case CurrencyType.BRL: return "BRL";
        case CurrencyType.BGN: return "BGN";
        case CurrencyType.CZK: return "CZK";
        case CurrencyType.CNY: return "CNY";
        case CurrencyType.EEK: return "EEK";
        case CurrencyType.GEL: return "GEL";
        case CurrencyType.INR: return "INR";
        case CurrencyType.HKD: return "HKD";
        case CurrencyType.IQD: return "IQD";
        case CurrencyType.IRR: return "IRR";
        case CurrencyType.IEP: return "IEP";
        case CurrencyType.ESP: return "ESP";
        case CurrencyType.ILS: return "ILS";
        case CurrencyType.ISK: return "ISK";
        case CurrencyType.CYP: return "CYP";
        case CurrencyType.KGS: return "KGS";
        case CurrencyType.LVL: return "LVL";
        case CurrencyType.LYD: return "LYD";
        case CurrencyType.LBP: return "LBP";
        case CurrencyType.LTL: return "LTL";
        case CurrencyType.LUF: return "LUF";
        case CurrencyType.HUF: return "HUF";
        case CurrencyType.MYR: return "MYR";
        case CurrencyType.MXN: return "MXN";
        case CurrencyType.EGP: return "EGP";
        case CurrencyType.BBD: return "BBD";
        case CurrencyType.PLN: return "PLN";
        case CurrencyType.PTE: return "PTE";
        case CurrencyType.ROL: return "ROL";
        case CurrencyType.RUB: return "RUB";
        case CurrencyType.TWD: return "TWD";
        case CurrencyType.TRY1: return "TRY";
        case CurrencyType.JOD: return "JOD";
        case CurrencyType.GRD: return "GRD";
        case CurrencyType.ARS: return "ARS";
        case CurrencyType.LAK: return "LAK";
        case CurrencyType.ADP: return "ADP";
        case CurrencyType.AED: return "AED";
        case CurrencyType.AFN: return "AFN";
        case CurrencyType.ALL: return "ALL";
        case CurrencyType.ANG: return "ANG";
        case CurrencyType.AOA: return "AOA";
        case CurrencyType.BDT: return "BDT";
        case CurrencyType.BHD: return "BHD";
        case CurrencyType.BIF: return "BIF";
        case CurrencyType.BMD: return "BMD";
        case CurrencyType.BND: return "BND";
        case CurrencyType.BOB: return "BOB";
        case CurrencyType.BSD: return "BSD";
        case CurrencyType.BTN: return "BTN";
        case CurrencyType.BWP: return "BWP";
        case CurrencyType.BZD: return "BZD";
        case CurrencyType.CLP: return "CLP";
        case CurrencyType.COP: return "COP";
        case CurrencyType.CRC: return "CRC";
        case CurrencyType.CUP: return "CUP";
        case CurrencyType.CVE: return "CVE";
        case CurrencyType.DJF: return "DJF";
        case CurrencyType.DOP: return "DOP";
        case CurrencyType.DZD: return "DZD";
        case CurrencyType.ECS: return "ECS";
        case CurrencyType.ETB: return "ETB";
        case CurrencyType.FJD: return "FJD";
        case CurrencyType.FKP: return "FKP";
        case CurrencyType.GHS: return "GHS";
        case CurrencyType.GIP: return "GIP";
        case CurrencyType.GMD: return "GMD";
        case CurrencyType.GNF: return "GNF";
        case CurrencyType.GTQ: return "GTQ";
        case CurrencyType.GWP: return "GWP";
        case CurrencyType.GYD: return "GYD";
        case CurrencyType.HNL: return "HNL";
        case CurrencyType.HTG: return "HTG";
        case CurrencyType.IDR: return "IDR";
        case CurrencyType.JMD: return "JMD";
        case CurrencyType.KES: return "KES";
        case CurrencyType.KHR: return "KHR";
        case CurrencyType.KMF: return "KMF";
        case CurrencyType.KPW: return "KPW";
        case CurrencyType.KRW: return "KRW";
        case CurrencyType.KYD: return "KYD";
        case CurrencyType.LKR: return "LKR";
        case CurrencyType.LRD: return "LRD";
        case CurrencyType.LSL: return "LSL";
        case CurrencyType.MAD: return "MAD";
        case CurrencyType.MNT: return "MNT";
        case CurrencyType.MOP: return "MOP";
        case CurrencyType.MRO: return "MRO";
        case CurrencyType.MTL: return "MTL";
        case CurrencyType.MUR: return "MUR";
        case CurrencyType.MVR: return "MVR";
        case CurrencyType.MWK: return "MWK";
        case CurrencyType.MZN: return "MZN";
        case CurrencyType.NGN: return "NGN";
        case CurrencyType.NIO: return "NIO";
        case CurrencyType.NPR: return "NPR";
        case CurrencyType.NZD: return "NZD";
        case CurrencyType.OMR: return "OMR";
        case CurrencyType.PAB: return "PAB";
        case CurrencyType.PEN: return "PEN";
        case CurrencyType.PGK: return "PGK";
        case CurrencyType.PHP: return "PHP";
        case CurrencyType.PKR: return "PKR";
        case CurrencyType.PYG: return "PYG";
        case CurrencyType.QAR: return "QAR";
        case CurrencyType.RWF: return "RWF";
        case CurrencyType.SBD: return "SBD";
        case CurrencyType.SCR: return "SCR";
        case CurrencyType.SDG: return "SDG";
        case CurrencyType.SGD: return "SGD";
        case CurrencyType.SHP: return "SHP";
        case CurrencyType.SLL: return "SLL";
        case CurrencyType.SOS: return "SOS";
        case CurrencyType.SRD: return "SRD";
        case CurrencyType.STD: return "STD";
        case CurrencyType.SVC: return "SVC";
        case CurrencyType.SYP: return "SYP";
        case CurrencyType.SZL: return "SZL";
        case CurrencyType.THB: return "THB";
        case CurrencyType.TND: return "TND";
        case CurrencyType.TPE: return "TPE";
        case CurrencyType.TTD: return "TTD";
        case CurrencyType.TZS: return "TZS";
        case CurrencyType.UGX: return "UGX";
        case CurrencyType.UYU: return "UYU";
        case CurrencyType.VEB: return "VEB";
        case CurrencyType.VND: return "VND";
        case CurrencyType.WST: return "WST";
        case CurrencyType.YDD: return "YDD";
        case CurrencyType.YER: return "YER";
        case CurrencyType.YUD: return "YUD";
        case CurrencyType.ZAR: return "ZAR";
        case CurrencyType.ZWL: return "ZWL";
        case CurrencyType.KZT: return "KZT";
        case CurrencyType.UAH: return "UAH";
        case CurrencyType.TMT: return "TMT";
        case CurrencyType.UZS: return "UZS";
        case CurrencyType.TL: return "TL";
        case CurrencyType.RON: return "RON";
        case CurrencyType.AZN: return "AZN";
        case CurrencyType.AMD: return "AMD";
        case CurrencyType.AWG: return "AWG";
        case CurrencyType.BAM: return "BAM";
        case CurrencyType.BYR: return "BYR";
        case CurrencyType.CDF: return "CDF";
        case CurrencyType.ERN: return "ERN";
        case CurrencyType.HRK: return "HRK";
        case CurrencyType.MDL: return "MDL";
        case CurrencyType.MGA: return "MGA";
        case CurrencyType.MKD: return "MKD";
        case CurrencyType.MMK: return "MMK";
        case CurrencyType.NAD: return "NAD";
        case CurrencyType.RSD: return "RSD";
        case CurrencyType.TJS: return "TJS";
        case CurrencyType.TOP: return "TOP";
        case CurrencyType.VEF: return "VEF";
        case CurrencyType.VUV: return "VUV";
        case CurrencyType.XAF: return "XAF";
        case CurrencyType.XCD: return "XCD";
        case CurrencyType.XOF: return "XOF";
        case CurrencyType.XPF: return "XPF";
        case CurrencyType.AU: return "AU";
        case CurrencyType.AG: return "AG";
        case CurrencyType.PT: return "PT";
        case CurrencyType.PD: return "PD";
        default: return "";
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