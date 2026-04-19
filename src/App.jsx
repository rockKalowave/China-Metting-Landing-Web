import { useEffect, useMemo, useRef, useState } from 'react';
import {
  creatorPages,
  creatorTrackItems,
  heroDecor,
  heroSlides,
  logoItems,
  navItems,
  sectionImages,
  sideButtonImages,
} from './landingData';
import SignupPage from './pages/signup/SignupPage';
import BuyPage from './pages/buy/buy';
import TicketPage from './pages/ticket/TicketPage';
import PayPage from './pages/pay/PayPage';
import { getRelativePath, toFullPath } from './utils/navigation';

const SPONSORSHIP_URL = 'https://www.wjx.top/vm/tU5XHKW.aspx#';

function ImageSection({ id, image, alt, children, bleed = false, plain = false }) {
  return (
    <section className={`content-section${bleed ? ' content-section--bleed' : ''}`} id={id}>
      <div className="section-shell">
        <div className={plain ? 'section-panel section-panel--plain' : 'section-panel'}>
          <img className="section-image" src={image} alt={alt} />
        </div>
        {children}
      </div>
    </section>
  );
}

function BrandMatrixSection() {
  return (
    <section aria-label="核心价值板块" className="content-section" id="values">
      <div className="section-shell">
        <div className="brand-matrix" style={{ '--brand-matrix-bg': `url(${sectionImages.values})` }}>
          <div className="brand-matrix__overlay">
            <Marquee itemClassName="marquee__item--logo" items={logoItems} />
            <Marquee direction="right" itemClassName="marquee__item--creator" items={creatorTrackItems} />
          </div>
        </div>
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
      <img className="registration-qr__asset" src={sideButtonImages.register} alt="KACE 2026 立即报名二维码" />
    </div>
  );
}

function SidePanelActionButton({ defaultSrc, hoverSrc, alt, onClick }) {
  return (
    <button className="hero-side-panel__asset-button" onClick={onClick} type="button">
      <img className="hero-side-panel__asset hero-side-panel__asset--default" src={defaultSrc} alt={alt} />
      <img className="hero-side-panel__asset hero-side-panel__asset--hover" src={hoverSrc} alt="" aria-hidden="true" />
    </button>
  );
}

function HomePage({ activeSection, scrollToSection }) {
  const [activeCreatorPage, setActiveCreatorPage] = useState(0);

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
          <img alt="" aria-hidden="true" className="hero__background" src={heroDecor.background} />
          <div className="section-shell hero__shell">
            <aside className="hero-side-panel" aria-label="首屏快捷入口">
              <RegistrationQrCard compact />
              <SidePanelActionButton
                alt="招商合作"
                defaultSrc={sideButtonImages.sponsor}
                hoverSrc={sideButtonImages.sponsorHover}
                onClick={() => window.location.href = SPONSORSHIP_URL}
              />
              <SidePanelActionButton
                alt="大会咨询"
                defaultSrc={sideButtonImages.consult}
                hoverSrc={sideButtonImages.consultHover}
                onClick={() => scrollToSection('contact')}
              />
            </aside>

            <div className="expo-showcase">
              <div className="expo-showcase__track">
                {[...heroSlides, ...heroSlides].map((slide, index) => (
                  <img className="expo-showcase__item" key={`expo-${index}`} src={slide} alt={`展会现场 ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ImageSection id="about" image={sectionImages.about} alt="大会介绍板块" plain />
        <ImageSection id="content" image={sectionImages.content} alt="展会内容板块" />
        <ImageSection id="highlights" image={sectionImages.highlights} alt="展会亮点板块" />
        <ImageSection id="industry" image={sectionImages.industry} alt="行业首创板块" />
        <BrandMatrixSection />

        <section className="content-section" id="creators">
          <div className="section-shell">
            <div className="section-title-image section-title-image--creators">
              <img alt="拟邀达人" src={sectionImages.creatorsTitle} />
            </div>
            <div className="creator-pages">
              <article className="creator-page">
                <img alt={`拟邀达人第 ${activeCreatorPage + 1} 页`} src={creatorPages[activeCreatorPage]} />
              </article>
              <div aria-label="拟邀达人分页" className="creator-pagination">
                {creatorPages.map((page, index) => (
                  <button
                    aria-label={`查看拟邀达人第 ${index + 1} 页`}
                    className={index === activeCreatorPage ? 'creator-pagination__dot creator-pagination__dot--active' : 'creator-pagination__dot'}
                    key={page}
                    onClick={() => setActiveCreatorPage(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ImageSection id="audience" image={sectionImages.audience} alt="用户画像板块" />
        <ImageSection id="review" image={sectionImages.review} alt="往期回顾板块" />
        <ImageSection id="organizer" image={sectionImages.organizer} alt="主办方介绍板块" />
        <ImageSection id="design" image={sectionImages.expoDesign} alt="大会设计板块">
          <div className="section-panel section-panel--support">
            <img className="section-image" src={sectionImages.expoDesignReference} alt="大会设计参考视觉" />
          </div>
        </ImageSection>
        <ImageSection id="contact" image={sectionImages.contact} alt="联系我们板块" />
      </main>
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => getRelativePath(window.location.pathname));
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const navOverrideRef = useRef(null);
  const navTargetYRef = useRef(null);
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
    };
  }, [isSignupPage]);

  useEffect(() => {
    if (isSignupPage) {
      return undefined;
    }

    const updateActiveSection = () => {
      if (navOverrideRef.current && navTargetYRef.current !== null) {
        setActiveSection(navOverrideRef.current);

        if (Math.abs(window.scrollY - navTargetYRef.current) > 8) {
          return;
        }

        navOverrideRef.current = null;
        navTargetYRef.current = null;
      } else if (navOverrideRef.current) {
        navOverrideRef.current = null;
        navTargetYRef.current = null;
      }

      const currentMarker = window.scrollY + 180;
      let currentSection = navItems[0].id;

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
      const rootStyles = window.getComputedStyle(document.documentElement);
      const headerHeight = Number.parseFloat(rootStyles.getPropertyValue('--header-height')) || 60;
      const topOffset = headerHeight + 16;
      const targetY = Math.max(target.getBoundingClientRect().top + window.scrollY - topOffset, 0);

      navOverrideRef.current = sectionId;
      navTargetYRef.current = targetY;
      setActiveSection(sectionId);

      if (Math.abs(window.scrollY - targetY) <= 8) {
        navOverrideRef.current = null;
        navTargetYRef.current = null;
        return;
      }

      window.scrollTo({ top: targetY, left: 0, behavior: 'smooth' });
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

  return <HomePage activeSection={activeSection} scrollToSection={scrollToSection} />;
}

export default App;
