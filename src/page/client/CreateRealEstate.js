import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import * as realEstateService from "../../services/RealEstateService";
import * as addressService from "../../services/AddressService";
import * as sellerService from "../../services/Seller";
import {toast} from "react-toastify";
import RealEstateForm from "../../component/client/RealEstateForm";
import {storage} from '../../configs/ConfigFirebase';
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";

// Validation schema
const validationSchema = Yup.object({
    title: Yup.string().required("Cần nhập thông tin này"),
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
    floor: Yup.number().test(
        "is-required-if-nha-o",
        "Cần nhập thông tin này",
        function (value) {
            const {type} = this.parent;
            return type !== "Nhà ở" || (value && value > 0);
        }
    ).min(0, "Tầng không được nhỏ hơn 0"),
    toilet: Yup.number().test(
        "is-required-if-nha-o",
        "Cần nhập thông tin này",
        function (value) {
            const {type} = this.parent;
            return type !== "Nhà ở" || (value && value > 0);
        }
    ).min(0, "Toilet không được nhỏ hơn 0"),
    bedroom: Yup.number().test(
        "is-required-if-nha-o",
        "Cần nhập thông tin này",
        function (value) {
            const {type} = this.parent;
            return type !== "Nhà ở" || (value && value > 0);
        }
    ).min(0, "Phòng ngủ không được nhỏ hơn 0"),
});

const CreateRealEstate = () => {
    const [seller, setSeller] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredWards, setFilteredWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [selectedDemandType, setSelectedDemandType] = useState("Bán");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formattedPrice, setFormattedPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const seller = await sellerService.SellerInfo();
                setSeller(seller);
            } catch (error) {
                toast.error("Không thể tải thông tin khách hàng.");
            }
        };
        fetchSeller();
    }, []);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const provinceData = await addressService.getAllProvinces();
                setProvinces(provinceData.map(p => ({value: p.code, label: p.name})));
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
                setFilteredDistricts(districtData.map(d => ({value: d.code, label: d.name})));
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
                setFilteredWards(wardData.map(w => ({value: w.code, label: w.name})));
            } catch (error) {
                console.error("Failed to fetch wards", error);
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    useEffect(() => {
        return () => {
            uploadedFiles.forEach(fileData => URL.revokeObjectURL(fileData.preview));
        };
    }, [uploadedFiles]);

    const formatNumber = (value) => {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handlePriceChange = (e, formik) => {
        const {value} = e.target;
        const numericValue = value.replace(/\D/g, "");
        const formatted = formatNumber(value);
        setFormattedPrice(formatted);
        formik.setFieldValue("price", numericValue);
    };

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setSelectedDistrict(null);
        setSelectedWard(null);
    };

    const handleUploadFiles = (files) => {
        if (!files || files.length === 0) {
            toast.error("Vui lòng thêm ít nhất một ảnh");
            return;
        }
        const validFiles = Array.from(files).filter(file => {
            if (file.size > 15 * 1024 * 1024) {
                toast.error(`File ${file.name} vượt quá kích thước tối đa 15MB`);
                return false;
            }
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                toast.error(`File ${file.name} không phải là định dạng ảnh hợp lệ`);
                return false;
            }
            return true;
        });
        if (validFiles.length === 0) {
            toast.error("Không có file hợp lệ");
            return;
        }
        const filePreviews = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setUploadedFiles(prevFiles => [...prevFiles, ...filePreviews]); // Giữ lại ảnh cũ và thêm ảnh mới
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            URL.revokeObjectURL(updatedFiles[index].preview); // Hủy URL ảnh xem trước để giải phóng bộ nhớ
            updatedFiles.splice(index, 1); // Xoá ảnh khỏi mảng
            return updatedFiles;
        });
    };

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        setSelectedWard(null);
    };

    const handleWardChange = (selectedOption) => {
        setSelectedWard(selectedOption);
    };

    const handleDemandTypeChange = (type) => setSelectedDemandType(type);

    const handleSubmit = async (values) => {
        const priceNumber = parseFloat(values.price.replace(/\./g, '').replace(',', '.'));
        try {
            // Upload từng file lên Firebase và lấy đường dẫn URL
            const imageUrls = await Promise.all(
                uploadedFiles.map(async (fileData) => {
                    const file = fileData.file; // Lấy file thực tế từ đối tượng fileData
                    const imageRef = storageRef(storage, `real-estate/${file.name}`); // Lưu trong thư mục `real-estate`ge
                    const snapshot = await uploadBytes(imageRef, file);
                    const url = await getDownloadURL(snapshot.ref);
                    return url;
                })
            );
            const response = await realEstateService.saveRealEstate({
                ...values,
                price: priceNumber,
                imageUrls: imageUrls,
                sellerId: seller.id,
            });
            if (response) {
                toast.success("Thêm mới thành công");
                navigate("/");
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            console.error("Lỗi trong quá trình upload hoặc lưu thông tin", error);
            toast.error("Đã xảy ra lỗi trong quá trình xử lý.");
        }
    };


    return (
        <Formik
            initialValues={{
                title: "",
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
                bedroom: "",
                floor: "",
                toilet: "",
                imageUrls: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <RealEstateForm
                    formik={formik}
                    seller={seller}
                    provinces={provinces}
                    filteredDistricts={filteredDistricts}
                    filteredWards={filteredWards}
                    selectedProvince={selectedProvince}
                    selectedDistrict={selectedDistrict}
                    selectedWard={selectedWard}
                    selectedDemandType={selectedDemandType}
                    formattedPrice={formattedPrice}
                    uploadedFiles={uploadedFiles}
                    handleProvinceChange={handleProvinceChange}
                    handleDistrictChange={handleDistrictChange}
                    handleWardChange={handleWardChange}
                    handleDemandTypeChange={handleDemandTypeChange}
                    handleUploadFiles={handleUploadFiles}
                    handlePriceChange={(e) => handlePriceChange(e, formik)}
                    handleRemoveFile={handleRemoveFile}
                />
            )}
        </Formik>
    );
};

export default CreateRealEstate;
