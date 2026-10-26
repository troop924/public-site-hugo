---
# Make a new event with:  hugo new content events/2026-11-commando-campout/index.md
# Put photos in the same folder after the trip. They become the gallery automatically.
title: "{{ replace (replaceRE `^\d{4}-(\d{2}-)?` "" .File.ContentBaseName) "-" " " | title }}"
startDate: {{ now.Format "2006-01-02" }}   # first day, e.g. 2026-11-13
startTime: ""              # optional, e.g. "6:00 PM" (all times are Central)
endDate:                   # last day, e.g. 2026-11-15 (leave blank for one-day events)
endTime: ""                # optional, e.g. "1:00 PM"
category: Campout          # Campout, Service, High adventure, Summer camp, Court of Honor…
locationName: ""           # short name, shown in the page header, e.g. "Camp Sol R Crown"
locationAddress: |         # optional; one line per row below, each indented two spaces

mapUrl: ""
calendarUrl: ""      # optional: "copy to my calendar" link from the event in Google Calendar
cost: ""
depart: ""
return: ""
uniform: ""
contact: ""
packing: ""
description: ""            # one or two sentences for the card on the home page

# What families need to do before the trip. Delete any you don't need.
# kind: rsvp | form | pay | volunteer    (due and url are optional)
actions:
  - kind: rsvp
    label: RSVP
    due:
    note: ""
    url: ""
  - kind: form
    label: Permission slip
    note: Signed by a parent or guardian for this trip.
    url: ""

# After the trip:
author: ""                 # the Scout who wrote the report (first name only)
---

Describe the trip here before it happens. Afterwards, replace this with the trip report.
