var File = require("fs");
var DOMParser = require('xmldom').DOMParser;
var lineReader = require('readline');

var duong_dan_thu_muc_du_lieu = "./3-Du_lieu_Luu_tru";
var duong_dan_du_lieu_cua_hang = duong_dan_thu_muc_du_lieu + "/Cua_hang/Cua_hang.xml";
var duong_dan_du_lieu_mat_hang = duong_dan_thu_muc_du_lieu + "/Tivi";
var duong_dan_thu_muc_Media = "./Media";

class XU_LY_LUU_TRU {

    Doc_cua_hang(funcCallback) {
        File.readFile(duong_dan_du_lieu_cua_hang, "utf-8", (err, data) => {
            if (err) throw err;
            funcCallback(data);
        });
    }

    Doc_danh_sach_File_TV(funcCallback) {
        let chuoiDanhSachTv = "";
        File.readdir(duong_dan_du_lieu_mat_hang, "utf-8", (err, items) => {
            if (err) throw err;
            funcCallback(items);
        });
    }


    Doc_TV(item, funcCallback) {
        let path = duong_dan_du_lieu_mat_hang + '/' + item;

        let fileReader = lineReader.createInterface({
            input: File.createReadStream(path)
        });

        let i = 0,
            lineTV = "",
            stop = false;
        fileReader.on('line', (line) => {
            if (!stop) {
                if (i >= 2) {
                    lineTV += "</Tivi>";
                    funcCallback(lineTV);
                    stop = true;
                } else {
                    lineTV += line;
                    i++;
                }
            }
        })
    }

    Doc_Toan_Bo_File(item, funcCallback) {
        let path = duong_dan_du_lieu_mat_hang + '/' + item;
        File.readFile(path, "utf-8", (err, data) => {
            if (err) throw err;
            funcCallback(data);
        });
    }

    Doc_media(ten_media, funcCallback) {
        var duong_dan_media = duong_dan_thu_muc_Media + "/" + ten_media;
        File.readFile(duong_dan_media, (err, data) => {
            if (err) throw err;
            funcCallback(data);
        });
    }

    Luu_TV(file, curDataTV_daXuLy, funcCallback) {
        let path = duong_dan_du_lieu_mat_hang + '/' + file;
        File.writeFile(path, curDataTV_daXuLy, "utf-8", (err, data) => {
            if (err) throw err;
            funcCallback();
        });
    }

}

var Xu_ly_luu_tru = new XU_LY_LUU_TRU;
module.exports = Xu_ly_luu_tru;