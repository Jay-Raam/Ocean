import type { MenuItem, MenuCategory } from "../components/sections/MenuSection";
import { assets } from "./assets";

/* ------------------------- Dining menu ------------------------- */

export const DINING_CATEGORIES: MenuCategory[] = [
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "lunch", label: "Lunch" },
  { id: "breakfast", label: "Breakfast" },
];

const special = (category: string, name: string, description: string, price: string): MenuItem => ({
  category,
  name,
  description,
  price,
  special: true,
});

export const DINING_MENU: MenuItem[] = [
  special("starters", "Daily Balinese three-course menu", "A daily changing menu of traditional Balinese dishes based on the best the market has to offer", "₹3,000"),
  { category: "starters", name: "Kangkung w. Aromatic Spices", description: "water spinach — rice — sesame dukkah — homemade coconut oil — parsley — browned butter — aromatic spices", price: "₹1,300" },
  { category: "starters", name: "Arancini & Romesco", description: "deep-fried risotto — garden thyme — confit of local lemons — burned red bell peppers — aged parmesan cheese — almonds", price: "₹1,300" },
  { category: "starters", name: "Velvet Jackfruit Soup", description: "delicious balinese classic made from young jackfruit, coconut and chicken", price: "₹1,300" },
  { category: "starters", name: "Sautéed Spinach w. Bali Pesto", description: "sautéed and fresh spinach — chili — shallots — cashews — bali pesto", price: "₹1,300" },
  { category: "starters", name: "Tomatoes w. Goat Cheese", description: "baked cherry tomatoes — palm nectar — chili — goat cheese cream", price: "₹1,300" },
  { category: "starters", name: "Rabbit w. Grilled Cream", description: "poached rabbit ballotine — leg of rabbit — fresh zucchini — juicy cucumber — dill oil — noodles — a touch of wasabi — grilled cream", price: "₹1,300" },
  { category: "starters", name: "Prawns & Carrots L'Orange", description: "grilled prawns — spicy carrots braised in orange — hazelnuts — cumin peanut butter sauce — sesame — balinese rose apples", price: "₹1,300" },
  { category: "starters", name: "Yellowfin Tuna & Mango", description: "yellowfin tuna grilled 'bleu' — ripe ocean mango — pickled raisins — sweet and sour soy vinaigrette — macadamia — oyster mushroom", price: "₹1,300" },
  { category: "starters", name: "Ceviche w. two types of Pumpkin", description: "filet of white fish as 'ceviche art' — puffed pumpkin seeds — chili vinaigrette w. homemade coconut oil — radish crudité — pomelo", price: "₹1,300" },

  special("mains", "Daily Balinese three-course menu", "A daily changing menu of traditional Balinese dishes based on the best the market has to offer", "₹3,000"),
  { category: "mains", name: "Shrimp Wonton in Green Curry", description: "shrimp mousse steamed in wonton — creamy green curry veloute — edamame beans — garden herbs — crispy cracker", price: "₹2,500" },
  { category: "mains", name: "Yellowfin & Citrus", description: "seared yellowfin tuna — salad of bali citrus fruits — ponzu sauce", price: "₹2,500" },
  { category: "mains", name: "Tiger Prawns & Pelecing", description: "grilled tiger prawns — spicy pelecing with water spinach — lemon saffron coulis — salty pistachio — garden basil", price: "₹2,500" },
  { category: "mains", name: "Spicy Avocado Chicken", description: "sautéed village chicken — cashews — young pineapple — creamy avocado", price: "₹2,500" },
  { category: "mains", name: "Grilled Pumpkin with Cashews", description: "grilled pumpkin — cashews — bali pesto — chili — pickled shallots", price: "₹2,500" },
  { category: "mains", name: "Babi Ocean", description: "braised pork breast — apple-curry marinade — nasi pear — oyster mushroom — balinese sweet corn — macadamia nut", price: "₹2,500" },
  { category: "mains", name: "Beef Tenderloin", description: "grilled australian tenderloin — red wine pepper sauce — french fries — bali herb butter — carrots — thyme", price: "₹3,600" },
  { category: "mains", name: "Fish of the Day", description: "grilled filet of fish — sautéed balinese vegetables — spicy soy sauce" },

  special("desserts", "Daily Balinese three-course menu", "A daily changing menu of traditional Balinese dishes based on the best the market has to offer", "₹3,000"),
  { category: "desserts", name: "Dark Bali Mousse", description: "intense mousse of dark bali chocolate — gran marnier — dark rum — salty coconut caramel — mango", price: "₹1,300" },
  { category: "desserts", name: "Ice Creams & Sorbets", description: "selection of today's ice creams and sorbets — crumble — cashew nuts — almond nougatine — vanilla tuilles", price: "₹1,300" },
  { category: "desserts", name: "Banana & Chocolate", description: "banana sponge cake — intense chocolate ice cream — condensed caramelized milk — salty crumble — vanilla", price: "₹1,300" },
  { category: "desserts", name: "Beetroot & Mascarpone", description: "sweet mascarpone cream — dehydrated beetroot — dill — crispy white chocolate — coconut ice cream — fresh fruits", price: "₹1,300" },
  { category: "desserts", name: "Bali Pancake", description: "soft vanilla pancake — salty coconut sauce — vanilla ice cream — crispy pineapple — ocean mango — a touch of cinnamon — palm sugar", price: "₹1,300" },
  { category: "desserts", name: "Almond Cake & Jasmine Tea", description: "creamy almond cake — boullion of jasmine tea — vanilla ice cream — citrus fruits — sweet tuilles", price: "₹1,300" },
  { category: "desserts", name: "Cinnamon & Banana Brulée", description: "cinnamon ice cream — caramelized bali bananas — vanilla tuilles", price: "₹1,300" },

  { category: "lunch", name: "Caesar Salad", description: "romaine — chicken — bacon — herbs — ceasar dressing", price: "₹1,300" },
  { category: "lunch", name: "Tuna Tataki Salad", description: "seared yellowfin — salads — herbs — nuts — avocado", price: "₹1,300" },
  { category: "lunch", name: "Bamboo Spring Rolls", description: "tuna, chicken and vegetable filling — bamboo shoots", price: "₹1,300" },
  { category: "lunch", name: "Summer Rolls", description: "fresh rolls — crayfish — chicken — herbs — peanut vinaigrette", price: "₹1,300" },
  { category: "lunch", name: "Nasi Goreng", description: "fried rice with pidgeon and chicken satés — really good", price: "₹1,300" },
  { category: "lunch", name: "Mie Goreng", description: "fried noodles with vegetables and chicken satés", price: "₹1,300" },
  { category: "lunch", name: "Bali Bolognese", description: "spaghetti bolognese w balinese urutan-sausages", price: "₹1,300" },
  { category: "lunch", name: "Club Sandwich", description: "chicken — bacon — foccacia — greens — chips — chili mayo", price: "₹1,300" },
  { category: "lunch", name: "Black Angus Burger", description: "chargrilled — sambal — bali pickles — bacon — aioli — fries", price: "₹1,500" },
  { category: "lunch", name: "Tropical Fish and Chips", description: "fish breaded in coconut, served with french fries", price: "₹1,300" },
  { category: "lunch", name: "Fish of the Day", description: "grilled fish — beurre blanc or spicy soy sauce — pilaf rice or steamed rice — greens of the day" },
  { category: "lunch", name: "Zucchini Lasagna", description: "lasagna with creamy zucchini sauce", price: "₹1,300" },
  { category: "lunch", name: "Ice Creams & Sorbets", description: "price per scoop w. crumble, tuille and nougatine", price: "₹420" },
  { category: "lunch", name: "Garden Fruits", description: "", price: "₹800" },

  { category: "breakfast", name: "Bircher müesli w. Chia", description: "", price: "₹450" },
  { category: "breakfast", name: "Hummus w. Olives", description: "", price: "₹450" },
  { category: "breakfast", name: "Home-made Yoghurt", description: "served with honey or home-made granola", price: "₹450" },
  { category: "breakfast", name: "Pancakes", description: "served with banana or coconut and maple syrup", price: "₹450" },
  { category: "breakfast", name: "Bread Basket", description: "freshly baked bread, croissant and danish pastries", price: "₹900" },
  { category: "breakfast", name: "Fruit Platter", description: "with seasonal tropical fruits", price: "₹450" },
  { category: "breakfast", name: "Two Eggs any style", description: "scrambled, fried, boiled, poached or as omelet", price: "₹450" },
  { category: "breakfast", name: "Bacon", description: "", price: "₹450" },
  { category: "breakfast", name: "Avocado Toast", description: "on whole wheat toast w. poached egg and tomato confit", price: "₹900" },
  { category: "breakfast", name: "Tuna w. Sambal Bawang", description: "", price: "₹450" },
  { category: "breakfast", name: "Mie Goreng", description: "fried noodles with vegetables and chicken satés", price: "₹1,100" },
  { category: "breakfast", name: "Balinese Satés", description: "two satés of chicken or fish", price: "₹450" },
];

export const DINING_DISCLAIMER = "All prices are in Indian Rupees (INR) and subject to 21% Tax & Service Charge.";

/* ------------------------- Bar & drinks menu ------------------------- */

export const BAR_CATEGORIES: MenuCategory[] = [
  { id: "cocktails", label: "Cocktails" },
  { id: "mocktails", label: "Mocktails" },
  { id: "wine-beer", label: "Wine & beer" },
];

export const BAR_MENU: MenuItem[] = [
  { category: "cocktails", name: "Ocean Sunset", description: "balinese arak — passion fruit — lime — house grenadine — soda", price: "₹850" },
  { category: "cocktails", name: "Lovina Breeze", description: "vodka — young coconut water — pandan — lime — mint", price: "₹850" },
  { category: "cocktails", name: "Spice Island Negroni", description: "gin — campari — sweet vermouth — clove — orange twist", price: "₹950" },
  { category: "cocktails", name: "Volcano View", description: "dark rum — banana — cold brew coffee — cinnamon — chocolate bitters", price: "₹950" },
  { category: "cocktails", name: "Arak Sour", description: "balinese arak — lime — palm sugar — egg white — nutmeg", price: "₹850" },
  { category: "cocktails", name: "Coconut Mojito", description: "white rum — coconut — mint — lime — sugar — soda", price: "₹850" },
  { category: "cocktails", name: "Jungle Bird", description: "dark rum — campari — pineapple — lime — palm sugar", price: "₹850" },
  { category: "cocktails", name: "Sundowner Spritz", description: "prosecco — aperol — soda — orange slice", price: "₹900" },

  { category: "mocktails", name: "Pandan Cooler", description: "pandan syrup — lime — mint — soda", price: "₹450" },
  { category: "mocktails", name: "Mango & Basil Smash", description: "ripe mango — basil — lime — ginger ale", price: "₹450" },
  { category: "mocktails", name: "Lychee & Lime Fizz", description: "lychee — lime — lemongrass — soda", price: "₹450" },
  { category: "mocktails", name: "Turmeric Ginger Tonic", description: "turmeric — ginger — honey — lime — tonic", price: "₹450" },

  { category: "wine-beer", name: "House White Wine", description: "glass of crisp sauvignon blanc", price: "₹900" },
  { category: "wine-beer", name: "House Red Wine", description: "glass of soft shiraz", price: "₹900" },
  { category: "wine-beer", name: "Prosecco", description: "glass of italian sparkling", price: "₹1,100" },
  { category: "wine-beer", name: "Bintang Beer", description: "bottle of balinese lager", price: "₹450" },
  { category: "wine-beer", name: "Local Craft Beer", description: "bottle of small-batch bali brew", price: "₹500" },
];

export const BAR_DISCLAIMER = "All prices are in Indian Rupees (INR) and subject to 21% Tax & Service Charge.";

/* ------------------------- Spa treatments ------------------------- */

export const SPA_CATEGORIES: MenuCategory[] = [
  { id: "massages", label: "Massages" },
  { id: "yoga", label: "Yoga" },
  { id: "body-treatments", label: "Body treatments" },
  { id: "beauty-treatments", label: "Beauty treatments" },
  { id: "childrens-treatments", label: "Childrens treatments" },
];

export const SPA_MENU: MenuItem[] = [
  { category: "massages", name: "Bali Massage", description: "A soft and relaxing massage with oil in true balinese tradition", price: "₹4,700", duration: "60 min" },
  { category: "massages", name: "Shiatsu", description: "Japanese accupressure therapy focused on balancing the body's energy flow", price: "₹4,700", duration: "60 min" },
  { category: "massages", name: "Reflexology", description: "Restoring body's energy lines by stimulating reflex points on your feet", price: "₹4,700", duration: "60 min" },
  { category: "massages", name: "Taksu Massage", description: "A combination of shiatsu and deep tissue acupressure massage designed to open the body's natural flow of energy and increase circulation.", price: "₹5,500", duration: "60 min" },
  { category: "massages", name: "Ayurveda Treatment", description: "Treatment for your individual body type based on traditional Indian philosophies of healing", price: "₹5,500", duration: "85 min" },
  { category: "massages", name: "Four hands massage", description: "Four hands of two therapists work in unison to create a unique experience that heals, relaxes and refreshes the body", price: "₹6,300", duration: "60 min" },
  { category: "massages", name: "Warm stone massage", description: "A combination of various classic massages followed by warm stones therapy. Warm stones are placed on corporal energy points for a relaxing and soothing effect", price: "₹5,500", duration: "90 min" },
  { category: "massages", name: "Ocean Massage", description: "Our most complete massage treatment. A combination of shiatsu, balinese massage, reflexology and energy transfer", price: "₹6,300", duration: "100 min" },

  { category: "yoga", name: "Morning Yoga", description: "Classic Hatha / Vinyasa Flow Yoga. Every Monday and Thursday morning at 08:00, you are invited to a free yoga session with our instructor.", price: "FREE", duration: "90 min" },
  { category: "yoga", name: "Private Sessions", description: "Classic Hatha / Vinyasa Flow Yoga. A personalised private session for up to two people with our instructor", price: "₹7,900", duration: "90 min" },

  { category: "body-treatments", name: "Aloevera/hibiscus rub", description: "A sunburn soother with wild aloe vera and hibiscus that will leave your skin hydrated and refreshed", price: "₹4,500", duration: "60 min" },
  { category: "body-treatments", name: "Bali Boreh Spice", description: "Taksu massage, reflexology, body spice rub, flower bath and aromatherapy. The ultimate balinese ritual to relieve muscle aches and increase blood circulation", price: "₹6,300", duration: "120 min" },
  { category: "body-treatments", name: "Soya Bean Scrub", description: "Balinese massage, skin cleansing with soya bean and honey, an exfoliating and invigorating body scrub made with traditional ingredients", price: "₹6,300", duration: "120 min" },
  { category: "body-treatments", name: "Javanese Mandi Lulur", description: "A luxurious treatment to smoothen and sweeten the skin. First relax with a balinese massage then a body scrub of rice flour, turmeric, and sandal wood is applied to your skin. Finish with a relaxing tropical flower bath", price: "₹7,900", duration: "120 min" },
  { category: "body-treatments", name: "Balinese Coffee Scrub", description: "Start with one hour Ocean massage, followed by a traditional Balinese coffee scrub and plain yoghurt body mask, this treatment cleanses and rejuvenating your skin. Finish with a relaxing flowers bath", price: "₹7,900", duration: "150 min" },

  { category: "beauty-treatments", name: "Natural Facial", description: "Traditional soothing and moisturizing cleansing with almond, cucumber, honey. Includes gentle exfoliation, a facial mask, facial massage and moisturising", price: "₹4,700" },
  { category: "beauty-treatments", name: "Beautifull hands", description: "Enjoy a complete manicure from your elbows to the tip of your fingers; guaranteed to leave your hands and nails looking and feeling in top condition. French & Japanese manicure available", price: "₹4,700", duration: "60 min" },
  { category: "beauty-treatments", name: "Happy Feet", description: "Soak away tired feet before enjoying a gentle foot massage followed by a cuticle treatment with special vitamin creams, nail trimming and polishing. French & Japanese pedicure available", price: "₹4,700", duration: "60 min" },
  { category: "beauty-treatments", name: "Hair & head", description: "Scalp massage with natural nuts, hibiscus and patchouli. Blood circulation and release stress scalping and firming", price: "₹4,700", duration: "60 min" },

  { category: "childrens-treatments", name: "Childrens massage", description: "20 minutes of light massage for the child.", price: "₹2,400", duration: "20 min" },
  { category: "childrens-treatments", name: "Childrens manicure", description: "Funny and colourful painting of nails on hands and feet followed by hair braiding", price: "₹2,900" },
];

export const SPA_DISCLAIMER = "All prices are in Indian Rupees (INR) and subject to 21% Tax & Service Charge.";

/* ------------------------- Villas ------------------------- */

export interface Villa {
  slug: string;
  name: string;
  description: string;
  image: string;
  hoverImage: string;
  headerImage: string;
  title: string;
  text: string;
  size: string;
  sleeps: string;
  details: string[];
  facilities: string[];
  images: string[];
  footer: string;
}

export const VILLAS: Villa[] = [
  {
    slug: "garden-villa",
    name: "Garden Villa",
    description: "Sleeps 2 adults — with a small veranda and outdoor Balinese shower",
    image: assets.stay.villas.garden.main,
    hoverImage: assets.stay.villas.garden.hover,
    headerImage: "/assets/images/09db8cff11-1785938918__garden-night-edit-copy-1920x1440-crop-q72.webp",
    title: "Simple and elegant",
    text: "68 sqm villas designed in Balinese style surrounded by tropical gardens. The villa has a spacious bedroom with an adjacent seating area and a desk for those moments you have to work.",
    size: "68 sqm",
    sleeps: "2 adults",
    details: ["Small veranda", "Outdoor Balinese shower", "Surrounded by tropical gardens"],
    facilities: ["Air conditioning", "WIFI", "Satellite TV and dvd player", "Coffee- and tea making facilities", "Safety box", "Bath robes and slippers"],
    images: [
      "/assets/images/8f9b4974ff-1785938918__gardenbathroomoutside-810x1080-crop-q72.webp",
      "/assets/images/8cc17ed421-1785938919__gardenlampsofa-810x1080-crop-q72.webp",
      "/assets/images/dfd5bc50bf-1785938918__gardenbedspreadedit-810x1080-crop-q72.webp",
    ],
    footer: assets.footers.stay,
  },
  {
    slug: "pool-villa",
    name: "Pool Villa",
    description: "Sleeps 2 adults — with a pool and outside shower",
    image: assets.stay.villas.pool.main,
    hoverImage: assets.stay.villas.pool.hover,
    headerImage: "/assets/images/862143d3cc-1785938927__walls-1920x1440-crop-q72.webp",
    title: "Cool water, warm welcome",
    text: "77 sqm villas with their own private pool and garden. A spacious bedroom with a daybed on the veranda where you can enjoy the sunset with a book in your hand.",
    size: "77 sqm",
    sleeps: "2 adults",
    details: ["Private pool", "Outside shower", "Veranda with daybed"],
    facilities: ["Air conditioning", "WIFI", "Satellite TV and dvd player", "Coffee- and tea making facilities", "Safety box", "Bath robes and slippers"],
    images: [
      "/assets/images/50dae5a8e8-1785938926__thumb-pool-studio-hover-810x1080-crop-q72.webp",
      "/assets/images/ef64322e6a-1785938926__poolstudiopool-810x1080-crop-q72.webp",
      "/assets/images/d0ea95869f-1785938916__poolvillapoollookoutcombo2-540x720-crop-q72.webp",
    ],
    footer: assets.footers.stay,
  },
  {
    slug: "luxury-pool-villa",
    name: "Luxury Pool Villa",
    description: "Sleeps 2 adults — Includes a pool, a large veranda and inside and outside bathrooms",
    image: assets.stay.villas.luxury.main,
    hoverImage: assets.stay.villas.luxury.hover,
    headerImage: "/assets/images/f399f5c7d5-1785938928__poollookout2swallows-1920x1440-crop-q72.webp",
    title: "The Ocean signature",
    text: "150 sqm of pure luxury with a private pool, a large veranda and views over the Bali sea. Inside and outside bathrooms with a large bathtub carved from local stone.",
    size: "150 sqm",
    sleeps: "2 adults",
    details: ["Private pool", "Large veranda", "Inside and outside bathrooms"],
    facilities: ["Air conditioning", "WIFI", "Satellite TV and dvd player", "Coffee- and tea making facilities", "Safety box", "Bath robes and slippers"],
    images: [
      "/assets/images/0cae6f4c27-1785938927__dipintopool-810x1080-crop-q72.webp",
      "/assets/images/4455952c61-1785938927__header-pool-villa-810x1080-crop-q72.webp",
      "/assets/images/f399f5c7d5-1785938928__poollookout2swallows-1920x1440-crop-q72.webp",
    ],
    footer: assets.footers.stay,
  },
  {
    slug: "two-bedroom-pool-villa",
    name: "Two Bedroom Pool Villa",
    description: "Sleeps 4 adults — with 2 pools, 2 bedrooms and 2 bathrooms",
    image: assets.stay.villas.twoBedroom.main,
    hoverImage: assets.stay.villas.twoBedroom.hover,
    headerImage: "/assets/images/bb83d51ce2-1785938932__masterpoolvillabalex-1920x1440-crop-q72.webp",
    title: "Room for the whole family",
    text: "180 sqm villa with two bedrooms, two bathrooms and two private pools. Perfect for families or friends travelling together, with plenty of space to relax.",
    size: "180 sqm",
    sleeps: "4 adults",
    details: ["2 private pools", "2 bedrooms", "2 bathrooms"],
    facilities: ["Air conditioning", "WIFI", "Satellite TV and dvd player", "Coffee- and tea making facilities", "Safety box", "Bath robes and slippers"],
    images: [
      "/assets/images/b209f7f3c4-1785938933__thumb-master-pool-villa-hover-810x1080-crop-q72.webp",
      "/assets/images/e7540f45ca-1785938931__leavesonwhite-810x1080-crop-q72.webp",
      "/assets/images/bb83d51ce2-1785938932__masterpoolvillabalex-1920x1440-crop-q72.webp",
    ],
    footer: assets.footers.stay,
  },
];

/* ------------------------- Discover ------------------------- */

export const DISCOVER_CARDS = [
  { title: "Secret Waterfalls", location: "North Bali", image: assets.discover.cards[0].img, to: "/discover/secret-waterfalls" },
  { title: "Dolphins of Lovina", location: "Lovina", image: assets.discover.cards[1].img, to: "/discover/dolphins-of-lovina" },
  { title: "Diving and Snorkling", location: "North Bali", image: assets.discover.cards[2].img, to: "/discover/diving-and-snorkling" },
  { title: "Golf in the Volcano", location: "Bedugul", image: assets.discover.cards[3].img, to: "/discover/golf-in-the-volcano" },
  { title: "North Bali", location: "Bali", image: assets.discover.cards[4].img, to: "/discover/north-bali" },
];

/* ------------------------- Discover details ------------------------- */

export interface DiscoverDetail {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  bigImage: string;
  blockEyebrow: string;
  blockTitle: string;
  blockText: string;
  images: string[];
  smallImage: string;
  smallImageAlt?: string;
  smallText: string;
  smallTitle?: string;
  smallEyebrow?: string;
  highlights?: string[];
  footer: string;
}

const discoverImg = (name: string) => `/assets/images/${name}`;

const DISCOVER_FOOTER = "/assets/images/b303bdec06-1785938961__footer-leaves-4-1920x480-crop-q72.webp";

export const DISCOVER_DETAILS: DiscoverDetail[] = [
  {
    slug: "secret-waterfalls",
    title: "Secret Waterfalls",
    eyebrow: "Discover Bali",
    intro:
      "Git-Git waterfall, close to Ocean, is the most famous waterfall in Bali. It's a beautiful site, with a 35 meter fall into a calm natural lake, and a popular tourist destination. On busy days hundreds of people visit, and tour buses are often parked at the entrance by the road. But hidden in the villages in the Ocean area you find waterfalls that is just as nice as Git-Git, only without the tour buses. They are still waiting to be discovered.",
    bigImage: discoverImg("kien-the-ocean-79-2880x-q72.webp"),
    blockEyebrow: "Liquid beauty",
    blockTitle: "Discover your own waterfall",
    blockText:
      "Bring good footwear. Sometimes you need a short trek to get to them. But they are worth it. Some are up to 100 meters tall, ending in crystal clear mountain pools, that are great to swim in. Remember to bring a towel. Sometimes monkeys play in the surrounding jungle, but you rarely see other tourists.",
    images: [
      discoverImg("kien-the-ocean-77-810x1080-crop-q72.webp"),
      discoverImg("rainyfacewaterfall-810x1080-crop-q72.webp"),
      discoverImg("sekumpiuledit-810x1080-crop-q72.webp"),
    ],
    smallImage: discoverImg("kien-the-ocean-82-540x720-crop-q72.webp"),
    smallText: "Most waterfalls are just a short drive from Ocean. We will be happy to take you. Ask in our reception.",
    highlights: [
      discoverImg("kien-the-ocean-72-1440x960-crop-q72.webp"),
      discoverImg("kien-the-ocean-73-1440x960-crop-q72.webp"),
      discoverImg("kien-the-ocean-85-1440x960-crop-q72.webp"),
      discoverImg("monkey-1440x960-crop-q72.webp"),
    ],
    footer: DISCOVER_FOOTER,
  },
  {
    slug: "dolphins-of-lovina",
    title: "Dolphins of Lovina",
    eyebrow: "Discover Bali",
    intro:
      "The dolphins in Lovina Bay is Lovina's greatest tourist attraction. But even jaded travelers find it moving. As the sun rises behind Bali's volcanos you head out in traditional Balinese outrigger boats. Sometimes you find only a few dozen, sometimes there are hundreds. The dolphins are often playful, breaking the surface to perform acrobatic stunts, as if they want to show off.",
    bigImage: discoverImg("darkdolphins-2880x-q72.webp"),
    blockEyebrow: "dawn excursion",
    blockTitle: "Your dolphin safari",
    blockText:
      "The dolphin boats sail as a group. The more boats, the easier it is to find the dolphins. When you reach the pod of dolphins, remember to look down. This is where most of the dolphins are, weaving between each other, chasing tuna in the clear water under the boat. Remember to bring a towel, as a cushion for your arms when leaning on the railing.",
    images: [
      discoverImg("dolphinboats-810x1080-crop-q72.webp"),
      discoverImg("dolphingirl-810x1080-crop-q72.webp"),
      discoverImg("dolphinshore-810x1080-crop-q72.webp"),
    ],
    smallImage: discoverImg("delfinsquareedit-540x720-crop-q72.webp"),
    smallText:
      "Originally, the dolphin trips started as fishing trips. When fishing for tuna, the fishermen look for the dolphins. The dolphins chase the tuna as well, so wherever they are, there's a good chance the tuna will be right ahead of them, fleeing. Soon the dolphins, not the tuna, became the purpose of the trip.",
    footer: DISCOVER_FOOTER,
  },
  {
    slug: "diving-and-snorkling",
    title: "Diving and Snorkling",
    eyebrow: "Discover Bali",
    intro:
      "North Bali offers some of the island's most famous dive sites, from the protected marine preserve Menjangan Island to the famous Liberty wreck off the coast of Tulamben. Even Lovina itself has a small reef, convenient for snorkeling and night dives.",
    bigImage: discoverImg("dvingturtle-2880x-q72.webp"),
    blockEyebrow: "North Bali's underwater world",
    blockTitle: "",
    blockText:
      "Menjangan Island features seven premier dive sites showcasing spectacular coral reefs and a rich marine ecosystem. The deep drop-off, intricate rock formations, and numerous caves create a habitat for diverse species such as groupers, jacks, turtles, seahorses, and more. The caves host sponge and soft corals, moray eels, young snappers, and batfish. With mild currents and wind protection, the area is ideal for divers of all levels.",
    images: [
      discoverImg("snorkelprep-810x1080-crop-q72.webp"),
      discoverImg("diving1tulamben-810x1080-crop-q72.webp"),
      discoverImg("snorkelboat1-810x1080-crop-q72.webp"),
    ],
    smallImage: discoverImg("tulamben3-540x720-crop-q72.webp"),
    smallText:
      "Also nearby is Tulamben, and the renowned Liberty wreck, among the world's top 15 dive sites. Originally an American supply ship in World War II, the 120m long wreck was hit by a Japanese torpedo. The ship, stranded on Tulamben's rocky beach, was pushed back into the sea by Mount Agung's 1963 eruption. Now resting at 3 to 29 meters, the wreck is adorned with coral, serving as a vibrant habitat for countless marine species.",
    footer: DISCOVER_FOOTER,
  },
  {
    slug: "golf-in-the-volcano",
    title: "Golf in the Volcano",
    eyebrow: "Discover Bali",
    intro:
      "Golf Magazine once ranked The Bali Handara Golf Club among the top 50 golf courses in the world, but today the club has a different claim to fame. The spectacular Balinese temple gates at the entrance to the club has become a popular place to be photographed, and many of the tourists posing here probably have no idea what lies beyond the beautiful gates.",
    bigImage: discoverImg("handaragates2-2880x-q72.webp"),
    blockEyebrow: "The Handara course",
    blockTitle: "",
    blockText:
      "The spectacular 18-hole championship course, designed by British Open champion Peter Thompson, is placed inside the crater of a dormant volcano, surrounded by green mountains, crater lakes and lush highland rain forests, shrouded in the mountain mists. Every time you walk around a bend in the course a new fantastic view is revealed.",
    images: [
      discoverImg("bali-handara-3-copy-810x1080-crop-q72.webp"),
      discoverImg("balihandaragate1-810x1080-crop-q72.webp"),
      discoverImg("handaragolf1-810x1080-crop-q72.webp"),
    ],
    smallImage: discoverImg("handaracourse-540x720-crop-q72.webp"),
    smallText:
      "The course is located in the highlands, 45 minutes from Ocean. The highlands have a cooler climate and it often rains in the afternoon. Best start your round early in the day.",
    footer: DISCOVER_FOOTER,
  },
  {
    slug: "north-bali",
    title: "North Bali",
    eyebrow: "Discover Bali",
    intro:
      "North Bali is home to some of Bali's most famous attractions, as well as many undiscovered gems. Most of all here is where you experience the joy of everyday island life, 'Bali as it used to be'.",
    bigImage: discoverImg("kien-the-ocean-118-2880x-q72.webp"),
    blockEyebrow: "north bali",
    blockTitle: "Bali as it used to be",
    blockText:
      "Yes, there are famous temples in North Bali. But it is also the perfect place for people who wish to experience Bali as it was before the tourists arrived. Experience the joy of Balinese everyday life. Stumble upon a Balinese dance class for the village children. Improvise a picnic at a sacred lake. Stroll through a village, wave to the kids, and make small talk with the friendly villagers.",
    images: [
      discoverImg("black-sand-beach-2-810x1080-crop-q72.webp"),
      discoverImg("baliricesmile-810x1080-crop-q72.webp"),
      discoverImg("ceremoniesblessing-810x1080-crop-q72.webp"),
    ],
    smallImage: discoverImg("ulundanu111x-540x720-crop-q72.webp"),
    smallEyebrow: "Ulun Danu",
    smallTitle: "The Temple of the Goddess of The Lake",
    smallText:
      "The Ulun Danu water temple, situated on Lake Bratan's shores, is a significant example of Balinese temple architecture. Constructed in 1633, the temple venerates Dewi Danu, the Goddess of the Lake. Serving a vital role in Bali, it hosts ceremonies to secure water supply for Bedugul's farms. The intricately adorned main temple tower, called the meru, is a masterpiece.",
    footer: DISCOVER_FOOTER,
  },
];

/* ------------------------- Packages details ------------------------- */

export interface PackageDetail {
  slug: string;
  title: string;
  eyebrow: string;
  text: string;
  image?: string;
  bigImage: string;
  paragraphs: string[];
  includes?: string[];
  bookingCode: string;
  images: string[];
  footer: string;
}

const PACKAGE_FOOTER = "/assets/images/a87b0cb205-1785938968__footer-leaves-1-1920x480-crop-q72.webp";

export const PACKAGE_DETAILS: PackageDetail[] = [
  {
    slug: "ocean-dolphins",
    title: "Ocean & dolphins",
    eyebrow: "Package — 2 nights or more - save over 15%",
    text: "Experience the dolphins of Lovina with our most popular package",
    image: "/assets/images/dolhinwatching-540x720-crop-q72.webp",
    bigImage: "/assets/images/dolphinslovinaedit-2880x-q72.webp",
    paragraphs: [
      "Every morning at dawn pods of dolphins gather to chase tuna in Lovina Bay. Most mornings you see dozens, maybe hundreds, often breaking the surface to perform acrobatic somersaults, as if they want to impress us. We set out to find them in traditional Balinese fishing boats, and even the most jaded travelers get moved as the sun rises behind Bali's volcanos.",
      "With this package, our most popular, you experience the dolphins of Lovina together with a sampling of the best Ocean has to offer.",
    ],
    includes: [
      "2 nights or more in the villa of your choice",
      "Return transfer to any point in Bali",
      "1x 60 min. massage treatment pr. person",
      "1x 3 course dinner pr. person",
      "A dawn dolphin safari in Lovina Bay",
    ],
    bookingCode: "OceanDolphins",
    images: [
      "/assets/images/217f1cbc5b-1785938935__blacktable-1440x960-crop-q72.webp",
      "/assets/images/kien-the-ocean-65-810x1080-crop-q72.webp",
      "/assets/images/ketutspa2-810x1080-crop-q72.webp",
    ],
    footer: PACKAGE_FOOTER,
  },
  {
    slug: "ocean-romance",
    title: "Ocean Romance",
    eyebrow: "Package — 2 nights or more - save over 15%",
    text: "For honeymoons or romantic getaways",
    bigImage: "/assets/images/wayankulit-mw-2880x-q72.webp",
    paragraphs: [
      "On your honeymoon? Or just on a romantic getaway? Relax, enjoy and be pampered together by Ocean with our most romantic package.",
    ],
    includes: [
      "2 nights or more in the villa of your choice",
      "Return transfer to any point in Bali",
      "1x 120 min. couple massage",
      "1x 3 course dinner for two",
      "Daily sunset cocktails",
    ],
    bookingCode: "OceanRomance",
    images: [
      "/assets/images/mistypool-810x1080-crop-q72.webp",
      "/assets/images/eveningdrink2x-810x1080-crop-q72.webp",
      "/assets/images/singingbowl-810x1080-crop-q72.webp",
    ],
    footer: PACKAGE_FOOTER,
  },
  {
    slug: "ocean-spa-bliss",
    title: "Ocean Spa Bliss",
    eyebrow: "Package — Save over 15%",
    text: "Experience the best of the Ocean spa",
    image: "/assets/images/ketutspa2-540x720-crop-q72.webp",
    bigImage: "/assets/images/spafountains-2880x-q72.webp",
    paragraphs: ["Experience the best of the Ocean spa"],
    includes: [
      "2 nights or more in the villa of your choice",
      "Return transfer to any point in Bali",
      "1x 120 min. signature treatment",
      "1x 60 min. massage treatment",
      "1x 3 course dinner pr. person",
    ],
    bookingCode: "OceanSpaBliss",
    images: [
      "/assets/images/spatea-810x1080-crop-q72.webp",
      "/assets/images/spamassgae2-810x1080-crop-q72.webp",
      "/assets/images/pathwayocean2023-810x1080-crop-q72.webp",
    ],
    footer: PACKAGE_FOOTER,
  },
];

/* ------------------------- Blog ------------------------- */

/* ------------------------- Testimonials ------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  origin: string;
  stay?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "From the moment we arrived we felt like guests in a friend's home — the gardens, the scent of cloves, the sound of the sea. We came for two nights and stayed for five.",
    name: "Amara & Rohan",
    origin: "Mumbai, India",
    stay: "Luxury Pool Villa",
  },
  {
    quote:
      "The dolphin safari at dawn was the most moving thing we did in Bali. Coming home to a villa with a private pool and a sunset cocktail made it perfect.",
    name: "Claire Dubois",
    origin: "Lyon, France",
    stay: "Pool Villa",
  },
  {
    quote:
      "Hard to find, hard to leave — the reviews were right. The restaurant alone is worth the journey; the spa put us in a trance.",
    name: "James & Sophie Carter",
    origin: "London, UK",
    stay: "Ocean & Dolphins package",
  },
  {
    quote:
      "We got married in the gardens at sunset. The team made it feel effortless, intimate and completely ours. We will never forget it.",
    name: "Priya & Arjun",
    origin: "Bengaluru, India",
    stay: "Wedding in the gardens",
  },
  {
    quote:
      "Fifteen villas, one beautiful garden, and a calm you don't find in the big resorts. Our two-bedroom pool villa was perfect for our family.",
    name: "Thomas & Family",
    origin: "Berlin, Germany",
    stay: "Two Bedroom Pool Villa",
  },
  {
    quote:
      "The best food we ate in Bali, served by the pool under the stars. The daily Balinese three-course menu was a highlight every single evening.",
    name: "Elena & Marco",
    origin: "Milan, Italy",
    stay: "Ocean Romance package",
  },
  {
    quote:
      "Yoga at sunrise, a Javanese Mandi Lulur treatment, and a book on the veranda. Ocean is a place to simply be still.",
    name: "Sarah Nguyen",
    origin: "Singapore",
    stay: "Ocean Spa Bliss package",
  },
  {
    quote:
      "My partner proposed in the pool villa at sunset. The team arranged everything — candles, flowers, dinner for two. We will be back for our anniversary.",
    name: "Hannah & Grace",
    origin: "Sydney, Australia",
    stay: "Luxury Pool Villa",
  },
  {
    quote:
      "From the airport transfer to the farewell, everything was personal and warm. The hidden waterfalls nearby are as magical as everyone says.",
    name: "Kenji Watanabe",
    origin: "Tokyo, Japan",
    stay: "Garden Villa",
  },
  {
    quote:
      "We've stayed in luxury resorts all over Asia. Ocean is different: small, soulful, and impossibly beautiful.",
    name: "David & Nina",
    origin: "New York, USA",
    stay: "Pool Villa",
  },
];

/* ------------------------- FAQ ------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do I get to Ocean from the airport?",
    answer:
      "Ngurah Rai International Airport (DPS) is a scenic 2.5–3 hour drive from Ocean. We arrange private transfers for all guests, and every package includes a return transfer to any point in Bali. Ask our team when booking and we will have your driver waiting.",
  },
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in is from 14:00 and check-out is at 12:00. Early arrivals and late departures are welcome whenever the villa is free — just let us know your plans and we will do our best to accommodate.",
  },
  {
    question: "Are children welcome at Ocean?",
    answer:
      "Yes — Ocean is a wonderful place for families. The Two Bedroom Pool Villa sleeps four, the spa offers children's treatments, and Lovina's calm black-sand beach is a short stroll away.",
  },
  {
    question: "Which currencies and payment methods do you accept?",
    answer:
      "Rates are quoted in Indonesian Rupiah (IDR) and Indian Rupees (INR) across the site. Settle your bill by card at the resort; the deposit to confirm a booking is taken by card at the end of the reservation.",
  },
  {
    question: "What are the benefits of booking directly?",
    answer:
      "Booking directly with Ocean guarantees our best available rate, a complimentary daily sundowner cocktail, and one hour of massage per stay. Ask about current promo codes before you reserve.",
  },
  {
    question: "Is the restaurant open to non-guests?",
    answer:
      "Absolutely — our prize-winning bistro and the Ocean Bar welcome outside guests. Dinner is served by the poolside most evenings; reservations are recommended, especially at sunset.",
  },
  {
    question: "Do I need to book spa treatments in advance?",
    answer:
      "Treatments can be booked on arrival, but we recommend reserving in advance — especially for the signature rituals and couples' treatments — so we can prepare oils and therapists for you.",
  },
  {
    question: "Can you arrange dolphin trips and excursions?",
    answer:
      "Our reception arranges dawn dolphin safaris, waterfall treks, diving and snorkelling trips, and temple visits with trusted local guides. The Ocean & Dolphins package includes the dolphin safari.",
  },
  {
    question: "Is there Wi-Fi at the resort?",
    answer:
      "Yes — fast, complimentary Wi-Fi covers the villas, restaurant and pool areas, so you can stay connected when the sea view lets you look away.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation terms depend on the rate you book — some rates are flexible, some are non-refundable. Your rate details are shown during booking, and our team is always happy to clarify before you confirm.",
  },
];

/* ------------------------- Gallery ------------------------- */

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/assets/images/09db8cff11-1785938918__garden-night-edit-copy-1920x1440-crop-q72.webp", alt: "The gardens at dusk", category: "Villas" },
  { src: "/assets/images/862143d3cc-1785938927__walls-1920x1440-crop-q72.webp", alt: "A pool villa at Ocean", category: "Villas" },
  { src: "/assets/images/f399f5c7d5-1785938928__poollookout2swallows-1920x1440-crop-q72.webp", alt: "Sunset from the pool", category: "Villas" },
  { src: "/assets/images/bb83d51ce2-1785938932__masterpoolvillabalex-1920x1440-crop-q72.webp", alt: "Two Bedroom Pool Villa", category: "Villas" },
  { src: "/assets/images/71a9790fa4-1785938939__poolsidetable-2880x-q72.webp", alt: "Dinner by the pool", category: "Dining" },
  { src: "/assets/images/217f1cbc5b-1785938935__blacktable-1440x960-crop-q72.webp", alt: "The Ocean restaurant", category: "Dining" },
  { src: "/assets/images/16935f89f6-1785938940__sunsetsceneedit-vignettetight-2880x-q72.webp", alt: "Sunset over the Bali sea", category: "Dining" },
  { src: "/assets/images/4e6bbcb15b-1785938943__spabuildinggrey-2880x-q72.webp", alt: "The Ocean spa", category: "Spa" },
  { src: "/assets/images/4512c71ebc-1785938943__spafountains-810x1080-crop-q72.webp", alt: "Spa fountains", category: "Spa" },
  { src: "/assets/images/handaragates2-2880x-q72.webp", alt: "The Handara gates", category: "Discover" },
  { src: "/assets/images/darkdolphins-2880x-q72.webp", alt: "Dolphins of Lovina at dawn", category: "Discover" },
  { src: "/assets/images/kien-the-ocean-118-2880x-q72.webp", alt: "North Bali coastline", category: "Discover" },
  { src: "/assets/images/wayankulit-mw-2880x-q72.webp", alt: "Celebrations at Ocean", category: "Celebrate" },
  { src: "/assets/images/kien-the-ocean-348-2880x-q72.webp", alt: "The road to Ocean", category: "Discover" },
  { src: "/assets/images/c240ba5e12-1785938921__kien-the-ocean-1-2880x-q72.webp", alt: "The gardens at Ocean", category: "Villas" },
  { src: "/assets/images/1f6141a387-1785938914__kien_theocean-6.jpg", alt: "Ocean at night", category: "Villas" },
];

/* ------------------------- Celebrate packages ------------------------- */

export interface CelebratePackage {
  title: string;
  eyebrow: string;
  text: string;
  includes: string[];
  image: string;
}

export const CELEBRATE_PACKAGES: CelebratePackage[] = [
  {
    title: "Ocean Vows",
    eyebrow: "Wedding in the gardens",
    text: "A sunset ceremony in our gardens with dinner for up to thirty guests.",
    includes: [
      "Sunset ceremony in the gardens",
      "Bali blessing & musicians",
      "Dinner under the stars for up to 30 guests",
      "Bridal suite night for the couple",
      "1x 120 min. couple massage",
    ],
    image: "/assets/images/092ec6635c-1785938958__temburgiaflower-810x1080-crop-q72.webp",
  },
  {
    title: "Vow Renewal",
    eyebrow: "Say it again, by the sea",
    text: "A quiet ceremony to renew your promises, with a celebration dinner for two.",
    includes: [
      "Private ceremony at sunset",
      "Flowers & candlelit decoration",
      "3-course dinner for two by the pool",
      "1x 120 min. couple massage",
      "Sunset cocktails for two",
    ],
    image: "/assets/images/bcb8635e31-1785938936__eveningdrink2x-810x1080-crop-q72.webp",
  },
  {
    title: "Intimate Elopement",
    eyebrow: "Just the two of you",
    text: "Everything you need for a private, effortless ceremony — just bring each other.",
    includes: [
      "Private ceremony in the gardens",
      "Bali blessing",
      "Dinner for two under the stars",
      "Flowers, photography & videography",
      "1x 120 min. couple massage",
    ],
    image: "/assets/images/mistypool-810x1080-crop-q72.webp",
  },
];

/* ------------------------- Experiences ------------------------- */

export interface Experience {
  slug: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  image: string;
}

export const EXPERIENCE_CATEGORIES = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "wellness", label: "Wellness" },
  { id: "nature", label: "Nature" },
];

export const EXPERIENCES: Experience[] = [
  {
    slug: "dolphin-safari",
    title: "Dawn Dolphin Safari",
    category: "adventure",
    duration: "3 hours",
    description: "Set out at dawn in a traditional Balinese outrigger to find pods of dolphins playing in Lovina Bay as the sun rises behind the volcanoes.",
    image: assets.discover.cards[1].img,
  },
  {
    slug: "waterfall-trek",
    title: "Secret Waterfall Trek",
    category: "nature",
    duration: "Half day",
    description: "Trek through tropical jungle to hidden waterfalls most tourists never find, with crystal-clear mountain pools perfect for swimming.",
    image: assets.discover.cards[0].img,
  },
  {
    slug: "cooking-class",
    title: "Balinese Cooking Class",
    category: "culture",
    duration: "4 hours",
    description: "Learn to prepare traditional Balinese dishes using fresh ingredients from our organic garden, guided by our head chef.",
    image: assets.dining.wontons,
  },
  {
    slug: "snorkelling-menjangan",
    title: "Snorkelling at Menjangan",
    category: "adventure",
    duration: "Full day",
    description: "Explore the spectacular coral reefs of Menjangan Island, a protected marine preserve with crystal-clear waters and vibrant sea life.",
    image: assets.discover.cards[2].img,
  },
  {
    slug: "sunrise-yoga",
    title: "Sunrise Yoga",
    category: "wellness",
    duration: "90 min",
    description: "Start your morning with a free Hatha or Vinyasa flow session in the gardens, led by our resident instructor every Monday and Thursday.",
    image: assets.relax.kien215,
  },
  {
    slug: "village-walk",
    title: "Village Walk",
    category: "culture",
    duration: "2 hours",
    description: "Stroll through the neighbouring villages, wave to the kids, visit a temple, and experience the joy of everyday Balinese life.",
    image: assets.discover.smallImage,
  },
  {
    slug: "golf-volcano",
    title: "Golf in the Volcano",
    category: "adventure",
    duration: "Half day",
    description: "Play a round at the Handara Golf Club, set inside the crater of a dormant volcano, surrounded by mountains and crater lakes.",
    image: assets.discover.cards[3].img,
  },
  {
    slug: "temple-visit",
    title: "Temple Visit",
    category: "culture",
    duration: "Half day",
    description: "Visit the sacred water temple of Ulun Danu on Lake Bratan and other iconic North Bali temples with a knowledgeable local guide.",
    image: assets.discover.cards[4].img,
  },
];

/* ------------------------- Sustainability ------------------------- */

export interface SustainabilityPillar {
  title: string;
  eyebrow: string;
  text: string;
  image: string;
}

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    title: "From Our Gardens",
    eyebrow: "Organic & local",
    text: "The vegetables on your plate come from our own organic gardens. We grow what we serve — herbs, greens, tropical fruits — picked fresh each morning for the kitchen. No imports, no shortcuts.",
    image: assets.dining.kien304,
  },
  {
    title: "Our Village",
    eyebrow: "Community first",
    text: "Ocean employs people from the surrounding villages. Our therapists, gardeners, cooks and guides are our neighbours. When you stay with us, you support the community that makes North Bali special.",
    image: assets.discover.smallImage,
  },
  {
    title: "Ocean & Conservation",
    eyebrow: "Protecting the sea",
    text: "The Bali Sea is our backyard. We work with local fishermen and marine conservation groups to protect the reefs and marine life around Lovina, ensuring the ocean stays vibrant for generations.",
    image: assets.discover.cards[2].img,
  },
  {
    title: "Zero Waste Kitchen",
    eyebrow: "Close the loop",
    text: "Our kitchen composts organic waste back into the garden. We use virgin coconut oil pressed in our village, and our spa products are made from natural, locally sourced ingredients.",
    image: assets.dining.settingTables,
  },
];

/* ------------------------- Offers ------------------------- */

export interface Offer {
  title: string;
  eyebrow: string;
  text: string;
  badge?: string;
  image: string;
  includes: string[];
  validUntil: string;
  code?: string;
}

export const OFFERS: Offer[] = [
  {
    title: "Rainy Season Escape",
    eyebrow: "Limited time — Save 25%",
    text: "North Bali's green season is its most beautiful. Lush gardens, dramatic sunsets, and fewer visitors. Book 3+ nights and save 25% on any villa.",
    badge: "25% OFF",
    image: assets.stay.villas.luxury.main,
    includes: [
      "3+ nights in the villa of your choice",
      "25% off the best available rate",
      "Daily breakfast for two",
      "Complimentary sunset cocktail",
    ],
    validUntil: "30 September 2026",
    code: "GREEN25",
  },
  {
    title: "Early Bird 2027",
    eyebrow: "Book early, save more",
    text: "Plan ahead for the new year. Book your 2027 stay before December and enjoy our lowest rates, plus a complimentary massage.",
    badge: "BEST RATE",
    image: assets.stay.villas.pool.main,
    includes: [
      "Any villa, any dates in 2027",
      "Lowest available rate guaranteed",
      "1x 60 min. massage per person",
      "Free cancellation until 14 days before arrival",
    ],
    validUntil: "31 December 2026",
    code: "EARLY27",
  },
  {
    title: "Stay 5, Pay 4",
    eyebrow: "The longer you stay, the more you save",
    text: "Book five nights and only pay for four. More time by the pool, more sunsets, more of the good life — at the price of a short break.",
    image: assets.stay.villas.luxury.main,
    includes: [
      "5 nights in the villa of your choice",
      "Pay for 4 nights only",
      "Daily breakfast for two",
      "1x 60 min. massage per person",
    ],
    validUntil: "31 March 2027",
    code: "STAY5PAY4",
  },
];

/* ------------------------- Travel guide ------------------------- */

export interface TravelGuideItem {
  title: string;
  text: string;
}

export const TRAVEL_GUIDE_GETTING_HERE: TravelGuideItem[] = [
  {
    title: "By air",
    text: "Fly into Ngurah Rai International Airport (DPS) in southern Bali. Most major airlines serve the airport, with connections across Asia, Australia, Europe and the Middle East.",
  },
  {
    title: "Airport transfer",
    text: "The drive from the airport to Ocean takes 2.5–3 hours through rice terraces and volcanic scenery. Every package includes a private return transfer. We can also arrange one-off transfers — just ask when you book.",
  },
  {
    title: "By car from other parts of Bali",
    text: "If you are already in Bali, we can arrange a driver from Ubud (3 hours), Uluwatu (4 hours), Seminyak (3.5 hours) or anywhere else on the island.",
  },
];

export const TRAVEL_GUIDE_SEASONS: TravelGuideItem[] = [
  {
    title: "Dry season (April – October)",
    text: "The busiest and sunniest months. Warm days, cool evenings, and low humidity. Perfect for beach days, diving and outdoor dining. Book well in advance.",
  },
  {
    title: "Green season (November – March)",
    text: "Brief afternoon showers keep the gardens lush and the air fresh. Fewer visitors, lower rates, and dramatic sunsets. The mornings are usually clear — ideal for waterfall treks and dolphin safaris.",
  },
];

export const TRAVEL_GUIDE_PRACTICAL: TravelGuideItem[] = [
  {
    title: "Currency",
    text: "The local currency is Indonesian Rupiah (IDR). We also quote prices in Indian Rupees (INR). ATMs are available in Lovina, and we accept card payments at the resort.",
  },
  {
    title: "What to pack",
    text: "Light, breathable clothing for the tropical climate. A light rain jacket for the green season. Swimwear, sunscreen and a hat for the pool and beach. Comfortable shoes for temple visits and waterfall treks.",
  },
  {
    title: "Tipping",
    text: "Tipping is not expected but always appreciated. A small gratuity for spa therapists, drivers and restaurant staff is a kind way to say thank you.",
  },
  {
    title: "Health & safety",
    text: "Drink bottled water (provided in your villa). Lovina is a safe and relaxed area. Our reception can help with any medical needs — the nearest clinic is a short drive away.",
  },
  {
    title: "Connectivity",
    text: "Fast, complimentary Wi-Fi covers the villas, restaurant and pool areas. A local SIM card is inexpensive and available at the airport or in Lovina.",
  },
];

/* ------------------------- Gift vouchers ------------------------- */

export interface GiftVoucher {
  title: string;
  eyebrow: string;
  text: string;
  image: string;
}

export const GIFT_VOUCHERS: GiftVoucher[] = [
  {
    title: "A Night in Paradise",
    eyebrow: "From $250",
    text: "One night in a Garden Villa with breakfast for two. The simplest, most thoughtful gift — a night at Ocean.",
    image: assets.stay.villas.garden.main,
  },
  {
    title: "Spa Ritual for Two",
    eyebrow: "From $180",
    text: "A 120-minute couple massage at the Ocean Spa, followed by herbal tea and time by the fountains.",
    image: assets.relax.split,
  },
  {
    title: "Dinner Under the Stars",
    eyebrow: "From $120",
    text: "A three-course dinner for two at the Ocean restaurant, served by the poolside with a bottle of wine.",
    image: assets.dining.barImage,
  },
  {
    title: "The Full Ocean Experience",
    eyebrow: "From $600",
    text: "Two nights in a Pool Villa, daily breakfast, a dolphin safari, a couple massage and a three-course dinner. The ultimate gift.",
    image: assets.stay.villas.pool.main,
  },
];

export const BLOG_CARDS = [
  { title: "Discovering Lovina, Bali and Why It's a Tranquil Paradise for Travelers", image: "/assets/images/85672d7b95-1785938969__the-ocean-resort-seo-dec-c02-1-1200x628-810x1080-crop-q72.webp", date: "24 July 2025", href: "/blog/lovina-bali" },
  { title: "Experience Tranquility At the Ultimate Pool Villa in Lovina", image: "/assets/images/99cd0a0b83-1785938968__the-ocean-resort-seo-nov-c02-1-1200x628-1-810x1080-crop-q72.webp", date: "14 July 2025", href: "/blog/pool-villa-in-lovina" },
  { title: "Bali Trip: Explore Natural Beauty with Luxury Hotels in Lovina", image: "/assets/images/126453c002-1785938968__the-ocean-resort-seo-apr-c02-1-1200x628-810x1080-crop-q72.webp", date: "11 July 2025", href: "/blog/luxury-hotels-in-lovina" },
  { title: "Bali Volcanoes Experiences: Famous Mount for Hiking", image: "/assets/images/e67c047882-1785938967__the-ocean-resort-seo-jun-c02-1-1200x628-81x108-crop-q72.webp", date: "11 July 2025", href: "/blog/bali-volcanoes-guide" },
  { title: "7 Romantic Things to Do in Lovina for Couples", image: "/assets/images/d1465a6575-1785938967__the-ocean-resort-seo-jun-c01-1-1200x628-810x1080-crop-q72.webp", date: "11 July 2025", href: "/blog/things-to-do-in-lovina-for-couples" },
  { title: "Discover the Best Hotel in Lovina, Bali | Ocean Resort", image: "/assets/images/124be0568d-1785938966__the-ocean-resort-seo-nov-c01-1-1200x628-810x1080-crop-q72.webp", date: "10 July 2025", href: "/blog/best-hotel-in-lovina-bali" },
  { title: "Unveiling the Perfect Family Retreat: Guide to Choosing the Best Hotel in Bali", image: "/assets/images/9a5654618d-1785938966__guide-to-choosing-the-best-hotel-in-bali-01-810x1080-crop-q72.webp", date: "10 July 2025", href: "/blog/guide-to-choosing-the-best-hotel-in-bali" },
  { title: "Navigating Lovina Beach: What to See, Do, and Eat", image: "/assets/images/368b40beeb-1785938966__navigating-lovina-beach-03-810x1080-crop-q72.webp", date: "6 July 2025", href: "/blog/navigating-lovina-beach" },
  { title: "Your Lovely Romantic Getaway: Finding a Hotel in Bali for Couples", image: "/assets/images/8f864e505a-1785938965__hotel-in-bali-01-810x1080-crop-q72.webp", date: "3 July 2025", href: "/blog/hotel-in-bali" },
  { title: "Experience Relaxation Redefined at Ocean Resort Spa in Bali", image: "/assets/images/f093e68055-1785938965__resort-spa-in-bali-01-810x1080-crop-q72.webp", date: "27 June 2025", href: "/blog/ocean-resort-spa-in-bali" },
  { title: "Bali Road Trip: The Starter Guide To North Bali Hidden Gems", image: "/assets/images/27c9de271a-1785938964__bali-road-trip-01-810x1080-crop-q72.webp", date: "25 June 2025", href: "/blog/bali-road-trip-starter-guide" },
  { title: "Discovering Holistic Wellness at Your Resort Spa in Bali", image: "/assets/images/d5f6c4c931-1785938964__the-ocean-resort-seo-nov-c02-1-4200x2800-810x1080-crop-q72.webp", date: "20 June 2025", href: "/blog/resort-spa-in-bali" },
  { title: "The Ultimate Relaxation: Top 10 Reasons to Stay at Ocean Hotel Pool Villa in Lovina", image: "/assets/images/17eb35c4f0-1785938963__the-ocean-resort-seo-oct-c01-1-1400x960-810x1080-crop-q72.webp", date: "18 June 2025", href: "/blog/pool-villa-resort-in-lovina" },
  { title: "Reasons to Choose Beautiful Villas in Lovina as Your Next Getaway", image: "/assets/images/fa339d9499-1785938963__the-ocean-resort-seo-aug-c02-1-810x1080-crop-q72.webp", date: "12 May 2025", href: "/blog/beautiful-villas-in-lovina" },
  { title: "Explore North Bali: A Hidden Gem for Nature Lovers and Culture Enthusiasts", image: "/assets/images/65b5cb3879-1785938962__49c711ba-add0-493a-98d0-303708020345-810x1080-crop-q72.webp", date: "1 December 2024", href: "/blog/north-bali" },
];
