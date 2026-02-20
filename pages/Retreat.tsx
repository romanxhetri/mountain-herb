import React, { useState } from 'react';
import './Retreat.css';

export const Retreat: React.FC = () => {
  // Form State for General Booking
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    retreatPlan: '',
    preferredDates: '',
    participants: '',
    dob: '',
    tob: '',
    pob: '',
    intention: ''
  });

  // Form State for 9-Day Immersive
  const [immersiveForm, setImmersiveForm] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    plan: '',
    dates: '',
    participants: '',
    dob: '',
    tob: '',
    pob: '',
    intention: ''
  });

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImmersiveChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setImmersiveForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = bookingForm;
    const lines = [
      "🙏 Retreat Booking Request — MeditationAstro",
      "Name: " + data.fullName,
      "Email: " + data.email,
      "WhatsApp: " + (data.whatsapp || "N/A"),
      "Country: " + (data.country || "N/A"),
      "Plan: " + data.retreatPlan,
      "Preferred Dates: " + (data.preferredDates || "N/A"),
      "Participants: " + (data.participants || "N/A"),
      "",
      "Birth Details (for astrology):",
      "DOB: " + (data.dob || "N/A"),
      "TOB: " + (data.tob || "N/A"),
      "POB: " + (data.pob || "N/A"),
      "",
      "Intention / Questions:",
      (data.intention || "N/A")
    ];

    const msg = encodeURIComponent(lines.join("\n"));
    const wa = "https://wa.me/9779841647283?text=" + msg;
    window.open(wa, "_blank", "noopener");
  };

  const handleImmersiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = immersiveForm;
    const lines = [
      "🙏 Booking Request — 9-Day Spiritual Immersive (Kathmandu) — MeditationAstro",
      "Name: " + data.fullName,
      "Email: " + data.email,
      "WhatsApp: " + (data.whatsapp || "N/A"),
      "Country: " + (data.country || "N/A"),
      "Plan: " + data.plan,
      "Preferred Dates: " + (data.dates || "N/A"),
      "Participants: " + (data.participants || "N/A"),
      "",
      "Birth Details (for Kundali / Jyotish):",
      "DOB: " + (data.dob || "N/A"),
      "TOB: " + (data.tob || "N/A"),
      "POB: " + (data.pob || "N/A"),
      "",
      "Intention / Questions:",
      (data.intention || "N/A")
    ];

    const msg = encodeURIComponent(lines.join("\n"));
    const wa = "https://wa.me/9779841647283?text=" + msg;
    window.open(wa, "_blank", "noopener");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0a0a0a]">
      {/* SECTION 1: GENERAL RETREAT BOOKING */}
      <section id="ma-retreat-page">
        <div className="ma-wrap">

          {/* TOP BAR */}
          <div className="ma-top">
            <div className="ma-brand">
              <img className="ma-logo" src="https://meditationastro.com/wp-content/uploads/meditationastro-logo.png" alt="MeditationAstro Logo" />
              <div>
                <div className="ma-sub">MeditationAstro</div>
                <div style={{ fontSize: '13px', opacity: 0.85 }}>Satdobato, Lalitpur • Kathmandu Valley, Nepal • Online Worldwide</div>
              </div>
            </div>

            <div className="ma-btns">
              <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">WhatsApp: +977 9841647283</a>
              <a className="ma-btn line" href="mailto:meditationastro1@gmail.com?subject=Retreat%20Booking%20-%20MeditationAstro" rel="noopener noreferrer">Email: meditationastro1@gmail.com</a>
            </div>
          </div>

          {/* HERO */}
          <header className="ma-card">
            <div className="ma-badges">
              <span className="ma-badge">Premium Spiritual Retreat • Nepal</span>
              <span className="ma-badge dark">Meditation + Vedic Astrology</span>
              <span className="ma-badge dark">Pilgrimage + Yoga Mudra</span>
            </div>

            <h1 className="ma-title">Retreat Booking in Nepal — MeditationAstro</h1>

            <p className="ma-p" style={{ fontSize: '18px', maxWidth: '980px', marginBottom: '14px' }}>
              This is not just a retreat booking. This is a commitment to your inner clarity.
              Join a structured Himalayan journey combining <strong style={{ color: '#fff' }}>Meditation</strong>, <strong style={{ color: '#fff' }}>Vedic Astrology</strong>,
              <strong style={{ color: '#fff' }}>Energy Alignment</strong>, and <strong style={{ color: '#fff' }}>Sacred Pilgrimage</strong> in Nepal.
            </p>

            <div className="ma-btns" style={{ marginTop: '14px' }}>
              <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Book Fast on WhatsApp</a>
              <button className="ma-btn gold" onClick={() => scrollToSection('plans')}>View Retreat Plans</button>
              <button className="ma-btn line" onClick={() => scrollToSection('booking')}>Reserve Your Dates</button>
            </div>

            <p className="ma-note" style={{ marginTop: '12px' }}>
              Best for: overthinkers, burnout recovery, spiritual seekers, life direction, relationship clarity, and deep inner transformation.
            </p>
          </header>

          <div style={{ height: '18px' }}></div>

          <div className="ma-row">

            {/* LEFT CONTENT */}
            <main style={{ gridColumn: 'span 12' }}>

              {/* PROGRAMS */}
              <section id="plans" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Our Retreat Programs</h2>
                <p className="ma-p">
                  Choose the depth that matches your time and intention. Each program includes guided sessions and a personalized inner-work roadmap.
                </p>

                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>1) 3-Day Inner Reset (Short Immersion)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.8 }}>
                      Best for travelers in Nepal, busy professionals, and first-time spiritual seekers.
                    </span>
                    <ul className="ma-ul">
                      <li>1 Personal Vedic Astrology Session (mini blueprint)</li>
                      <li>Daily meditation practice + breathwork</li>
                      <li>Mind alignment & clarity coaching</li>
                      <li>1 Sacred site visit (Kathmandu Valley)</li>
                      <li>Personal integration plan</li>
                    </ul>
                    <div style={{ marginTop: '10px', fontWeight: 900, color: '#fff' }}>Investment: <span style={{ color: 'var(--ma-gold)' }}>$299</span></div>
                  </div>

                  <div className="ma-box">
                    <strong>2) 7-Day Spiritual Alignment Retreat (Most Popular)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.8 }}>
                      Best for emotional clarity, life direction, relationship/career confusion, spiritual discipline.
                    </span>
                    <ul className="ma-ul">
                      <li>Full Vedic Astrology Counseling (Lagna, Nakshatra, timing)</li>
                      <li>5 guided meditation sessions + pranayama</li>
                      <li>3 Yoga & Mudra workshops (energy alignment)</li>
                      <li>Pilgrimage visits (Pashupatinath, Boudhanath, Swayambhunath, etc.)</li>
                      <li>Emotional release + integration session</li>
                      <li>Personalized spiritual roadmap</li>
                    </ul>
                    <div style={{ marginTop: '10px', fontWeight: 900, color: '#fff' }}>
                      Investment: <span style={{ color: 'var(--ma-gold)' }}>$549</span> (Standard) • <span style={{ color: 'var(--ma-gold)' }}>$799</span> (Luxury Private)
                    </div>
                  </div>

                  <div className="ma-box">
                    <strong>3) 14-Day Himalayan Transformation</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.8 }}>
                      Best for serious spiritual growth, burnout recovery, major life transition, advanced seekers.
                    </span>
                    <ul className="ma-ul">
                      <li>Advanced astrology timing analysis + deeper remedies</li>
                      <li>Daily meditation discipline + longer sits</li>
                      <li>Chakra & energy alignment practices</li>
                      <li>5+ pilgrimage experiences in Nepal</li>
                      <li>1-on-1 spiritual counseling sessions</li>
                      <li>30-day post-retreat integration support</li>
                    </ul>
                    <div style={{ marginTop: '10px', fontWeight: 900, color: '#fff' }}>Investment: <span style={{ color: 'var(--ma-gold)' }}>$1200+</span></div>
                  </div>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* LOCATION */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Retreat Location</h2>
                <p className="ma-p">
                  Kathmandu Valley, Nepal • Satdobato, Lalitpur • Sacred Himalayan region.
                  Private hotel visit option available. Online pre-consultation included.
                </p>

                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>📍 Meeting Point</strong><br />
                    <span style={{ lineHeight: 1.8, color: 'rgba(246,231,183,.86)' }}>Satdobato, Lalitpur (Kathmandu Valley), Nepal</span>
                  </div>
                  <div className="ma-box">
                    <strong>🏛 Pilgrimage Focus</strong><br />
                    <span style={{ lineHeight: 1.8, color: 'rgba(246,231,183,.86)' }}>
                      Pashupatinath • Boudhanath • Swayambhunath • Pharping (customizable)
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '14px', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.10)' }}>
                  <iframe
                    title="MeditationAstro Satdobato Map"
                    src="https://www.google.com/maps?q=Satdobato%20Lalitpur%20Nepal&output=embed"
                    width="100%" height="360" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* INCLUDED / NOT INCLUDED */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">What’s Included / Not Included</h2>

                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>✅ Included</strong>
                    <ul className="ma-ul">
                      <li>All spiritual sessions (as per selected program)</li>
                      <li>Personalized guidance + inner-work roadmap</li>
                      <li>Retreat materials</li>
                      <li>Sacred site explanations & practice guidance</li>
                      <li>Follow-up notes (email summary)</li>
                    </ul>
                  </div>

                  <div className="ma-box">
                    <strong>❌ Not Included</strong>
                    <ul className="ma-ul">
                      <li>Accommodation (can be arranged)</li>
                      <li>Transportation (optional add-on)</li>
                      <li>Personal expenses</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* BOOKING PROCESS + PAYMENT */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Booking Process & Payment</h2>

                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>💬 Booking Process</strong>
                    <ol className="ma-ul" style={{ marginLeft: '18px' }}>
                      <li>Submit the form or WhatsApp inquiry</li>
                      <li>Receive availability confirmation</li>
                      <li>Secure booking with deposit (30%)</li>
                      <li>Receive preparation guide</li>
                      <li>Begin your journey</li>
                    </ol>
                  </div>

                  <div className="ma-box">
                    <strong>🔒 Payment & Reservation</strong>
                    <ul className="ma-ul">
                      <li>Deposit required: <strong style={{ color: '#fff' }}>30%</strong></li>
                      <li>Remaining balance due on arrival</li>
                      <li>Payment options: Bank transfer • Wise • Cash on arrival (pre-confirmed)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* FAQ */}
              <section id="faq" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Frequently Asked Questions</h2>

                <details className="ma-acc">
                  <summary>Do I need meditation experience?</summary>
                  <div className="ma-accbody">No. Beginners are welcome. The practices are adapted to your level with clear step-by-step guidance.</div>
                </details>

                <details className="ma-acc">
                  <summary>What do you need for Vedic astrology preparation?</summary>
                  <div className="ma-accbody">Full name, date of birth, exact time of birth (if known), and place of birth. Send these early for best accuracy.</div>
                </details>

                <details className="ma-acc">
                  <summary>Can the retreat be customized?</summary>
                  <div className="ma-accbody">Yes. Pilgrimage sites, session intensity, and schedule can be customized, especially for private plans.</div>
                </details>

                <details className="ma-acc">
                  <summary>Is accommodation included?</summary>
                  <div className="ma-accbody">Accommodation is not included by default, but we can help arrange options based on your budget and comfort level.</div>
                </details>

                <details className="ma-acc">
                  <summary>What is the fastest way to book?</summary>
                  <div className="ma-accbody">WhatsApp is the fastest. Message us your preferred dates and retreat plan.</div>
                </details>

                <div className="ma-btns" style={{ justifyContent: 'center', marginTop: '16px' }}>
                  <button className="ma-btn gold" onClick={() => scrollToSection('booking')}>Reserve My Retreat</button>
                  <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                </div>
              </section>

            </main>

            {/* RIGHT SIDEBAR */}
            <aside style={{ gridColumn: 'span 12' }}>

              {/* PRICING SUMMARY TABLE */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Plans & Investment</h2>

                <div className="ma-tablewrap">
                  <table className="ma-table" aria-label="Retreat Pricing Table">
                    <thead>
                      <tr>
                        <th>Plan</th>
                        <th>Duration</th>
                        <th>Best For</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Inner Reset</strong></td>
                        <td>3 Days</td>
                        <td>Short immersion, first-time seekers</td>
                        <td className="ma-price">$299</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Spiritual Alignment</strong></td>
                        <td>7 Days</td>
                        <td>Clarity, direction, emotional balance</td>
                        <td className="ma-price">$549</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Luxury Private</strong></td>
                        <td>7 Days</td>
                        <td>Private premium, deeper integration</td>
                        <td className="ma-price">$799</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Transformation</strong></td>
                        <td>14 Days</td>
                        <td>Deep work, burnout recovery</td>
                        <td className="ma-price">$1200+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="ma-btns" style={{ marginTop: '12px' }}>
                  <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Choose Plan on WhatsApp</a>
                  <button className="ma-btn line" onClick={() => scrollToSection('booking')}>Book via Form</button>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* BOOKING FORM */}
              <section id="booking" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Retreat Booking Form</h2>
                <p className="ma-p">Fill the form. We confirm availability within 24 hours via WhatsApp or email.</p>

                <div className="ma-form">
                  <form onSubmit={handleBookingSubmit}>
                    <div className="ma-formgrid">
                      <input className="ma-field" name="fullName" required placeholder="Full Name *" value={bookingForm.fullName} onChange={handleBookingChange} />
                      <input className="ma-field" name="email" type="email" required placeholder="Email *" value={bookingForm.email} onChange={handleBookingChange} />
                      <input className="ma-field" name="whatsapp" placeholder="WhatsApp Number (recommended)" value={bookingForm.whatsapp} onChange={handleBookingChange} />

                      <input className="ma-field" name="country" placeholder="Country" value={bookingForm.country} onChange={handleBookingChange} />

                      <select className="ma-field" name="retreatPlan" required value={bookingForm.retreatPlan} onChange={handleBookingChange}>
                        <option value="" disabled>Select Retreat Plan *</option>
                        <option value="3-Day Inner Reset ($299)">3-Day Inner Reset ($299)</option>
                        <option value="7-Day Spiritual Alignment ($549)">7-Day Spiritual Alignment ($549)</option>
                        <option value="7-Day Luxury Private ($799)">7-Day Luxury Private ($799)</option>
                        <option value="14-Day Himalayan Transformation ($1200+)">14-Day Himalayan Transformation ($1200+)</option>
                      </select>

                      <input className="ma-field" name="preferredDates" placeholder="Preferred Dates (e.g., 10–16 March 2026)" value={bookingForm.preferredDates} onChange={handleBookingChange} />
                      <input className="ma-field" name="participants" placeholder="Number of Participants" value={bookingForm.participants} onChange={handleBookingChange} />

                      {/* Astrology details */}
                      <div className="ma-box" style={{ marginTop: '6px' }}>
                        <strong>Birth Details (for Astrology)</strong>
                        <div className="ma-note" style={{ marginTop: '6px', marginBottom: '10px' }}>
                          If you book astrology-based retreat, share birth details for Kundali preparation.
                        </div>
                        <div className="ma-formgrid">
                          <input className="ma-field" name="dob" placeholder="Date of Birth (DD/MM/YYYY)" value={bookingForm.dob} onChange={handleBookingChange} />
                          <input className="ma-field" name="tob" placeholder="Time of Birth (if known)" value={bookingForm.tob} onChange={handleBookingChange} />
                          <input className="ma-field" name="pob" placeholder="Place of Birth (City, Country)" value={bookingForm.pob} onChange={handleBookingChange} />
                        </div>
                      </div>

                      <textarea className="ma-field" name="intention" rows={5} placeholder="Special Intention / Questions (peace, clarity, relationship, career, healing...)" value={bookingForm.intention} onChange={handleBookingChange}></textarea>

                      <label className="ma-note" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <input type="checkbox" required style={{ marginTop: '3px' }} />
                        I agree to be contacted by MeditationAstro via email/WhatsApp for booking confirmation.
                      </label>

                      <button className="ma-btn gold" type="submit">Reserve My Retreat</button>

                      <div className="ma-note">
                        Prefer instant booking? <a href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ma-gold)', fontWeight: 900, textDecoration: 'none' }}>WhatsApp us here</a>.
                      </div>
                    </div>
                  </form>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* CONTACT QUICK */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Quick Contact</h2>
                <div className="ma-grid">
                  <div className="ma-box"><strong>📧 Email</strong><br /><span style={{ color: 'rgba(246,231,183,.86)' }}>meditationastro1@gmail.com</span></div>
                  <div className="ma-box"><strong>📱 WhatsApp / Call</strong><br /><span style={{ color: 'rgba(246,231,183,.86)' }}>+977 9841647283</span></div>
                  <div className="ma-box"><strong>📍 Location</strong><br /><span style={{ color: 'rgba(246,231,183,.86)' }}>Satdobato, Lalitpur, Kathmandu Valley, Nepal</span></div>
                </div>
              </section>

            </aside>
          </div>

          <div style={{ height: '16px' }}></div>

          {/* FOOTER CTA */}
          <section className="ma-card flat" style={{ textAlign: 'center', boxShadow: 'var(--ma-shadow)' }}>
            <h2 className="ma-h2" style={{ marginBottom: '8px' }}>Your clarity will not come from scrolling more — it will come from stillness.</h2>
            <p className="ma-p" style={{ maxWidth: '900px', margin: '0 auto 14px' }}>
              If you feel called, book your retreat now and begin your inner journey in Nepal.
            </p>
            <div className="ma-btns" style={{ justifyContent: 'center' }}>
              <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              <button className="ma-btn gold" onClick={() => scrollToSection('booking')}>Reserve via Form</button>
            </div>

            <p className="ma-note" style={{ marginTop: '14px' }}>
              SEO Keywords: meditation retreat Nepal, spiritual retreat Kathmandu, Vedic astrology counseling Nepal, Jyotish consultation Kathmandu,
              yoga mudra workshop Nepal, pilgrimage retreat Kathmandu Valley, Satdobato Lalitpur meditation.
            </p>
          </section>

        </div>
      </section>

      {/* SECTION 2: 9-DAY IMMERSIVE */}
      <section id="ma-9day">
        <div className="ma-wrap">

          {/* TOP BAR */}
          <div className="ma-top">
            <div className="ma-brand">
              <img className="ma-logo" src="https://meditationastro.com/wp-content/uploads/meditationastro-logo.png" alt="MeditationAstro Logo" />
              <div>
                <div className="ma-sub">MeditationAstro</div>
                <div style={{ fontSize: '13px', opacity: 0.85 }}>Satdobato, Lalitpur • Kathmandu Valley, Nepal • Online Worldwide</div>
              </div>
            </div>
            <div className="ma-btns">
              <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">WhatsApp: +977 9841647283</a>
              <a className="ma-btn line" href="mailto:meditationastro1@gmail.com?subject=Booking%20-%209%20Day%20Spiritual%20Immersive%20Kathmandu" rel="noopener noreferrer">Email: meditationastro1@gmail.com</a>
            </div>
          </div>

          {/* HERO */}
          <header className="ma-card">
            <div className="ma-badges">
              <span className="ma-badge">9-Day Spiritual Immersive • Kathmandu</span>
              <span className="ma-badge dark">Meditation + Breathwork</span>
              <span className="ma-badge dark">Vedic Astrology + Remedies</span>
              <span className="ma-badge dark">Pilgrimage + Yoga Mudra</span>
            </div>

            <h1 className="ma-title">9-Day Meditation & Spiritual Immersive in Kathmandu, Nepal</h1>

            <p className="ma-p" style={{ fontSize: '18px', maxWidth: '980px' }}>
              Experience an authentic <strong style={{ color: '#fff' }}>spiritual retreat in Kathmandu</strong> designed for deep inner healing, clarity, and transformation.
              This immersive journey blends <strong style={{ color: '#fff' }}>guided meditation</strong>, <strong style={{ color: '#fff' }}>Vedic astrology counseling</strong>,
              <strong style={{ color: '#fff' }}>yoga & mudra energy practices</strong>, and meaningful visits to the most sacred temples and stupas in Nepal.
            </p>

            <div className="ma-btns" style={{ marginTop: '14px' }}>
              <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              <button className="ma-btn gold" onClick={() => scrollToSection('pricing')}>View Pricing</button>
              <button className="ma-btn line" onClick={() => scrollToSection('booking-9day')}>Reserve Dates</button>
            </div>

            <p className="ma-note" style={{ marginTop: '12px' }}>
              SEO Focus: Meditation retreat Kathmandu • Spiritual retreat Nepal • Vedic astrology consultation Nepal • Yoga mudra workshop Kathmandu • Pilgrimage tour Kathmandu Valley.
            </p>
          </header>

          <div style={{ height: '18px' }}></div>

          <div className="ma-row">

            {/* LEFT CONTENT */}
            <main style={{ gridColumn: 'span 12' }}>

              {/* WHY / WHO FOR */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Why This 9-Day Spiritual Immersive Works</h2>
                <p className="ma-p">
                  Many retreats only relax the body. This program aligns your <strong style={{ color: '#fff' }}>mind, energy, and life direction</strong>.
                  We use a structured daily practice, sacred environments, and personalized guidance so your transformation stays with you after Nepal.
                </p>

                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>✅ Built for inner clarity</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.8 }}>Calm the nervous system, reduce overthinking, and build a stable meditation routine.</span>
                  </div>
                  <div className="ma-box">
                    <strong>✅ Personalized Vedic insight</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.8 }}>Understand your ascendant (Lagna), Nakshatra, and timing — with practical remedies.</span>
                  </div>
                  <div className="ma-box">
                    <strong>✅ Sacred Kathmandu visits</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.8 }}>Pilgrimage as practice: meditation, reflection, and meaning — not rushed sightseeing.</span>
                  </div>
                </div>

                <div className="ma-hr"></div>

                <h3 style={{ margin: '0 0 10px', color: '#fff' }}>Who is this retreat for?</h3>
                <ul className="ma-ul">
                  <li>Overthinkers seeking peace, clarity, and emotional balance</li>
                  <li>Professionals experiencing burnout or stress</li>
                  <li>Spiritual seekers who want authentic Nepal experience</li>
                  <li>People seeking direction in love, career, or life purpose</li>
                  <li>Beginners (no prior meditation experience needed)</li>
                </ul>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* INCLUDED */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">What’s Included</h2>
                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>🧘 Daily Meditation & Breathwork</strong>
                    <ul className="ma-ul">
                      <li>Guided meditation sessions (silence + mantra + awareness)</li>
                      <li>Pranayama for calmness, energy, and focus</li>
                      <li>Emotional release + nervous system reset practices</li>
                      <li>Personal daily routine you can continue at home</li>
                    </ul>
                  </div>
                  <div className="ma-box">
                    <strong>🔮 Vedic Astrology Counseling (Jyotish)</strong>
                    <ul className="ma-ul">
                      <li>Kundali preparation from your birth details</li>
                      <li>Ascendant (Lagna), Moon, Nakshatra, houses, timing</li>
                      <li>Life themes: relationships, career, health, purpose</li>
                      <li>Remedies: mantra, lifestyle, temple guidance (optional)</li>
                    </ul>
                  </div>
                  <div className="ma-box">
                    <strong>🤲 Yoga & Mudra Energy Workshops</strong>
                    <ul className="ma-ul">
                      <li>Mudra science for focus, sleep, digestion, calm</li>
                      <li>Bandha basics + energy alignment practice</li>
                      <li>Gentle yoga sequences for stability and grounding</li>
                    </ul>
                  </div>
                  <div className="ma-box">
                    <strong>🏛 Kathmandu Sacred Site Visits</strong>
                    <ul className="ma-ul">
                      <li>Pashupatinath Temple (Shiva)</li>
                      <li>Boudhanath Stupa (kora meditation)</li>
                      <li>Swayambhunath (mind & vision)</li>
                      <li>Pharping meditation cave area (deep practice)</li>
                      <li>Budhanilkantha (Vishnu) or other optional sites</li>
                    </ul>
                  </div>
                </div>

                <p className="ma-note" style={{ marginTop: '12px' }}>
                  Not included: accommodation (can be arranged), transportation (optional), personal expenses.
                </p>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* ITINERARY */}
              <section id="itinerary" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">9-Day Itinerary (Kathmandu Valley)</h2>
                <p className="ma-p">
                  Each day includes practice + integration. The schedule is designed to be calm and meaningful, with flexibility for your energy level.
                </p>

                <div className="ma-grid">
                  <div className="ma-box">
                    <strong>Day 1 — Arrival & Grounding</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Welcome meeting • intention setting • gentle breathwork • evening meditation • retreat guidelines.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 2 — Meditation Foundation + Nervous System Reset</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Pranayama training • mindfulness practice • journaling prompts • mudra basics for calm & focus.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 3 — Vedic Astrology Session (Life Blueprint)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      1:1 Jyotish counseling • Lagna + Nakshatra • timing cycles • remedies • evening silent integration.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 4 — Pashupatinath (Release & Renewal)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Temple visit • reflection practice • optional ritual guidance • mantra meditation • emotional release technique.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 5 — Boudhanath (Walking Meditation & Compassion)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Kora walking meditation • breath awareness • mudra workshop for clarity • sunset stillness practice.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 6 — Swayambhunath (Mind & Vision)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Sacred ascent • focus meditation • yoga sequence for grounding • life-direction reflection session.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 7 — Pharping (Deep Practice Day)</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Longer meditation sittings • pranayama refinement • mudra + bandha energy work • spiritual Q&A.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 8 — Integration & Personal Roadmap</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Personal routine design • obstacles & solutions • practical remedies schedule • confidence & discipline training.
                    </span>
                  </div>

                  <div className="ma-box">
                    <strong>Day 9 — Closing Ceremony & Next Steps</strong><br />
                    <span style={{ color: 'rgba(246,231,183,.86)', lineHeight: 1.85 }}>
                      Final counseling • closing meditation • next 30-day plan • farewell guidance and support resources.
                    </span>
                  </div>
                </div>

                <div className="ma-box" style={{ marginTop: '12px', background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.25)' }}>
                  <strong style={{ color: 'var(--ma-gold)' }}>Required for Kundali preparation (send early if possible):</strong>
                  <div className="ma-note" style={{ marginTop: '6px' }}>
                    Full name • Date of birth • Exact time of birth (if known) • Place of birth • Gender (optional)
                  </div>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* GALLERY / PHOTOS */}
              <section id="photos" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Retreat Photos</h2>
                <p className="ma-p">Add your own images of Kathmandu sacred sites, meditation sessions, mudra workshops, and your studio in Satdobato.</p>

                <div className="ma-gallery">
                  <div className="ma-img">
                    <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=70" alt="Meditation in Kathmandu Nepal" />
                    <span>Meditation Practice</span>
                  </div>
                  <div className="ma-img">
                    <img src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=1400&q=70" alt="Boudhanath Stupa Kathmandu" />
                    <span>Boudhanath Stupa</span>
                  </div>
                  <div className="ma-img">
                    <img src="https://images.unsplash.com/photo-1593697821252-0c9137d0a63e?auto=format&fit=crop&w=1400&q=70" alt="Swayambhunath Kathmandu Nepal" />
                    <span>Swayambhunath</span>
                  </div>
                  <div className="ma-img">
                    <img src="https://images.unsplash.com/photo-1520975958225-9e1d8a1b4b72?auto=format&fit=crop&w=1400&q=70" alt="Pashupatinath Temple Kathmandu" />
                    <span>Pashupatinath</span>
                  </div>
                  <div className="ma-img">
                    <img src="https://images.unsplash.com/photo-1520975682031-a6ad7bbad1c9?auto=format&fit=crop&w=1400&q=70" alt="Himalayan spiritual retreat Nepal" />
                    <span>Spiritual Reflection</span>
                  </div>
                  <div className="ma-img">
                    <img src="https://images.unsplash.com/photo-1520975743639-2b1f6f1a4bbf?auto=format&fit=crop&w=1400&q=70" alt="Yoga mudra workshop Nepal" />
                    <span>Yoga & Mudra</span>
                  </div>
                </div>

                <p className="ma-note" style={{ marginTop: '12px' }}>
                  Tip: Replace these with your own images for better SEO + trust. Add ALT text like: “Meditation retreat in Kathmandu Nepal – MeditationAstro”.
                </p>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* FAQ */}
              <section id="faq-9day" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">FAQs — 9-Day Kathmandu Spiritual Immersive</h2>

                <details className="ma-acc">
                  <summary>Is this program beginner friendly?</summary>
                  <div className="ma-accbody">Yes. We guide you step-by-step and adapt meditation, breathwork, and yoga practices to your level.</div>
                </details>

                <details className="ma-acc">
                  <summary>Can I do private 1:1 instead of group?</summary>
                  <div className="ma-accbody">Yes. A private plan offers flexible scheduling, deeper counseling, and higher personalization.</div>
                </details>

                <details className="ma-acc">
                  <summary>Is accommodation included?</summary>
                  <div className="ma-accbody">Accommodation is not included by default, but we can help arrange options near Satdobato or central Kathmandu.</div>
                </details>

                <details className="ma-acc">
                  <summary>What if I don’t know my exact time of birth?</summary>
                  <div className="ma-accbody">You can still receive meaningful guidance. Share what you know and we will work with it.</div>
                </details>

                <details className="ma-acc">
                  <summary>How do I book?</summary>
                  <div className="ma-accbody">WhatsApp is fastest. Or use the booking form below. We confirm within 24 hours.</div>
                </details>

                <div className="ma-btns" style={{ justifyContent: 'center', marginTop: '16px' }}>
                  <button className="ma-btn gold" onClick={() => scrollToSection('booking-9day')}>Reserve Now</button>
                  <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                </div>
              </section>

            </main>

            {/* RIGHT SIDEBAR */}
            <aside style={{ gridColumn: 'span 12' }}>

              {/* PRICING */}
              <section id="pricing" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Package Pricing (9 Days)</h2>
                <p className="ma-p">Choose the comfort level that matches your style. Prices are for program guidance. Add-ons available.</p>

                <div className="ma-tablewrap">
                  <table className="ma-table" aria-label="9 Day Retreat Pricing Table">
                    <thead>
                      <tr>
                        <th>Plan</th>
                        <th>Best For</th>
                        <th>Includes</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Essential</strong><br /><span className="ma-note">Small group</span></td>
                        <td>Structured practice + sacred visits</td>
                        <td>Astrology session • daily meditation • 2 mudra workshops • 4 sacred visits • closing roadmap</td>
                        <td className="ma-price">$699</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Standard</strong><br /><span className="ma-note">Most popular</span></td>
                        <td>Best balance of depth + integration</td>
                        <td>Extended astrology • daily meditation • 3 mudra workshops • 5 sacred visits • integration coaching</td>
                        <td className="ma-price">$899</td>
                      </tr>
                      <tr>
                        <td><strong style={{ color: '#fff' }}>Luxury Private</strong><br /><span className="ma-note">1:1 premium</span></td>
                        <td>Private schedule + deeper counseling</td>
                        <td>90–120 min astrology • daily private practice • 4 mudra sessions • private pilgrimage • remedies plan + notes</td>
                        <td className="ma-price">$1299</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="ma-box" style={{ marginTop: '12px' }}>
                  <strong>Optional Add-ons</strong>
                  <ul className="ma-ul">
                    <li>Airport pickup • private vehicle</li>
                    <li>Hotel arrangement support</li>
                    <li>Extra astrology hour</li>
                    <li>Extra meditation days (extend retreat)</li>
                  </ul>
                </div>

                <div className="ma-btns" style={{ marginTop: '12px' }}>
                  <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Book / Ask Price on WhatsApp</a>
                  <button className="ma-btn line" onClick={() => scrollToSection('booking-9day')}>Reserve via Form</button>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* BOOKING FORM */}
              <section id="booking-9day" className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Book the 9-Day Spiritual Immersive</h2>
                <p className="ma-p">Fill the form and we will confirm availability within 24 hours.</p>

                <div className="ma-form">
                  <form onSubmit={handleImmersiveSubmit}>
                    <div className="ma-formgrid">
                      <input className="ma-field" name="fullName" required placeholder="Full Name *" value={immersiveForm.fullName} onChange={handleImmersiveChange} />
                      <input className="ma-field" name="email" type="email" required placeholder="Email *" value={immersiveForm.email} onChange={handleImmersiveChange} />
                      <input className="ma-field" name="whatsapp" placeholder="WhatsApp Number (recommended)" value={immersiveForm.whatsapp} onChange={handleImmersiveChange} />
                      <input className="ma-field" name="country" placeholder="Country" value={immersiveForm.country} onChange={handleImmersiveChange} />

                      <select className="ma-field" name="plan" required value={immersiveForm.plan} onChange={handleImmersiveChange}>
                        <option value="" disabled>Select Plan *</option>
                        <option value="9-Day Essential ($699)">9-Day Essential ($699)</option>
                        <option value="9-Day Standard ($899)">9-Day Standard ($899)</option>
                        <option value="9-Day Luxury Private ($1299)">9-Day Luxury Private ($1299)</option>
                      </select>

                      <input className="ma-field" name="dates" placeholder="Preferred Dates (e.g., 5–13 Oct 2026)" value={immersiveForm.dates} onChange={handleImmersiveChange} />
                      <input className="ma-field" name="participants" placeholder="Number of Participants" value={immersiveForm.participants} onChange={handleImmersiveChange} />

                      <div className="ma-box" style={{ marginTop: '6px' }}>
                        <strong>Birth Details (for Kundali / Jyotish)</strong>
                        <div className="ma-note" style={{ marginTop: '6px', marginBottom: '10px' }}>
                          Full name • DOB • exact time (if known) • place of birth
                        </div>
                        <div className="ma-formgrid">
                          <input className="ma-field" name="dob" placeholder="Date of Birth (DD/MM/YYYY)" value={immersiveForm.dob} onChange={handleImmersiveChange} />
                          <input className="ma-field" name="tob" placeholder="Time of Birth (if known)" value={immersiveForm.tob} onChange={handleImmersiveChange} />
                          <input className="ma-field" name="pob" placeholder="Place of Birth (City, Country)" value={immersiveForm.pob} onChange={handleImmersiveChange} />
                        </div>
                      </div>

                      <textarea className="ma-field" name="intention" rows={5} placeholder="Special intention / questions (peace, life direction, relationship, career, healing...)" value={immersiveForm.intention} onChange={handleImmersiveChange}></textarea>

                      <label className="ma-note" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <input type="checkbox" required style={{ marginTop: '3px' }} />
                        I agree to be contacted by MeditationAstro via email/WhatsApp for booking confirmation.
                      </label>

                      <button className="ma-btn gold" type="submit">Reserve My 9-Day Retreat</button>

                      <div className="ma-note">
                        Prefer instant booking? <a href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ma-gold)', fontWeight: 900, textDecoration: 'none' }}>Message on WhatsApp</a>.
                      </div>
                    </div>
                  </form>
                </div>
              </section>

              <div style={{ height: '18px' }}></div>

              {/* CONTACT */}
              <section className="ma-card flat" style={{ boxShadow: 'var(--ma-shadow)' }}>
                <h2 className="ma-h2">Contact</h2>
                <div className="ma-grid">
                  <div className="ma-box"><strong>📧 Email</strong><br /><span style={{ color: 'rgba(246,231,183,.86)' }}>meditationastro1@gmail.com</span></div>
                  <div className="ma-box"><strong>📱 WhatsApp / Call</strong><br /><span style={{ color: 'rgba(246,231,183,.86)' }}>+977 9841647283</span></div>
                  <div className="ma-box"><strong>📍 Location</strong><br /><span style={{ color: 'rgba(246,231,183,.86)' }}>Satdobato, Lalitpur, Kathmandu Valley, Nepal</span></div>
                </div>
              </section>

            </aside>
          </div>

          <div style={{ height: '16px' }}></div>

          {/* FINAL CTA */}
          <section className="ma-card flat" style={{ textAlign: 'center', boxShadow: 'var(--ma-shadow)' }}>
            <h2 className="ma-h2" style={{ marginBottom: '8px' }}>Begin your Journey — Kathmandu is a sacred classroom.</h2>
            <p className="ma-p" style={{ maxWidth: '920px', margin: '0 auto 14px' }}>
              If you feel called to deepen your meditation, understand your birth chart, and visit Nepal’s holy places with meaning —
              this 9-day immersive is your next step.
            </p>
            <div className="ma-btns" style={{ justifyContent: 'center' }}>
              <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              <button className="ma-btn gold" onClick={() => scrollToSection('booking-9day')}>Reserve via Form</button>
              <button className="ma-btn line" onClick={() => scrollToSection('itinerary')}>See Itinerary</button>
            </div>

            <p className="ma-note" style={{ marginTop: '14px' }}>
              SEO Keywords: 9 day meditation retreat Kathmandu, spiritual immersive Nepal, Kathmandu pilgrimage retreat,
              Vedic astrology consultation Nepal, yoga mudra workshop Kathmandu, meditationastro Nepal.
            </p>
          </section>

        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="ma-sticky">
        <div className="ma-wrap">
          <a className="ma-btn green" href="https://wa.me/9779841647283" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 14px' }}>WhatsApp</a>
          <button className="ma-btn gold" onClick={() => scrollToSection('booking')} style={{ padding: '10px 14px' }}>Reserve</button>
          <button className="ma-btn line" onClick={() => scrollToSection('plans')} style={{ padding: '10px 14px' }}>Plans</button>
        </div>
      </div>
    </div>
  );
};
