import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import * as realEstateService from "../../services/RealEstate";
import * as addressService from "../../services/AddressService";
import * as sellerService from "../../services/Seller";
import {toast} from "react-toastify";
import RealEstateForm from "../../component/client/RealEstateForm";
import {storage} from '../../configs/ConfigFirebase';
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";

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
    floor: Yup.number().test(
        "is-required-if-nha-o",
        "Cần nhập thông tin này",
        function (value) {
            const {type} = this.parent;
            return type !== "Nhà ở" || (value && value > 0);
        }
    ),
    toilet: Yup.number().test(
        "is-required-if-nha-o",
        "Cần nhập thông tin này",
        function (value) {
            const {type} = this.parent;
            return type !== "Nhà ở" || (value && value > 0);
        }
    ),
    bedroom: Yup.number().test(
        "is-required-if-nha-o",
        "Cần nhập thông tin này",
        function (value) {
            const {type} = this.parent;
            return type !== "Nhà ở" || (value && value > 0);
        }
    ),
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
        setUploadedFiles(Array.from(files)); // Store files temporarily
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
        try {
            const imageUrls = await Promise.all(
                uploadedFiles.map(async (file) => {
                    const imageRef = storageRef(storage, `/files/${file.name}`);
                    const snapshot = await uploadBytes(imageRef, file);
                    const url = await getDownloadURL(snapshot.ref);
                    return url;
                })
            );

            const response = await realEstateService.saveRealEstate({
                ...values,
                imageUrls: imageUrls,
                sellerId: seller.id
            });

            if (response) {
                toast.success("Thêm mới thành công");
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
                bedroom: "",
                floor: "",
                toilet: "",
                imageUrls: [],  // Store multiple image URLs
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
                    handleProvinceChange={handleProvinceChange}
                    handleDistrictChange={handleDistrictChange}
                    handleWardChange={handleWardChange}
                    handleDemandTypeChange={handleDemandTypeChange}
                    handleUploadFiles={handleUploadFiles}
                />
            )}
        </Formik>
    );
};

export default CreateRealEstate;
