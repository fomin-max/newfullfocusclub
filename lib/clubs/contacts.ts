import type { ClubData } from './types'
import { ALL_CLUBS } from './shared'
import { CLUB_DATA as vasilyeostrovsky } from './vasilyeostrovsky'
import { CLUB_DATA as elektrosila }      from './elektrosila'
import { CLUB_DATA as komendantsky }     from './komendantsky'
import { CLUB_DATA as prosvescheniya }   from './prosvescheniya'
import { CLUB_DATA as sadovaya }         from './sadovaya'
import { CLUB_DATA as tekhnologichesky } from './tekhnologichesky'
import { CLUB_DATA as makhachkala }      from './makhachkala'
import { CLUB_DATA as shushary }         from './shushary'

const DATA: Record<string, ClubData> = {
  vasilyeostrovsky, elektrosila, komendantsky, prosvescheniya,
  sadovaya, tekhnologichesky, makhachkala, shushary,
}

/** Контакты клуба для страницы /book — только то, что нужно для брони */
export interface ClubContacts {
  slug:     string
  name:     string
  metro:    string
  addr:     string
  color:    string
  phone:    string
  phoneHref: string
  telegram: string
  telegramHref: string
  vk:       string
  siteHref: string
}

export const CLUB_CONTACTS: ClubContacts[] = ALL_CLUBS.map(ref => {
  const c = DATA[ref.slug].CLUB
  return {
    slug:      ref.slug,
    name:      ref.name,
    metro:     ref.metro,
    addr:      ref.addr,
    color:     ref.color,
    phone:     c.PHONE,
    phoneHref: `tel:${c.PHONE.replace(/[^+\d]/g, '')}`,
    telegram:  c.TELEGRAM,
    telegramHref: `https://t.me/${c.TELEGRAM.replace('@', '')}`,
    vk:        c.VK,
    siteHref:  `/clubs/${ref.slug}#live`,
  }
})

export const getClubContacts = (slug: string) => CLUB_CONTACTS.find(c => c.slug === slug)
