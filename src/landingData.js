const asset = (relativePath) => encodeURI(`${import.meta.env.BASE_URL}landing/${relativePath}`);

export const navItems = [
  { id: 'about', label: '大会介绍' },
  { id: 'content', label: '展会内容' },
  { id: 'highlights', label: '展会亮点' },
  { id: 'industry', label: '行业首创' },
  { id: 'values', label: '核心价值' },
  { id: 'creators', label: '拟邀达人' },
  { id: 'audience', label: '用户画像' },
  { id: 'contact', label: '联系我们' },
];

export const heroSlides = [
  asset('01棣栧睆/棣栧睆杞挱鍥?1.png'),
  asset('01棣栧睆/棣栧睆杞挱鍥?2.png'),
  asset('01棣栧睆/棣栧睆杞挱鍥?3.png'),
  asset('01棣栧睆/棣栧睆杞挱鍥?4.png'),
  asset('01棣栧睆/棣栧睆杞挱鍥?5.png'),
];

export const heroDecor = {
  highlights: asset('01棣栧睆/棣栧睆鍥涘ぇ浜偣.png'),
  left: asset('01棣栧睆/瑙嗚鍏冪礌 宸?png'),
  right: asset('01棣栧睆/瑙嗚鍏冪礌 鍙?png'),
  background: asset('01棣栧睆/棣栧睆搴曞浘.jpg'),
};

export const sectionImages = {
  about: asset('about/about-full.jpg'),
  industry: asset('琛屼笟棣栧垱/琛屼笟棣栧垱 - 鏁村浘.jpg'),
  expoDesign: asset('澶т細璁捐/澶т細璁捐.jpg'),
  expoDesignReference: asset('澶т細璁捐/20.jpg'),
  values: asset('鍝佺墝鏈烘瀯涓庤揪浜?jpg'),
  highlights: asset('灞曚細浜偣/灞曚細浜偣 - 鏁村浘.jpg'),
  content: asset('灞曚細鍐呭/灞曚細鍐呭 - 鏁村浘.jpg'),
  audience: asset('鐢ㄦ埛鐢诲儚 - 鏁村浘.jpg'),
  review: asset('寰€鏈熷洖椤?- 鏁村浘.jpg'),
  organizer: asset('涓诲姙鏂逛粙缁?jpg'),
  contact: asset('鑱旂郴鎴戜滑 - 鏁村浘.jpg'),
  creatorsTitle: asset('鎷熼個璇疯揪浜?鎷熼個璇疯揪浜?svg'),
};

export const ctaImages = {
  default: asset('绔嬪嵆鎶ュ悕/榛樿.svg'),
  hover: asset('绔嬪嵆鎶ュ悕/鐐瑰嚮.svg'),
};

export const sideButtonImages = {
  register: asset('鍙充晶鎸夐挳/绔嬪嵆鎶ュ悕.svg'),
  sponsor: asset('鍙充晶鎸夐挳/鎷涘晢鍚堜綔.svg'),
  sponsorHover: asset('鍙充晶鎸夐挳/鎷涘晢鍚堜綔(鎮诞鐘舵€侊級.svg'),
  consult: asset('鍙充晶鎸夐挳/澶т細鍜ㄨ.svg'),
  consultHover: asset('鍙充晶鎸夐挳/澶т細鍜ㄨ(鎮诞鐘舵€侊級.svg'),
};

export const logoItems = [
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 12.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 13.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 14.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 15.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 16.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 17.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 18.png'),
  asset('琛屼笟棣栧垱/logo - 鍚戝乏杞挱/Group 19.png'),
];

export const creatorTrackItems = [
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 12.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 13.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 14.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 15.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 18.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 19.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 20.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 21.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 22.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 23.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 24.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 25.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 26.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 27.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 28.png'),
  asset('琛屼笟棣栧垱/杈句汉 - 鍚戝彸杞挱/Group 29.png'),
];

export const creatorPages = [
  asset('鎷熼個璇疯揪浜?杈句汉绗竴椤?png'),
  asset('鎷熼個璇疯揪浜?杈句汉绗簩椤?png'),
];
