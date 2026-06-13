// slug → Langame domain_id mapping
// verify: vasilyeostrovsky=ff52, komendantsky=ff52manta, makhachkala=46
export const SLUG_TO_DOMAIN: Record<string, string> = {
  sadovaya:         'ff52sadovaya',
  tekhnologichesky: 'ff52tehno',
  elektrosila:      'ff52electra',
  prosvescheniya:   'ff52prosvet',
  vasilyeostrovsky: 'ff52',
  komendantsky:     '46',
  makhachkala:      'ff52manta',
}

// slug → Langame club_id (numeric, used in tariff filtering)
// all clubs = 1 except komendantsky (domain 46) = 2
export const SLUG_TO_CLUB_ID: Record<string, number> = {
  komendantsky: 2,
}
export function getClubId(slug: string): number {
  return SLUG_TO_CLUB_ID[slug] ?? 1
}

// slug → asset_clubs.code (fullfocushub)
export const SLUG_TO_ASSET_CODE: Record<string, string> = {
  elektrosila:      'ELEC',
  komendantsky:     'KOM',
  prosvescheniya:   'PROS',
  vasilyeostrovsky: 'VAS',
  makhachkala:      'MAH',
  sadovaya:         'SAD',
  tekhnologichesky: 'TEH',
}

export interface LiveSeat {
  uuid:     string
  number:   string
  zoneId:   number
  zoneName: string
  x:        number
  y:        number
  status:   'free' | 'busy' | 'tech' | 'off'
}
