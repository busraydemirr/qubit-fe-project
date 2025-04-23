export enum Status {
    'ACTIVE' = 'Aktif', // 1
    'PASSIVE' = 'Pasif' // 0
}

export enum RectStatus {
    'NEW' = 'Yeni', // 0
    'CHANGED' = 'Değiştirildi', // 1
    'APPROVED' = 'Onaylandı', // 2
    'CANCELLED' = 'İptal Edildi' // 3
}

export enum Site {

}

export enum Sign {
    'DEBT' = 'Borç', // 0
    'RECEIVABLE' = 'Alacak' // 1
}

export enum AccountedInfo {
    'ACCOUNTED' = 'Muhasebeleştirilmiş', // 1
    'NOT_ACCOUNTED' = 'Muhasebeleştirilmemiş' // 0
}

export enum OrficheStatus {
    'WAITING' = 'Beklemede', // 0: Beklemede
    'APPROVED' = 'Onaylandı', // 1: Onaylandı
    'HALF_COMPLETED' = 'Kısmen Gerçekleşti', // 2: Kısmen Gerçekleşti
    'COMPLETED' = 'Tamamlandı', // 3: Tamamlandı
    'CLOSED' = 'Kapatıldı', // 4: Kapatıldı
}