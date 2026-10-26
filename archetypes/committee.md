---
# A meeting rather than an outing: PLC, subcommittee, special meetings.
# Scouts:     hugo new content --kind meeting events/2026-10-27-plc/index.md
# Committee:  hugo new content committee/2026-11-finance-subcommittee/index.md
# Regular weekly/monthly meetings don't need a file: they're in data/meetings.yaml.
title: "{{ replace (replaceRE `^\d{4}-(\d{2}-)?(\d{2}-)?` "" .File.ContentBaseName) "-" " " | title }}"
layout: meeting
startDate: {{ now.Format "2006-01-02" }}   # e.g. 2026-11-13 (all times are Central)
startTime: ""              # e.g. "6:30 PM"
endTime: ""                # optional, e.g. "7:30 PM"
category: ""               # short label shown as a tag, e.g. PLC, Finance subcommittee, Special meeting
locationName: ""           # e.g. "Northminster Presbyterian Church"
locationAddress: |         # optional; one line per row below, each indented two spaces

mapUrl: ""
calendarUrl: ""            # optional: "copy to my calendar" link from Google Calendar
contact: ""                # optional
description: ""            # optional: one line shown under the title in listings
---

