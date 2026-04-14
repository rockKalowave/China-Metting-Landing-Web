import { useEffect } from 'react';
import { heroDecor } from '../../landingData';
import './pay.css';

function IconChevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m5 9 7 7 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V7a4 4 0 018 0v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function PayPage({ onNavigateHome }) {
  const orderInfo = JSON.parse(sessionStorage.getItem('kace_order') || '{}');

  useEffect(() => {
    // 刷新回到首页（与 ticket 页逻辑一致）
    const navType = performance.getEntriesByType('navigation')[0]?.type;
    if (navType === 'reload') {
      window.location.href = '/';
    }
  }, []);

  const handlePay = () => {
    alert('支付功能开发中，敬请期待！');
  };

  return (
    <div className="pay-page">
      <section className="pay-hero">
        <img alt="" aria-hidden="true" className="pay-hero__decor pay-hero__decor--left" src={heroDecor.left} />
        <img alt="" aria-hidden="true" className="pay-hero__decor pay-hero__decor--right" src={heroDecor.right} />
        <button className="pay-hero__brand" onClick={onNavigateHome} type="button">
          Kalodata
        </button>
        <div className="pay-hero__content">
          <div className="pay-hero__title-wrap">
            <h1 className="pay-hero__title">KACE</h1>
            <div className="pay-hero__title-side">
              <p>2026 Kalodata AI</p>
              <p>Cross-border</p>
              <p>E-commerce &amp; Influencer</p>
              <p>Expo</p>
            </div>
          </div>
          <div className="pay-hero__headline">
            <span className="pay-hero__year">2026</span>
            <p className="pay-hero__cn">确认订单</p>
          </div>
          <p className="pay-hero__meta">2026年8月4日 ~ 8月5日 ｜ 深圳福田国际会展中心</p>
        </div>
      </section>

      <main className="pay-main">
        {/* 订单信息卡片 */}
        <section className="pay-card pay-card--order">
          <h2 className="pay-card__title">订单信息</h2>

          <div className="pay-info">
            <div className="pay-info__row">
              <span className="pay-info__label">票种类型</span>
              <span className="pay-info__value">{orderInfo.ticketTitle || '-'}</span>
            </div>
            <div className="pay-info__row">
              <span className="pay-info__label">姓名</span>
              <span className="pay-info__value">{orderInfo.name || '-'}</span>
            </div>
            <div className="pay-info__row">
              <span className="pay-info__label">手机号</span>
              <span className="pay-info__value">{orderInfo.phone || '-'}</span>
            </div>
            <div className="pay-info__row">
              <span className="pay-info__label">公司/品牌</span>
              <span className="pay-info__value">{orderInfo.company || '-'}</span>
            </div>
          </div>
        </section>

        {/* 支付金额 */}
        <section className="pay-card pay-card--amount">
          <div className="pay-amount">
            <span className="pay-amount__label">应付金额</span>
            <div className="pay-amount__price">
              <span className="pay-amount__currency">&yen;</span>
              <span className="pay-amount__number">{orderInfo.price ?? '0'}</span>
            </div>
          </div>
          {orderInfo.price > 0 && orderInfo.originalPrice > orderInfo.price && (
            <p className="pay-amount__savings">
              已优惠 &yen;{orderInfo.originalPrice - orderInfo.price}
            </p>
          )}
          {orderInfo.price === 0 && (
            <p className="pay-amount__free-tag">免费票种</p>
          )}
        </section>

        {/* 安全提示 */}
        <div className="pay-security">
          <IconLock />
          <span>信息安全保护中，支付环境安全可靠</span>
        </div>

        {/* 立即支付按钮 */}
        <button className="pay-btn" onClick={handlePay} type="button">
          {orderInfo.price > 0 ? '立即支付' : '确认报名'}
        </button>
      </main>
    </div>
  );
}
