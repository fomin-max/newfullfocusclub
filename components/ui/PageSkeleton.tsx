// Shared loading skeleton — imported from loading.tsx files across all routes.
// Server component: no 'use client' needed; CSS lives in globals.css (.ff-bone, .ff-page-skel*).

interface Props {
  /** 'club' adds a 52 px sub-nav bar below the header */
  variant?: 'default' | 'club' | 'tournament'
}

export default function PageSkeleton({ variant = 'default' }: Props) {
  return (
    <div className="ff-page-skel">
      <div className="ff-page-skel__header" />
      {variant === 'club' && <div className="ff-page-skel__subnav" />}

      {/* Hero */}
      <div className="ff-bone ff-page-skel__hero" />

      <div className="ff-page-skel__body">
        {/* Section label + heading */}
        <div className="ff-bone" style={{ height: 14, width: '18%' }} />
        <div className="ff-bone" style={{ height: 44, width: '55%' }} />

        {variant === 'tournament' ? (
          <>
            {/* Two-col layout: info + registration form */}
            <div className="ff-page-skel__grid-2" style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="ff-bone" style={{ height: 200 }} />
                <div className="ff-bone" style={{ height: 120 }} />
                <div className="ff-bone" style={{ height: 80 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="ff-bone" style={{ height: 360 }} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="ff-page-skel__grid-3">
              {[0, 1, 2].map(i => (
                <div key={i} className="ff-bone" style={{ height: 200 }} />
              ))}
            </div>
            <div className="ff-page-skel__grid-2">
              {[0, 1].map(i => (
                <div key={i} className="ff-bone" style={{ height: 120 }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
