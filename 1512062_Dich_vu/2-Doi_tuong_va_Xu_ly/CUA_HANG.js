class CUA_HANG {
    toXML() {
        let chuoi_cua_hang = "<Cua_hang ";
        chuoi_cua_hang += " Ten= '" + this.Ten + "' Ma_so='" + this.Ma_so + "' Doanh_thu='" +
            this.Doanh_thu
        chuoi_cua_hang += "' ></Cua_hang>";

        return chuoi_cua_hang;
    }

    setProp(ten, maso, doanhthu) {
        this.Ten = ten;
        this.Ma_so = maso;
        this.Doanh_thu = doanhthu;
    }
}

var MY_CUA_HANG = new CUA_HANG;
module.exports = MY_CUA_HANG;