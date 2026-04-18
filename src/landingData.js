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
  asset('01首屏/首屏轮播图/1.png'),
  asset('01首屏/首屏轮播图/2.png'),
  asset('01首屏/首屏轮播图/3.png'),
  asset('01首屏/首屏轮播图/4.png'),
  asset('01首屏/首屏轮播图/5.png'),
];

export const heroDecor = {
  highlights: asset('01首屏/首屏四大亮点.png'),
  left: asset('01首屏/视觉元素 左.png'),
  right: asset('01首屏/视觉元素 右.png'),
  background: asset('01首屏/首屏底图.jpg'),
};

export const sectionImages = {
  about: asset('about/about-full.jpg'),
  industry: asset('行业首创/行业首创 - 整图.jpg'),
  expoDesign: asset('大会设计/大会设计.jpg'),
  expoDesignReference: asset('大会设计/20.jpg'),
  values: asset('核心价值 - 整图.jpg'),
  highlights: asset('展会亮点/展会亮点 - 整图.jpg'),
  content: asset('展会内容/展会内容 - 整图.jpg'),
  audience: asset('用户画像 - 整图.jpg'),
  review: asset('往期回顾 - 整图.jpg'),
  organizer: asset('主办方介绍.jpg'),
  contact: asset('联系我们 - 整图.jpg'),
  creatorsTitle: asset('拟邀请达人/拟邀请达人.svg'),
};

export const ctaImages = {
  default: asset('立即报名/默认.svg'),
  hover: asset('立即报名/点击.svg'),
};

export const logoItems = [
  asset('行业首创/logo - 向左轮播/Group 12.png'),
  asset('行业首创/logo - 向左轮播/Group 13.png'),
  asset('行业首创/logo - 向左轮播/Group 14.png'),
  asset('行业首创/logo - 向左轮播/Group 15.png'),
  asset('行业首创/logo - 向左轮播/Group 16.png'),
  asset('行业首创/logo - 向左轮播/Group 17.png'),
  asset('行业首创/logo - 向左轮播/Group 18.png'),
  asset('行业首创/logo - 向左轮播/Group 19.png'),
];

export const creatorTrackItems = [
  asset('行业首创/达人 - 向右轮播/Group 12.png'),
  asset('行业首创/达人 - 向右轮播/Group 13.png'),
  asset('行业首创/达人 - 向右轮播/Group 14.png'),
  asset('行业首创/达人 - 向右轮播/Group 15.png'),
  asset('行业首创/达人 - 向右轮播/Group 18.png'),
  asset('行业首创/达人 - 向右轮播/Group 19.png'),
  asset('行业首创/达人 - 向右轮播/Group 20.png'),
  asset('行业首创/达人 - 向右轮播/Group 21.png'),
  asset('行业首创/达人 - 向右轮播/Group 22.png'),
  asset('行业首创/达人 - 向右轮播/Group 23.png'),
  asset('行业首创/达人 - 向右轮播/Group 24.png'),
  asset('行业首创/达人 - 向右轮播/Group 25.png'),
  asset('行业首创/达人 - 向右轮播/Group 26.png'),
  asset('行业首创/达人 - 向右轮播/Group 27.png'),
  asset('行业首创/达人 - 向右轮播/Group 28.png'),
  asset('行业首创/达人 - 向右轮播/Group 29.png'),
];

export const creatorPages = [
  asset('拟邀请达人/达人第一页.png'),
  asset('拟邀请达人/达人第二页.png'),
];
