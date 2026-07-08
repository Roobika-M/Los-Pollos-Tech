import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import DashboardHero from "../components/DashboardHero";
import GlassPanel from "../components/GlassPanel";
import PrimaryButton from "../components/PrimaryButton";
import StatTile from "../components/StatTile";
import ActivityRow from "../components/ActivityRow";
import { useSmokeNavigate } from "../components/SmokeTransition";
import "../components/Dashboard.css";

/**
 * "/home" — the dashboard. This is what the intro leads directly
 * into; there is no landing page in between. Everything below is
 * built from the shared GlassPanel / PrimaryButton / StatTile /
 * ActivityRow components so the five sections stay visually
 * consistent without duplicating markup.
 *
 * Reaction data is fetched once from the same endpoint ViewReactions
 * already uses, and reused across three sections (Saved Experiments,
 * Recent Activity, Statistics) instead of three separate requests.
 * If the backend isn't reachable, each section falls back to a
 * quiet empty state rather than breaking the page.
 */
function Home() {
  const smokeNavigate = useSmokeNavigate();
  const [reactions, setReactions] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    axios
      .get("http://localhost:8080/los/get")
      .then((response) => {
        if (!cancelled) setReactions(response.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const savedExperiments = reactions.slice(0, 4);
  const recentActivity = [...reactions].slice(-5).reverse();
  const uniqueProducts = new Set(reactions.map((r) => r.product)).size;

  return (
    <div className="dash-page">
      <Navigation />

      <div className="dash-content">
        <DashboardHero />

        {/* ---------- Mix Chemicals ---------- */}
        <GlassPanel as="section" className="dash-section">
          <div className="dash-section__head">
            <h2 className="dash-section__title">Mix Chemicals</h2>
          </div>
          <p className="dash-section__desc">
            Combine two reactants and see what the bench gives back.
          </p>
          <div className="dash-actions">
            <PrimaryButton onClick={() => smokeNavigate("/mix")}>
              Open The Mix
            </PrimaryButton>
          </div>
        </GlassPanel>

        {/* ---------- Reaction Database ---------- */}
        <GlassPanel as="section" className="dash-section" delay={0.05}>
          <div className="dash-section__head">
            <h2 className="dash-section__title">Reaction Database</h2>
          </div>
          <p className="dash-section__desc">
            Browse every reaction on file, or log a new one to the
            permanent record.
          </p>
          <div className="dash-actions">
            <PrimaryButton variant="outline" onClick={() => smokeNavigate("/view")}>
              Browse The Vault
            </PrimaryButton>
            <PrimaryButton variant="outline" onClick={() => smokeNavigate("/add")}>
              Log New Formula
            </PrimaryButton>
          </div>
        </GlassPanel>

        {/* ---------- Saved Experiments ---------- */}
        <GlassPanel as="section" className="dash-section" delay={0.1}>
          <div className="dash-section__head">
            <h2 className="dash-section__title">Saved Experiments</h2>
          </div>
          <p className="dash-section__desc">
            A quick look at what's currently on file.
          </p>

          {loadError && (
            <p className="status-msg err">Couldn't reach the record — is the server running?</p>
          )}
          {!loadError && savedExperiments.length === 0 && (
            <p className="empty-state">No experiments on file yet.</p>
          )}
          {!loadError && savedExperiments.length > 0 && (
            <div className="saved-list">
              {savedExperiments.map((r) => (
                <div className="saved-row" key={r.id}>
                  <span className="saved-row__name">{r.product}</span>
                  <span className="saved-row__meta">
                    {r.reactantOne} + {r.reactantTwo}
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>

        {/* ---------- Recent Activity ---------- */}
        <GlassPanel as="section" className="dash-section" delay={0.15}>
          <div className="dash-section__head">
            <h2 className="dash-section__title">Recent Activity</h2>
          </div>
          <p className="dash-section__desc">
            The last few entries committed to the record.
          </p>

          {!loadError && recentActivity.length === 0 && (
            <p className="empty-state">No activity yet.</p>
          )}
          {!loadError &&
            recentActivity.map((r) => (
              <ActivityRow key={r.id} product={r.product} reactionType={r.reactionType} />
            ))}
        </GlassPanel>

        {/* ---------- Statistics ---------- */}
        <GlassPanel as="section" className="dash-section" delay={0.2}>
          <div className="dash-section__head">
            <h2 className="dash-section__title">Statistics</h2>
          </div>
          <div className="stats-grid">
            <StatTile value={reactions.length} label="Total Reactions" delay={0.05} />
            <StatTile value={uniqueProducts} label="Unique Products" delay={0.1} />
            <StatTile
              value={reactions.length > 0 ? reactions[reactions.length - 1].product : "—"}
              label="Latest Product"
              delay={0.15}
            />
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

export default Home;
