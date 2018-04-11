//*************** Biến dùng chung  ************
var CUA_SO_THONG_BAO = document.getElementById("CUA_SO_THONG_BAO");
var CUA_SO_KET_QUA = document.getElementById("CUA_SO_KET_QUA");
var Ten_cua_hang = document.getElementById("Ten_Cua_Hang");
var CONTAINER = document.getElementById("container");

var soMH_con_hang, soMH_het_hang, Danh_sach_Tivi, nowDate, Du_lieu_cua_hang;

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

            let Th_danh_sach_TV = Tao_Th_Danh_sach_Mat_hang(Danh_sach_Tivi);
            CUA_SO_KET_QUA.appendChild(Th_danh_sach_TV);

            // Xuất thông tin cho cửa sổ thông báo.
            let now = new Date();
            nowDate = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
            soMH_con_hang = tinh_so_mat_hang_con_hang(Danh_sach_Tivi);
            soMH_het_hang = Danh_sach_Tivi.length - soMH_con_hang;

            CUA_SO_THONG_BAO.innerHTML = `<div class='alert alert-info noti-head'>
              Xin chào bạn đến với <b>${Du_lieu_cua_hang.getAttribute("Ten")}</b>
              <br/>Hôm nay là ngày <b>${nowDate}</b>. <br/>
              Chúng ta có: <b>${soMH_con_hang} mặt hàng còn hàng</b> và có: <b>${soMH_het_hang} 
                mặt hàng hết hàng</b>
              </div>`
        }
    });
}

//*************** Biến Cố Bấm vào logo PET  ************
var home = document.getElementById("home");
home.onclick = () => {
    window.location = "./MH_Chinh.html";
}
var updateButton = document.createElement("div");
updateButton.id = "update-button";
updateButton.className = "update-btn";
updateButton.style.cssText = "display:none;";
updateButton.innerHTML = ` <a href="#" class="btn btn-info btn-lg override-fa">
    <span class="fa fa-check"></span> Cập nhật Đơn giá nhập
 </a>`
CONTAINER.appendChild(updateButton);

updateButton.onclick = () => {
    let i = 0;
    arr_input_price_buffer.forEach(price => {
        if (!isNaN(price)) {
            arr_price[i] = price;
            i++;
        }
    })
    i = 0;
    arr_MaTV_buffer.forEach(maTV => {
        if (maTV != "") {
            arr_MaTV[i] = maTV;
            i++;
        }
    })

    Cap_nhap_DB(arr_MaTV, arr_price, (dsTV_cap_nhat_XmlDoc) => {
        if (dsTV_cap_nhat_XmlDoc) {
            // Tao the hien danh sach mat hang.
            let ds_Tv_hmtlColl = dsTV_cap_nhat_XmlDoc.getElementsByTagName("Tivi");
            let Danh_sach_Tivi_cap_nhat = Chuyen_doi_HTMLCollection_Ve_Mang(ds_Tv_hmtlColl);

            let Th_danh_sach_TV = Tao_Th_Danh_sach_Mat_hang(Danh_sach_Tivi_cap_nhat);
            CUA_SO_KET_QUA.innerHTML = "";
            CUA_SO_KET_QUA.appendChild(Th_danh_sach_TV);
        }
    })
}

//*************** Biến Cố Yêu cầu Tra cứu  ************
var Th_Chuoi_Tra_cuu = document.getElementById("txt_search");
Th_Chuoi_Tra_cuu.onkeyup = () => {
    Tim_Kiem_Mat_Hang_Theo_Tu_Khoa(Th_Chuoi_Tra_cuu.value, (ds_tra_cuu_xmlDOM) => {
        let ds_tra_cuu_htmlColl = ds_tra_cuu_xmlDOM.getElementsByTagName("Tivi");
        let Danh_sach_Mat_hang_Tra_Cuu = Chuyen_doi_HTMLCollection_Ve_Mang(ds_tra_cuu_htmlColl);

        // Xuất
        let Th_Danh_sach_Tra_cuu = Tao_Th_Danh_sach_Mat_hang(Danh_sach_Mat_hang_Tra_Cuu);
        CUA_SO_KET_QUA.innerHTML = "";
        CUA_SO_KET_QUA.appendChild(Th_Danh_sach_Tra_cuu)

        if (Danh_sach_Mat_hang_Tra_Cuu.length > 0) {
            soMH_con_hang = tinh_so_mat_hang_con_hang(Danh_sach_Mat_hang_Tra_Cuu);
            soMH_het_hang = Danh_sach_Mat_hang_Tra_Cuu.length - soMH_con_hang;

            CUA_SO_THONG_BAO.innerHTML = `<div class='alert alert-info noti-head'>
              Xin chào bạn đến với <b>${Du_lieu_cua_hang.getAttribute("Ten")}</b>
              <br/>Hôm nay là ngày <b>${nowDate}</b>. <br/>
              Kết quả tra cứu có tổng <b>${Danh_sach_Mat_hang_Tra_Cuu.length} mặt hàng</b>, trong đó: <b>${soMH_con_hang} mặt hàng còn hàng và ${soMH_het_hang} 
                mặt hàng hết hàng</b>.
              </div>`

        } else {
            CUA_SO_THONG_BAO.innerHTML = `<div class='alert alert-info'>
              Mặt hàng bạn yêu cầu không tồn tại, xin vui lòng thử lại!
              </div>`
        }
    });

}