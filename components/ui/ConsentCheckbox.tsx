'use client'

interface Props {
  checked: boolean
  onChange: (v: boolean) => void
  error?: boolean
  id?: string
}

/**
 * Обязательный чекбокс согласия на обработку персональных данных.
 * Требование 152-ФЗ: согласие даётся отдельным действием (не «нажимая кнопку»).
 */
export default function ConsentCheckbox({ checked, onChange, error, id = 'ff-consent' }: Props) {
  return (
    <label className={`ff-consent${error ? ' is-error' : ''}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span>
        Я даю согласие на обработку моих персональных данных в соответствии с{' '}
        <a href="/privacy" target="_blank" rel="noopener">Политикой обработки персональных данных</a>{' '}
        и подтверждаю ознакомление с ней.
      </span>
    </label>
  )
}
