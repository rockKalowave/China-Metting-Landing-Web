import { useEffect, useState } from 'react';
import { heroDecor } from '../../landingData';
import { toFullPath } from '../../utils/navigation';
import './ticket.css';

const qrCodeUrl =
  'https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https%3A%2F%2Fwww.kalodata.com%2Fkace-2026-ticket';

function DoubleChevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m6 6 6 6 6-6M6 12l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TicketPage() {
  const [ticketInfo] = useState({
    ticketName: '【VIP通票门票】',
    eventDate: '2026.08.04-08.05',
    location: '深圳福田会展中心3/4号馆',
  });

  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType?.('navigation') ?? [];
    const navigationType = navigationEntries[0]?.type;

    if (navigationType === 'reload') {
      window.location.replace(toFullPath('/'));
    }
  }, []);

  return (
    <div className="ticket-page">
      <main className="ticket-main">
        <div className="ticket-card">
          <div className="ticket-card__top">
            <div className="ticket-card__logo-area">
              <span className="ticket-card__brand">Kalodata</span>
            </div>
            <div className="ticket-card__title-area">
              <h1 className="ticket-card__title">KACE<br />2026</h1>
              <p className="ticket-card__subtitle">AI赋能跨境电商与<br />海外达人合作展览会</p>
              <p className="ticket-card__sub-en">2026 Kalodata AI Cross-border E-commerce &amp; Influencer Expo</p>
            </div>
            <div className="ticket-card__actions">
              <button className="ticket-action-btn">欢迎转发</button>
              <button className="ticket-action-btn">我的票夹</button>
            </div>
          </div>

          <div className="ticket-divider">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="ticket-divider__dot" />
            ))}
          </div>

          <div className="ticket-card__body">
            <img alt="" aria-hidden="true" className="ticket-card__decor ticket-card__decor--left" src={heroDecor.left} />
            <img alt="" aria-hidden="true" className="ticket-card__decor ticket-card__decor--right" src={heroDecor.right} />

            <div className="ticket-success">
              <p className="ticket-success__text">恭喜您成功购买</p>
              <p className="ticket-success__event">2026 AI赋能跨境电商暨海外达人合作展览会</p>

              <div className="ticket-success__arrow">
                <DoubleChevron />
              </div>

              <div className="ticket-type-badge">{ticketInfo.ticketName}</div>
              <p className="ticket-tip">活动当天凭电子二维码即可入场</p>

              <div className="ticket-qr-wrap">
                <div className="ticket-qr-frame">
                  <img alt="KACE 2026 入场二维码" className="ticket-qr" src={qrCodeUrl} />
                </div>
              </div>
            </div>
          </div>

          <div className="ticket-card__footer">
            <p className="ticket-info-row">时间 | {ticketInfo.eventDate}</p>
            <p className="ticket-info-row">地点 | {ticketInfo.location}</p>
            <p className="ticket-greeting">期待在大会现场与您相见！</p>
            <p className="ticket-policy">售后政策</p>
          </div>
        </div>
      </main>
    </div>
  );
}
