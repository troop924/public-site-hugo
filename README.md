# troop924.org

The Troop 924 website, built with [Hugo](https://gohugo.io) and the `beacon` theme in `themes/beacon/`.
The look comes from the Evanston city flag: forest green, gold for the beach, and blue for the lake.

## Working on it locally

```sh
brew install hugo          # 0.150 or newer, "extended" build
hugo server -D             # http://localhost:1313 (-D also shows the two sample draft events)
```

## Where things live

| What | Where |
|---|---|
| Home page text, the four "What we do" cards | `content/_index.md` |
| About, Join, Service, For families, Forms | `content/<page>/index.md` |
| Events and trip reports | `content/events/<yyyy-mm-name>/index.md`, one folder each |
| Committee and subcommittee meetings | `content/committee/<yyyy-mm-dd-name>/index.md` |
| Weekly troop meeting, monthly committee meeting | `data/meetings.yaml` |
| Ma-Ka-Ja-Wan merit badge planner | `themes/beacon/assets/planner/` (yearly data: `schedule-data.js`) |
| Chartering organization and supporting businesses (home page) | `data/supporters.yaml`, logos in `assets/images/supporters/` |
| Contact email, Google Calendar ID, menu | `hugo.toml` |
| PDFs and Word forms | `static/` (served at the site root, same paths as the old site) |
| Look and layout | `themes/beacon/` |

## Adding an event

```sh
hugo new content events/2026-11-commando-campout/index.md
```

That creates a file with every field listed and explained. Fill in the date, location and cost, and list what
families need to do under `actions`: RSVP, permission slip, health form, payment, or a call for drivers.
Each action can have a due date and a link (Scoutbook, a Google Form, a PDF in `static/`).

The event appears in **What's next** on the home page and on the Events page until its last day.

The Google Calendar is still the troop's master calendar, and it's embedded on the Events page. Make event
pages only for things families need to act on or will want to read about afterwards, like campouts, service
projects, and the Court of Honor. Regular meetings don't need one (see below).

## Meetings

Meetings are listed in the same date order as events, but drawn lighter so campouts stand out.

**One-off meetings** (PLC, subcommittees, special meetings) get a short file with no packing list or trip report:

```sh
hugo new content --kind meeting events/2026-10-27-plc/index.md               # Scouts' calendar
hugo new content committee/2026-11-16-finance-subcommittee/index.md          # Committee calendar
```

Anything written below the front matter becomes an "Agenda and notes" page linked from the listing.
Leave it empty and the meeting is listed without a link.

**Regular meetings** (the Tuesday troop meeting, the 2nd-Monday committee meeting) are generated from
`data/meetings.yaml`, so there's nothing to add each week. When one is different, edit that file:

- **One meeting moves or is cancelled:** add it under `changes`, using its *normal* date.

  ```yaml
  changes:
    - date: 2026-11-09        # the normal 2nd-Monday date
      moveTo: 2026-11-16      # the listing says "Moved from Mon, Nov 9"
      note: Moved for Veterans Day
    - date: 2026-11-24
      cancel: true            # still listed, crossed out
      note: No meeting Thanksgiving week
  ```

  A change can also set `tag` (a highlight next to the title, like "Webelos visit") and `startTime`, `endTime`, `locationName`, `locationAddress` or `mapUrl` for just that meeting.

- **No meetings for a stretch** (winter break, summer): add it under `breaks`. Meetings from `from` to `to`
  (both included) are left off the listings entirely instead of being shown as cancelled.

  ```yaml
  breaks:
    - from: 2027-06-15
      to: 2027-08-31
  ```

- **Meetings held with another one** (the weekly 7:15 PLC, and the hour-long PLC on the last Tuesday) use
  `with: troop-meeting`. They follow the troop meeting's dates, breaks, moves and cancellations, and show as
  a line inside its listing. `week: last` / `exceptWeek: last` pick which Tuesdays. To cancel just the PLC,
  add a `changes` entry under the PLC itself, using the troop meeting's normal date.

Old `changes` and `breaks` can stay in the file; past dates are ignored.

## After the trip: the trip report

Open the same event file and replace the description with the report, ideally written by a Scout. Set
`author:` (first name only) and `description:` (one or two sentences for the card). Then drop photos into the
event's folder. Once the event's last day has passed:

- the page switches from "Before you go" to "How it went" plus a photo gallery,
- the event moves from "What's next" to "Where we've been" on the home page,
- the first photo (or the one named in `cover:`) becomes the card image.

Hugo resizes the photos automatically, so full-size phone pictures are fine.

**Youth protection:** use first names only, don't caption photos with names, and leave out photos of any
Scout whose family has opted out.

## Publishing

Merging to `main` runs `.github/workflows/deploy.yml`, which builds the site, syncs it to S3, and clears the
CloudFront cache. Pull requests get a build check only. The workflow also rebuilds every morning so finished
events roll over to trip reports without anyone touching the repo.

Setting up AWS for the first time (IAM role, GitHub variables, bucket backup): see [aws.md](aws.md).
