---
# SAMPLE EVENT: shows how an upcoming trip is written. Drafts only appear with `hugo server -D`.
draft: true
title: Fall Campout
date: 2026-10-16T18:00:00-05:00
endDate: 2026-10-18
category: Campout
location: "[Campground], [Town]"
cost: "[$XX]"
depart: "Fri [time], Northminster parking lot"
return: "Sun [time], same place"
uniform: Class A for travel
contact: "[Trip leader], [email]"
packing: "The standard campout list, plus [anything trip-specific]."
actions:
  - kind: rsvp
    label: RSVP
    due: 2026-10-09
    note: So the patrols can plan menus.
    url: "https://www.scoutbook.com"
  - kind: form
    label: Permission slip
    note: Signed by a parent or guardian for this trip.
    url: "/forms/"
  - kind: form
    label: Annual health & medical record
    note: Parts A and B must be current before any campout.
    url: "/BSA_Annual_Medical_Form_ABC.pdf"
  - kind: pay
    label: Pay the trip fee
    note: Covers food, site fee and gas.
  - kind: volunteer
    label: Drivers needed
    note: "Adults can drive or camp with us. Youth Protection training required."
    url: "mailto:[trip leader email]"
---

[A short description of the trip: what the Scouts will do, what's special about the site.]
