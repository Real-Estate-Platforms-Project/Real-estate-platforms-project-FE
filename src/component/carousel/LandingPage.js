import SearchBar from "../search/SearchBar";
import React from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from "react-responsive-carousel";
import CardEstate from "../client/CardEstate";
import Statistics from "../admin/Statistics";
import StatisticsSection from "../client/StatisticsSection";
function LandingPage() {
    return (
        <div className="custom-search">
            <div className="carousel-container">
                <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>

                    <div>
                        <img
                            src="https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-background-mau-cam-do_052540153.jpg"
                            alt="Slide 1"/>
                    </div>
                    <div>
                        <img
                            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474102HPI/anh-background-mau-cam-chat_052540049.jpg"
                            alt="Slide 2"/>
                    </div>
                </Carousel>
                <div className="search-bar-container">
                    <SearchBar/>
                </div>

            </div>
            <StatisticsSection/>
            <CardEstate/>
        </div>
    );
}

export default LandingPage;