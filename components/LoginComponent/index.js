"use client";
import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginComponent = ({ pageRole }) => {

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
    .required('e mail boş bırakılamaz.')
    .email('Geçerli bir e mail adresi giriniz.'),
    password: Yup.string().required("Parola zorunludur"),
  });

  const handleSubmit = async (values) => {
    console.log("Form data", values);
    console.log("GİRİŞ İŞLEMİ BAŞLADI!");

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        role: pageRole,
        redirect: false,
      });

      if (!result) {
        console.log("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      } else if (!result.ok) {
        console.log(result.error);
        // Eğer doğrulama hatasıyla ilgili özel bir mesaj almak istiyorsanız buraya ekleyin
        // if (result.error.includes('doğrulanmamış') || result.error.includes('doğrulayınız')) {
        //   setPopupData({
        //     popupIsActive: true,
        //     Title: 'Mail Adresiniz Doğrulanmamış!',
        //     subTitle:
        //       'Girdiğiniz mail adresi henüz doğrulanmamış. Mail adresinize gelen doğrulama kodunu girerek hesabınızı aktif edebilir, veya aşağıdaki butona basarak yeni bir doğrulama maili talep edebilirsiniz.',
        //     buttonUrl: '/auth/sendVerifyEmail',
        //     buttonText: 'Mail Doğrulama',
        //   });
        // }
      } else {
        console.log(result);
        console.log("GİRİŞ BAŞARILI!");
        router.push('/');
      }
    } catch (error) {
      console.error("Giriş işlemi sırasında bir hata oluştu:", error);
    }

    console.log("GİRİŞ İŞLEMİ BİTTİ!");
  };

  const router = useRouter();

  return (
    <div className="bg-white flex items-center flex-col py-[35px] sm:py-[60px] w-screen lg:w-[1188px]">
      <h1 className="text-[48px] text-center font-semibold text-CustomGray italic mb-[40px]">
        Giriş Yap
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col">
            <div className="mb-4 flex flex-col w-[400px]">
              <label className="text-[#9A9A9A] uppercase text-[11px] pt-[15px] pb-[10px] leading-[1px] tracking-[1px] font-bold">
                Kullanıcı adı veya e-posta adresi
                <span className="text-CustomRed ml-1">*</span>
              </label>
              <Field
                type="mail"
                name="email"
                autoComplete="off"
                className="border border-[#d5e0ec] py-[5px] px-[12px] rounded-md bg-white outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-[#9A9A9A] uppercase text-[11px] pt-[15px] pb-[10px] leading-[1px] tracking-[1px] font-bold">
                Parola <span className="text-CustomRed ">*</span>
              </label>
              <Field
                type="password"
                name="password"
                autoComplete="new-password"
                className="border border-[#d5e0ec] py-[5px] px-[12px] rounded-md bg-white outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-4 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2 justify-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                />
                <p className="text-[#9A9A9A] uppercase text-[11px] pt-[15px] pb-[10px] leading-[1px] tracking-[1px] font-bold mb-[1px]">
                  Beni hatırla
                </p>
              </div>

              <button
                type="submit"
                className="bg-CustomRed text-white font-bold rounded-md px-6 py-2 w-[200px] hover:scale-105 transition-all ease-in-out duration-700 transform"
              >
                Giriş Yap
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="clear" />
      <p className="mt-4 text-CustomRed/75 text-[14px] hover:text-CustomRed  transition-all ease-in-out duration-700 transform ">
        <Link href="https://caliskanari.com/my-account/lost-password/">
          Parolanızı mı unuttunuz?
        </Link>
      </p>
    </div>
  );
};

export default LoginComponent;
