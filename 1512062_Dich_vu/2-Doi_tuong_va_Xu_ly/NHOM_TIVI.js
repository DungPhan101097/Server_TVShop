var NHOM_TIVI = class NHOM_TIVI {
    setProp(Ten, Ma_so, So_luong_Ton, Doanh_thu) {
        this.Ten = Ten;
        this.Ma_so = Ma_so;
        this.So_luong_Ton = So_luong_Ton;
        this.Doanh_thu = Doanh_thu;
    }

    toXML() {
        let chuoi_nhom_tivi = "<Nhom_Tivi ";
        chuoi_nhom_tivi += " Ten= '" + this.Ten +
            "' Ma_so='" + this.Ma_so +
            "' So_luong_Ton='" + this.So_luong_Ton +
            "' Doanh_thu='" + this.Doanh_thu
        chuoi_nhom_tivi += "' ></Nhom_Tivi>";

        return chuoi_nhom_tivi;
    }
}

module.exports = NHOM_TIVI;