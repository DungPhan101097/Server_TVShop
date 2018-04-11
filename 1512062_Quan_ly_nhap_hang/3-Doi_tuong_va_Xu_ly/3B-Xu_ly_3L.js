var port = 1050;
var Dia_chi_Dich_vu = "http://localhost:" + port;
var Dia_chi_Media = `${Dia_chi_Dich_vu}/Media`;
var maSoXuLy = "Ma_so_xu_ly=";
var arr_MaTV = [],
    arr_price = [];
var arr_input_price_buffer = [],
    arr_MaTV_buffer = [];
var counter = 0;



//************ Xử lý Thể hiện ***************
function Tao_Th_Danh_sach_Mat_hang(Danh_sach_Mat_hang) {
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row list-item";

    for (let i = 0; i < Danh_sach_Mat_hang.length; i++) {
        let Mat_hang = Danh_sach_Mat_hang[i];
        var Th_Hinh = document.createElement("img");
        Th_Hinh.src = `${Dia_chi_Media}/${Mat_hang.getAttribute('Ma_so')}.png`;
        Th_Hinh.className = "center";
        var ten_mat_hang = Mat_hang.getAttribute("Ten");
        var don_gia_nhap = parseInt(Mat_hang.getAttribute("Don_gia_Nhap"));
        var so_luong_ton = Mat_hang.getAttribute("So_luong_Ton");
        if (so_luong_ton == "") {
            so_luong_ton = 0;
        }

        var Th_Thong_tin = document.createElement("div")
        Th_Thong_tin.style.cssText = `text-align:left`
        Th_Thong_tin.innerHTML = '<div class="item">' +
            '<p class="item-p name">' + ten_mat_hang + '</p>' +
            '<p class="item-p price">' + "Đơn giá nhập: " + don_gia_nhap.toLocaleString("vi") + ' đ' + '</p>' +
            '<p class="item-p price">' + "Số lượng tồn: " + so_luong_ton + '</p>' +
            '</div>';

        let Th_Cap_Nhat_Gia_Nhap = document.createElement("div");
        Th_Cap_Nhat_Gia_Nhap.className = "form-group update-price"
        Th_Cap_Nhat_Gia_Nhap.innerHTML = `
                <label class="label-new-price">Đơn giá mới</label>
                <input type="number"  onblur="checkNumber(${i})" onkeypress="checkDigit(event)" class="form-control new-price" name="input-price">
            `

        var Th_Mat_hang = document.createElement("div")
        Th_Mat_hang.className = `item item_Pet shadow`
        Th_Mat_hang.appendChild(Th_Hinh)
        Th_Mat_hang.appendChild(Th_Thong_tin)
        Th_Mat_hang.appendChild(Th_Cap_Nhat_Gia_Nhap);
        Th_Danh_sach.appendChild(Th_Mat_hang)
    }

    return Th_Danh_sach;
}


function Tao_Th_Danh_sach_Nhom_Mat_hang(Danh_sach_Nhom_Tivi) {
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row list-item";

    Danh_sach_Nhom_Tivi.forEach(nhomTV => {
        var ten_mat_hang = nhomTV.getAttribute("Ten");
        var so_luong_ton = nhomTV.getAttribute("So_luong_Ton");

        var Th_Thong_tin = document.createElement("div")
        Th_Thong_tin.style.cssText = `text-align:left`
        Th_Thong_tin.innerHTML = '<div class="item">' +
            '<p class="item-p name-group">' + ten_mat_hang + '</p>' +
            '<p class="item-p price">' + "Số lượng tồn: " + so_luong_ton + '</p>' +
            '</div>';

        var Th_Mat_hang = document.createElement("div")
        Th_Mat_hang.className = `item item_Pet shadow group_Pet`
        Th_Mat_hang.appendChild(Th_Thong_tin)

        Th_Danh_sach.appendChild(Th_Mat_hang)
    });
    return Th_Danh_sach;
}


//************ Xử lý Nghiệp vụ ***************

function setVisibilityUpdateButton(visibility) {
    let updateButton = document.getElementById("update-button");
    if (visibility) {
        updateButton.style.cssText = "";
    } else {
        updateButton.style.cssText = "display:none;";
    }
}


function checkDigit(event) {
    let keycode = event.which || event.keyCode;
    if (!(keycode >= 48 && keycode <= 57)) {
        event.returnValue = false;
    }
}


function checkNumber(index) {
    let listInput = document.getElementsByName("input-price");
    let selectedInput = listInput[index];
    let valueSelected = selectedInput.value;
    if (valueSelected != "") {
        arr_input_price_buffer[index] = parseInt(valueSelected);
        arr_MaTV_buffer[index] = Danh_sach_Tivi[index].getAttribute('Ma_so');
        this.setVisibilityUpdateButton(true);
        counter++;
    } else {
        arr_input_price_buffer[index] = "";
        arr_MaTV_buffer[index] = "";
        if (counter <= 1) {
            // khong hien.
            this.setVisibilityUpdateButton(false);
        } else {
            counter--;
        }
    }
}

function Tim_Kiem_Mat_Hang_Theo_Tu_Khoa(chuoiTraCuu, funcCallback) {
    let tham_so = maSoXuLy + "Tim_kiem_TV" + "&chuoi_tra_cuu=" + chuoiTraCuu;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        funcCallback(xhttp.responseXML);
    }
    xhttp.open("GET", `${Dia_chi_Dich_vu}/?${tham_so}`, true);
    xhttp.send();
}

function Tim_Kiem_Nhom_Mat_Hang_Theo_Tu_Khoa(chuoiTraCuu, funcCallback) {
    var tham_so = maSoXuLy + "Tim_kiem_nhom_TV" + "&chuoi_tra_cuu=" + chuoiTraCuu;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        funcCallback(xhttp.responseXML);
    }
    xhttp.open("GET", `${Dia_chi_Dich_vu}/?${tham_so}`, true);
    xhttp.send();
}

function Loc_nhom_TV(funcCallback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        funcCallback(xhttp.responseXML);
    }
    xhttp.open("GET", `${Dia_chi_Dich_vu}/?${maSoXuLy}Loc_nhom_TV`, true);
    xhttp.send();
}

function Chuyen_doi_HTMLCollection_Ve_Mang(htmlCollection) {
    Danh_sach_Mat_hang = Array.prototype.slice.call(htmlCollection);
    return Danh_sach_Mat_hang;
}

function tinh_so_mat_hang_con_hang(dsTV) {
    var soMH_con_hang = 0;

    dsTV.forEach(matHang => {
        var trang_thai_con_hang = matHang.getAttribute("Trang_thai_Con_hang");
        if (trang_thai_con_hang != null && trang_thai_con_hang != "false") {
            soMH_con_hang++;

        }
    });
    return soMH_con_hang;
}


//************ Xử lý Lưu trữ ***************
function Doc_du_lieu(che_do_doc, funcCallback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        funcCallback(xhttp.responseXML);
    }
    xhttp.open("GET", `${Dia_chi_Dich_vu}/?${maSoXuLy}${che_do_doc}`, true);
    xhttp.send();
}

function Cap_nhap_DB(arr_MaTV, arr_price, funcCallback) {
    let params = "";
    for (let i = 0; i < arr_MaTV.length - 1; i++) {
        params += "Ma_so_Tivi=" + arr_MaTV[i] + "&";
        params += "Don_gia_Nhap=" + arr_price[i] + "&";
    }
    params += "Ma_so_Tivi=" + arr_MaTV[arr_MaTV.length - 1] + "&";
    params += "Don_gia_Nhap=" + arr_price[arr_MaTV.length - 1];

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        funcCallback(xhttp.responseXML);
    }
    xhttp.open("POST", `${Dia_chi_Dich_vu}/?${maSoXuLy}Cap_nhat_don_gia_TV`, true);
    xhttp.send(params);
}