-- tài khoản: 
1. tk/mk: admin/admin
2. tk/mk: giaovien1/123456
2. tk/mk: giaovien2/123456
3. tk/mk: sinhvien1/123456
3. tk/mk: sinhvien2/123456

-- API --
* user:
+ login: http://localhost:3001/auth/login
+ register: http://localhost:3001/auth/register

* theses: 
+ create, getAll: http://localhost:3001/theses

body: {
  thesisName: String,       vd: "phát triển web thương mại điện tử"
  Instructor: String,       vd: "CTI001 - Nguyễn Văn X"
  studentQuantity: Number,  vd: "3"
  require: String,          vd: "Biết lập trình web, có kiến thức cả front-end và back-end"
}

+ getById, delete: http://localhost:3001/theses/${id}
+ update: 1. http://localhost:3001/theses/tc/${id}    -> dùng cho giáo viên sửa thông tin khóa luận 
          2. http://localhost:3001/theses/st/${id}    -> dùng cho sinh viên khi đăng ký khóa luận. chuyển đổi trạng thái đăng ký/hủy đăng ký.