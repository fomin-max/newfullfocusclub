import { buildClubSchema, buildClubMetadata } from '@/lib/clubs/schema'
import { CLUB_DATA } from '@/lib/clubs/elektrosila'
import ProgressBar  from '@/components/ui/ProgressBar'
import Ticker       from '@/components/ui/Ticker'
import Footer       from '@/components/ui/Footer'
import { ClubDataProvider }        from '@/components/clubs/ClubDataContext'
import { BookingProvider }         from '@/components/clubs/BookingContext'
import { ClubNavbar, ClubCrumbs } from '@/components/clubs/ClubNavbar'
import ClubHero    from '@/components/clubs/ClubHero'
import LiveMap     from '@/components/clubs/LiveMap'
import ClubZones   from '@/components/clubs/ClubZones'
import Hardware    from '@/components/clubs/Hardware'
import Tariffs     from '@/components/clubs/Tariffs'
import Features    from '@/components/clubs/Features'
import ClubEvents  from '@/components/clubs/ClubEvents'
import ClubReviews from '@/components/clubs/ClubReviews'
import MapContact  from '@/components/clubs/MapContact'
import ClubFAQ     from '@/components/clubs/ClubFAQ'
import Booking     from '@/components/clubs/Booking'

export const metadata = buildClubMetadata(CLUB_DATA)

export default function ElektrosilaPage() {
  return (
    <ClubDataProvider data={CLUB_DATA}>
      <BookingProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildClubSchema(CLUB_DATA)) }}
        />
        <ProgressBar />
        <Ticker />
        <ClubNavbar />
        <ClubCrumbs />
        <main>
          <ClubHero />
          <LiveMap />
          <ClubZones />
          <Hardware />
          <Tariffs />
          <Features />
          <ClubEvents />
          <ClubReviews />
          <MapContact />
          <ClubFAQ />
        </main>
        <Footer />
        <Booking />
      </BookingProvider>
    </ClubDataProvider>
  )
}
