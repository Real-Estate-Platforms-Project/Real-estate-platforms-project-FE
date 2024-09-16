import SearchBar from "../search/SearchBar";
import React from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from "react-responsive-carousel";
import {useNavigate} from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();

    const handleSearch = (filters,activeTab) => {
        console.log(activeTab)
        navigate('/estate-list', { state: { filters,activeTab } });

    };
    return (
        <div className="custom-search">
            <div className="carousel-container">
                <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
                    <div>
                        <img
                            src="https://datdichvu.net/wp-content/uploads/2022/03/BANNER-BAT-DONG-SAN-AE-LAND1.gif"
                            alt="Slide 1"/>
                    </div>
                    <div>
                        <img
                            src="https://ktmt.vnmediacdn.com/images/2022/12/28/30-1672212326-anh-2.jpg"
                            alt="Slide 2"/>
                    </div>
                </Carousel>
                <div className="search-bar-container">
                    <SearchBar onSearch={handleSearch} />
                </div>

            </div>
        </div>
    );
}

export default LandingPage;