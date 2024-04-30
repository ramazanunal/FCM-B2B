import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchPanel({ onClose }) {
  // Formik için form doğrulama şeması
  const validationSchema = Yup.object().shape({
    s: Yup.string().required("Please enter a search term"),
  });

  // Form submit işlevi
  const handleSubmit = (values, { resetForm }) => {
    // Form submit işlemleri burada yapılabilir
    console.log("Submitted search term:", values.s);
    // Formu sıfırla
    resetForm();
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 z-50  bg-gray-800 bg-opacity-75 flex items-center justify-center transition-transform duration-500 ease-in-out">
      <Formik
        initialValues={{ s: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white h-[165px] flex items-center justify-center flex-col">
            <Form id="ajax-search" className="container mx-auto  px-[15px] ">
              <div className="w-[1170px]">
                <div className="relative text-[10px] uppercase text-[#555555] h-[57px] flex items-center ">
                  What are you looking for?
                  <button
                    className="absolute top-0 right-0 "
                    type="button"
                    onClick={onClose}
                  >
                    <FaTimes className=" w-[20px] h-[20px] text-[#555555] hover:text-red-600 hover:scale-110 transition duration-300 ease-in-out transform " />
                  </button>
                </div>

                <div className="relative border-b border-[#e4e4e4] ">
                  <Field
                    name="searchinput"
                    placeholder="Search products..."
                    className={`form-control w-[1140px] pb-[15px] pr-[30px] text-[30px] font-bold lowercase ${
                      errors.s && touched.s ? "is-invalid" : ""
                    }`}
                  />
                  <button
                    type="submit"
                    className="search absolute right-0 top-5"
                  >
                    <FaSearch className=" w-[26px] h-[26px] text-[#555555] hover:text-LightBlue hover:scale-110 transition duration-300 ease-in-out transform " />
                  </button>
                </div>
              </div>
              {errors.s && touched.s && <div>{errors.s}</div>}
            </Form>
          </div>
        )}
      </Formik>{" "}
    </div>
  );
}

export default SearchPanel;
