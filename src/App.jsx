import { useEffect, useMemo, useRef, useState } from 'react';
import {
  creatorTrackItems,
  heroDecor,
  heroSlides,
  invitedCreators,
  logoItems,
  navItems,
  sectionImages,
} from './landingData';
import SignupPage from './pages/signup/SignupPage';
import BuyPage from './pages/buy/buy';
import TicketPage from './pages/ticket/TicketPage';
import PayPage from './pages/pay/PayPage';
import { getRelativePath, toFullPath } from './utils/navigation';

const registerQrImage = encodeURI(`${import.meta.env.BASE_URL}landing/01首屏/register-qr.svg`);
const SPONSORSHIP_URL = 'https://www.wjx.top/vm/tU5XHKW.aspx#';

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

function RegistrationQrCard({ compact = false }) {
  return (
    <div className={compact ? 'registration-qr registration-qr--compact' : 'registration-qr'}>
      <div className="registration-qr__frame">
        <img src={registerQrImage} alt="KACE 2026 立即报名二维码" />
      </div>
      <span className="registration-qr__label">立即报名</span>
    </div>
  );
}

function HomePage({ activeSection, scrollToSection }) {
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
                className={item.id === activeSection ? 'site-nav__link site-nav__link--active' : 'site-nav__link'}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img alt="" aria-hidden="true" className="hero__decor hero__decor--left" src={heroDecor.left} />
          <img alt="" aria-hidden="true" className="hero__decor hero__decor--right" src={heroDecor.right} />
          <img alt="" aria-hidden="true" className="hero__background" src={heroDecor.background} />
          <div className="section-shell hero__shell">
            <div className="hero__copy">
              <span className="hero__eyebrow" />
              <h1 className="hero__title">KACE 2026</h1>
              <p className="hero__subtitle">中国最大的AI跨境电商与海外达人合作展览会</p>
              <p className="hero__subtitle hero__subtitle--en">2026 Kalodata AI Cross-border E-commerce &amp; Influencer Expo</p>
              <p className="hero__meta">2026年8月4日 - 8月5日 | 深圳福田国际会展中心</p>
              <div className="hero__actions">
                <RegistrationQrCard />
              </div>
            </div>

            <aside className="hero-side-panel" aria-label="首屏快捷入口">
              <RegistrationQrCard compact />
              <button className="hero-side-panel__button" onClick={() => window.location.href = SPONSORSHIP_URL} type="button">
                招商合作
              </button>
              <button
                className="hero-side-panel__button hero-side-panel__button--accent"
                onClick={() => scrollToSection('contact')}
                type="button"
              >
                大会咨询
              </button>
            </aside>

            <div className="hero__highlights">
              <img alt="KAGGE 首屏四大亮点" src={heroDecor.highlights} />
            </div>

            <div className="expo-showcase">
              <div className="expo-showcase__track">
                {[...heroSlides, ...heroSlides].map((slide, index) => (
                  <img className="expo-showcase__item" key={`expo-${index}`} src={slide} alt={`展会现场 ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ImageSection id="industry" image={sectionImages.industry} alt="行业首创板块">
          <div className="section-appendix">
            <div className="appendix-copy">
              <p className="appendix-copy__eyebrow">Global Brand &amp; Creator Matrix</p>
              <h2 className="appendix-copy__title">全球品牌与达人矩阵</h2>
              <p className="appendix-copy__text">联动头部品牌、平台、机构与达人资源，以滚动展陈的方式强化“全球共创”的现场势能。</p>
            </div>
            <Marquee itemClassName="marquee__item--logo" items={logoItems} />
            <Marquee direction="right" itemClassName="marquee__item--creator" items={creatorTrackItems} />
          </div>
        </ImageSection>

        <ImageSection id="design" image={sectionImages.expoDesign} alt="大会设计板块">
          <div className="section-panel section-panel--support">
            <img className="section-image" src={sectionImages.expoDesignReference} alt="大会设计参考视觉" />
          </div>
        </ImageSection>

        <ImageSection id="values" image={sectionImages.values} alt="核心价值板块" />
        <ImageSection id="highlights" image={sectionImages.highlights} alt="展会亮点板块" />
        <ImageSection id="content" image={sectionImages.content} alt="展会内容板块" />
        <ImageSection id="audience" image={sectionImages.audience} alt="用户画像板块" />

        <section className="content-section" id="creators">
          <div className="section-shell">
            <div className="section-title-image">
              <img alt="拟邀达人" src={sectionImages.creatorsTitle} />
            </div>
            <div className="creator-grid">
              {invitedCreators.map((creator) => (
                <article className="creator-card" key={creator}>
                  <img alt="拟邀达人卡片" src={creator} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <ImageSection id="review" image={sectionImages.review} alt="往期回顾板块" />
        <ImageSection id="organizer" image={sectionImages.organizer} alt="主办方介绍板块" />
        <ImageSection id="contact" image={sectionImages.contact} alt="联系我们板块" />

        <section className="content-section content-section--partners" id="partners">
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
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => getRelativePath(window.location.pathname));
  const [activeSection, setActiveSection] = useState('home');
  const navSyncTimerRef = useRef(null);
  const navOverrideRef = useRef(null);
  const navOverrideTimerRef = useRef(null);
  const isSignupPage = currentPath === '/signup';
  const isBuyPage = currentPath === '/buy';
  const isTicketPage = currentPath === '/ticket';
  const isPayPage = currentPath === '/pay';

  useEffect(() => {
    document.title = isSignupPage
      ? 'KACE 2026 报名信息 - Kalodata'
      : 'KAGGE 2026 - Kalodata AI Go Global Exposition';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const handlePopState = () => {
      setCurrentPath(getRelativePath(window.location.pathname));
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (navSyncTimerRef.current) {
        window.clearTimeout(navSyncTimerRef.current);
      }
      if (navOverrideTimerRef.current) {
        window.clearTimeout(navOverrideTimerRef.current);
      }
    };
  }, [isSignupPage]);

  useEffect(() => {
    if (isSignupPage) {
      return undefined;
    }

    const updateActiveSection = () => {
      if (navOverrideRef.current) {
        const targetElement = document.getElementById(navOverrideRef.current);

        if (!targetElement) {
          navOverrideRef.current = null;
        } else {
          const targetTop = targetElement.getBoundingClientRect().top;

          if (Math.abs(targetTop) > 96) {
            setActiveSection(navOverrideRef.current);
            return;
          }

          navOverrideRef.current = null;
        }
      }

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
  }, [isSignupPage]);

  const navigateTo = (path) => {
    const fullPath = toFullPath(path);
    if (window.location.pathname !== fullPath) {
      window.history.pushState({}, '', fullPath);
    }

    setCurrentPath(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      if (navSyncTimerRef.current) {
        window.clearTimeout(navSyncTimerRef.current);
      }
      if (navOverrideTimerRef.current) {
        window.clearTimeout(navOverrideTimerRef.current);
      }

      navOverrideRef.current = sectionId;
      setActiveSection(sectionId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navOverrideTimerRef.current = window.setTimeout(() => {
        navOverrideRef.current = null;
      }, 900);
      navSyncTimerRef.current = window.setTimeout(() => {
        navOverrideRef.current = null;
        setActiveSection(sectionId);
      }, 720);
    }
  };

  if (isSignupPage) {
    return <SignupPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (isBuyPage) {
    return <BuyPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (isPayPage) {
    return <PayPage onNavigateHome={() => navigateTo('/')} />;
  }

  if (isTicketPage) {
    return <TicketPage />;
  }

  return (
    <HomePage
      activeSection={activeSection}
      scrollToSection={scrollToSection}
    />
  );
}

export default App;
