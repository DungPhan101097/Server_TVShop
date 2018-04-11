var NodeJS_dich_vu = require("http");
var Xu_ly_luu_tru = require("../2-Doi_tuong_va_Xu_ly/XU_LY_LUU_TRU.js");
var Xu_ly_nghiep_vu = require("../2-Doi_tuong_va_Xu_ly/XU_LY_NGHIEP_VU.js");

var Port = 1050;
var Xu_ly_tham_so = require("querystring");

// Cache lai do dung chung.
var Cua_hang = null;
var Danh_sach_TV = [],
    Danh_sach_nhom_TV = [];

function sendRes(res, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(data)
}

NodeJS_dich_vu.createServer(function(req, res) {
    var chuoi_request = "";
    var dia_chi_xu_ly = req.url.replace("/", "");

    var chuoi_gui_len = "";
    req.on('data', (chunk) => {
        chuoi_gui_len += chunk;
    })
    req.on('end', () => {
        if (dia_chi_xu_ly.startsWith("Media")) {
            var ten_hinh = dia_chi_xu_ly.replace("Media/", "");
            Xu_ly_luu_tru.Doc_media(ten_hinh, (hinh) => {
                res.writeHeader(200, { 'Content-Type': 'image/png' });
                res.end(hinh, "binary");
            });

        } else {
            var chuoi_kq = "";
            var che_do_xu_ly;

            if (dia_chi_xu_ly.indexOf("=") != dia_chi_xu_ly.lastIndexOf("=")) {
                che_do_xu_ly = dia_chi_xu_ly.substring(dia_chi_xu_ly.indexOf("=") + 1,
                    dia_chi_xu_ly.indexOf("&"));
            } else {
                che_do_xu_ly = dia_chi_xu_ly.substring(dia_chi_xu_ly.indexOf("=") + 1);
            }

            let thamSoKemTheo = dia_chi_xu_ly.substring(dia_chi_xu_ly.lastIndexOf("=") + 1);

            switch (che_do_xu_ly) {
                case "Doc_cua_hang":
                    if (Cua_hang == null) {

                        Xu_ly_luu_tru.Doc_cua_hang((data) => {
                            Cua_hang = Xu_ly_nghiep_vu.TaoDoiTuongCuaHang(data, Danh_sach_TV);
                            let chuoi_cua_hang = Cua_hang.toXML();
                            sendRes(res, chuoi_cua_hang);
                        });

                    } else {
                        let chuoi_cua_hang = Cua_hang.toXML();
                        sendRes(res, chuoi_cua_hang);
                    }
                    break;

                case "Doc_du_lieu":
                    if (Danh_sach_TV.length == 0) {

                        Xu_ly_luu_tru.Doc_danh_sach_File_TV((listFileTV) => {
                            Xu_ly_nghiep_vu.DocDanhSachTivi(listFileTV, (listObjTV) => {
                                Danh_sach_TV = listObjTV;
                                let chuoiXML_ds_TV = Xu_ly_nghiep_vu.ChuyenMangTiviVeChuoiXMl(listObjTV);
                                sendRes(res, chuoiXML_ds_TV);
                            });
                        })

                    } else {
                        let chuoiXML_ds_TV = Xu_ly_nghiep_vu.ChuyenMangTiviVeChuoiXMl(Danh_sach_TV);
                        sendRes(res, chuoiXML_ds_TV);
                    }
                    break;

                case "Tim_kiem_TV":
                    let chuoi_tra_cuu_tivi = Xu_ly_nghiep_vu.Tim_Kiem_Mat_Hang_Theo_Tu_Khoa(thamSoKemTheo, Danh_sach_TV);
                    sendRes(res, chuoi_tra_cuu_tivi);
                    break;

                case "Tim_kiem_nhom_TV":
                    let chuoi_tra_cuu_nhomTV = Xu_ly_nghiep_vu.Tim_Kiem_Nhom_Mat_Hang_Theo_Tu_Khoa(thamSoKemTheo, Danh_sach_nhom_TV);
                    sendRes(res, chuoi_tra_cuu_nhomTV);
                    break;

                case "Loc_nhom_TV":
                    if (Danh_sach_nhom_TV.length == 0) {
                        Danh_sach_nhom_TV = Xu_ly_nghiep_vu.loc_nhom_TV(Danh_sach_TV);
                    }
                    let chuoi_kq = Xu_ly_nghiep_vu.ChuyenMangNhomTiviVeChuoiXMl(Danh_sach_nhom_TV);
                    sendRes(res, chuoi_kq);

                    break;

                case "Cap_nhat_don_gia_TV":
                    let thamSoBody = Xu_ly_tham_so.parse(chuoi_gui_len);
                    let arr_msTV = thamSoBody.Ma_so_Tivi;
                    let arr_donGiaNhap = thamSoBody.Don_gia_Nhap;

                    Xu_ly_nghiep_vu.CapNhatDonGiaNhapCuaDanhSachTivi(Danh_sach_TV, arr_msTV,
                        arr_donGiaNhap, () => {
                            let arr_msTV_2 = [];
                            if (arr_msTV.constructor !== Array) {
                                arr_msTV_2[0] = arr_msTV + ".xml";
                            } else {
                                arr_msTV_2 = arr_msTV;
                                for (let i = 0; i < arr_msTV_2.length; i++) {
                                    arr_msTV_2[i] = arr_msTV_2[i] + ".xml";
                                }
                            }

                            Xu_ly_nghiep_vu.DocDanhSachTivi(arr_msTV_2, (listObjTV) => {
                                let chuoiXML_ds_TV = Xu_ly_nghiep_vu.ChuyenMangTiviVeChuoiXMl(listObjTV);
                                sendRes(res, chuoiXML_ds_TV);
                            });
                        });
                    break;

            }
        }
    });

}).listen(Port, () => {
    console.log("Server is listening on port 1050");
})