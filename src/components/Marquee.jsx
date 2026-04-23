function Marquee({ items, className = '', textClassName = '', speed = 28, dataCursorZone }) {
  const repeated = [...items, ...items]

  return (
    <div
      className={`marquee group overflow-hidden py-3 ${className}`}
      style={{ '--marquee-duration': `${speed}s` }}
      data-cursor-zone={dataCursorZone}
    >
      <div className="marquee-track">
        {[0, 1].map((track) => (
          <div key={track} className="marquee-row">
            {repeated.map((item, index) => (
              <span
                key={`${track}-${item}-${index}`}
                className={`font-display uppercase tracking-[0.05em] ${textClassName}`}
              >
                {item} <span className="px-3 align-middle text-[0.8em]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
