"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  Database,
  Menu,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Store,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const scenarios = [
  {
    name: "Demand shift",
    detail:
      "Weather, public holidays and sales history make the next surge visible before it reaches the shelf.",
    metric: "+18%",
    label: "expected dairy demand",
    governance: "Manager review required",
    signal: "RAIN / FRIDAY / 16:00",
    image: "/vantle-ops-demand-focus.webp",
    alt: "Isometric supermarket model highlighting a demand change",
  },
  {
    name: "Stock risk",
    detail:
      "Vantle compares expected demand with live inventory and highlights the items most likely to run short.",
    metric: "76%",
    label: "stockout probability",
    governance: "Replenishment review ready",
    signal: "DAIRY / BRANCH 04 / 84 UNITS",
    image: "/vantle-ops-stock-focus.webp",
    alt: "Isometric supermarket model highlighting stock risk",
  },
  {
    name: "Waste risk",
    detail:
      "Perishable inventory is checked against sell-through patterns so excess can be acted on before it expires.",
    metric: "112",
    label: "units at waste risk",
    governance: "Markdown review prepared",
    signal: "PRODUCE / 48 HOUR WINDOW",
    image: "/vantle-ops-waste-focus.webp",
    alt: "Isometric supermarket model highlighting waste risk",
  },
];

const forecastSignals = [
  {
    label: "Rain arrives",
    time: "Fri · 16:00",
    headline: "Fresh dairy demand rises before the evening run.",
    detail:
      "Vantle combines the branch forecast with sell-through, available stock and the supplier cutoff.",
    metric: "+18%",
    metricLabel: "forecast demand",
    action: "Prepare 84-unit replenishment review",
  },
  {
    label: "Holiday rush",
    time: "Mon · 11:30",
    headline: "Essentials accelerate earlier than the weekly pattern.",
    detail:
      "Branch history and live inventory indicate a wider demand floor before the public holiday peak.",
    metric: "+24%",
    metricLabel: "essentials demand",
    action: "Review allocation across three branches",
  },
  {
    label: "Warm weekend",
    time: "Sat · 13:00",
    headline: "Chilled stock moves first while produce slows.",
    detail:
      "The plan separates products that need more cover from perishables that need tighter waste control.",
    metric: "36",
    metricLabel: "cases to review",
    action: "Prepare chilled-stock and markdown actions",
  },
];

const pilotSteps = [
  ["01", "Map the operation", "Identify the stores, systems and decision points where the margin leaks hardest."],
  ["02", "Connect the signals", "Bring sales, inventory, weather and supplier inputs into one governed view."],
  ["03", "Run a focused pilot", "Start with three to five branches and one operating workflow."],
  ["04", "Expand with evidence", "Roll out only when the recommendations and controls work for the team."],
];

export default function VantleExperience() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [forecastIndex, setForecastIndex] = useState(0);
  const [approval, setApproval] = useState("review");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef(null);
  const scenario = scenarios[scenarioIndex];
  const forecast = forecastSignals[forecastIndex];

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function openPilot() {
    setMenuOpen(false);
    setSent(false);
    dialogRef.current?.showModal();
  }

  function closePilot() {
    dialogRef.current?.close();
  }

  function submitPilot(event) {
    event.preventDefault();
    setSent(true);
  }

  function moveScenario(event, index) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + scenarios.length) % scenarios.length;
    setScenarioIndex(nextIndex);
    document.getElementById(`scenario-tab-${nextIndex}`)?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content">
        <Hero
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          openPilot={openPilot}
        />

        <section className="signal-strip" aria-label="Platform signals">
          <div className="signal-strip__track">
            <span>LIVE DEMAND</span><i />
            <span>BRANCH INVENTORY</span><i />
            <span>SUPPLIER WINDOWS</span><i />
            <span>GOVERNED ACTIONS</span><i />
            <span>WASTE CONTROL</span>
          </div>
        </section>

        <section className="section decision-section" id="decision-queue" aria-labelledby="decision-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">01 / DECISION QUEUE</p>
            <h2 id="decision-title">The operation moves.<br /><span>The next decision is already framed.</span></h2>
            <p>
              Vantle turns scattered supermarket signals into an explained recommendation,
              with the correct approval state attached.
            </p>
          </div>

          <div className="decision-workbench" data-reveal>
            <div className="scenario-tabs" role="tablist" aria-label="Operational scenarios">
              {scenarios.map((item, index) => (
                <button
                  id={`scenario-tab-${index}`}
                  key={item.name}
                  role="tab"
                  aria-selected={scenarioIndex === index}
                  aria-controls="scenario-panel"
                  tabIndex={scenarioIndex === index ? 0 : -1}
                  className={scenarioIndex === index ? "is-active" : ""}
                  onClick={() => setScenarioIndex(index)}
                  onKeyDown={(event) => moveScenario(event, index)}
                >
                  <span className="scenario-tabs__number">0{index + 1}</span>
                  <span className="scenario-tabs__copy">
                    <strong>{item.name}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <ArrowRight aria-hidden="true" size={19} />
                </button>
              ))}
            </div>

            <div
              id="scenario-panel"
              className="decision-panel"
              role="tabpanel"
              aria-labelledby={`scenario-tab-${scenarioIndex}`}
              aria-live="polite"
            >
              <div className="decision-panel__meta">
                <span>VANTLE / STORE INTELLIGENCE</span>
                <span className="live-label"><i /> LIVE SIGNALS</span>
              </div>
              <div className="store-model">
                <div className="store-model__grid" aria-hidden="true" />
                {scenarios.map((item, index) => (
                  <Image
                    key={item.image}
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 960px) 100vw, 56vw"
                    className={scenarioIndex === index ? "is-visible" : ""}
                  />
                ))}
                <div className="model-signal"><Zap size={13} /> {scenario.signal}</div>
              </div>
              <div className="decision-panel__footer">
                <div><span>Example forecast</span><strong>{scenario.metric} {scenario.label}</strong></div>
                <div><span>Governance</span><strong>{scenario.governance}</strong></div>
              </div>
            </div>
          </div>
          <p className="governance-note">Recommendations remain governed by your approval rules. Your team decides what Vantle can act on.</p>
        </section>

        <section className="section operation-section" id="operation" aria-labelledby="operation-title">
          <div className="operation-copy" data-reveal>
            <p className="eyebrow">02 / OPERATIONAL LAYER</p>
            <h2 id="operation-title">Keep the systems.<br /><span>Change what happens next.</span></h2>
            <p>
              Vantle is designed to sit above the infrastructure already running each branch.
              It reads what changed, prepares a response and keeps the decision visible.
            </p>
          </div>

          <div className="operation-map" data-reveal aria-label="How Vantle connects supermarket systems">
            <div className="operation-map__topline"><span>CONNECTED SOURCES</span><span>BRANCH 04 / ONLINE</span></div>
            <div className="source source--pos"><Store size={17} /><span>POS & sales</span><small>12:42:08</small></div>
            <div className="source source--stock"><PackageCheck size={17} /><span>Inventory</span><small>LIVE COUNT</small></div>
            <div className="source source--erp"><Database size={17} /><span>ERP & supply</span><small>SYNCED</small></div>
            <div className="operation-core">
              <Sparkles size={18} />
              <strong>VANTLE</strong>
              <span>UNDERSTAND · PREDICT · PREPARE</span>
            </div>
            <div className="operation-route route--one" aria-hidden="true" />
            <div className="operation-route route--two" aria-hidden="true" />
            <div className="operation-route route--three" aria-hidden="true" />
            <div className="prepared-action"><span>PREPARED ACTION</span><strong>Review dairy replenishment</strong><ChevronRight size={16} /></div>
          </div>
        </section>

        <section className="section forecast-section" id="forecast" aria-labelledby="forecast-title">
          <div className="forecast-heading" data-reveal>
            <div>
              <p className="eyebrow">03 / FORECAST</p>
              <h2 id="forecast-title">The day changes.<br /><span>The plan moves first.</span></h2>
            </div>
            <p>
              Weather, public holidays and sales patterns change what a branch needs.
              Vantle makes that shift legible before the operating window closes.
            </p>
          </div>

          <div className="forecast-console" data-reveal>
            <div className="forecast-console__rail" role="tablist" aria-label="Forecast signals">
              {forecastSignals.map((item, index) => (
                <button
                  key={item.label}
                  role="tab"
                  aria-selected={forecastIndex === index}
                  className={forecastIndex === index ? "is-active" : ""}
                  onClick={() => setForecastIndex(index)}
                >
                  <span>{item.time}</span><strong>{item.label}</strong><ArrowDownRight size={16} />
                </button>
              ))}
            </div>
            <div className="forecast-console__display" role="tabpanel" aria-live="polite">
              <div className="forecast-visual" aria-hidden="true">
                <div className="forecast-visual__curve" />
                <span className="forecast-visual__marker marker--one">08:00</span>
                <span className="forecast-visual__marker marker--two">13:00</span>
                <span className="forecast-visual__marker marker--three">18:00</span>
                <i className="forecast-visual__pulse" />
              </div>
              <div className="forecast-console__copy">
                <span className="status-kicker"><i /> CURRENT SIGNAL</span>
                <h3>{forecast.headline}</h3>
                <p>{forecast.detail}</p>
                <dl>
                  <div><dt>Forecast</dt><dd>{forecast.metric} <small>{forecast.metricLabel}</small></dd></div>
                  <div><dt>Prepared action</dt><dd>{forecast.action}</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="section governance-section" id="control" aria-labelledby="control-title">
          <div className="governance-heading" data-reveal>
            <p className="eyebrow">04 / HUMAN CONTROL</p>
            <h2 id="control-title">The model explains.<br /><span>The manager decides.</span></h2>
          </div>

          <div className="approval-workspace" data-reveal>
            <div className="approval-workspace__copy">
              <span className="status-kicker"><i /> DEMAND INCREASE DETECTED</span>
              <h3>Fresh dairy may run short tomorrow.</h3>
              <p>Vantle prepared an order against the forecast, live stock and the supplier cutoff.</p>
              <dl>
                <div><dt>Why now</dt><dd>Rain + branch sales pattern</dd></div>
                <div><dt>Expected impact</dt><dd>Reduce stockout exposure</dd></div>
                <div><dt>Control</dt><dd>Financial approval</dd></div>
              </dl>
            </div>
            <div className="approval-workspace__actions" aria-label="Decision state">
              <p>DECISION STATE</p>
              <button aria-pressed={approval === "review"} onClick={() => setApproval("review")}>Review recommendation</button>
              <button aria-pressed={approval === "approved"} onClick={() => setApproval("approved")}>Approve prepared action</button>
              <button aria-pressed={approval === "adjust"} onClick={() => setApproval("adjust")}>Adjust before approval</button>
              <div className={`approval-status approval-status--${approval}`} role="status">
                {approval === "review" && <>Manager review remains required.</>}
                {approval === "approved" && <><Check size={15} /> Action marked as approved.</>}
                {approval === "adjust" && <>Manager preference saved for review.</>}
              </div>
            </div>
          </div>
        </section>

        <section className="section pilot-section" id="pilot" aria-labelledby="pilot-title">
          <div className="pilot-heading" data-reveal>
            <p className="eyebrow">05 / PILOT PROGRAM</p>
            <h2 id="pilot-title">Start with a few stores.<br /><span>Build from the real operation.</span></h2>
          </div>
          <ol className="pilot-list" data-reveal>
            {pilotSteps.map(([number, title, detail]) => (
              <li key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div><ArrowRight size={18} />
              </li>
            ))}
          </ol>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <div className="closing-section__signal" aria-hidden="true"><i /><i /><i /><i /></div>
          <p className="eyebrow">SUPERMARKET PILOT</p>
          <h2 id="closing-title">See where your operation<br />can move earlier.</h2>
          <p>Tell us about the stores, systems and operating problem you want to understand first.</p>
          <button className="button button--light" onClick={openPilot}>Request a supermarket pilot <ArrowRight size={16} /></button>
        </section>

        <footer>
          <a className="wordmark" href="#top" aria-label="Vantle home"><BrandMark />Vantle</a>
          <p>Operational intelligence for supermarkets. Demand, stock and waste—understood early.</p>
          <nav aria-label="Footer navigation">
            <a href="#decision-queue">Decision queue</a>
            <a href="#operation">Operation</a>
            <a href="#control">Control</a>
            <button onClick={openPilot}>Request pilot</button>
          </nav>
          <span>© 2026 VANTLE</span>
        </footer>
      </main>

      <PilotDialog ref={dialogRef} sent={sent} onClose={closePilot} onSubmit={submitPilot} />
    </>
  );
}

function Hero({ menuOpen, setMenuOpen, openPilot }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata" poster="/vantle-hero-signal-poster.jpg">
          <source src="/vantle-hero-signal-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero__halftone" />
      </div>
      <header>
        <a className="wordmark" href="#top" aria-label="Vantle home"><BrandMark />Vantle</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#decision-queue">How it works</a>
          <a href="#operation">Operation</a>
          <a href="#forecast">Forecast</a>
          <a href="#pilot">Pilot</a>
        </nav>
        <button className="button button--accent desktop-cta" onClick={openPilot}>Request pilot <ArrowRight size={15} /></button>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#decision-queue" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#operation" onClick={() => setMenuOpen(false)}>Operation</a>
            <a href="#forecast" onClick={() => setMenuOpen(false)}>Forecast</a>
            <button onClick={openPilot}>Request pilot <ArrowRight size={15} /></button>
          </nav>
        )}
      </header>

      <div className="hero__content">
        <p className="hero__eyebrow"><i /> SUPERMARKET OPERATIONS / PILOT STAGE</p>
        <h1 id="hero-title">Your stores already produce the signal.<br /><span>Vantle turns it into the next move.</span></h1>
        <p className="hero__intro">Vantle connects the systems you already use, detects what changed and prepares governed actions across procurement, stock and waste.</p>
        <div className="hero__actions">
          <button className="button button--accent" onClick={openPilot}>Request a supermarket pilot <ArrowRight size={16} /></button>
          <a className="text-link" href="#decision-queue">Open the decision queue <ArrowDownRight size={16} /></a>
        </div>
      </div>

      <div className="hero__live-board" aria-label="Live branch signal example">
        <div className="hero__live-board-top"><span>BRANCH 04 / KUALA LUMPUR</span><span><i /> LIVE</span></div>
        <div className="hero__live-board-body">
          <span>FRIDAY · 16:00–19:00</span>
          <strong>Rain changes the dairy plan.</strong>
          <dl>
            <div><dt>Demand</dt><dd>+18%</dd></div>
            <div><dt>Stock window</dt><dd>6h 42m</dd></div>
            <div><dt>Action</dt><dd>Review ready</dd></div>
          </dl>
        </div>
      </div>
      <p className="hero__side-label">LIVE DATA / EVERY SHIFT</p>
    </section>
  );
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

const PilotDialog = function PilotDialog({ ref, sent, onClose, onSubmit }) {
  return (
    <dialog ref={ref} className="pilot-dialog" onClose={() => {}}>
      <div className="pilot-dialog__topline"><span>VANTLE / PILOT INTAKE</span><button aria-label="Close pilot form" onClick={onClose}><X size={18} /></button></div>
      {sent ? (
        <div className="pilot-dialog__success" role="status">
          <ShieldCheck size={28} />
          <p className="eyebrow">REQUEST RECORDED</p>
          <h2>Your pilot brief is ready for review.</h2>
          <p>This prototype does not send data externally. The interaction is complete and can be connected to your preferred form service later.</p>
          <button className="button button--accent" onClick={onClose}>Return to Vantle</button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <p className="eyebrow">START WITH THE OPERATION</p>
          <h2>Tell us where the margin leaks first.</h2>
          <div className="field-grid">
            <label><span>Name *</span><input name="name" required autoComplete="name" placeholder="Noor Kazemi" /></label>
            <label><span>Work email *</span><input name="email" required type="email" autoComplete="email" placeholder="noor@marketgroup.com" /></label>
          </div>
          <label><span>Store footprint</span><select name="stores" defaultValue=""><option value="" disabled>Select a range</option><option>1–5 stores</option><option>6–25 stores</option><option>26–100 stores</option><option>More than 100 stores</option></select></label>
          <label><span>Operational problem *</span><textarea name="problem" required rows="4" placeholder="Fresh dairy runs short before weekend demand peaks..." /></label>
          <p className="form-note">Required fields are marked *. Nothing is transmitted in this prototype.</p>
          <button className="button button--accent" type="submit">Prepare pilot brief <ArrowRight size={16} /></button>
        </form>
      )}
    </dialog>
  );
};
