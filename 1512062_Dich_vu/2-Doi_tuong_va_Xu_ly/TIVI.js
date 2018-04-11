var NHOM_TIVI = require("./NHOM_TIVI");
var xmlserializer = require('xmlserializer');

class TIVI {
    setProp(Tivi) {
        this.Ten = Tivi.getAttribute("Ten");
        this.Ma_so = Tivi.getAttribute("Ma_so");
        this.Don_gia_Ban = Tivi.getAttribute("Don_gia_Ban");
        this.Don_gia_Nhap = Tivi.getAttribute("Don_gia_Nhap");
        this.So_luong_Ton = Tivi.getAttribute("So_luong_Ton");
        this.Doanh_thu = Tivi.getAttribute("Doanh_thu");
        this.Trang_thai_Con_hang = Tivi.getAttribute("Trang_thai_Con_hang");
        this.Nhom_Tivi = Tivi.getElementsByTagName("Nhom_Tivi")[0];
    }
    toXML() {
        let chuoi_tivi = "<Tivi ";
        chuoi_tivi += " Ten= '" + this.Ten +
            "' Ma_so='" + this.Ma_so +
            "' Don_gia_Ban='" + this.Don_gia_Ban +
            "' Don_gia_Nhap='" + this.Don_gia_Nhap +
            "' So_luong_Ton='" + this.So_luong_Ton +
            "' Doanh_thu='" + this.Doanh_thu +
            "' Trang_thai_Con_hang='" + this.Trang_thai_Con_hang +
            "' >" + xmlserializer.serializeToString(this.Nhom_Tivi);

        chuoi_tivi += " </Tivi>";

        return chuoi_tivi;
    }
}


module.exports = TIVI;