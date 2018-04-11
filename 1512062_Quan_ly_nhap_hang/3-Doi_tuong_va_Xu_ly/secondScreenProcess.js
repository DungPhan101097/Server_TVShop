//*************** Biến dùng chung  ************
var CUA_SO_THONG_BAO = document.getElementById("CUA_SO_THONG_BAO");
var CUA_SO_KET_QUA = document.getElementById("CUA_SO_KET_QUA");
var Ten_cua_hang = document.getElementById("Ten_Cua_Hang");
var Th_Chuc_nang_Tra_cuu = document.getElementById("Th_Chuc_nang_Tra_cuu");

var Du_lieu_cua_hang, nowDate, Danh_sach_Nhom_Tivi, Danh_sach_Tivi;

//*************** Biến Cố Khởi động  ************
document.body.onload = () => {

    Doc_du_lieu('Doc_cua_hang', (xmlDoc) => {
        if (xmlDoc) {
            Du_lieu_cua_hang = xmlDoc.childNodes[0];
            Ten_cua_hang.innerHTML = Du_lieu_cua_hang.getAttribute("Ten");

            let LOGO_CUA_HANG = document.getElementById("Logo_cua_hang");
            LOGO_CUA_HANG.src = `${Dia_chi_Media}/${Du_lieu_cua_hang.getAttribute('Ma_so')}.png`;
        }
    });

    Doc_du_lieu('Doc_du_lieu', (xmlDoc) => {
        if (xmlDoc) {
            let Du_lieu_danh_sach_TV = xmlDoc.childNodes[0];
            // Tao the hien danh sach mat hang.
            let ds_Tv_hmtlColl = Du_lieu_danh_sach_TV.getElementsByTagName("Tivi");
            Danh_sach_Tivi = Chuyen_doi_HTMLCollection_Ve_Mang(ds_Tv_hmtlColl);
        }
    });

    Loc_nhom_TV((xmlDoc) => {
        if (xmlDoc) {
            Danh_sach_Nhom_Tivi = xmlDoc.childNodes[0];
            // Tao the hien danh sach mat hang.
            var ds_nhom_TV_htmlColl = xmlDoc.getElementsByTagName("Nhom_Tivi");
            var arr_ds_nhom_TV = Chuyen_doi_HTMLCollection_Ve_Mang(ds_nhom_TV_htmlColl);
            // Tao the hien danh sach mat hang.
            var Th_danh_sach_Nhom_TV = Tao_Th_Danh_sach_Nhom_Mat_hang(arr_ds_nhom_TV);
            CUA_SO_KET_QUA.appendChild(Th_danh_sach_Nhom_TV);

            // Thong bao.
            var now = new Date();
            nowDate = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
            CUA_SO_THONG_BAO.innerHTML = `<div class='alert alert-info noti-head'>
          Xin chào bạn đến với <b>${Du_lieu_cua_hang.getAttribute("Ten")}</b>
          <br/>Hôm nay là ngày <b>${nowDate}</b>. <br/>
          Hiện tại chúng ta có: <b>${arr_ds_nhom_TV.length} nhóm Tivi</b>.
          </div>`
        }
    });

}

//*************** Biến Cố Bấm vào logo PET  ************
var home = document.getElementById("home");
home.onclick = () => {
    window.location = "./MH_Chinh.html";
}

//*************** Biến Cố Yêu cầu Tra cứu  ************
var Th_Chuoi_Tra_cuu = document.createElement("input")
Th_Chuoi_Tra_cuu.placeholder = "Tìm kiếm...";
Th_Chuc_nang_Tra_cuu.appendChild(Th_Chuoi_Tra_cuu)
Th_Chuoi_Tra_cuu.onkeyup = () => {
    Tim_Kiem_Nhom_Mat_Hang_Theo_Tu_Khoa(Th_Chuoi_Tra_cuu.value, (ds_tra_cuu_xmlDOM) => {
        var ds_tra_cuu_htmlColl = ds_tra_cuu_xmlDOM.getElementsByTagName("Nhom_Tivi");
        var Danh_sach_Mat_hang_Tra_Cuu = Chuyen_doi_HTMLCollection_Ve_Mang(ds_tra_cuu_htmlColl);

        // Xuất
        var Th_Danh_sach_Tra_cuu = Tao_Th_Danh_sach_Nhom_Mat_hang(Danh_sach_Mat_hang_Tra_Cuu);

        CUA_SO_KET_QUA.innerHTML = "";
        CUA_SO_KET_QUA.appendChild(Th_Danh_sach_Tra_cuu)

        if (Danh_sach_Mat_hang_Tra_Cuu.length > 0) {
            CUA_SO_THONG_BAO.innerHTML = `<div class='alert alert-info noti-head'>
          Xin chào bạn đến với <b>${Du_lieu_cua_hang.getAttribute("Ten")}</b>
          <br/>Hôm nay là ngày <b>${nowDate}</b>. <br/>
          Kết quả tra cứu có tổng <b>${Danh_sach_Mat_hang_Tra_Cuu.length} nhóm Tivi</b>.
          </div>`

        } else {
            CUA_SO_THONG_BAO.innerHTML = `<div class='alert alert-info'>
                Nhóm mặt hàng bạn yêu cầu không tồn tại, xin vui lòng thử lại!
            </div>`
        }
    });
}