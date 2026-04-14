import { useState } from 'react';
import { heroDecor } from '../../landingData';
import './buy.css';

const signupTickets = [
  {
    id: 'early-bird',
    title: '早鸟双日票',
    originalPrice: 599,
    price: 0,
    note: '7.31日23:59停售',
    features: [
      { text: '双日畅行全展区与完整议程', included: true },
      { text: '解锁全体验区与品牌展位', included: true },
      { text: '现场打卡集章，兑换限量周边', included: true },
      { text: '展商品牌互动，领取专属福利', included: true },
      { text: '本票种不含“商达撮合区”入场权限', included: false },
    ],
  },
  {
    id: 'single-day',
    title: '智享单日票',
    originalPrice: 399,
    price: 259,
    note: '8月4日或8月5日任选一日',
    features: [
      { text: '择日出席，智享全程', included: true },
      { text: '单日畅行全展区与完整议程', included: true },
      { text: '解锁全体验区与品牌展位', included: true },
      { text: '现场打卡集章，兑换限量周边', included: true },
      { text: '展商品牌互动，领取专属福利', included: true },
      { text: '本票种不含“商达撮合区”入场权限', included: false },
    ],
  },
  {
    id: 'vip-privilege-icket',
    title: '尊享VIP票',
    originalPrice: 1999,
    price: 1299,
    note: '8月4日或8月5日任选一日',
    features: [
      { text: '双日尊享，畅行全展区与完整议程', included: true },
      { text: '商达撮合会专属入场资格', included: true },
      { text: '主会场演讲区VIP排落座,位置有限先到先得', included: true },
      { text: '精美周边大礼包+限量周边+专属伴手礼', included: true },
      { text: '大会商务午餐', included: true },
      { text: 'VIP私享社群，持续链接优质资源', included: true },
    ],
  },
  {
    id: 'starlight-gala-ticket',
    title: '星耀晚宴票',
    // originalPrice: 399,
    price: 8999,
    note: '8月4日或8月5日任选一日',
    features: [
      { text: '择日出席，智享全程', included: true },
      { text: '单日畅行全展区与完整议程', included: true },
      { text: '解锁全体验区与品牌展位', included: true },
      { text: '现场打卡集章，兑换限量周边', included: true },
      { text: '展商品牌互动，领取专属福利', included: true },
      { text: '本票种不含“商达撮合区”入场权限', included: false },
    ],
  },
];

function IconUser() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12Zm0 2c-4.418 0-8 2.91-8 6.5V23h16v-2.5c0-3.59-3.582-6.5-8-6.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCube() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2Zm0 0v9.5m8-5-8 5-8-5m8 5L4 17.5m8-6L20 17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCard() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M4 5.5h16v13H4zm0 4h16M8 14h3m2 0h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function IconCheck({ included = true }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {included ? (
        <>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m7.5 12.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m8 8 8 8M16 8l-8 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function SignupPage({ onNavigateHome }) {
  const [selectedTicket, setSelectedTicket] = useState(signupTickets[0].id);
  const [formData, setFormData] = useState({
    identity: '设计师',
    company: '',
    name: '',
    phone: '',
    areaCode: '+86',
  });
  const [submitMsg, setSubmitMsg] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    const { identity, company, name, phone } = formData;

    if (!name || !phone || !company) {
      setSubmitMsg({ type: 'error', text: '请填写所有必填项' });
      return;
    }

    const selected = signupTickets.find((t) => t.id === selectedTicket);

    // 保存订单信息到 sessionStorage 供支付页读取
    sessionStorage.setItem('kace_order', JSON.stringify({
      ticketTitle: selected?.title || selectedTicket,
      name,
      phone,
      company,
      position: identity,
      price: selected?.price ?? 0,
      originalPrice: selected?.originalPrice ?? 0,
    }));

    // 直接跳转到支付页
    window.location.href = '/pay';
  };

  return (
    <div className="signup-page">
      <section className="signup-hero">
        <img alt="" aria-hidden="true" className="signup-hero__decor signup-hero__decor--left" src={heroDecor.left} />
        <img alt="" aria-hidden="true" className="signup-hero__decor signup-hero__decor--right" src={heroDecor.right} />
        <button className="signup-hero__brand" onClick={onNavigateHome} type="button">
          Kalodata
        </button>
        <div className="signup-hero__content">
          <div className="signup-hero__title-wrap">
            <h1 className="signup-hero__title">KACE</h1>
            <div className="signup-hero__title-side">
              <p>2026 Kalodata AI</p>
              <p>Cross-border</p>
              <p>E-commerce &amp; Influencer</p>
              <p>Expo</p>
            </div>
          </div>
          <div className="signup-hero__headline">
            <span className="signup-hero__year">2026</span>
            <p className="signup-hero__cn">AI赋能跨境电商与海外达人合作展览会</p>
          </div>
          <div className="signup-hero__scroll">
            <IconChevron />
            <IconChevron />
          </div>
          <p className="signup-hero__meta">2026年8月4日 ~ 8月5日 ｜ 深圳福田国际会展中心</p>
        </div>
      </section>

      <main className="signup-main">
        <section className="signup-form-section">
          <div className="signup-form-section__heading">
            <h2>报名信息</h2>
            <p>带有*号为必填项</p>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="identity">
              您的身份 <span>*</span>
            </label>
            <div className="signup-input signup-input--select">
              <span className="signup-input__icon">
                <IconUser />
              </span>
              <select id="identity" value={formData.identity} onChange={handleChange('identity')}>
                <option>设计师</option>
                <option>品牌方</option>
                <option>跨境卖家</option>
                <option>服务商</option>
                <option>达人 / MCN</option>
              </select>
              <span className="signup-input__arrow">
                <IconChevron />
              </span>
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="company">
              公司/品牌名称 <span>*</span>
            </label>
            <div className="signup-input">
              <span className="signup-input__icon">
                <IconCube />
              </span>
              <input id="company" placeholder="请输入公司或品牌名称" value={formData.company} onChange={handleChange('company')} />
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="name">
              您的姓名 <span>*</span>
            </label>
            <div className="signup-input">
              <span className="signup-input__icon">
                <IconCard />
              </span>
              <input id="name" placeholder="请输入姓名" value={formData.name} onChange={handleChange('name')} />
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="phone">
              手机号 <span>*</span>
            </label>
            <div className="signup-phone">
              <div className="signup-phone__prefix">
                <select aria-label="国家区号" value={formData.areaCode} onChange={handleChange('areaCode')}>
                  <option>+86</option>
                  <option>+852</option>
                  <option>+65</option>
                  <option>+1</option>
                </select>
                <span className="signup-input__arrow">
                  <IconChevron />
                </span>
              </div>
              <input id="phone" maxLength={11} placeholder="请输入手机号" value={formData.phone} onChange={handleChange('phone')} />
            </div>
          </div>

          <section className="signup-tickets">
            <h3>入场门票</h3>
            <div className="signup-ticket-grid">
              {signupTickets.map((ticket) => {
                const isActive = ticket.id === selectedTicket;

                return (
                  <button
                    className={isActive ? 'signup-ticket signup-ticket--active' : 'signup-ticket'}
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    type="button"
                  >
                    <div className="signup-ticket__top">
                      <div>
                        <h4>{ticket.title}</h4>
                        <p>{ticket.note}</p>
                      </div>
                      <span className="signup-ticket__badge">原价 {ticket.originalPrice}</span>
                    </div>
                    <div className="signup-ticket__price">¥ {ticket.price}</div>
                    <div className="signup-ticket__features">
                      {ticket.features.map((feature) => (
                        <div
                          className={feature.included ? 'signup-ticket__feature' : 'signup-ticket__feature signup-ticket__feature--disabled'}
                          key={feature.text}
                        >
                          <span className="signup-ticket__feature-icon">
                            <IconCheck included={feature.included} />
                          </span>
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="signup-ticket-dots" aria-hidden="true">
              {signupTickets.map((ticket) => (
                <span
                  className={
                    ticket.id === selectedTicket
                      ? 'signup-ticket-dots__dot signup-ticket-dots__dot--active'
                      : 'signup-ticket-dots__dot'
                  }
                  key={ticket.id}
                />
              ))}
            </div>
          </section>

          {submitMsg && (
            <div className={`signup-msg signup-msg--${submitMsg.type}`}>
              {submitMsg.text}
            </div>
          )}
          <button
            className="signup-submit"
            type="button"
            onClick={handleSubmit}
          >
            确定
          </button>
        </section>
      </main>
    </div>
  );
}
