import { useState } from "react";
import React from "react";
import svgElement from "/news.svg";
import { Dropdown, TextInput, Badge, Button, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Generate = () => {
  const navigate = useNavigate();
  const [modal, showModal] = useState(null);

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    product_url: "",
    image_type: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
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
        console.log(response);
        console.log("here");
      })
      .catch((error) => {
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
            <Badge className="w-[151px] gap-[8px] py-[10px] px-[20px] pl-[2.5rem] h-[42px] bg-[#F3F4F6] text-[14px] items-center !text-center text-montserrat !text-normal text-[#111928] rounded-s-lg">
              Amazon Link 🇮🇳
            </Badge>
          </div>
          <div>
            <TextInput
              type="product_url"
              name="product_url"
              id="product_url"
              placeholder="amazon.in"
              class="bg-[#F9FAFB] border border-[#F9FAFB] text-black placeholder-grey-900 sm:text-sm block w-full p-2.5 h-[42px]"
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
            <Button
              type="submit"
              className="w-[317px] h-[58px] !bg-[#558EFF] text-[#FFFFFF]"
            >
              <span className="text-[24px] leading-[36px]">GENERATE</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Generate;
