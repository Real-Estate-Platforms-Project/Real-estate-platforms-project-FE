import ContentIntroduction from "./ContentIntroduction";
import StatisticsSection from "../../component/client/StatisticsSection";
import CardEstate from "../../component/client/CardEstate";
import React from "react";
import LandingPage from "../../component/carousel/LandingPage";
import ContrentAward from "./ContentAward";

function Home() {
    return (
        <>
            <LandingPage/>
            <StatisticsSection/>
            <CardEstate/>
            <ContentIntroduction/>
            <ContrentAward/>
        </>
    );
}

export default Home;