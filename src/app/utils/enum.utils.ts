import { CardType } from "../models/bncard/card-type.enum";
import { Currency } from "../models/bncard/currency.enum";
import { AccountedInfo, RectStatus, Sign, Status } from "../models/shared/status.enum";

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

export function renderCardType(cardType: number): CardType | '' {
    switch (cardType) {
      case 1: return CardType.BankaHesabı;
      case 2: return CardType.KrediKartı;
      case 3: return CardType.SanalPos;
      default: return '';
    }
  }