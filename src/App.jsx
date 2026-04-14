import { useEffect, useMemo, useRef, useState } from 'react';
import {
  creatorTrackItems,
  ctaImages,
  heroDecor,
  heroSlides,
  invitedCreators,
  logoItems,
  navItems,
  sectionImages,
} from './landingData';

function ImageSection({ id, image, alt, children, bleed = false }) {
  return (
    <section className={`content-section${bleed ? ' content-section--bleed' : ''}`} id={id}>
      <div className="section-shell">
        <div className="section-panel">
          <img className="section-image" src={image} alt={alt} />
        </div>
        {children}
      </div>
    </section>
  );
}

function Marquee({ items, direction = 'left', itemClassName = '' }) {
  const trackItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="marquee">
      <div className={`marquee__track marquee__track--${direction}`}>
        {trackItems.map((item, index) => (
          <div className={`marquee__item ${itemClassName}`.trim()} key={`${direction}-${index}`}>
            <img src={item} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeSlide, setActiveSlide] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);
  const navSyncTimerRef = useRef(null);

  useEffect(() => {
    document.title = 'KAGGE 2026 - Kalodata AI Go Global Exposition';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      if (navSyncTimerRef.current) {
        window.clearTimeout(navSyncTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const currentMarker = window.scrollY + 180;
      let currentSection = 'home';

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= currentMarker) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      if (navSyncTimerRef.current) {
        window.clearTimeout(navSyncTimerRef.current);
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      navSyncTimerRef.current = window.setTimeout(() => {
        setActiveSection(sectionId);
      }, 720);
    }
  };

  return (
    <div className="landing-page">
      <header className="site-header">
        <div className="site-header__inner">
          <button className="site-brand" onClick={() => scrollToSection('home')} type="button">
            <span className="site-brand__mark" />
            <span className="site-brand__text">Kalodata</span>
          </button>
          <nav aria-label="主导航" className="site-nav">
            {navItems.map((item) => (
              <button
                className={
                  item.id === activeSection
                    ? 'site-nav__link site-nav__link--active'
                    : 'site-nav__link'
                }
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button className="site-header__cta" onClick={() => scrollToSection('contact')} type="button">
            立即报名
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img alt="" aria-hidden="true" className="hero__decor hero__decor--left" src={heroDecor.left} />
          <img alt="" aria-hidden="true" className="hero__decor hero__decor--right" src={heroDecor.right} />
          <img alt="" aria-hidden="true" className="hero__background" src={heroDecor.background} />
          <div className="section-shell hero__shell">
            <div className="hero__copy">
              <span className="hero__eyebrow"></span>
              <h1 className="hero__title">KACE 2026</h1>
              <p className="hero__subtitle">中国最大的AI跨境电商与海外达人合作展览会</p>
              <p className="hero__subtitle hero__subtitle--en">2026 kalodata AI Cross-border E-commerce & Influencer Expo </p>
              <p className="hero__meta">2026年8月4日 - 8月5日 | 深圳福田国际会展中心</p>
              <p className="hero__meta"></p>
              <div className="hero__actions">
                <button className="hero__button hero__button--primary" onClick={() => scrollToSection('contact')} type="button">
                  立即报名
                </button>
                <button className="hero__button hero__button--ghost" onClick={() => scrollToSection('content')} type="button">
                  查看议程
                </button>
              </div>
            </div>

            <div className="hero__highlights">
              <img alt="KAGGE 首屏四大亮点" src={heroDecor.highlights} />
            </div>

            {/* 展会现场照片展示条 */}
            <div className="expo-showcase">
              <div className="expo-showcase__track">
                {[...heroSlides, ...heroSlides].map((slide, index) => (
                  <img className="expo-showcase__item" key={`expo-${index}`} src={slide} alt={`展会现场 ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ImageSection id="industry" image={sectionImages.industry} alt="KAGGE 行业首创版块设计图">
          <div className="section-appendix">
            <div className="appendix-copy">
              <p className="appendix-copy__eyebrow">Global Brand & Creator Matrix</p>
              <h2 className="appendix-copy__title">全球品牌与达人矩阵</h2>
              <p className="appendix-copy__text">
                联动头部品牌、平台、机构与达人资源，以滚动展陈的方式强化“全球共创”的现场势能。
              </p>
            </div>
            <Marquee itemClassName="marquee__item--logo" items={logoItems} />
            <Marquee direction="right" itemClassName="marquee__item--creator" items={creatorTrackItems} />
          </div>
        </ImageSection>

        <ImageSection id="design" image={sectionImages.expoDesign} alt="KAGGE 大会设计版块设计图">
          <div className="section-panel section-panel--support">
            <img className="section-image" src={sectionImages.expoDesignReference} alt="KAGGE 大会设计参考视觉" />
          </div>
        </ImageSection>

        <ImageSection id="values" image={sectionImages.values} alt="KAGGE 核心价值版块设计图" />
        <ImageSection id="highlights" image={sectionImages.highlights} alt="KAGGE 展会亮点版块设计图" />
        <ImageSection id="content" image={sectionImages.content} alt="KAGGE 展会内容版块设计图" />
        <ImageSection id="audience" image={sectionImages.audience} alt="KAGGE 用户画像版块设计图" />

        <section className="content-section" id="creators">
          <div className="section-shell">
            <div className="section-title-image">
              <img alt="拟邀请达人" src={sectionImages.creatorsTitle} />
            </div>
            <div className="creator-grid">
              {invitedCreators.map((creator) => (
                <article className="creator-card" key={creator}>
                  <img alt="KAGGE 拟邀请达人卡片" src={creator} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <ImageSection id="review" image={sectionImages.review} alt="KAGGE 往期回顾版块设计图" />
        <ImageSection id="organizer" image={sectionImages.organizer} alt="KAGGE 主办方介绍版块设计图" />
        <ImageSection id="contact" image={sectionImages.contact} alt="KAGGE 联系我们版块设计图" />

        <section className="content-section content-section--partners">
          <div className="section-shell">
            <div className="section-title-image section-title-image--compact">
              <img alt="合作伙伴" src={sectionImages.partnersTitle} />
            </div>
            <div className="partner-grid">
              {logoItems.map((item) => (
                <div className="partner-grid__item" key={item}>
                  <img alt="合作伙伴 Logo" src={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <button
        aria-label="立即报名"
        className="floating-cta"
        onClick={() => scrollToSection('contact')}
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
        type="button"
      >
        <img alt="" src={ctaHovered ? ctaImages.hover : ctaImages.default} />
      </button>
    </div>
  );
}

export default App;
