import { useState } from "react";
import InnerNav from "../components/InnerNav";
import InnerFooter from "../components/InnerFooter";
import InnerWatermark from "../components/InnerWatermark";

function Contact() {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");
  const [brief, setBrief] = useState("");
  const [message, setMessage] = useState("");

  const submitRequisition = (event) => {
    event.preventDefault();

    if (!name.trim() || !channel.trim() || !brief.trim()) {
      setMessage("Please fill in every field before submitting.");
      return;
    }

    // Wire this up to your actual endpoint/email service.
    setMessage("Requisition received. We'll respond within one business day.");
    setName("");
    setChannel("");
    setBrief("");
  };

  return (
    <div className="ip-page">
      <InnerWatermark />
      <InnerNav />

      <div className="ip-content">
        <div className="ip-eyebrow" style={{ marginTop: 64 }}>
          Requisition slip
        </div>
        <h1 className="ip-hero-title">Get in Touch</h1>
        <p className="ip-hero-sub">
          Tell us what you're building. We'll follow up with a plan and
          a formula that fits it.
        </p>

        <div className="ip-card" style={{ width: "100%", maxWidth: 560, marginBottom: 56 }}>
          <form className="ip-form" onSubmit={submitRequisition}>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="field">
              <label>Email or preferred channel</label>
              <input
                type="text"
                placeholder="you@company.com"
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
              />
            </div>

            <div className="field">
              <label>What are you building</label>
              <textarea
                placeholder="A short brief on the project and timeline"
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
              />
            </div>

            <button className="btn-outline" type="submit">
              Submit Requisition
            </button>

            {message && (
              <p
                className={`status-msg ${
                  message.startsWith("Requisition received") ? "ok" : "err"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <InnerFooter />
    </div>
  );
}

export default Contact;
