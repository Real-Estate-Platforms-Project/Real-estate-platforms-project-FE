import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import * as realEstateService from "../../services/RealEstate";
import * as addressService from "../../services/AddressService";
import * as sellerService from "../../services/Seller";
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from "react-toastify";
import RealEstateForm from "../../component/client/RealEstateForm";

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
    images: Yup.mixed().required("Cần chọn ít nhất 3 ảnh").test(
        "fileSize",
        "Kích thước ảnh quá lớn",
        value => !value || Array.from(value).every(file => file.size <= 5 * 1024 * 1024) // 5MB limit
    ).test(
        "fileType",
        "Chỉ chấp nhận các định dạng ảnh (.jpg, .jpeg, .png)",
        value => !value || Array.from(value).every(file => ["image/jpeg", "image/png"].includes(file.type))
    ).test('fileCount', 'Cần chọn ít nhất 3 ảnh', (value) => {
        return value && value.length >= 3;
    }),
});

const CreateRealEstate = () => {
    const { sellerId } = useParams();
    const [sellerCode, setSellerCode] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredWards, setFilteredWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
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
                setProvinces(provinceData.map(p => ({ value: p.code, label: p.name })));
            } catch (error) {
                console.error("Failed to fetch provinces", error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!selectedProvince) {
            setFilteredDistricts([]);
            setSelectedDistrict(null);
            setFilteredWards([]);
            setSelectedWard(null);
            return;
        }

        const fetchDistricts = async () => {
            try {
                const districtData = await addressService.getAllDistricts(selectedProvince.value);
                setFilteredDistricts(districtData.map(d => ({ value: d.code, label: d.name })));
            } catch (error) {
                console.error("Failed to fetch districts", error);
            }
        };
        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        if (!selectedDistrict) {
            setFilteredWards([]);
            setSelectedWard(null);
            return;
        }

        const fetchWards = async () => {
            try {
                const wardData = await addressService.getAllWards(selectedDistrict.value);
                setFilteredWards(wardData.map(w => ({ value: w.code, label: w.name })));
            } catch (error) {
                console.error("Failed to fetch wards", error);
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedDistrict(null);
        setSelectedWard(null);
    };

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        setSelectedWard(null);
    };

    const handleWardChange = (selectedOption) => {
        setSelectedWard(selectedOption);
    };

    const handleDemandTypeChange = (type) => setSelectedDemandType(type);

    const handleImageChange = (event) => {
        const files = event.currentTarget.files;
        const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
        setImagePreviews(imageUrls);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
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
                    sellerCode={sellerCode}
                    provinces={provinces}
                    filteredDistricts={filteredDistricts}
                    filteredWards={filteredWards}
                    selectedProvince={selectedProvince}
                    selectedDistrict={selectedDistrict}
                    selectedWard={selectedWard}
                    selectedDemandType={selectedDemandType}
                    imagePreviews={imagePreviews}
                    handleProvinceChange={handleProvinceChange}
                    handleDistrictChange={handleDistrictChange}
                    handleWardChange={handleWardChange}
                    handleDemandTypeChange={handleDemandTypeChange}
                    handleImageChange={handleImageChange}
                />
            )}
        </Formik>
    );
};

export default CreateRealEstate;
