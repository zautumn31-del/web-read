import { useEffect, useState } from "react";
import voice1 from "./assets/voice-1.png";
import voice2 from "./assets/voice-2.png";
import voice3 from "./assets/voice-3.png";
import voice4 from "./assets/voice-4.png";

type NavLink = {
  label: string;
  href: string;
};

type ReasonCard = {
  title: string;
  points: string[];
  tone: string;
};

type Testimonial = {
  title: string;
  quote: string;
  company: string;
  role: string;
  author: string;
  image: string;
};

type BenefitTier = {
  name: string;
  stage: string;
  description: string;
};

type EnablementGroup = {
  title: string;
  items: string[];
};

type FooterColumn = {
  title: string;
  items: string[];
};

const navLinks: NavLink[] = [
  { label: "企业工作台", href: "#platform" },
  { label: "培训中心", href: "#enablement" },
  { label: "个人认证", href: "#benefits" },
  { label: "动态公告", href: "#voices" },
  { label: "资料中心", href: "#footer" },
];

const reasonCards: ReasonCard[] = [
  {
    title: "把握新兴趋势，\n共享增长点。",
    tone: "blue",
    points: [
      "自建云：市场规模持续增长，轻量云平台成为企业上云的重要选择之一。",
      "VMware 替代：VMware 产品组合与订阅模式屡次调整，各行业用户寻取替代方案。",
      "传统架构升级：以超融合为代表的软件定义和分布式架构优势明显，加速替代集中式架构。",
    ],
  },
  {
    title: "提供多样化产品组合，\n服务有保障，\n渠道易于推广。",
    tone: "lavender",
    points: [
      "提供榫卯企业云平台、榫卯超融合、榫卯分布式存储、榫卯 AI 平台四大产品线",
      "核心级自主研发/性能与功能全面领先",
      "本地支持/快速响应与解决问题",
    ],
  },
  {
    title: "行业头部客户信赖，\n持续可观的收益。",
    tone: "green",
    points: ["产品能力赢得头部客户信赖", "高项目价值", "持续多样的激励与返点计划"],
  },
  {
    title: "注重长线合作，\n持续赋能。",
    tone: "gold",
    points: ["长线思维/培训与赋能/前沿技术和业界趋势分享"],
  },
];

const testimonials: Testimonial[] = [
  {
    title: "理念共鸣，共迎超融合新机遇",
    quote:
      "SmartX 在组织架构和人员沟通上做到了简单、透明，与合作伙伴积极沟通并提供自上而下的全面支持。SmartX 分布式存储等技术能力处于行业前沿，且产品是真正意义上的自研、自主可控，这一能力为项目的成功提供了保障。",
    company: "南京兰贝斯科技有限公司",
    role: "总经理",
    author: "茆鲁宁",
    image: voice1,
  },
  {
    title: "八年同行，成就稳健合作标杆",
    quote:
      "SmartX 的易用性得到了客户的一致好评，其产品的优势在于简洁明晰的操作逻辑和符合中国用户使用习惯的界面设计。这使得客户能够快速上手，显著提升了部署和使用效率。",
    company: "华存数据信息技术有限公司",
    role: "总经理助理",
    author: "俞初锋",
    image: voice2,
  },
  {
    title: "深耕行业，携手共拓云与 AI 新机遇",
    quote:
      "集利更加注重技术创新和平台能力的提升，而不是仅仅追求短期的业绩和利益。我们希望通过与 SmartX 的合作，共同探索新的业务领域和市场机遇，实现双方的共赢和发展。",
    company: "上海集利信息科技有限公司",
    role: "总经理",
    author: "丁小俊",
    image: voice3,
  },
  {
    title: "深耕行业，携手共拓云与 AI 新机遇",
    quote:
      "集利更加注重技术创新和平台能力的提升，而不是仅仅追求短期的业绩和利益。我们希望通过与 SmartX 的合作，共同探索新的业务领域和市场机遇，实现双方的共赢和发展。",
    company: "上海集利信息科技有限公司",
    role: "总经理",
    author: "丁小俊",
    image: voice4,
  },
];

const partnerLogos = [
  "网强股份",
  "和君信息",
  "ECData",
  "LANBEISI",
  "Aisino 航天信息",
  "数博思科技",
  "JK",
  "集康科技.com",
  "Universal-PC",
  "PST",
  "昊来 HOLA",
  "致腾 DRAGON",
];

const benefitTabs = ["商业合作伙伴", "金融行业合作伙伴"];

const benefitTiers: BenefitTier[] = [
  {
    name: "注册级",
    stage: "合作准入",
    description:
      "完成基础注册与准入，建立合作伙伴身份。可查询预估价格，享有专项激励权益，支持基础业务拓展。",
  },
  {
    name: "银牌级",
    stage: "经营进阶",
    description:
      "在注册级权益基础上，享有项目标准返点权益，提升项目经营回报与持续拓展能力。",
  },
  {
    name: "金牌级",
    stage: "能力增强",
    description:
      "在银牌级权益基础上，享有测试资源支持，帮助开展方案验证，强化项目推进与交付支撑能力。",
  },
  {
    name: "白金级",
    stage: "深度合作",
    description:
      "在金牌级基础上新增可直接下单的价格支持，提升商务效率与合作深度。",
  },
];

const enablementGroups: EnablementGroup[] = [
  {
    title: "培训支持",
    items: ["专业能力个人认证", "新手指南"],
  },
  {
    title: "营销支持",
    items: ["企业合作关系认证", "产品与物料库", "最新动态政策"],
  },
  {
    title: "销售支持",
    items: ["查询预估价格", "商业机会项目保护", "最新销售工具库"],
  },
  {
    title: "服务支持",
    items: ["实时查看业绩与激励", "多人员账号管理", "专属客服响应"],
  },
];

const steps = [
  "注册 SmartX 账号",
  "提交申请信息",
  "资质准备",
  "资质审核",
  "成为合作伙伴",
];

const footerColumns: FooterColumn[] = [
  {
    title: "了解产品",
    items: ["SmartX 超融合基础设施", "SmartX OS", "Halo 超融合一体机", "SmartX ZBS", "IOMesh", "ClouldTower"],
  },
  {
    title: "解决方案",
    items: ["服务器虚拟化", "私有云", "容灾", "数据库云化基础设施", "分支机构与边缘", "信创云基础设施", "桌面虚拟化（VDI）"],
  },
  {
    title: "公司",
    items: ["SmartX 官方网站", "关于公司"],
  },
  {
    title: "资源",
    items: ["社区总览", "在线体验", "文档与视频", "博客"],
  },
];

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span className="brand-mark__shape brand-mark__shape--left" />
      <span className="brand-mark__shape brand-mark__shape--right" />
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(benefitTabs[0]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand-lockup" href="#top" aria-label="SmartX 合作伙伴中心首页">
            <BrandMark />
            <div className="brand-lockup__text">
              <span className="brand-lockup__smartx">smartx</span>
              <span className="brand-lockup__divider" />
              <span className="brand-lockup__name">合作伙伴中心</span>
            </div>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} id="site-navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="button button--ghost" href="#join">
              成为合作伙伴
            </a>
            <a className="icon-help" href="#footer" aria-label="帮助">
              ?
            </a>
            <a className="button button--primary" href="#footer">
              注册 / 登录
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-surface">
            <div className="hero-shape hero-shape--one" />
            <div className="hero-shape hero-shape--two" />
            <div className="hero-shape hero-shape--three" />
            <div className="hero-shape hero-shape--four" />
            <div className="hero-shape hero-shape--five" />
            <div className="hero-content">
              <h1>变革焕新生 合力覆格局</h1>
              <p>
                我们相信 SmartX 与合作伙伴不应该是简单的“加”关系，而是价值持续裂变和共赢支持。SmartX
                合作伙伴计划旨在将新一代 IT 基础架构的产品和技术赋能合作伙伴，共同为更多客户创造价值。
              </p>
              <div className="hero-actions">
                <a className="button button--light" href="#join">
                  成为合作伙伴
                </a>
                <a className="button button--outline" href="#footer">
                  注册 / 登录
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--white" id="platform">
          <div className="section-inner">
            <h2 className="section-title">为什么与 SmartX 成为合作伙伴?</h2>
            <div className="reasons-grid">
              {reasonCards.map((card) => (
                <article key={card.title} className={`reason-card reason-card--${card.tone}`}>
                  <div className="reason-card__wash" aria-hidden="true" />
                  <h3>
                    {card.title.split("\n").map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h3>
                  <ul>
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--mist" id="voices">
          <div className="section-inner">
            <h2 className="section-title">合作伙伴之声</h2>
            <div className="voice-grid">
              {testimonials.map((item) => (
                <article key={`${item.company}-${item.author}`} className="voice-card">
                  <img className="voice-card__image" src={item.image} alt={item.author} />
                  <div className="voice-card__body">
                    <h3>{item.title}</h3>
                    <p>{`“${item.quote}”`}</p>
                    <footer>
                      <div>{`——${item.company}`}</div>
                      <div>{`${item.role} ${item.author}`}</div>
                    </footer>
                  </div>
                </article>
              ))}
            </div>

            <div className="partner-strip">
              <div className="partner-strip__copy">
                <h3>优秀合作伙伴</h3>
                <p>SmartX 已经与 700+ 渠道合作伙伴建立了深度联系，构建信任、开放、共赢的生态体系。</p>
              </div>
              <div className="partner-logos">
                {partnerLogos.map((logo) => (
                  <div key={logo} className="partner-logo">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--white" id="benefits">
          <div className="section-inner">
            <h2 className="section-title">合作伙伴权益</h2>
            <div className="benefit-tabs" role="tablist" aria-label="合作伙伴类型">
              {benefitTabs.map((tab) => (
                <button
                  key={tab}
                  className={`benefit-tab ${activeTab === tab ? "is-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="benefit-grid">
              {benefitTiers.map((tier, index) => (
                <article key={tier.name} className="benefit-card">
                  <div className={`benefit-badge benefit-badge--${index + 1}`}>
                    <span>2025</span>
                    <strong>{tier.name}</strong>
                    <small>SmartX Partner</small>
                  </div>
                  <h3>{tier.name}</h3>
                  <p>{tier.description}</p>
                  <strong>{tier.stage}</strong>
                </article>
              ))}
            </div>

            <p className="benefit-note">
              了解 2026 计划详情，请联系区域客户经理或 <a href="#footer">SmartX 合作伙伴助手</a> 获取计划文件。
            </p>
          </div>
        </section>

        <section className="section section--mist" id="enablement">
          <div className="section-inner">
            <h2 className="section-title">SmartX 合作伙伴中心如何进行赋能</h2>
            <div className="enablement-grid">
              {enablementGroups.map((group, index) => (
                <article key={group.title} className="enable-card">
                  <div className={`enable-card__icon enable-card__icon--${index + 1}`} aria-hidden="true" />
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--white" id="join">
          <div className="section-inner">
            <h2 className="section-title">加入流程</h2>
            <div className="step-grid">
              {steps.map((step, index) => (
                <article key={step} className="step-card">
                  <div className={`step-card__index ${index === steps.length - 1 ? "is-check" : ""}`}>
                    {index === steps.length - 1 ? "✓" : index + 1}
                  </div>
                  <h3>{step}</h3>
                </article>
              ))}
            </div>
            <div className="join-banner">
              <div>
                <h3>成为合作伙伴。</h3>
                <p>SmartX 期待与你携手寻求新增长，引领 IT 技术的变革，共定未来格局。</p>
              </div>
              <a className="button button--primary" href="#top">
                成为合作伙伴
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="section-inner">
          <div className="footer-columns">
            {footerColumns.map((column) => (
              <div key={column.title} className="footer-column">
                <h3>{column.title}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <div className="footer-center">
              <div className="footer-brand">
                <BrandMark />
                <span>smartx</span>
              </div>
              <p>Copyright © 2023 SmartX Inc. 保留所有权利。使用条款 | 法律信息 | 隐私政策 | 网站地图</p>
              <p>京公安网安备11010802027935号 京ICP备14055327号-2</p>
            </div>
            <div className="footer-qr">
              <div className="footer-qr__code" aria-hidden="true">
                {Array.from({ length: 64 }).map((_, index) => (
                  <span key={index} className={index % 3 === 0 || index % 5 === 0 || index % 7 === 0 ? "is-filled" : ""} />
                ))}
              </div>
              <p>
                如果您遇到任何问题，
                <br />
                请添加 SmartX 合作伙伴助手咨询。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
