import { Img, Button, Heading, Input, Text } from "../../components";
import React from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

export default function HeroSection() {
    return (
        <>
            {/* hero section */}
            <div>
                <div className="bg-yellow-50 py-[50px] md:py-5">
                    <div className="flex items-center overflow-x-scroll md:flex-col">
                        <div className="flex w-[830px] flex-1 flex-col items-center gap-10 px-14 md:self-stretch md:px-5">
                            <div className="m-5 flex w-[86%] flex-col items-center gap-3.5 md:ml-0 md:w-full">
                                <Heading size="heading5xl" as="h1" className="leading-[140%] tracking-[-0.92px] sm:text-[36px]">
                                    Find a perfect property
                                    <br />
                                    Where you&#39;ll love to live
                                </Heading>
                                <Text size="textmd" as="p" className="w-full leading-[180%]">
                                    We helps businesses customize, automate and scale up their ad production and delivery.
                                </Text>
                            </div>
                            <Tabs
                                className="m-5 flex w-[86%] flex-col items-center gap-[38px] rounded-[16px] bg-white-a700 p-6 md:ml-0 md:w-full sm:p-5"
                                selectedTabClassName="!text-white-a700 bg-gray-900 rounded-[10px]"
                                selectedTabPanelClassName="relative tab-panel--selected"
                            >
                                <TabList className="flex flex-wrap gap-6">
                                    <Tab className="px-[66px] py-3 text-[18px] font-bold text-gray-900 md:px-5">Buy</Tab>
                                    <Tab className="px-[66px] py-3 text-[18px] font-bold text-gray-900 md:px-5">Sell</Tab>
                                    <Tab className="px-[66px] py-3 text-[18px] font-bold text-gray-900 md:px-5">Rent</Tab>
                                </TabList>

                                    <TabPanel key={`tab_panel`} className="absolute items-center self-stretch">
                                        <div className="w-full self-stretch">
                                            <div className="flex flex-col gap-6">
                                                <div className="flex flex-col gap-5">
                                                    <Input
                                                        shape="round"
                                                        name="City Input"
                                                        placeholder={"City/Street"}
                                                        suffix={
                                                            <Img src="/public/images/house_image.png" alt="Linkedin" className="mb-1 h-[20px] w-[20px]" />
                                                        }
                                                        className="px-[34px] border border-solid border-blue_gray-100_01"
                                                    />
                                                    <div className="flex items-center justify-between gap-5 rounded-[10px] border border-solid border-blue_gray-100_01 bg-white-a700 px-4 py-3.5">
                                                        <Heading
                                                            size="headingmd"
                                                            as="h2"
                                                            className="mt-1 self-end !font-semibold !text-gray-600_02"
                                                        >
                                                            Property Type
                                                        </Heading>
                                                        <Img src="images/img_arrow_up.svg" alt="Type Arrow" className="h-[20px] w-[20px]" />
                                                    </div>
                                                    <div className="flex items-center justify-between gap-5 rounded-[10px] border border-solid border-blue_gray-100_01 bg-white-a700 px-4 py-3.5">
                                                        <Heading
                                                            size="headingmd"
                                                            as="h3"
                                                            className="mt-1 self-end !font-semibold !text-gray-600_02"
                                                        >
                                                            Price Range
                                                        </Heading>
                                                        <Img src="images/img_arrow_up.svg" alt="Price Arrow" className="h-[20px] w-[20px]" />
                                                    </div>
                                                </div>
                                                <Button size="3xl" shape="round" className="self-stretch font-bold">
                                                    Search
                                                </Button>
                                            </div>
                                        </div>
                                    </TabPanel>
                               
                            </Tabs>
                        </div>
                        <Img src="images/img_image.png" alt="Main Image" className="h-[502px] w-[610px] object-cover md:w-full" />
                    </div>
                </div>
            </div>
        </>
    );
}
