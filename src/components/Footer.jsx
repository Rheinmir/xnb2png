import React from "react";
import { AlertCircle, Bug } from "lucide-react";

/**
 * Footer with modding tips and troubleshooting info
 */
const Footer = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3">
        <AlertCircle className="text-blue-400 shrink-0" size={18} />
        <p className="text-[10px] text-slate-400 leading-relaxed">
          <strong className="text-blue-300 block mb-1 uppercase tracking-wider">
            Thông tin Modding:
          </strong>
          Ứng dụng này tự động áp dụng <strong>Premultiplied Alpha</strong>. Nếu
          mod của bạn hiển thị viền đen lạ trong game khi dùng các công cụ khác,
          công cụ này sẽ tự động sửa lỗi đó cho bạn.
        </p>
      </div>
      <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex gap-3">
        <Bug className="text-amber-400 shrink-0" size={18} />
        <p className="text-[10px] text-slate-400 leading-relaxed">
          <strong className="text-amber-300 block mb-1 uppercase tracking-wider">
            Mẹo xử lý lỗi:
          </strong>
          Nếu trình duyệt bị treo khi nạp thư mục lớn (&gt;500 ảnh), hãy thử nạp
          từng thư mục con nhỏ hơn. Trình duyệt có giới hạn về bộ nhớ đệm cho
          tệp tin lớn.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
