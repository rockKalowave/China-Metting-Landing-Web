import { useMemo, useState } from 'react';
import { heroDecor } from '../../landingData';
import { toFullPath } from '../../utils/navigation';
import './buy.css';

const identityOptions = ['设计师', '品牌方', '跨境卖家', '服务商', '达人 / MCN'];

const signupTickets = [
  {
    id: 'early-bird',
    title: '早鸟双日票',
    originalPrice: 599,
    price: 0,
    note: '7.31日23:59分停售',
    features: [
      { text: '双日畅行全展区与完整议程', included: true },
      { text: '解锁全体验区与品牌展位', included: true },
      { text: '现场打卡集章，兑换限量周边', included: true },
      { text: '展商品牌互动，领取专属福利', included: true },
      { text: '本票种不含“商达撮合区”入场权限', included: false },
    ],
  },
  {
    id: 'vip',
    title: '尊享 VIP 票',
    originalPrice: 1999,
    price: 1299,
    note: '双日入场，含 VIP 专属权益',
    features: [
      { text: '双日尊享，畅行全展区与完整议程', included: true },
      { text: '商达撮合会专属入场资格', included: true },
      { text: '主会场演讲区 VIP 座位', included: true },
      { text: '精美大会周边礼包', included: true },
      { text: '大会商务午餐', included: true },
      { text: 'VIP 私享社群，持续链接优质资源', included: true },
    ],
  },
  {
    id: 'single-day',
    title: '智享单日票',
    originalPrice: 599,
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
    id: 'gala',
    title: '星耀晚宴票',
    originalPrice: 9999,
    price: 8999,
    note: '限量席位，晚宴及深度交流',
    purchasable: false,
    features: [
      { text: '含 VIP 票全部权益', included: true },
      { text: '星耀晚宴入场资格', included: true },
      { text: '嘉宾私享交流与合影', included: true },
      { text: '晚宴专属席位及定制伴手礼', included: true },
      { text: '会后资源对接优先安排', included: true },
      { text: '数量有限，售完即止', included: true },
    ],
  },
];

function IconBack() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconDoubleChevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m6 7 6 6 6-6M6 13l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}

function IconIdentity() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 12c2.8 0 5-2.3 5-5.1S14.8 1.8 12 1.8 7 4.1 7 6.9s2.2 5.1 5 5.1Zm0 2.2c-4.7 0-8.5 3-8.5 6.7V22h17v-1.1c0-3.7-3.8-6.7-8.5-6.7Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconCompany() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2Zm0 0v9.5m8-5-8 5-8-5m8 5L4 17.5m8-6L20 17.5"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconName() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 9h3m-3 4h8m-8 4h8m1-8h-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function IconIdCard() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="4.5" width="18" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 9h6m-6 4h4m6-4v6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M16.5 16V8.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M15 10h3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M15 13h3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function IconCheck({ included }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      {included ? (
        <>
          <rect x="1.5" y="1.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m5.5 10.5 2.8 2.8 6.2-6.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </>
      ) : (
        <>
          <rect x="1.5" y="1.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="m6 6 8 8M14 6l-8 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

function Field({ children, label, required = false }) {
  return (
    <div className="buy-field">
      <label className="buy-label">
        {label}
        {required ? <span> *</span> : null}
      </label>
      {children}
    </div>
  );
}

export default function BuyPage({ onNavigateHome }) {
  const visibleTickets = useMemo(() => signupTickets.filter((ticket) => ticket.id !== 'single-day'), []);
  const [selectedTicket, setSelectedTicket] = useState(visibleTickets[0].id);
  const [formData, setFormData] = useState({
    identity: identityOptions[0],
    company: '',
    name: '',
    idNumber: '',
    phone: '',
  });
  const [submitMsg, setSubmitMsg] = useState(null);

  const selectedTicketInfo = useMemo(
    () => visibleTickets.find((ticket) => ticket.id === selectedTicket) ?? visibleTickets[0],
    [selectedTicket, visibleTickets],
  );

  const updateField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setSubmitMsg(null);
  };

  const handlePhoneChange = (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
    setFormData((prev) => ({ ...prev, phone: digits }));
    setSubmitMsg(null);
  };

  const handleIdNumberChange = (event) => {
    const value = event.target.value.toUpperCase().replace(/[^0-9X]/g, '').slice(0, 18);
    setFormData((prev) => ({ ...prev, idNumber: value }));
    setSubmitMsg(null);
  };

  const handleSubmit = () => {
    const { company, idNumber, identity, name, phone } = formData;

    if (!identity || !company || !name || !idNumber || !phone) {
      setSubmitMsg({ type: 'error', text: '请完整填写所有必填信息。' });
      return;
    }

    if (!/^[1-9]\d{16}[\dX]$/.test(idNumber)) {
      setSubmitMsg({ type: 'error', text: '请输入正确的 18 位身份证号码。' });
      return;
    }

    if (!/^1\d{10}$/.test(phone)) {
      setSubmitMsg({ type: 'error', text: '仅支持中国大陆 +86 手机号，请输入 11 位手机号。' });
      return;
    }

    if (selectedTicketInfo.purchasable === false) {
      setSubmitMsg({ type: 'error', text: '星耀晚宴票暂不开放购买。' });
      return;
    }

    sessionStorage.setItem(
      'kace_order',
      JSON.stringify({
        areaCode: '+86',
        company,
        idNumber,
        name,
        originalPrice: selectedTicketInfo.originalPrice ?? 0,
        phone,
        position: identity,
        price: selectedTicketInfo.price ?? 0,
        ticketTitle: selectedTicketInfo.title,
      }),
    );

    window.location.href = toFullPath('/pay');
  };

  const handleBack = () => {
    if (onNavigateHome) {
      onNavigateHome();
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = toFullPath('/');
  };

  return (
    <div className="buy-page">
      <section className="buy-hero">
        <img alt="" aria-hidden="true" className="buy-hero__decor buy-hero__decor--left" src={heroDecor.left} />
        <img alt="" aria-hidden="true" className="buy-hero__decor buy-hero__decor--right" src={heroDecor.right} />

        <button aria-label="返回首页" className="buy-hero__back" onClick={handleBack} type="button">
          <IconBack />
        </button>

        <p className="buy-hero__brand">Kalodata</p>

        <div className="buy-hero__content">
          <div className="buy-hero__title-row">
            <h1 className="buy-hero__title">
              KACE
              <br />
              2026
            </h1>
            <div className="buy-hero__title-side">
              <p>2026 Kalodata AI</p>
              <p>Cross-border</p>
              <p>E-commerce &amp; Influencer</p>
              <p>Expo</p>
            </div>
          </div>

          <p className="buy-hero__headline">
            AI赋能跨境电商与
            <br />
            海外达人合作展览会
          </p>

          <div className="buy-hero__scroll">
            <IconDoubleChevron />
          </div>

          <p className="buy-hero__meta">2026年8月4日 - 8月5日 ｜ 深圳福田国际会展中心</p>
        </div>
      </section>

      <main className="buy-main">
        <section className="buy-section">
          <div className="buy-section__heading">
            <h2>报名信息</h2>
            <p>带有*号为必填项</p>
          </div>

          <Field label="您的身份" required>
            <div className="buy-input buy-input--select">
              <span className="buy-input__icon">
                <IconIdentity />
              </span>
              <select value={formData.identity} onChange={updateField('identity')}>
                {identityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="buy-input__arrow">
                <IconChevron />
              </span>
            </div>
          </Field>

          <Field label="公司/品牌名称" required>
            <div className="buy-input">
              <span className="buy-input__icon">
                <IconCompany />
              </span>
              <input
                placeholder="请输入公司或品牌名称"
                value={formData.company}
                onChange={updateField('company')}
              />
            </div>
          </Field>

          <Field label="您的姓名" required>
            <div className="buy-input">
              <span className="buy-input__icon">
                <IconName />
              </span>
              <input placeholder="请输入姓名" value={formData.name} onChange={updateField('name')} />
            </div>
          </Field>

          <Field label="身份证" required>
            <div className="buy-input">
              <span className="buy-input__icon">
                <IconIdCard />
              </span>
              <input
                inputMode="numeric"
                placeholder="请输入身份证号码"
                value={formData.idNumber}
                onChange={handleIdNumberChange}
              />
            </div>
          </Field>

          <Field label="手机号" required>
            <div className="buy-phone">
              <div className="buy-phone__prefix">+86</div>
              <input
                inputMode="numeric"
                maxLength={11}
                placeholder="请输入 11 位手机号"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </div>
          </Field>

          <div className="buy-progress-dots" aria-hidden="true">
            <span className="buy-progress-dots__dot buy-progress-dots__dot--active" />
            <span className="buy-progress-dots__dot" />
            <span className="buy-progress-dots__dot" />
          </div>

          <section className="buy-section buy-section--tickets">
            <h3>入场门票</h3>

            <div className="buy-ticket-grid">
              {visibleTickets.map((ticket) => {
                const isActive = ticket.id === selectedTicket;
                const isDisabled = ticket.purchasable === false;

                return (
                  <button
                    className={
                      isDisabled
                        ? 'buy-ticket buy-ticket--disabled'
                        : isActive
                          ? 'buy-ticket buy-ticket--active'
                          : 'buy-ticket'
                    }
                    disabled={isDisabled}
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    type="button"
                  >
                    <div className="buy-ticket__header">
                      <div>
                        <h4>{ticket.title}</h4>
                        <p>{ticket.note}</p>
                      </div>
                      {isDisabled ? (
                        <span className="buy-ticket__status">暂不可购</span>
                      ) : ticket.originalPrice ? (
                        <span className="buy-ticket__original">原价 {ticket.originalPrice}</span>
                      ) : null}
                    </div>

                    <div className="buy-ticket__price">
                      <span className="buy-ticket__currency">￥</span>
                      <span>{ticket.price}</span>
                    </div>

                    <div className="buy-ticket__features">
                      {ticket.features.map((feature) => (
                        <div
                          className={feature.included ? 'buy-ticket__feature' : 'buy-ticket__feature buy-ticket__feature--muted'}
                          key={feature.text}
                        >
                          <span className="buy-ticket__feature-icon">
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
          </section>

          {submitMsg ? <div className={`buy-msg buy-msg--${submitMsg.type}`}>{submitMsg.text}</div> : null}

          <button className="buy-submit" onClick={handleSubmit} type="button">
            确定
          </button>
        </section>
      </main>
    </div>
  );
}
