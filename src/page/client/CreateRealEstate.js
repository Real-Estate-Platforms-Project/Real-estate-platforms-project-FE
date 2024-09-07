import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as realEstateService from '../../services/RealEstate';
import * as addressService from '../../services/AddressService';
import * as sellerService from '../../services/Seller';
import RealEstateForm from '../../component/client/RealEstateForm';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);
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
                setProvinceOptions(provinceData);
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
                setDistrictOptions(districtData);
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
                setWardOptions(wardData);
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
                <RealEstateForm
                    formik={formik}
                    provinceOptions={provinceOptions}
                    districtOptions={districtOptions}
                    wardOptions={wardOptions}
                    imagePreviews={imagePreviews}
                    handleImageChange={handleImageChange}
                    handleDemandTypeChange={handleDemandTypeChange}
                    selectedDemandType={selectedDemandType}
                />
            )}
        </Formik>
    );
}

export default CreateRealEstate;
