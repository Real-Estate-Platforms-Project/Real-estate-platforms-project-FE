import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik} from "formik";
import * as realEstateService from "../../services/RealEstate";
import * as addressService from "../../services/AddressService";
import * as sellerService from "../../services/Seller";
import Helper from "../../utils/Helper";
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import FormField from '../../component/FormField';
import ImagePreview from '../../component/ImagePreview';
import { toast } from "react-toastify";
import Select from "react-select";

// Validation schema
const validationSchema = Yup.object({
    demandType: Yup.string().required("Cần nhập thông tin này"),
    type: Yup.string().required("Cần nhập thông tin này"),
    address: Yup.string().required("Cần nhập thông tin này"),
    location: Yup.string().required("Cần nhập thông tin này"),
    direction: Yup.string().required("Cần nhập thông tin này"),
    area: Yup.number().required("Cần nhập thông tin này").min(0, "Diện tích không được nhỏ hơn 0"),
    price: Yup.number().required("Cần nhập thông tin này").min(0, "Giá không được nhỏ hơn 0"),
    status: Yup.string().required("Cần nhập thông tin này"),
    provinceCode: Yup.string().required("Cần nhập thông tin này"),
    districtCode: Yup.string().required("Cần nhập thông tin này"),
    wardCode: Yup.string().required("Cần nhập thông tin này"),
    images: Yup.mixed().required("Cần chọn ít nhất một ảnh").test(
        "fileSize",
        "Kích thước ảnh quá lớn",
        value => !value || Array.from(value).every(file => file.size <= 5 * 1024 * 1024) // 5MB limit
    ).test(
        "fileType",
        "Chỉ chấp nhận các định dạng ảnh (.jpg, .jpeg, .png)",
        value => !value || Array.from(value).every(file => ["image/jpeg", "image/png"].includes(file.type))
    ),
});

const CreateRealEstate = () => {
    const { sellerId } = useParams();
    const [sellerCode, setSellerCode] = useState("");
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState(null);
    const [selectedDemandType, setSelectedDemandType] = useState("Bán");
    const [imagePreviews, setImagePreviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const seller = await sellerService.getSellerById(sellerId);
                setSellerCode(seller.code);
            } catch (error) {
                toast.error("Không thể tải thông tin khách hàng.");
            }
        };

        if (sellerId) {
            fetchSeller();
        }
    }, [sellerId]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await addressService.getAllProvinces();
                setProvince(provinceData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!selectedProvinceCode) return;

        const fetchDistricts = async () => {
            try {
                const districtData = await addressService.getAllDistricts(selectedProvinceCode);
                setDistrict(districtData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchDistricts();
    }, [selectedProvinceCode]);

    useEffect(() => {
        if (!selectedDistrictCode) return;

        const fetchWards = async () => {
            try {
                const wardData = await addressService.getAllWards(selectedDistrictCode);
                setWard(wardData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu.");
            }
        };
        fetchWards();
    }, [selectedDistrictCode]);

    const handleDemandTypeChange = (type) => setSelectedDemandType(type);

    const handleImageChange = (event) => {
        const files = event.currentTarget.files;
        const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setImagePreviews(imageUrls);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Upload images
            const imageUrls = [];
            if (values.images) {
                const uploadPromises = Array.from(values.images).map(async (file) => {
                    const storageRef = ref(storage, `images/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    imageUrls.push(url);
                });
                await Promise.all(uploadPromises);
            }

            // Save real estate info along with image URLs
            const realEstateData = { ...values, images: imageUrls };
            const response = await realEstateService.saveRealEstate(realEstateData);

            if (response) {
                toast.success("Thêm mới thành công");
                resetForm();
                setImagePreviews([]);
                navigate("/");
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
                demandType: "Bán",
                type: "Nhà ở",
                address: "",
                location: "",
                direction: "",
                area: "",
                price: "",
                status: "",
                provinceCode: "",
                districtCode: "",
                wardCode: "",
                note: "",
                images: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit} className="form-create-real-estate py-4">
                    <div className="shadow m-auto w-50 rounded p-4 bg-white">
                        <h4 className="fw-bold">Thông tin cơ bản</h4>
                        <div className="text-center mt-4">
                            <button
                                type="button"
                                className={`btn btn-sm w-50 fw-bold sale ${selectedDemandType === "Bán" ? "btn-dark" : "btn-outline-dark"}`}
                                onClick={() => {
                                    formik.setFieldValue("demandType", "Bán");
                                    handleDemandTypeChange("Bán");
                                }}
                            >
                                Bán
                            </button>
                            <button
                                type="button"
                                className={`btn btn-sm w-50 fw-bold lease ${selectedDemandType === "Cho thuê" ? "btn-dark" : "btn-outline-dark"}`}
                                onClick={() => {
                                    formik.setFieldValue("demandType", "Cho thuê");
                                    handleDemandTypeChange("Cho thuê");
                                }}
                            >
                                Cho thuê
                            </button>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="customerCode" className="form-label">Mã khách hàng</label>
                            <Field type="text" className="form-control" id="customerCode" value={sellerCode || ''}
                                   disabled/>
                        </div>
                        <div className="mt-4 d-flex">
                            <label className="form-label me-3 m-0">Loại bất động sản: </label>
                            <div role="group" className="d-flex">
                                <div className="form-check me-5 my-0">
                                    <Field type="radio" name="type" value="Nhà ở" id="typeHouse"
                                           className="form-check-input"/>
                                    <label htmlFor="typeHouse" className="form-check-label">Nhà ở</label>
                                </div>
                                <div className="form-check my-0">
                                    <Field type="radio" name="type" value="Đất" id="typeLand"
                                           className="form-check-input"/>
                                    <label htmlFor="typeLand" className="form-check-label">Đất</label>
                                </div>
                            </div>
                            <ErrorMessage name="type" component="div" className="text-danger"/>
                        </div>
                        <div className="row">
                            <FormField
                                label="Tỉnh/Thành phố"
                                name="provinceCode"
                                options={Helper.createOptions(province, 'code', 'name')}
                                onChange={option => {
                                    formik.setFieldValue("provinceCode", option?.value || "");
                                    setSelectedProvinceCode(option?.value || null);
                                }}
                                value={formik.values.provinceCode}
                                placeholder="Chọn"
                            />
                            <FormField
                                label="Quận/Huyện"
                                name="districtCode"
                                options={Helper.createOptions(district, 'code', 'name')}
                                onChange={option => {
                                    formik.setFieldValue("districtCode", option?.value || "");
                                    setSelectedDistrictCode(option?.value || null);
                                }}
                                value={formik.values.districtCode}
                                placeholder="Chọn"
                            />
                        </div>
                        <div className="row">
                            <FormField
                                label="Phường/Xã"
                                name="wardCode"
                                options={Helper.createOptions(ward, 'code', 'name')}
                                onChange={option => formik.setFieldValue("wardCode", option?.value || "")}
                                value={formik.values.wardCode}
                                placeholder="Chọn"
                            />
                            <FormField
                                label="Số nhà/Đường/Ấp/Khu"
                                name="address"
                                type="text"
                                placeholder="VD: 12/5 Núi Thành"
                            />
                        </div>
                        <div className="row">
                            <FormField
                                label="Vị trí"
                                name="location"
                                options={[
                                    {value: "Trung tâm", label: "Trung tâm"},
                                    {value: "Ngoại ô", label: "Ngoại ô"},
                                    {value: "Nông thôn", label: "Nông thôn"},
                                ]}
                                placeholder="Chọn"
                            />
                            <FormField
                                label="Hướng"
                                name="direction"
                                options={[
                                    {value: "Hướng Bắc", label: "Hướng Bắc"},
                                    {value: "Hướng Nam", label: "Hướng Nam"},
                                    {value: "Hướng Đông", label: "Hướng Đông"},
                                    {value: "Hướng Tây", label: "Hướng Tây"},
                                    {value: "Hướng Đông Bắc", label: "Hướng Đông Bắc"},
                                    {value: "Hướng Đông Nam", label: "Hướng Đông Nam"},
                                    {value: "Hướng Tây Bắc", label: "Hướng Tây Bắc"},
                                    {value: "Hướng Tây Nam", label: "Hướng Tây Nam"},
                                ]}
                                placeholder="Chọn"
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="area" className="form-label">Diện tích <span
                                className="text-danger">*</span></label>
                            <Field type="number" name="area" id="area" className="form-control"
                                   placeholder="VD: 100 m2"/>
                            <ErrorMessage name="area" component="div" className="text-danger"/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="price" className="form-label">Giá kì vọng <span
                                className="text-danger">*</span></label>
                            <Field type="number" name="price" id="price" className="form-control"
                                   placeholder="VD: 1.000.000 VNĐ/m2"/>
                            <ErrorMessage name="price" component="div" className="text-danger"/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="status" className="form-label">Tình Trạng <span
                                className="text-danger">*</span></label>
                            <Select
                                id="status"
                                options={[
                                    {value: "Có sẵn", label: "Có sẵn"},
                                    {value: "Đang cải tạo", label: "Đang cải tạo"},
                                    {value: "Đã qua sử dụng", label: "Đã qua sử dụng"},
                                    {value: "Mới xây", label: "Mới xây"},
                                ]}
                                onChange={option => formik.setFieldValue("status", option?.value || "")}
                                value={formik.values.status ? {
                                    value: formik.values.status,
                                    label: formik.values.status
                                } : null}
                                placeholder="Chọn"
                            />
                            <ErrorMessage name="status" component="div" className="text-danger"/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="images" className="form-label">Ảnh <span
                                className="text-danger">*</span></label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                className="form-control"
                                accept="image/jpeg, image/png"
                                multiple
                                onChange={(event) => {
                                    formik.setFieldValue("images", event.currentTarget.files);
                                    handleImageChange(event);
                                }}
                            />
                            <ErrorMessage name="images" component="div" className="text-danger"/>
                            <ImagePreview imagePreviews={imagePreviews}/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="note" className="form-label">Ghi chú thêm</label>
                            <Field as="textarea" name="note" id="note" className="form-control"/>
                        </div>
                        <div className="text-end mt-4">
                            <Link to="/" className="btn btn-secondary me-2 fw-bold">Quay lại</Link>
                            <button type="submit" className="btn button-search text-white fw-bold">Hoàn thành</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default CreateRealEstate;
