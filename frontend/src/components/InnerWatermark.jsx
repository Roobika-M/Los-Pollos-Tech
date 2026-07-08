import ElementTile from "./ElementTile";

/** Two oversized, faded periodic-table tiles pinned to opposite
 * corners as background decor — same Po/84 and Te/52 the landing
 * logo uses, just huge and quiet instead of the hero treatment. */
function InnerWatermark() {
  return (
    <>
      <div className="ip-watermark ip-watermark--po" aria-hidden="true">
        <ElementTile number={84} symbol="Po" mass="(209)" size="lg" />
      </div>
      <div className="ip-watermark ip-watermark--te" aria-hidden="true">
        <ElementTile number={52} symbol="Te" mass="127.60" size="lg" />
      </div>
    </>
  );
}

export default InnerWatermark;
