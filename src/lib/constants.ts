import { Category, Product, GalleryItem, BusinessProfile } from '../types';

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  id: 'yopan-kayu-main',
  business_name: 'Yopan Kayu',
  tagline: 'Pembuatan dan Penyediaan Produk Mebel Kayu',
  description: 'Yopan Kayu merupakan usaha yang bergerak di bidang pembuatan dan penyediaan berbagai produk mebel berbahan kayu dengan mengutamakan kualitas, kerapian, dan hasil pengerjaan yang sesuai dengan kebutuhan pelanggan.',
  phone: '081234567890',
  whatsapp: '6281234567890',
  address: 'Jalan Kp. Pabuaran asem No.003, RT.002, Pete, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720',
  google_maps_url: 'https://maps.app.goo.gl/asat73UmjKZ6zYN49',
  instagram: 'yopankayu',
  email: 'kontak@yopankayu.com',
  logo_url: '/logo/logo-only.svg',
  opening_hours: 'Senin - Sabtu: 08.00 - 17.00 WIB'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-kursi-sofa',
    name: 'Kursi dan Sofa',
    slug: 'kursi-sofa',
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-meja',
    name: 'Makan dan Kerja',
    slug: 'makan-kerja',
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-lemari-rak',
    name: 'Lemari dan Rak',
    slug: 'lemari-rak',
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-custom',
    name: 'Pesanan Kustom',
    slug: 'pesanan-kustom',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-meja-makan-teak',
    category_id: 'cat-meja',
    name: 'Meja Makan Solid Teak 6 Kursi',
    slug: 'meja-makan-solid-teak-6-kursi',
    description: 'Meja makan berbahan kayu jati solid grade A dengan sambungan purus presisi. Permukaan halus dengan finishing natural doff yang menonjolkan urat serat kayu jati alami tanpa merusak tekstur aslinya. Dilengkapi 6 kursi kokoh dengan sandaran ergonomis.',
    price: 4850000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
    is_active: true,
    is_featured: true,
    material: 'Kayu Jati Solid Pilihan (Kadar Air < 14%)',
    dimensions: '180 x 90 x 76 cm',
    finish: 'Natural Polyurethane Clear Doff Halus',
    images: [
      {
        id: 'img-1-1',
        product_id: 'prod-meja-makan-teak',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWWgmSdTQmqi-R2IxR7MTNxhPhbOWVe5W8C6FnWidcAyrYSaun1VS1YQfM4Ulr4EgKR7EqQqyMb_J5ot_L7qcmD-we1p7rBjENTQyaqZqVlr3e92B2wykVisaqofsP6TZ8i-8Ci5Z3VSPVaPF7H6egPcMiOQLWXYyD4XeQ7buOwkxV-VMld_gXj9p1RlcTRUauQmnh9vExHpAALJay_z8J-qJn3fdZ-yeX6FozkIgckOyE1GvINqsrRA',
        sort_order: 1
      },
      {
        id: 'img-1-2',
        product_id: 'prod-meja-makan-teak',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_8luy2woQQRIE9H72sJbp_OoQMZ0_iCj19HpsEt_jd6uLIbgIBKBLQKNgO_hbD4V8IqbpUmWqzFwY-zqqKdr7WPr8OS24fSOGl9zlXEm2yfBodvL-t0k-d774MUhX0UGkl_ruAe1d3rjysbk0OK5da3nH2f7vmF0AvZ6RnMOkSz3XW04Hm2AElPy4gBfThbqP5wQ_Aym61I9ery3PFdEJr8pUhnPvDOaw2JW3lzB0z_g4tbYDe0SDg',
        sort_order: 2
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-armchair-scandi',
    category_id: 'cat-kursi-sofa',
    name: 'Armchair Scandinavian Sungkai Solid',
    slug: 'armchair-scandinavian-sungkai-solid',
    description: 'Kursi santai bergaya Skandinavia dengan konstruksi kayu sungkai oven solid. Kaki-kaki dibubut ramping namun sangat kuat menahan beban. Dilengkapi busa high density berlapis kain linen hangat bertekstur nyaman.',
    price: 1650000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA',
    is_active: true,
    is_featured: true,
    material: 'Kayu Sungkai Oven + Premium Textured Linen',
    dimensions: '68 x 72 x 82 cm (Tinggi Dudukan 44 cm)',
    finish: 'Bleached Natural Matte Sealant',
    images: [
      {
        id: 'img-2-1',
        product_id: 'prod-armchair-scandi',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEtSe3HTAKqJHCF_UEkE6Z1DuROSEyAkTLB9SNxc0rIRQKv4i9nbC3ClAyBAnnqr4LPl3qZOChlsBAfKg4Ox7gG7fqbJAa4ktMLDbiCoIgY6AaiEQLzV7L5VYBrn7OXiUYH8dxwlLRrJCjEkFcCrjsxz-AxyfkfFAwwMiYOl4x-iQxbFyQS7uS8BXlf6ZxievJgcAR1Wh1hk7VjX6caSYgaTvYVIeVVCObPGf-XAVKVA56f1sPnrOrA',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-credenza-japandi',
    category_id: 'cat-lemari-rak',
    name: 'Credenza TV Japandi Minimalis',
    slug: 'credenza-tv-japandi-minimalis',
    description: 'Kabinet TV berkonsep Japandi (Japanese-Scandinavian) dengan pintu geser kisi-kisi kayu jati solid. Memberikan sirkulasi udara optimal untuk perangkat elektronik di dalamnya serta menambah estetika ruang keluarga.',
    price: 2950000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfI_NqRg7Xv95D_8TN3MOkUr-apag5YKcmU2USr9dsH2XXn8mlapJ8Jj0qUFuHDOJAmDzdsXr__HtdrjzP9djk5Yfyhv9CZO8QHVgQwdvnUQLTWGNvsz4RdNGwMvh2wfhiC8KAxPfjOYMYqxdenUahCFXT5PnjvRtn4tNpRujEkHQ-qHzoRNwiPCtUHRNdOH6LujJ-oKLDwOaOadMaQBsUu5FlQ_qi-QkjoBUrDBbL40j5r8lPQxwlQ',
    is_active: true,
    is_featured: true,
    material: 'Kayu Jati Solid + Handle Brass Kuningan',
    dimensions: '160 x 42 x 52 cm',
    finish: 'Teak Oil Natural Satin',
    images: [
      {
        id: 'img-3-1',
        product_id: 'prod-credenza-japandi',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfI_NqRg7Xv95D_8TN3MOkUr-apag5YKcmU2USr9dsH2XXn8mlapJ8Jj0qUFuHDOJAmDzdsXr__HtdrjzP9djk5Yfyhv9CZO8QHVgQwdvnUQLTWGNvsz4RdNGwMvh2wfhiC8KAxPfjOYMYqxdenUahCFXT5PnjvRtn4tNpRujEkHQ-qHzoRNwiPCtUHRNdOH6LujJ-oKLDwOaOadMaQBsUu5FlQ_qi-QkjoBUrDBbL40j5r8lPQxwlQ',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-rak-modular-pine',
    category_id: 'cat-lemari-rak',
    name: 'Rak Dinding Serbaguna Modular Pinus',
    slug: 'rak-dinding-serbaguna-modular-pinus',
    description: 'Rak dinding gantung minimalis dari kayu pinus pilihan tanpa mata kayu mati. Dapat dipasang secara modular horizontal maupun vertikal untuk menata buku, tanaman hias, atau koleksi keramik kesayangan.',
    price: 750000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ',
    is_active: true,
    is_featured: true,
    material: 'Kayu Pinus Solid Pilihan',
    dimensions: '90 x 22 x 65 cm',
    finish: 'Water-based Clear Sealant Ramah Lingkungan',
    images: [
      {
        id: 'img-4-1',
        product_id: 'prod-rak-modular-pine',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdHLfVX7_rVhk4nTmZU-KYB-qUESB944nrPyLq660IXW_e015yZ9278Sx_IEtVGSDj56aOP2QDpt5mvI9o_CgR3NFuVin44gLtkjhUhz_XE-ymHROlUHPERoPaBX2Jb_p5QOVpI2hgISr6CSPzy734P2KAPGsBnkIX6Fmhw2KTLidjLrNxKHTYOmotEXjyGJNf-Tc7BmWznQbksO04EKmJpJLUQKeVNlxrNrM-QkHdLWx4RFp3W10sQ',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-meja-kerja-trembesi',
    category_id: 'cat-meja',
    name: 'Meja Kerja Live Edge Trembesi Suar',
    slug: 'meja-kerja-live-edge-trembesi-suar',
    description: 'Meja kerja kayu trembesi solid satu lembar utuh tanpa sambungan (live edge) dengan lekukan alami pohon di kedua tepinya. Sangat eksklusif untuk ruang direksi, home office, maupun ruang pertemuan.',
    price: 5400000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPE288UfMY3wJNl9sWzhZ8ITFnQChtcE1kBgMLEuM3EoMZZ3Lze5BfSqs_0gfd0E1JTq02KxVrQGxAFxhRvu5EkY439u1bQkumCYIDZqpU0bWS6YnfIqyHj3WSPXxP80YBE-kJgCcsye5OuJSlC03mm4LXHsz1fuYsIzv8UaCP1FBL_IrKY5AwADtWo65IlupkvRYdEfA-hNhSbGS-mi1Yao_9ftENlv7n9GFFL9Nku9E9kEkNU5vgbg',
    is_active: true,
    is_featured: false,
    material: 'Kayu Trembesi Suar Utuh Solid (Tebal 7 cm)',
    dimensions: '200 x 85-95 x 76 cm',
    finish: 'Glossy / Semi-Matte Epoxy Resin Coating',
    images: [
      {
        id: 'img-5-1',
        product_id: 'prod-meja-kerja-trembesi',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPE288UfMY3wJNl9sWzhZ8ITFnQChtcE1kBgMLEuM3EoMZZ3Lze5BfSqs_0gfd0E1JTq02KxVrQGxAFxhRvu5EkY439u1bQkumCYIDZqpU0bWS6YnfIqyHj3WSPXxP80YBE-kJgCcsye5OuJSlC03mm4LXHsz1fuYsIzv8UaCP1FBL_IrKY5AwADtWo65IlupkvRYdEfA-hNhSbGS-mi1Yao_9ftENlv7n9GFFL9Nku9E9kEkNU5vgbg',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-set-kursi-kafe',
    category_id: 'cat-kursi-sofa',
    name: 'Set Meja dan Kursi Kafe Mahoni Solid',
    slug: 'set-meja-kursi-kafe-mahoni-solid',
    description: 'Set perabot kafe terdiri dari 1 meja bistro bundar dan 2 kursi sandaran lengkung berbahan kayu mahoni tua. Dikerjakan dengan finishing walnut deep brown yang tahan tumpahan air dan pemakaian harian komersial.',
    price: 2100000,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
    is_active: true,
    is_featured: false,
    material: 'Kayu Mahoni Oven Grade A',
    dimensions: 'Meja Dia 70 x T 75 cm, Kursi Standar Kafe',
    finish: 'Dark Walnut Semi-Gloss PU',
    images: [
      {
        id: 'img-6-1',
        product_id: 'prod-set-kursi-kafe',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
        sort_order: 1
      }
    ],
    created_at: new Date().toISOString()
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Meja Kerja Solid Trembesi Live Edge',
    description: 'Pengerjaan meja kerja eksekutif satu lembar kayu trembesi solid tanpa sambungan dengan tebal 7 cm untuk apartemen residensial.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPE288UfMY3wJNl9sWzhZ8ITFnQChtcE1kBgMLEuM3EoMZZ3Lze5BfSqs_0gfd0E1JTq02KxVrQGxAFxhRvu5EkY439u1bQkumCYIDZqpU0bWS6YnfIqyHj3WSPXxP80YBE-kJgCcsye5OuJSlC03mm4LXHsz1fuYsIzv8UaCP1FBL_IrKY5AwADtWo65IlupkvRYdEfA-hNhSbGS-mi1Yao_9ftENlv7n9GFFL9Nku9E9kEkNU5vgbg',
    category: 'Residensial',
    location: 'Kebayoran Baru, Jakarta Selatan',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-2',
    title: 'Rak Buku Minimalis Modular Kayu Jati Belanda',
    description: 'Instalasi rak dinding floor-to-ceiling dengan finishing natural matte untuk ruang baca keluarga di kawasan BSD.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuAJmWsi3C1t9tewBW3jjlzLUK7sJjPoMj2OJrII5qPiX8qjlpDMGxJvaNTxI-j_Zx5-899jAin23cTI_Z_q9M_5nNPNkLl3grjTyKgXQf8s9np3LVseXUmg9QyBqIzeY-iTbY8WlYFoeBLCfPFBvn65pwrvHj_RD6maqX-Tm7CRJ3UQZlXFVUL5GwG3fAPaYgQy9Xo0fFO_uR7N3GSTZDezul7Qeu8K9onvY3NRlAsLsCi85rCtyHg',
    category: 'Interior Rumah',
    location: 'BSD City, Tangerang',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-3',
    title: 'Set Kursi dan Meja Kafe Kayu Mahoni',
    description: 'Pengerjaan 12 set furnitur kafe komersial berbahan kayu mahoni oven dengan daya tahan cuaca semi-outdoor.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgyizXejC96nuADUU_mKweM9X_i72ko4OaZw0CnLm9YF71u2CV0D_G9nvw3JKt8SXSUhVEATGH6ezLXLKQl9sBhM9fB-9Os_o5Z0lgYoAjGAfdpFPsbooWP4ovR_zxr1eYZ7rbXECt0YhEP_uqOPSdss006DeHIiq7ZTi2fhh7jW5-bFaNV9UlvKU-ee0vZNY3jQY5SeihjJpryut0G5_QIFM6-OPvPxhfCJ3hscG3ft-kaTjxVhPlg',
    category: 'Kafe dan Komersial',
    location: 'Sentul, Bogor',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-4',
    title: 'Kitchen Island dan Bar Stool Kayu Jati',
    description: 'Meja bar dapur bersih dengan top table kayu jati selebar 80 cm bertekstur urat halus dipadu stool ergonomis.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_8luy2woQQRIE9H72sJbp_OoQMZ0_iCj19HpsEt_jd6uLIbgIBKBLQKNgO_hbD4V8IqbpUmWqzFwY-zqqKdr7WPr8OS24fSOGl9zlXEm2yfBodvL-t0k-d774MUhX0UGkl_ruAe1d3rjysbk0OK5da3nH2f7vmF0AvZ6RnMOkSz3XW04Hm2AElPy4gBfThbqP5wQ_Aym61I9ery3PFdEJr8pUhnPvDOaw2JW3lzB0z_g4tbYDe0SDg',
    category: 'Residensial',
    location: 'Bintaro Jaya, Tangerang Selatan',
    created_at: new Date().toISOString()
  }
];
