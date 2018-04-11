var CUA_HANG = require("./CUA_HANG")
var TIVI = require("./TIVI")
var NHOM_TIVI = require("./NHOM_TIVI")
var XU_LY_LUU_TRU = require("./XU_LY_LUU_TRU")

var DOMParser = require('xmldom').DOMParser;
var parseString = require('xml2js').parseString;
var xmlserializer = require('xmlserializer');

class XU_LY_NGHIEP_VU {

    tinhDoanhThuCuaHang(ds_TV) {
        let doanhThu = 0;
        ds_TV.forEach(Tivi => {
            let doanh_thu_item = parseInt(Tivi["Doanh_thu"]);
            if (!isNaN(doanh_thu_item)) {
                doanhThu += doanh_thu_item;
            }
        })
        return doanhThu;
    }

    TaoDoiTuongCuaHang(data, ds_TV) {
        let doanhThu = 0; //this.tinhDoanhThuCuaHang(ds_TV);
        let cuaHang_xmlDOM = new DOMParser().parseFromString(data, "text/xml").documentElement;
        CUA_HANG.setProp(cuaHang_xmlDOM.getAttribute("Ten"),
            cuaHang_xmlDOM.getAttribute("Ma_so"), doanhThu);

        return CUA_HANG;
    }

    TaoDanhSachTivi(chuoiXML_ds_TV) {
        let dsTivi_chuaXly = this.ChuyenChuoiXMLVeDanhSachTivi(chuoiXML_ds_TV);
        let dsTivi_daXly = [];
        dsTivi_chuaXly.forEach(Tivi => {
            let myTivi = new TIVI;
            myTivi.setProp(Tivi);
            dsTivi_daXly.push(myTivi);
        })

        return dsTivi_daXly;
    }

    DocDanhSachTivi(listFileTV, funcCallback) {
        let Danh_sach_TV = [];

        for (let i = 0; i < listFileTV.length; i++) {
            XU_LY_LUU_TRU.Doc_TV(listFileTV[i], (dataTV) => {

                let dataXmlTV = new DOMParser().parseFromString(dataTV, "text/xml").documentElement;
                let curTivi = new TIVI;
                curTivi.setProp(dataXmlTV);
                Danh_sach_TV.push(curTivi);
                if (Danh_sach_TV.length >= listFileTV.length) {
                    funcCallback(Danh_sach_TV);
                }

            })
        }
    }


    ChuyenMangTiviVeChuoiXMl(ds_TV) {
        let chuoi_ds_tivi = "<Danh_sach_tivi> ";
        ds_TV.forEach(Tivi => {
            chuoi_ds_tivi += Tivi.toXML();
        })
        chuoi_ds_tivi += " </Danh_sach_tivi>";
        return chuoi_ds_tivi;
    }

    ChuyenChuoiXMLVeDanhSachTivi(chuoi_XML_ds_TV) {
        var dsTV_xmlDOM = new DOMParser().parseFromString(chuoi_XML_ds_TV, "text/xml").documentElement;
        var Danh_sach_Tivi_htmlCollection = dsTV_xmlDOM.getElementsByTagName("Tivi");
        var dsTV = Array.prototype.slice.call(Danh_sach_Tivi_htmlCollection);
        return dsTV;
    }

    ChuyenMangNhomTiviVeChuoiXMl(ds_nhomTV) {
        var str_ds_nhom_TV = "<Danh_sach_nhom_Tivi>";
        ds_nhomTV.forEach(nhomTV => {
            str_ds_nhom_TV += nhomTV.toXML();
        })
        str_ds_nhom_TV += "</Danh_sach_nhom_Tivi>";
        return str_ds_nhom_TV;
    }

    Tim_Kiem_Mat_Hang_Theo_Tu_Khoa(chuoiTraCuu, dsMatHang) {
        chuoiTraCuu = chuoiTraCuu.toLowerCase();
        var str_ds_tra_cuu = "<Danh_sach_Tivi>";
        dsMatHang.forEach(Tivi => {
            var tenMH = Tivi["Ten"].toLowerCase();
            if (tenMH.indexOf(chuoiTraCuu) >= 0) {
                str_ds_tra_cuu += Tivi.toXML();
            }
        })

        str_ds_tra_cuu += "</Danh_sach_Tivi>";
        return str_ds_tra_cuu;
    }

    Tim_Kiem_Nhom_Mat_Hang_Theo_Tu_Khoa(chuoiTraCuu, dsNhomMatHang) {
        chuoiTraCuu = chuoiTraCuu.toLowerCase();
        var str_ds_tra_cuu = "<Danh_sach_nhom_Tivi>";

        dsNhomMatHang.forEach(nhomTV => {
            var ten_nhomTV = nhomTV["Ten"].toLowerCase();
            if (ten_nhomTV.indexOf(chuoiTraCuu) >= 0) {
                str_ds_tra_cuu += nhomTV.toXML();
            }
        })
        str_ds_tra_cuu += "</Danh_sach_nhom_Tivi>";
        return str_ds_tra_cuu;
    }

    loc_nhom_TV(ds_TV) {
        var result_NhomTV = [];
        ds_TV.forEach(tivi => {
            this.CapNhatNhomTV_DaXly(tivi, result_NhomTV);
        });
        return result_NhomTV;
    }

    CapNhatNhomTV_DaXly(tivi_dangXet, result_NhomTV) {
        let isContain = false;
        let nhomTV_dangXet = tivi_dangXet["Nhom_Tivi"];

        for (var i = 0; i < result_NhomTV.length; i++) {
            var nhomTV = result_NhomTV[i];
            if (nhomTV_dangXet.getAttribute("Ma_so") == nhomTV["Ma_so"]) {
                let soLuongTonMH = parseInt(tivi_dangXet["So_luong_Ton"]);
                let doanhThuMH = parseInt(tivi_dangXet["Doanh_thu"]);
                if (!isNaN(soLuongTonMH) && !isNaN(doanhThuMH)) {
                    nhomTV["So_luong_Ton"] = parseInt(nhomTV["So_luong_Ton"]) + soLuongTonMH;
                    nhomTV["Doanh_thu"] = parseInt(nhomTV["Doanh_thu"]) + doanhThuMH;
                }
                isContain = true;
                break;
            }
        }
        if (isContain === false) {
            let new_NhomTV = new NHOM_TIVI;
            new_NhomTV["Ma_so"] = nhomTV_dangXet.getAttribute("Ma_so");
            new_NhomTV["Ten"] = nhomTV_dangXet.getAttribute("Ten");

            let soLuongTonMH = parseInt(tivi_dangXet["So_luong_Ton"]);
            let doanhThuMH = parseInt(tivi_dangXet["Doanh_thu"]);

            if (!isNaN(soLuongTonMH)) {
                new_NhomTV["So_luong_Ton"] = soLuongTonMH;
            } else {
                new_NhomTV["So_luong_Ton"] = 0;
            }

            if (!isNaN(doanhThuMH)) {
                new_NhomTV["Doanh_thu"] = doanhThuMH;
            } else {
                new_NhomTV["Doanh_thu"] = 0;
            }
            result_NhomTV.push(new_NhomTV);
        }
        return result_NhomTV;
    }

    CapNhatDonGiaNhapCuaDanhSachTivi(Danh_sach_TV, arr_msTV_tmp, arr_donGiaNhap_tmp, funcCallback) {
        let arr_msTV = [],
            arr_donGiaNhap = [];
        if (arr_msTV_tmp.constructor !== Array) {
            arr_msTV[0] = arr_msTV_tmp;
            arr_donGiaNhap[0] = arr_donGiaNhap_tmp;
        } else {
            arr_msTV = arr_msTV_tmp;
            arr_donGiaNhap = arr_donGiaNhap_tmp;
        }
        this.CapNhatThDanhSachTivi(Danh_sach_TV, arr_msTV, arr_donGiaNhap);
        for (let i = 0; i < arr_msTV.length; i++) {
            this.CapNhatDatabase(arr_msTV[i], arr_donGiaNhap[i], () => {
                if (i == arr_msTV.length - 1) {
                    funcCallback();
                }
            });
        }

    }

    CapNhatThDanhSachTivi(Danh_sach_TV, arr_msTV, arr_donGiaNhap) {
        for (let i = 0; i < arr_msTV.length; i++) {
            for (let tvIndex = 0; tvIndex < Danh_sach_TV.length; tvIndex++) {
                if (arr_msTV[i] == Danh_sach_TV[tvIndex]["Ma_so"]) {
                    Danh_sach_TV[tvIndex]["Don_gia_Nhap"] = arr_donGiaNhap[i];
                    break;
                }
            }
        }
    }

    CapNhatDatabase(arr_msTV, arr_donGiaNhap, funcCallback) {
        let file = arr_msTV + ".xml";
        XU_LY_LUU_TRU.Doc_Toan_Bo_File(file, (curDataTV) => {
            let curXmlTV = new DOMParser().parseFromString(curDataTV, "text/xml").documentElement;
            curXmlTV.setAttribute("Don_gia_Nhap", arr_donGiaNhap);

            let curDataTV_daXuLy = xmlserializer.serializeToString(curXmlTV);
            XU_LY_LUU_TRU.Luu_TV(file, curDataTV_daXuLy, () => {
                funcCallback();
            })
        })
    }
}

var Xu_ly_nghiep_vu = new XU_LY_NGHIEP_VU;
module.exports = Xu_ly_nghiep_vu;