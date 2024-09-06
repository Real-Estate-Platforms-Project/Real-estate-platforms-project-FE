import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Field, ErrorMessage} from "formik";
import Select from "react-select";
import * as realEstateService from "../../services/RealEstate";
import * as addressService from "../../services/AddressService";
import {toast} from "react-toastify";
import Helper from "../../utils/Helper";

const validationSchema = Yup.object({
    demandType: Yup.string().required("Cần nhập thông tin này"),
    type: Yup.string().required("Cần nhập thông tin này"),
    address: Yup.string().required("Cần nhập thông tin này"),
    location: Yup.string().required("Cần nhập thông tin này"),
    direction: Yup.string().required("Cần nhập thông tin này"),
    area: Yup.number().required("Cần nhập thông tin này"),
    price: Yup.number().required("Cần nhập thông tin này"),
    status: Yup.string().required("Cần nhập thông tin này"),
    note: Yup.string().required("Cần nhập thông tin này"),
    provinceCode: Yup.string().required("Cần nhập thông tin này"),
    districtCode: Yup.string().required("Cần nhập thông tin này"),
    wardCode: Yup.string().required("Cần nhập thông tin này")
});

function CreateRealEstate() {
    const [province, setProvince] = useState([]);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);
    const [district, setDistrict] = useState([]);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState(null);
    const [ward, setWard] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const provinceData = await addressService.getAllProvinces();
                setProvince(provinceData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        if (selectedProvinceCode === null) {
            return;
        }
        const fetchDistrict = async () => {
            try {
                const districtData = await addressService.getAllDistricts(selectedProvinceCode);
                setDistrict(districtData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchDistrict();
    }, [selectedProvinceCode]);

    useEffect(() => {
        if (selectedDistrictCode === null) {
            return;
        }
        const fetchWard = async () => {
            try {
                const wardData = await addressService.getAllWards(selectedDistrictCode);
                setWard(wardData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchWard();
    }, [selectedDistrictCode]);

    const handleSubmit = async (values) => {
        try {
            const response = await realEstateService.saveRealEstate(values);
            if (response) {
                toast.success("Thêm mới thành công");
                navigate("/products");
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi trong quá trình xử lý.");
        }
    };

    return (
        <Formik
            initialValues={{
                demandType: "",
                type: "",
                address: "",
                location: "",
                direction: "",
                area: 0,
                price: 0,
                status: "",
                note: "",
                provinceCode: "",
                districtCode: "",
                wardCode: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <form className="form-create-real-estate py-4">
                    <div className="shadow m-auto w-50 rounded p-4 bg-white">
                        <h4 className="fw-bold">Thông tin cơ bản</h4>
                        <div className="text-center mt-4">
                            <button className="btn btn-sm btn-outline-dark w-50 fw-bold">Bán</button>
                            <button className="btn btn-sm btn-outline-dark w-50 fw-bold">Cho thuê</button>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="" className="form-label">Mã khách hàng</label>
                            <input type="text" className="form-control" disabled/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="" className="form-label">Loại bất động <span
                                className="text-danger">*</span></label>
                            <input type="text" className="form-select" placeholder="VD: Nhà riêng"/>
                        </div>
                        <div className="mt-3 row">
                            <div className="col-6">
                                <label htmlFor="" className="form-label">Tỉnh, thành phố <span
                                    className="text-danger">*</span></label>
                                <Select
                                    options={Helper.createOptions(province, 'code', 'name')}
                                    onChange={(option) => {
                                        setSelectedProvinceCode(option?.value || null);
                                        formik.setFieldValue("provinceCode", option?.value || "")
                                    }}
                                    value={Helper.createOptions(province, 'code', 'name').find(
                                        (p) => p.value === formik.values.provinceCode
                                    )}
                                    placeholder="Chọn"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="" className="form-label">Quận, huyện <span
                                    className="text-danger">*</span></label>
                                <Select
                                    options={Helper.createOptions(district, 'code', 'name')}
                                    onChange={(option) => {
                                        setSelectedDistrictCode(option?.value || null);
                                        formik.setFieldValue("districtCode", option?.value || "")
                                    }}
                                    value={Helper.createOptions(district, 'code', 'name').find(
                                        (d) => d.value === formik.values.districtCode
                                    )}
                                    placeholder="Chọn"
                                />
                            </div>
                        </div>
                        <div className="mt-3 row">
                            <div className="col-6">
                                <label htmlFor="" className="form-label">Phường, xã <span
                                    className="text-danger">*</span></label>
                                <Select
                                    options={Helper.createOptions(ward, 'code', 'name')}
                                    onChange={(option) =>
                                        formik.setFieldValue("wardCode", option?.value || "")
                                    }
                                    value={Helper.createOptions(ward, 'code', 'name').find(
                                        (w) => w.value === formik.values.wardCode
                                    )}
                                    placeholder="Chọn"
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="" className="form-label">Đường, phố <span
                                    className="text-danger">*</span></label>
                                <input type="text" className="form-select" placeholder="Chọn"/>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="" className="form-label">Địa chỉ hiển thị trên tin đăng <span
                                className="text-danger">*</span></label>
                            <input type="text" className="form-control"
                                   placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ"/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default CreateRealEstate;