---
# Make a new event with:  hugo new content events/2026-11-commando-campout/index.md
# Put photos in the same folder after the trip. They become the gallery automatically.
title: "{{ replace (replaceRE `^\d{4}-(\d{2}-)?` "" .File.ContentBaseName) "-" " " | title }}"
date: {{ .Date }}          # start, e.g. 2026-11-13T18:00:00-06:00
endDate:                   # last day, e.g. 2026-11-15 (leave blank for one-day events)
category: Campout          # Campout, Service, High adventure, Summer camp, Court of Honor…
location: ""
mapUrl: ""
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
