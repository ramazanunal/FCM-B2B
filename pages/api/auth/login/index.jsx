// import loginFunction from "@/functions/auth/login/index";
// import mailStringCheck from "@/functions/other/mailStringCheck";
// import { NextApiRequest, NextApiResponse } from 'next';

import {getDataByUnique, updateDataByAny} from '@/services/serviceOperations';
import DecryptPassword from '@/functions/other/cryptology/decryptPassword';
import PasswordGenerator from '@/functions/other/passwordGenerator';
import EncryptPassword from "@/functions/other/cryptology/encryptPassword";


const handler = async (req, res) => {
    if(!req){
         return res.status(500).json({error: "İstek bulunamadı."});
    }


    const data = req.body; 
    console.log("##### İSTENEN VERİLER: ");
    console.log(data);
    console.log("################################");

    if(req.method === 'POST'){
        try {

            /*{ ÖRNEK VERİ YAPISI
                CARKOD: '120 07 006',
                CARUNVAN: 'FAZİLET KIRTASİYE',
                CARUNVAN3: 'halil_1226@hotmail.com',
                CAROZKOD1: 'A',
                CAROZKOD2: ' ',
                CAROZKOD3: 'B2',
                CAROZKOD4: ''
                CAROZKOD5: 'şifre123'
              },*/

            // CARUNVAN3 VE CAROZKOD3 değerlerine göre sorgulama yapılacak.
            const findUser = await getDataByUnique('CARKART', {CARUNVAN3: data.email, CAROZKOD1:"A", CAROZKOD3: "B2"});
            console.log("##### data: ");
            console.log(data);
            console.log("################################");
            
            if(!findUser || findUser === null || findUser === undefined || findUser === ""){
                throw new Error("Kullanıcı bulunamadı. Lütfen bilgilerinizi kontrol ediniz.");
            }

            

           
            // findUser.CAROZKOD5 -> Şifre
           
             // ŞİFRE KONTROLÜ
            else if(findUser && findUser.CAROZKOD5 && findUser.CAROZKOD5 !== " " && findUser.CAROZKOD5 !== ""){
                console.log("##### KULLANICI EŞLEŞTİ");
                console.log("##### ŞİFRE KONTROL");
                const passwordCheck = await DecryptPassword(data.password, findUser.CAROZKOD5);
                console.log("------ data.password", data.password);
                console.log("------ findUser.CAROZKOD5", findUser.CAROZKOD5);
                console.log("##### ŞİFRE KONTROL SONUCU:) ", passwordCheck);
                if(!passwordCheck){
                    console.log("##### ŞİFRE EŞLEŞMESİ BAŞARISIZ!");
                    throw new Error("Şifre eşleşmesi başarısız. Lütfen şifrenizi kontrol ediniz.");
                }

                // Şifre doğru ise kullanıcı bilgilerini döndür.
                console.log("##### ŞİFRE EŞLEŞMESİ BAŞARILI!");
                return res.status(200).json({success: true, message: "Giriş işlemi başarılı", findUser});
            }
           
            // TANIMLANMIŞ ŞİFRE YOKSA YENİ ŞİFRE OTOMATİK OLUŞTURMA
            else if(findUser && !findUser.CAROZKOD5 || findUser.CAROZKOD5 === " " || findUser.CAROZKOD5 === ""){
                console.log("##### ŞİFRE TANIMLAMA İŞLEMİ BAŞLATILDI!");

                // Şifre Sıfırlama işlemleri burada yapılacak
                const newPassword = await PasswordGenerator(data.email);
                console.log("##### ŞİFRE ÜRETİLDİ", newPassword);

                // Şifreleme işlemi
                const encryptedPassword = await EncryptPassword(newPassword);
                console.log("##### ŞİFRE HASH BCRYPTED!");
 
                // Şifreleme işlemi başarılı mı kontrol et.
                if(!encryptedPassword){
                    console.log("##### ŞİFRE HASH SIRASINDA BİR HATA GERÇEKLEŞTİ!");
                    throw new Error("Şifre hash sırasında bir hata oluştu.");
                }

                // Şifreleme işlemi başarılı ise yeni şifreyi veritabanına kaydet.
                const updatePassword = await updateDataByAny('CARKART', {CARKOD: findUser.CARKOD}, {CAROZKOD5: encryptedPassword});
                console.log("##### ŞİFRE VERİTABANINA KAYDEDİLİYOR...")
                console.log("updatePassword: ", updatePassword);
                
                if(!updatePassword){
                    console.log("##### ŞİFRE VERİTABANINA KAYDEDİLMEDİ HATA!");
                    throw new Error("Şifre veritabanına kaydedilirken bir hata oluştu.");
                }

                console.log("##### ŞİFRE VERİTABANINA KAYDEDİLDİ!");
                console.log("############################################################");
                // Şifreleme işlemi başarılı ise yeni şifreyi kullanıcıya mail olarak gönder.
                return res.status(200).json({success: true, newPassword:newPassword,  message: `Yeni Şifreniz: ${newPassword} Lütfen şifrenizi kaydediniz.`});
            }

            else{
                console.log("##### İŞLEM SIRASINDA BİR HATA OLUŞTU!")
                throw new Error("İşlem sırasında bir hata oluştu.");
            }
            

        } catch (error) {
            return res.status(500).json({error: error.message}); 
        }

    }

};

export default handler;
