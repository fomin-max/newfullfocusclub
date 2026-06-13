'use client'

export default function CookieSettingsBtn() {
  return (
    <button
      className="ff-footer__policy ff-footer__policy--btn"
      onClick={() => window.dispatchEvent(new CustomEvent('ff:cookie-settings'))}
    >
      Управление cookie
    </button>
  )
}
