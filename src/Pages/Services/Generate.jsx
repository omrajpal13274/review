import { useState } from "react";
import React from "react";
import ReactWordcloud from "react-wordcloud";
import svgElement from "/news.svg";
import {
  Dropdown,
  TextInput,
  Badge,
  Button,
  Alert,
  Spinner,
  Card,
} from "flowbite-react";
import {
  HiInformationCircle,
  HiOutlineSave,
  HiOutlineRefresh,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Generate = () => {
  const [words, setWords] = useState("");
  const [options, setOptions] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    product_url: "",
    image_type: "",
  });
  const handleRefresh = (event) => {
    setModal(false);
    setFormData({
      product_url: "",
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://localhost:8100/v1/scrape/scraper",
        {
          product_link: formData.product_url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        //successful response
        setLoading(false);
        setModal(true);

        setOptions({
          enableTooltip: false,
          rotations: 2,
          padding: 3,
          rotationAngles: [0, 90],
          // scale: "sqrt",
          fontFamily: "inter",
          spiral: "rectangular",
        });
        setSize([800, 400]);
        const words = [
          { text: "abundant", value: 9 },
          { text: "brisk", value: 7 },
          { text: "capricious", value: 4 },
          { text: "dainty", value: 8 },
          { text: "eloquent", value: 9 },
          { text: "fickle", value: 3 },
          { text: "gleaming", value: 7 },
          { text: "hearty", value: 6 },
          { text: "impartial", value: 8 },
          { text: "jovial", value: 7 },
          { text: "keen", value: 6 },
          { text: "luminous", value: 5 },
          { text: "magnificent", value: 10 },
          { text: "naive", value: 2 },
          { text: "optimistic", value: 9 },
          { text: "peaceful", value: 8 },
          { text: "quirky", value: 5 },
          { text: "radiant", value: 6 },
          { text: "serene", value: 7 },
          { text: "tranquil", value: 8 },
          { text: "upbeat", value: 6 },
          { text: "versatile", value: 7 },
          { text: "whimsical", value: 5 },
          { text: "zealous", value: 9 },
          { text: "adaptable", value: 7 },
          { text: "blissful", value: 8 },
          { text: "candid", value: 6 },
          { text: "daring", value: 7 },
          { text: "eclectic", value: 6 },
          { text: "flourishing", value: 8 },
          { text: "gracious", value: 9 },
          { text: "harmonious", value: 7 },
          { text: "innovative", value: 8 },
          { text: "jubilant", value: 9 },
          { text: "kind-hearted", value: 8 },
          { text: "lively", value: 7 },
          { text: "meticulous", value: 6 },
          { text: "nurturing", value: 9 },
          { text: "optimized", value: 7 },
          { text: "playful", value: 5 },
          { text: "quality", value: 8 },
          { text: "resilient", value: 7 },
          { text: "sturdy", value: 6 },
          { text: "tenacious", value: 9 },
          { text: "unwavering", value: 8 },
          { text: "vibrant", value: 7 },
          { text: "warm-hearted", value: 9 },
          { text: "youthful", value: 6 },
          { text: "zealot", value: 5 },
          { text: "astonishing", value: 9 },
          { text: "benevolent", value: 8 },
          { text: "curious", value: 7 },
          { text: "determined", value: 9 },
          { text: "energetic", value: 8 },
          { text: "flamboyant", value: 6 },
        ];
        setWords(words);
      })
      .catch((error) => {
        //error backend responses
        setLoading(false);
        if (error.response.status == 401) {
          setError(true);
          const msg = `${error.response.data.detail}. Going back to authentication page in 5 seconds.`;
          setErrorMessage(msg);
          localStorage.removeItem("jwt");
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setError(true);
          setErrorMessage(error.response.data.detail);
        }
      });
  };

  return (
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <div class="my-[16vh] inline-flex justify-between items-center py-1 px-1 pr-4 mb-7">
        <a href="/about">
          <img src={svgElement} />
        </a>
      </div>
      <div className="flex justify-center items-center mb-[2rem]"></div>
      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mb-4">
          <span>
            <span className="font-medium">{errorMessage} </span>
          </span>
        </Alert>
      )}
      <h1 class="mb-[12px] text-[60px] leading-[60px] pt-2 font-montserrat font-semibold tracking-normal leading-10 text-slate-100">
        PLEASE PROVIDE THE PRODUCT LINK
      </h1>

      <p class="pt-8 mt-[12px] text-[24px] leading-[36px] font-montserrat font-normal text-[#5890FF]">
        The Product link can be found in the search bar of your browser or can
        be copied <br />
        directly from the share product option given below the product.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mt-[54px]">
          <div className="ml-[1rem] justify-self-end" dir="ltr">
            <Badge
              className="
            !w-[151px] !h-[42px] gap-[8px] py-[10px] px-[20px] pl-[2.5rem] bg-[#F3F4F6] text-[14px] items-center !text-center text-montserrat !text-normal text-[#111928] rounded-s-lg"
            >
              Amazon Link 🇮🇳
            </Badge>
          </div>
          <div>
            <TextInput
              type="product_url"
              name="product_url"
              id="product_url"
              placeholder="amazon.in"
              class="bg-[#F9FAFB] border !h-[42px] border-[#F9FAFB] text-black placeholder-grey-900 sm:text-sm block w-full p-2.5"
              value={formData.product_url}
              onChange={(event) =>
                setFormData({ ...formData, product_url: event.target.value })
              }
              required={true}
            />
          </div>
          <div className="justify-self-start">
            <Dropdown
              label="Select Image Type"
              dismissOnClick={true}
              id="drops"
              value={formData.image_type}
              onChange={(event) =>
                setFormData({ ...formData, image_type: event.target.value })
              }
            >
              <Dropdown.Item>PNG</Dropdown.Item>
              <Dropdown.Item>PDF</Dropdown.Item>
              <Dropdown.Item>JPEG</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div className="flex mt-[72px] items-center justify-center">
          <div className="text-center">
            {!isLoading && !modal && (
              <Button
                type="submit"
                className="w-[317px] h-[58px] !bg-[#558EFF] text-[#FFFFFF]"
              >
                <span className="text-[24px] leading-[36px]">GENERATE</span>
              </Button>
            )}
            {isLoading && (
              <div className="flex flex-row gap-3 justify-center items-center">
                <Button className="px-4 py-2 !bg-[#558eff]">
                  <Spinner
                    aria-label="Loading Spinner"
                    size="xl"
                    className=""
                  />
                  <span className="pl-3 text-inter !text-[24px] !leading-[36px]">
                    Loading...
                  </span>
                </Button>
              </div>
            )}
            {modal && (
              <Card id="cardMain">
                <h5 className="text-[30px] leading-[30px] font-inter font-extrabold tracking-none text-white-900 dark:text-white">
                  <p className="text-center">
                    Here is the Generated Word Cloud
                  </p>
                </h5>
                <p className="bg-[#fafcf8] font-inter text-[18px] leading-[27px] p-[3rem] text-[#9CA3AF] dark:text-gray-400">
                  <ReactWordcloud words={words} options={options} size={size} />
                </p>
                <Button
                  className="inline-flex items-center justify-center my-5 px-5 py-3 mr-3 text-inter font-normal text-center text-white rounded-lg bg-[#558EFF] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 text-[#1E1E1E] !bg-[#558EFF]"
                  href="/generate"
                >
                  <span className="text-[18px] pr-2">
                    Export Your Word Cloud
                  </span>
                  <HiOutlineSave className="mr-5 h-5 w-5" />
                </Button>
                <div className="flex flex-row justify-center items-center">
                  <div>
                    <Button onClick={handleRefresh}>
                      <HiOutlineRefresh className="mr-2 h-5 w-5" />
                      Try another product
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Generate;
