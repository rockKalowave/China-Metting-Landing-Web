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
  asset('01首屏/首屏轮播图/1.webp'),
  asset('01首屏/首屏轮播图/2.webp'),
  asset('01首屏/首屏轮播图/3.webp'),
  asset('01首屏/首屏轮播图/4.webp'),
  asset('01首屏/首屏轮播图/5.webp'),
];

export const heroDecor = {
  left: asset('01首屏/视觉元素 左.png'),
  right: asset('01首屏/视觉元素 右.png'),
  background: asset('01首屏/首屏底图.webp'),
};

export const sectionImages = {
  about: asset('about/about-full.webp'),
  industry: asset('行业首创/行业首创 - 整图.webp'),
  expoDesign: asset('大会设计/大会设计.webp'),
  expoDesignReference: asset('大会设计/20.webp'),
  values: asset('品牌机构与达人.webp'),
  highlights: asset('展会亮点/展会亮点 - 整图.webp'),
  content: asset('展会内容/展会内容 - 整图.webp'),
  audience: asset('用户画像 - 整图.webp'),
  review: asset('往期回顾 - 整图.webp'),
  organizer: asset('主办方介绍.webp'),
  contact: asset('联系我们 - 整图.webp'),
  creatorsTitle: asset('拟邀请达人/拟邀请达人.svg'),
};

export const ctaImages = {
  default: asset('立即报名/默认.svg'),
  hover: asset('立即报名/点击.svg'),
};

export const sideButtonImages = {
  register: asset('右侧按钮/立即报名.svg'),
  sponsor: asset('右侧按钮/招商合作.svg'),
  sponsorHover: asset('右侧按钮/招商合作(悬浮状态）.svg'),
  consult: asset('右侧按钮/大会咨询.svg'),
  consultHover: asset('右侧按钮/大会咨询(悬浮状态）.svg'),
};

export const logoItems = [
  asset('行业首创/logo - 向左轮播/Group 12.webp'),
  asset('行业首创/logo - 向左轮播/Group 13.webp'),
  asset('行业首创/logo - 向左轮播/Group 14.webp'),
  asset('行业首创/logo - 向左轮播/Group 15.webp'),
  asset('行业首创/logo - 向左轮播/Group 16.webp'),
  asset('行业首创/logo - 向左轮播/Group 17.webp'),
  asset('行业首创/logo - 向左轮播/Group 18.webp'),
  asset('行业首创/logo - 向左轮播/Group 19.webp'),
];

export const creatorTrackItems = [
  asset('行业首创/达人 - 向右轮播/Group 12.webp'),
  asset('行业首创/达人 - 向右轮播/Group 13.webp'),
  asset('行业首创/达人 - 向右轮播/Group 14.webp'),
  asset('行业首创/达人 - 向右轮播/Group 15.webp'),
  asset('行业首创/达人 - 向右轮播/Group 18.webp'),
  asset('行业首创/达人 - 向右轮播/Group 19.webp'),
  asset('行业首创/达人 - 向右轮播/Group 20.webp'),
  asset('行业首创/达人 - 向右轮播/Group 21.webp'),
  asset('行业首创/达人 - 向右轮播/Group 22.webp'),
  asset('行业首创/达人 - 向右轮播/Group 23.webp'),
  asset('行业首创/达人 - 向右轮播/Group 24.webp'),
  asset('行业首创/达人 - 向右轮播/Group 25.webp'),
  asset('行业首创/达人 - 向右轮播/Group 26.webp'),
  asset('行业首创/达人 - 向右轮播/Group 27.webp'),
  asset('行业首创/达人 - 向右轮播/Group 28.webp'),
  asset('行业首创/达人 - 向右轮播/Group 29.webp'),
];

export const creatorPages = [
  asset('拟邀请达人/达人第一页.webp'),
  asset('拟邀请达人/达人第二页.webp'),
];
