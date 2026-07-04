function HazardStripe({ thin = false }) {
  return <div className={`hazard-stripe${thin ? " thin" : ""}`} aria-hidden="true" />;
}

export default HazardStripe;
