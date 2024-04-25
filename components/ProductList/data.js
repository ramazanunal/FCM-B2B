export const mainCategory=[
    "1.Sınıf",
    "2.Sınıf",
    "3.Sınıf",
    "4.Sınıf",
    "Hikaye",
    "Set",
    "Soru Bankası"
]

export const subCategory=[
    "Genel",
    "Fen Bilgisi",
    "Sosyal Bilgisi",
    "Hayat Bilgisi",
    "Matematik",
    "Türkçe"
]

export const products = [
    {
        id: 1,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/akildefterim.png",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[0]

        },
        name:"Akıl Defterim ",
        stok:"AD-001",
        stokCount:20,
        price:35.00,
        date:{
            productAdditionDate:"22 Nisan 2024",
            lastUpdateDate:"21 Nisan 2024"
        },
        published:true,
      },
      {
        id: 2,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/evOdev.jpeg",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[0]

        },
        name:"Ev Ödevi",
        stok:"ED-001",
        stokCount:20,
        price:45.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }  ,
        published:true,     
      },
      {
        id: 3,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/fen3.png",
        category:{
            mainCategory:mainCategory[2],
            subCategory:subCategory[1]

        },
        name:"Fen Bilgisi",
        stok:"FB-003",
        stokCount:20,
        price:75.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }    ,
        published:false,   
      },
      {
        id: 4,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/fen4.png",
        category:{
            mainCategory:mainCategory[3],
            subCategory:subCategory[1]

        },
        name:"Fen Bilgisi",
        stok:"FB-004",
        stokCount:20,
        price:75.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }   ,
        published:false,    
      },
      {
        id: 5,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/hayat1.png",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[3]

        },
        name:"Hayat Bilgisi",
        stok:"HB-001",
        stokCount:20,
        price:75.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }    ,
        published:false,   
      },
      {
        id: 6,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/mat1.png",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[4]

        },
        name:"Matematik",
        stok:"MT-001",
        stokCount:20,
        price:75.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }  ,
        published:true,     
      },
      {
        id: 7,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/mat2.png",
        category:{
            mainCategory:mainCategory[1],
            subCategory:subCategory[4]

        },
        name:"Matematik",
        stok:"MT-002",
        stokCount:20,
        price:85.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }  ,
        published:true,     
      },
      {
        id: 8,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/mat3.png",
        category:{
            mainCategory:mainCategory[2],
            subCategory:subCategory[4]

        },
        name:"Matematik",
        stok:"MT-003",
        stokCount:20,
        price:95.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }       ,
        published:true,
      },
      {
        id: 9,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/mat4.png",
        category:{
            mainCategory:mainCategory[3],
            subCategory:subCategory[4]

        },
        name:"Matematik",
        stok:"MT-004",
        stokCount:0,
        price:105.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }      ,
        published:true, 
      },
      {
        id: 10,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/sosyal4.png",
        category:{
            mainCategory:mainCategory[3],
            subCategory:subCategory[2]

        },
        name:"Sosyal Bilgisi",
        stok:"SB-004",
        stokCount:0,
        price:85.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }       ,
        published:true,
      },
      {
        id: 11,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/telafi1.png",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[0]

        },
        name:"Telafi",
        stok:"TL-001",
        stokCount:0,
        price:55.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }     ,
        published:true,  
      },
      {
        id: 12,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/tumders.png",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[0]

        },
        name:"Tüm Dersler",
        stok:"TD-001",
        stokCount:0,
        price:85.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }       ,
        published:true,
      },
      {
        id: 13,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/turkce1.png",
        category:{
            mainCategory:mainCategory[0],
            subCategory:subCategory[5]

        },
        name:"Türkçe",
        stok:"TC-001",
        stokCount:0,
        price:85.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }       ,
        published:true,
      },
      {
        id: 14,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/turkce3.png",
        category:{
            mainCategory:mainCategory[2],
            subCategory:subCategory[5]

        },
        name:"Türkçe",
        stok:"TC-003",
        stokCount:0,
        price:75.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }      ,
        published:true, 
      },
      {
        id: 15,
        checkbox: <input type="checkbox" />,
        imgPath:"/assets/images/turkce4.png",
        category:{
            mainCategory:mainCategory[3],
            subCategory:subCategory[5]

        },
        name:"Türkçe",
        stok:"TC-004",
        stokCount:0,
        price:95.00,
        date:{
            productAdditionDate:"20 Nisan 2024",
            lastUpdateDate:"24 Nisan 2024"
        }       ,
        published:true,
      },
]


export const status = [
    { name: "Tümü", count: products.length },
    { name: "Yayımlanmış", count: products.filter(product => product.published === true).length},
  ];