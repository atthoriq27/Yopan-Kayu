import { Category, Product, GalleryItem, BusinessProfile } from '../types';

export const DEFAULT_ABOUT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBe0pN2zKVEc3QUClmDoxqxceKE8cniJa-8CManzl-wjm19aE1cLRV-s8ehpMbQxVtqe3WQ3y6m1OqRYATluIaOkT7t3g4NxoWh44Y95JCguiKVBjOStmFRewmmgApdEnwc8jszsUieQqKa76Om_JdxWG1XVoEV7owvs6HE9DAuz06qkHSmdztZ2kT1A2Sgo0lCrDHKk9_3eGkTmIt2Ma6eiLpyGWePH2PXkbD6UEYw8E6PRzTQ1bUR0w';

export const DEFAULT_ABOUT_BADGE = 'Pak Heri • Owner';
export const DEFAULT_ABOUT_TITLE = 'Spesialis Mebel Kayu Jati Belanda dan Kayu Solid Berkualitas';
export const DEFAULT_ABOUT_STORY = `Kami di Yopan Kayu merupakan workshop mebel yang berfokus pada pengolahan kayu jati belanda (pinus solid) dan berbagai kayu solid pilihan, dikelola langsung oleh Pak Suheri (akrab disapa Pak Heri) di Tigaraksa. Nama Yopan Kayu kami ambil dari nama putra tercinta kami, sebagai wujud kesungguhan dan ketulusan kami dalam menghasilkan perabot yang rapi dan kuat untuk setiap keluarga.

Fokus utama kami adalah membuat aneka perabot kayu jati belanda solid, seperti meja kerja, meja makan, rak dinding, kitchen set, hingga set meja kursi kafe. Kayu jati belanda memiliki keunggulan warna cerah alami yang bersih, alur serat yang estetik, kuat, dan harganya jauh lebih bersahabat di kantong. Kami selalu memastikan setiap sambungan kayu dibuat kokoh, kayu diserut dan diamplas halus, serta difinishing rapi agar nyaman dipakai sehari-hari.

Selain kayu jati belanda, kami juga siap melayani pembuatan mebel dengan jenis kayu solid lain (seperti Jati Jepara, Sungkai, atau Mahoni) sesuai permintaan Anda. Lewat website resmi ini, Anda bisa melihat hasil karya kami dan langsung berdiskusi santai lewat WhatsApp untuk konsultasi ukuran maupun pemesanan.`;

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  id: 'yopan-kayu-main',
  business_name: 'Yopan Kayu',
  tagline: 'Spesialis Mebel Kayu Jati Belanda dan Kayu Solid Custom',
  description: 'Workshop spesialis mebel kayu jati belanda (pinus) solid di Tigaraksa. Melayani meja kerja, rak, lemari, kitchen set, dan perabot kafe/rumah dengan ukuran custom, amplas halus, dan harga terjangkau.',
  phone: '081234567890',
  whatsapp: '6281234567890',
  address: 'Jalan Kp. Pabuaran asem No.003, RT.002, Pete, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720',
  google_maps_url: 'https://maps.app.goo.gl/asat73UmjKZ6zYN49',
  instagram: 'yopankayu',
  email: 'kontak@yopankayu.com',
  logo_url: '/logo/logo-only.svg',
  opening_hours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
  about_image_url: DEFAULT_ABOUT_IMAGE,
  about_badge_text: DEFAULT_ABOUT_BADGE,
  about_title: DEFAULT_ABOUT_TITLE,
  about_story: DEFAULT_ABOUT_STORY,
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-meja',
    name: 'Meja Kerja dan Makan',
    slug: 'makan-kerja',
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-kursi-sofa',
    name: 'Kursi dan Bangku',
    slug: 'kursi-sofa',
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-lemari-rak',
    name: 'Lemari dan Rak Dinding',
    slug: 'lemari-rak',
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-custom',
    name: 'Pesanan Custom',
    slug: 'pesanan-kustom',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-meja-kerja-pinus',
    category_id: 'cat-meja',
    name: 'Meja Kerja dan Belajar Minimalis Jati Belanda',
    slug: 'meja-kerja-belajar-minimalis-jati-belanda',
    description: 'Meja kerja dan belajar minimalis berbahan kayu jati belanda (pinus) solid pilihan. Serat kayu tampak estetik alami dengan permukaan diamplas sangat halus dan dilapisi finishing clear doff tahan tumpahan air. Dilengkapi konstruksi kaki yang kokoh, tidak mudah goyang, dan sangat cocok untuk kamar maupun ruang kerja.',
    price: 950000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
    is_active: true,
    is_featured: true,
    material: 'Kayu Jati Belanda (Pinus Solid Oven Kering)',
    dimensions: '120 x 60 x 75 cm (Bisa Kustom)',
    finish: 'Natural Polyurethane Clear Doff Halus (Tahan Air)',
    images: [
      {
        id: 'img-1-1',
        product_id: 'prod-meja-kerja-pinus',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
        sort_order: 1
      },
      {
        id: 'img-1-2',
        product_id: 'prod-meja-kerja-pinus',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_8luy2woQQRIE9H72sJbp_OoQMZ0_iCj19HpsEt_jd6uLIbgIBKBLQKNgO_hbD4V8IqbpUmWqzFwY-zqqKdr7WPr8OS24fSOGl9zlXEm2yfBodvL-t0k-d774MUhX0UGkl_ruAe1d3rjysbk0OK5da3nH2f7vmF0AvZ6RnMOkSz3XW04Hm2AElPy4gBfThbqP5wQ_Aym61I9ery3PFdEJr8pUhnPvDOaw2JW3lzB0z_g4tbYDe0SDg',
        sort_order: 2
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-set-meja-kafe-pinus',
    category_id: 'cat-meja',
    name: 'Set Meja dan Bangku Kafe Jati Belanda',
    slug: 'set-meja-bangku-kafe-jati-belanda',
    description: 'Set perabot kafe dan resto minimalis terdiri dari 1 meja utama dan 2 bangku panjang berbahan kayu jati belanda solid. Desain simpel, kokoh, dan bernuansa hangat modern. Sangat pas untuk ruang makan minimalis, balkon rumah, maupun tempat usaha kafe.',
    price: 1450000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
    is_active: true,
    is_featured: true,
    material: 'Kayu Jati Belanda Solid Pilihan',
    dimensions: 'Meja 120 x 60 x 75 cm, Bangku 110 x 30 x 45 cm',
    finish: 'Clear Natural Doff / Walnut Semi-Gloss PU',
    images: [
      {
        id: 'img-2-1',
        product_id: 'prod-set-meja-kafe-pinus',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-rak-modular-pine',
    category_id: 'cat-lemari-rak',
    name: 'Rak Dinding Ambalan Modular Jati Belanda',
    slug: 'rak-dinding-ambalan-modular-jati-belanda',
    description: 'Rak dinding gantung serbaguna dari kayu jati belanda solid. Mempercantik dinding ruangan dengan urat serat kayu pinus alami tanpa mata kayu mati yang rapuh. Mudah dipasang dan kuat menopang buku, tanaman hias, maupun koleksi pernak-pernik rumah.',
    price: 450000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ',
    is_active: true,
    is_featured: true,
    material: 'Kayu Jati Belanda (Pinus Solid Pilihan)',
    dimensions: '90 x 22 x 65 cm (Bisa Kustom)',
    finish: 'Water-based Clear Sealant Ramah Lingkungan',
    images: [
      {
        id: 'img-3-1',
        product_id: 'prod-rak-modular-pine',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-credenza-japandi',
    category_id: 'cat-lemari-rak',
    name: 'Credenza TV Japandi Minimalis Jati Belanda',
    slug: 'credenza-tv-japandi-minimalis-jati-belanda',
    description: 'Kabinet TV berkonsep Japandi (Japanese-Scandinavian) dengan pintu geser kisi-kisi kayu jati belanda solid. Memberikan sirkulasi udara optimal untuk perangkat elektronik di dalamnya serta menambah estetika bersih di ruang keluarga.',
    price: 1750000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfI_NqRg7Xv95D_8TN3MOkUr-apag5YKcmU2USr9dsH2XXn8mlapJ8Jj0qUFuHDOJAmDzdsXr__HtdrjzP9djk5Yfyhv9CZO8QHVgQwdvnUQLTWGNvsz4RdNGwMvh2wfhiC8KAxPfjOYMYqxdenUahCFXT5PnjvRtn4tNpRujEkHQ-qHzoRNwiPCtUHRNdOH6LujJ-oKLDwOaOadMaQBsUu5FlQ_qi-QkjoBUrDBbL40j5r8lPQxwlQ',
    is_active: true,
    is_featured: true,
    material: 'Kayu Jati Belanda Solid + Handle Brass Minimalis',
    dimensions: '150 x 42 x 52 cm',
    finish: 'Teak Oil Natural Satin Halus',
    images: [
      {
        id: 'img-4-1',
        product_id: 'prod-credenza-japandi',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfI_NqRg7Xv95D_8TN3MOkUr-apag5YKcmU2USr9dsH2XXn8mlapJ8Jj0qUFuHDOJAmDzdsXr__HtdrjzP9djk5Yfyhv9CZO8QHVgQwdvnUQLTWGNvsz4RdNGwMvh2wfhiC8KAxPfjOYMYqxdenUahCFXT5PnjvRtn4tNpRujEkHQ-qHzoRNwiPCtUHRNdOH6LujJ-oKLDwOaOadMaQBsUu5FlQ_qi-QkjoBUrDBbL40j5r8lPQxwlQ',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-meja-makan-teak',
    category_id: 'cat-meja',
    name: 'Meja Makan Solid Teak 6 Kursi',
    slug: 'meja-makan-solid-teak-6-kursi',
    description: 'Meja makan berbahan kayu jati solid grade A dengan sambungan purus presisi. Permukaan halus dengan finishing natural doff yang menonjolkan urat serat kayu jati alami tanpa merusak tekstur aslinya. Dilengkapi 6 kursi kokoh dengan sandaran ergonomis.',
    price: 4850000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
    is_active: true,
    is_featured: false,
    material: 'Kayu Jati Solid Pilihan (Kadar Air < 14%)',
    dimensions: '180 x 90 x 76 cm',
    finish: 'Natural Polyurethane Clear Doff Halus',
    images: [
      {
        id: 'img-5-1',
        product_id: 'prod-meja-makan-teak',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-armchair-scandi',
    category_id: 'cat-kursi-sofa',
    name: 'Armchair Scandinavian Sungkai Solid',
    slug: 'armchair-scandinavian-sungkai-solid',
    description: 'Kursi santai bergaya Skandinavia dengan konstruksi kayu sungkai oven solid. Kaki-kaki dibubut ramping namun sangat kuat menahan beban. Dilengkapi busa high density berlapis kain linen bertekstur nyaman.',
    price: 1650000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA',
    is_active: true,
    is_featured: false,
    material: 'Kayu Sungkai Oven + Premium Textured Linen',
    dimensions: '68 x 72 x 82 cm (Tinggi Dudukan 44 cm)',
    finish: 'Bleached Natural Matte Sealant',
    images: [
      {
        id: 'img-6-1',
        product_id: 'prod-armchair-scandi',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Meja Kerja Jati Belanda Minimalis Home Office',
    description: 'Pengerjaan meja kerja custom dari kayu jati belanda solid dengan rak penyimpanan buku untuk ruang kerja di Tigaraksa.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
    category: 'Interior Rumah',
    location: 'Tigaraksa, Tangerang',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-2',
    title: 'Rak Buku Minimalis Modular Kayu Jati Belanda',
    description: 'Instalasi rak dinding floor-to-ceiling kayu jati belanda dengan finishing natural matte untuk ruang baca keluarga di kawasan BSD.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuAJmWsi3C1t9tewBW3jjlzLUK7sJjPoMj2OJrII5qPiX8qjlpDMGxJvaNTxI-j_Zx5-899jAin23cTI_Z_q9M_5nNPNkLl3grjTyKgXQf8s9np3LVseXUmg9QyBqIzeY-iTbY8WlYFoeBLCfPFBvn65pwrvHj_RD6maqX-Tm7CRJ3UQZlXFVUL5GwG3fAPaYgQy9Xo0fFO_uR7N3GSTZDezul7Qeu8K9onvY3NRlAsLsCi85rCtyHg',
    category: 'Interior Rumah',
    location: 'BSD City, Tangerang',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-3',
    title: 'Set Meja dan Kursi Kafe Kayu Jati Belanda',
    description: 'Pengerjaan 10 set meja dan bangku kafe berbahan kayu jati belanda solid finishing natural tahan air untuk coffee shop.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
    category: 'Kafe dan Komersial',
    location: 'Gading Serpong, Tangerang',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-4',
    title: 'Kitchen Island dan Meja Bar Kayu Solid',
    description: 'Meja bar dapur bersih dengan top table kayu solid bertekstur urat halus dipadu stool kursi santai.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_8luy2woQQRIE9H72sJbp_OoQMZ0_iCj19HpsEt_jd6uLIbgIBKBLQKNgO_hbD4V8IqbpUmWqzFwY-zqqKdr7WPr8OS24fSOGl9zlXEm2yfBodvL-t0k-d774MUhX0UGkl_ruAe1d3rjysbk0OK5da3nH2f7vmF0AvZ6RnMOkSz3XW04Hm2AElPy4gBfThbqP5wQ_Aym61I9ery3PFdEJr8pUhnPvDOaw2JW3lzB0z_g4tbYDe0SDg',
    category: 'Residensial',
    location: 'Bintaro Jaya, Tangerang Selatan',
    created_at: new Date().toISOString()
  }
];
