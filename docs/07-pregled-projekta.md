# Pregled projekta The Five Factions

## 1. Implementirane funkcionalnosti za MVP

Vseh sedem predvidenih funkcionalnosti za MVP je bilo uspešno implementiranih:

1. **Registracija in prijava uporabnikov:** Podprta je registracija s potrditvijo e-pošte, preverjanjem unikatnosti uporabniškega imena in predpisano kompleksnostjo gesla, prijava, odjava, trajna seja ter urejanje lastnega profila (vključno z izbrisom računa).
2. **Izbira in upravljanje ločin (*factions*):** Uporabnik si lahko ogleda vseh pet ločin z opisi ter izbere ali naknadno spremeni eno ali več ločin (z oznako **Divergent** pri več ločinah) ob ohranitvi zgodovine opravljenih nalog.
3. **Pregled osebnega napredka:** Nadzorna plošča in podstrani posameznih ločin prikazujejo aktivne ločine, trenutni rang, zaporedje aktivnih tednov (*streak*) ter seznam tedenskih nalog.
4. **Dodeljevanje in pregled tedenskih nalog ter obvestila:** Sistem vsak teden (in ob prvem obisku nadzorne plošče) za vsako aktivno ločino dodeli tri naključne naloge brez podvajanja v istem tednu ter prek e-pošte obvešča o novih nalogah in odločitvah o dokazilih.
5. **Oddaja dokazil o opravljenih nalogah:** Član lahko k dodeljeni nalogi odda opis izvedbe, osebni razmislek ali fotografijo (v zasebno shrambo) ter ob zavrnitvi odda novo dokazilo ob ohranitvi prejšnjih poskusov v zgodovini.
6. **Medsebojno preverjanje dokazil (*peer review*):** Člani lahko pregledujejo čakajoča dokazila drugih članov in jih potrdijo ali zavrnejo, pri čemer sistem preprečuje ocenjevanje lastnih dokazil in večkratno ocenjevanje istega dokazila.
7. **Napredovanje po ločinah in spremljanje *streak*-a:** Samodejni nedeljski obračun upošteva le potrjene naloge, povečuje *streak* ter zvišuje ali znižuje rang (do največ 10 oziroma najmanj 0 s statusom *Factionless*).

## 2. Skladnost z uporabniškimi zgodbami (pregled 5 uporabniških zgodb)

Implementirane funkcionalnosti zadoščajo pregledanim uporabniškim zgodbam (**US-01** do **US-05**):

- **US-01 (Registracija in prijava uporabnikov):** Zadošča vsem sprejemnim kriterijem. Omogočeni so registracija z zahtevanim geslom in obvezno potrditvijo e-pošte, preverjanje zasedenosti uporabniškega imena, prijava s prikazom napak, trajna seja, odjava ter urejanje lastnega uporabniškega imena, e-pošte in gesla.
- **US-02 (Izbira in upravljanje ločin):** Zadošča vsem sprejemnim kriterijem. Prikazanih je vseh pet aktivnih ločin z opisi, izbira več ločin se lahko kadar koli spremeni, oznaka *Divergent* se prikaže le pri izbiri več kot ene ločine, ob odstranitvi ločine pa se prekličejo zgolj še nedokončane naloge te ločine.
- **US-03 (Pregled osebnega napredka):** Zadošča vsem sprejemnim kriterijem. Nadzorna plošča prikazuje vse trenutno aktivne ločine skupaj z rangom in *streak*-om za vsako posebej, podatki pa se osvežujejo ob spremembah in posodabljajo ob tedenskem obračunu v nedeljo ob 23:59 po času `Europe/Ljubljana`.
- **US-04 (Dodeljevanje in pregled tedenskih nalog ter obvestila):** Zadošča sprejemnim kriterijem. Sistem za vsako aktivno ločino dodeli tri naključne naloge iz ustrezne težavnostne skupine brez ponavljanja v istem tednu, prikaže njihove opise, roke in statuse ter pošilja e-poštna obvestila (manjša opomba: status `In Progress` obstaja v modelu in prikazu, vendar vmesnik nima ločenega gumba za ročni prehod vanj pred oddajo dokazila).
- **US-05 (Oddaja dokazil o opravljenih nalogah):** Zadošča vsem sprejemnim kriterijem. Dokazilo je mogoče oddati samo za lastno dodeljeno nalogo z vsaj enim izmed treh polj (opis, razmislek ali fotografija), sistem shrani čas oddaje in status (`awaiting_review`, `approved`, `rejected`), ob zavrnitvi pa omogoča ponovno oddajo novega dokazila ob ohranitvi prejšnje zgodovine.
