/**
 * Centralized asset map.
 * All media is served locally from /public/assets.
 */
const img = (name: string) => `/assets/images/${name}`;
const vid = (name: string) => `/assets/videos/${name}`;

export const assets = {
  fonts: {
    whyteLight: "/assets/fonts/ABCWhyte-Light.woff2",
    whyteRegular: "/assets/fonts/ABCWhyte-Regular.woff2",
    kaftan: "/assets/fonts/KaftanSerif-Regular.woff2",
  },

  /** Home hero */
  hero: {
    video: vid("header-video-compressed.mp4"),
    poster: img("1f6141a387-1785938914__kien_theocean-6.jpg"),
  },

  /** Home intro collage */
  intro: {
    lobbyview: img("012b8d2501-1785938915__lobbyview-540x720-crop-q72.webp"),
    blacktable: img("77c926f93e-1785938911__blacktable-1080x1440-crop-q72.webp"),
    kien228: img("d076611b2a-1785938913__kien-the-ocean-228-1080x1440-crop-q72.webp"),
    poolcombo: img("d0ea95869f-1785938916__poolvillapoollookoutcombo2-540x720-crop-q72.webp"),
    wayankulit: img("f0de12a143-1785938917__wayankulit-540x720-crop-q72.webp"),
    restaurantocean1: img("90793d0953-1785938916__restaurantocean1-540x720-crop-q72.webp"),
  },

  /** Stay slider */
  staySlider: {
    background: [
      img("09db8cff11-1785938918__garden-night-edit-copy-1920x1440-crop-q72.webp"),
      img("862143d3cc-1785938927__walls-1920x1440-crop-q72.webp"),
      img("f399f5c7d5-1785938928__poollookout2swallows-1920x1440-crop-q72.webp"),
      img("bb83d51ce2-1785938932__masterpoolvillabalex-1920x1440-crop-q72.webp"),
    ],
    card: [
      img("dfd5bc50bf-1785938918__gardenbedspreadedit-540x720-crop-q72.webp"),
      img("ef64322e6a-1785938926__poolstudiopool-540x720-crop-q72.webp"),
      img("4455952c61-1785938927__header-pool-villa-540x720-crop-q72.webp"),
      img("e7540f45ca-1785938931__leavesonwhite-540x720-crop-q72.webp"),
    ],
  },

  /** Restaurant / Dining */
  dining: {
    split: img("217f1cbc5b-1785938935__blacktable-1440x960-crop-q72.webp"),
    header: img("71a9790fa4-1785938939__poolsidetable-2880x-q72.webp"),
    smallImage: img("a65989b65e-1785938937__header-restaurant-cropped-v2-810x1080-crop-q72.webp"),
    wontons: img("98c9b97fa3-1785938940__wontons-540x720-crop-q72.webp"),
    kien304: img("abeb3c7f2c-1785938938__kien-the-ocean-304-810x1080-crop-q72.webp"),
    settingTables: img("655887892a-1785938939__setting-tables-2-copy-810x1080-crop-q72.webp"),
    doubleSlider: [
      img("d361056a4e-1785938935__blacktuna-1440x960-crop-q72.webp"),
      img("8c6f0fa4b9-1785938934__arancini1-1440x960-crop-q72.webp"),
      img("e1bf581618-1785938935__balinesmenublackboard-1440x960-crop-q72.webp"),
      img("2038d5002b-1785938935__dediherbing1-1440x960-crop-q72.webp"),
      img("b7722b90f4-1785938935__beehive-1440x960-crop-q72.webp"),
      img("43d5914032-1785938936__dollarcookingbw-1440x960-crop-q72.webp"),
      img("990314bb06-1785938938__madesmiling-1440x960-crop-q72.webp"),
      img("49c64cfd3b-1785938940__waiterspoolside-1440x960-crop-q72.webp"),
      img("217f1cbc5b-1785938935__blacktable-1440x960-crop-q72.webp"),
      img("bcb8635e31-1785938936__eveningdrink2x-1440x960-crop-q72.webp"),
      img("afa39924e7-1785938938__menulight-1440x960-crop-q72.webp"),
      img("7ab9d2ee22-1785938935__beesmile-1440x960-crop-q72.webp"),
      img("1792b227a4-1785938939__restochairstable-1440x960-crop-q72.webp"),
      img("e580ba765b-1785938940__tunamango-1440x960-crop-q72.webp"),
    ],
    cookbook: img("5d61087be9-1785938935__cookbook-1080x1440-crop-q72.webp"),
    bigImage: img("16935f89f6-1785938940__sunsetsceneedit-vignettetight-2880x-q72.webp"),
    barImage: img("bcb8635e31-1785938936__eveningdrink2x-540x720-crop-q72.webp"),
    footer: img("5975de972d-1785938936__footer-menu-1920x480-crop-q72.webp"),
  },

  /** Spa / Relax */
  relax: {
    split: img("4512c71ebc-1785938943__spafountains-810x1080-crop-q72.webp"),
    header: img("4e6bbcb15b-1785938943__spabuildinggrey-2880x-q72.webp"),
    smallImage: img("6c056bd40a-1785938943__singingbowl-720x1440-crop-q72.webp"),
    kien215: img("609d24229e-1785938941__kien-the-ocean-215-540x720-crop-q72.webp"),
    ekaBreathe: img("ab182a64d4-1785938940__ekabreathe-540x720-crop-q72.webp"),
    kien208: img("7e96ab7c76-1785938941__kien-the-ocean-208-cropped-2880x-q72.webp"),
    bigImage: img("d235813305-1785938942__kien-the-ocean-228-810x1080-crop-q72.webp"),
    kien404: img("114603c6f6-1785938942__kien-the-ocean-404-810x1080-crop-q72.webp"),
    kien402: img("bce522589e-1785938942__kien-the-ocean-402-540x720-crop-q72.webp"),
    footer: img("b303bdec06-1785938961__footer-leaves-4-1920x480-crop-q72.webp"),
  },

  /** Discover */
  discover: {
    header: img("b63261fd39-1785939614__navigation-img-10-720x1440-crop-q72.webp"),
    cards: [
      { img: img("9540424942-1785938946__rainyfacewaterfall-810x1080-crop-q72.webp"), title: "Secret Waterfalls" },
      { img: img("b07e914995-1785938947__dolphincaptainport-810x1080-crop-q72.webp"), title: "Dolphins of Lovina" },
      { img: img("d915bf5508-1785938948__divingboat90-810x1080-crop-q72.webp"), title: "Diving and Snorkling" },
      { img: img("0fb3b4ca1f-1785938950__balihgolfer-810x1080-crop-q72.webp"), title: "Golf in the Volcano" },
      { img: img("d360f40897-1785938949__footer-lampion-1920x480-crop-q72.webp"), title: "North Bali" },
    ],
    bigImage: img("0f3568287c-1785938952__kien-the-ocean-121-810x1080-crop-q72.webp"),
    smallImage: img("30753b58e7-1785938953__kien-the-ocean-433-540x720-crop-q72.webp"),
    bigImageWide: img("5934108075-1785938969__kien-the-ocean-348-2880x-q72.webp"),
    footer: img("b303bdec06-1785938961__footer-leaves-4-1920x480-crop-q72.webp"),
  },

  /** Packages */
  packages: {
    dolphins: img("101d70dc8f-1785938954__dolhinwatching-810x1080-crop-q72.webp"),
    romance: img("092ec6635c-1785938958__temburgiaflower-810x1080-crop-q72.webp"),
    spaBliss: img("d36ef54e58-1785938960__kien-the-ocean-402-810x1080-crop-q72.webp"),
    header: img("679ae5d4dc-1785938961__navigation-img-2-720x1440-crop-q72.webp"),
    footer: img("a87b0cb205-1785938968__footer-leaves-1-1920x480-crop-q72.webp"),
  },

  /** Blog */
  blog: {
    header: img("fa44f1d9af-1785938969__navigation-img-3-720x1440-crop-q72.webp"),
    bigImage: img("5934108075-1785938969__kien-the-ocean-348-2880x-q72.webp"),
    footer: img("a87b0cb205-1785938968__footer-leaves-1-1920x480-crop-q72.webp"),
  },

  /** Stay page */
  stay: {
    header: img("91a2e0e5d5-1785938934__navigation-image-stay-720x1440-crop-q72.webp"),
    bigImage: img("7209a2e652-1785938934__kien-the-ocean-223-2880x-q72.webp"),
    bigImage2: img("004b477e24-1785938934__kien-the-ocean-352-cropped-1080x-q72.webp"),
    footer: img("8b954c387e-1785938927__footer-gate-1920x480-crop-q72.webp"),
    villas: {
      garden: {
        main: img("dfd5bc50bf-1785938918__gardenbedspreadedit-810x1080-crop-q72.webp"),
        hover: img("8cc17ed421-1785938919__gardenlampsofa-810x1080-crop-q72.webp"),
      },
      pool: {
        main: img("ef64322e6a-1785938926__poolstudiopool-810x1080-crop-q72.webp"),
        hover: img("50dae5a8e8-1785938926__thumb-pool-studio-hover-810x1080-crop-q72.webp"),
      },
      luxury: {
        main: img("4455952c61-1785938927__header-pool-villa-810x1080-crop-q72.webp"),
        hover: img("0cae6f4c27-1785938927__dipintopool-810x1080-crop-q72.webp"),
      },
      twoBedroom: {
        main: img("e7540f45ca-1785938931__leavesonwhite-810x1080-crop-q72.webp"),
        hover: img("b209f7f3c4-1785938933__thumb-master-pool-villa-hover-810x1080-crop-q72.webp"),
      },
    },
  },

  /** Villa detail galleries (garden villa used as the template) */
  villaGallery: [
    img("00f28f6d5a-1785938919__gardenintlayers-copy-1440x960-crop-q72.webp"),
    img("8145f06c86-1785938920__gardenmainroomcurtains-1440x960-crop-q72.webp"),
    img("c6cd57526c-1785938920__gardenwalllamp-1440x960-crop-q72.webp"),
    img("aad09fe6ca-1785938920__gardenvillasink8-1440x960-crop-q72.webp"),
    img("3f8323c3d1-1785938920__goldlamp-1440x960-crop-q72.webp"),
    img("3c984e7433-1785938918__gardenbathroomedit-1440x960-crop-q72.webp"),
    img("8f9b4974ff-1785938918__gardenbathroomoutside-1440x960-crop-q72.webp"),
    img("060ee57139-1785938920__gardenvillacarvings-1440x960-crop-q72.webp"),
  ],
  villaFacilitiesImage: img("fd860587e2-1785938923__villa8vanity-1080x1440-crop-q72.webp"),
  villaBigImage: img("c240ba5e12-1785938921__kien-the-ocean-1-2880x-q72.webp"),

  /** Footer imagery (row-book background per page) */
  footers: {
    home: img("0dd9f63be2-1785938911__footer-leaves-2-1920x480-crop-q72.webp"),
    stay: img("8b954c387e-1785938927__footer-gate-1920x480-crop-q72.webp"),
    dining: img("5975de972d-1785938936__footer-menu-1920x480-crop-q72.webp"),
    relax: img("b303bdec06-1785938961__footer-leaves-4-1920x480-crop-q72.webp"),
    discover: img("d360f40897-1785938949__footer-lampion-1920x480-crop-q72.webp"),
    packages: img("a87b0cb205-1785938968__footer-leaves-1-1920x480-crop-q72.webp"),
    blog: img("a87b0cb205-1785938968__footer-leaves-1-1920x480-crop-q72.webp"),
  },

  /** Side navigation images (per section) */
  navImages: {
    stay: img("91a2e0e5d5-1785938934__navigation-image-stay-720x1440-crop-q72.webp"),
    dining: img("217f1cbc5b-1785938935__blacktable-720x1440-crop-q72.webp"),
    relax: img("6c056bd40a-1785938943__singingbowl-720x1440-crop-q72.webp"),
    discover: img("b63261fd39-1785939614__navigation-img-10-720x1440-crop-q72.webp"),
    packages: img("679ae5d4dc-1785938961__navigation-img-2-720x1440-crop-q72.webp"),
    blog: img("fa44f1d9af-1785938969__navigation-img-3-720x1440-crop-q72.webp"),
  },

  /** New editorial pages (about / contact / gallery / celebrate / reviews) */
  pages: {
    about: {
      header: img("kien-the-ocean-118-2880x-q72.webp"),
      intro: [
        img("012b8d2501-1785938915__lobbyview-540x720-crop-q72.webp"),
        img("f0de12a143-1785938917__wayankulit-540x720-crop-q72.webp"),
        img("90793d0953-1785938916__restaurantocean1-540x720-crop-q72.webp"),
      ],
      smallImage: img("d076611b2a-1785938913__kien-the-ocean-228-1080x1440-crop-q72.webp"),
      bigImage: img("c240ba5e12-1785938921__kien-the-ocean-1-2880x-q72.webp"),
    },
    contact: {
      header: img("16935f89f6-1785938940__sunsetsceneedit-vignettetight-2880x-q72.webp"),
      beach: img("black-sand-beach-2-810x1080-crop-q72.webp"),
      smallImage: img("f093e68055-1785938965__resort-spa-in-bali-01-810x1080-crop-q72.webp"),
    },
    celebrate: {
      header: img("wayankulit-mw-2880x-q72.webp"),
      images: [
        img("092ec6635c-1785938958__temburgiaflower-810x1080-crop-q72.webp"),
        img("bcb8635e31-1785938936__eveningdrink2x-540x720-crop-q72.webp"),
        img("mistypool-810x1080-crop-q72.webp"),
      ],
      bigImage: img("5934108075-1785938969__kien-the-ocean-348-2880x-q72.webp"),
      couples: img("d235813305-1785938942__kien-the-ocean-228-810x1080-crop-q72.webp"),
    },
    gallery: {
      bigImage: img("1f6141a387-1785938914__kien_theocean-6.jpg"),
    },
    reviews: {
      bigImage: img("e7ad9e43ad-1785938971__meta-theocean-860x540-crop-q72.webp"),
    },
    footers: {
      default: img("9a89755429-1785938954__footer-default-1920x480-crop-q72.webp"),
      celebrate: img("8b954c387e-1785938927__footer-gate-1920x480-crop-q72.webp"),
    },
  },

  credits: [
    img("288fcef42e-1785938954__image-credits-1.jpg"),
    img("b168ef538f-1785938970__image-credits-2.jpg"),
    img("98343cc363-1785938911__image-credits-3.jpg"),
    img("f09db0b02e-1785938970__image-credits-13.jpg"),
    img("ec74b6d617-1785938970__image-credits-7.jpg"),
    img("985f1d518b-1785938970__image-credits-8.jpg"),
    img("15695ffe73-1785938970__image-credits-4.jpg"),
    img("77b0f48d1d-1785938970__image-credits-9.jpg"),
    img("f6cee461f1-1785938970__image-credits-10.jpg"),
    img("6d99a8cf6b-1785938970__image-credits-5.jpg"),
    img("54eed1b82a-1785938970__image-credits-6.jpg"),
    img("c7af1ba0ed-1785938970__image-credits-12.jpg"),
    img("bbf41d810c-1785938970__image-credits-11.jpg"),
  ],
} as const;
