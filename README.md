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
| Meeting time/place, contact email, Google Calendar ID, menu | `hugo.toml` |
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
projects, and the Court of Honor. You don't need one for every meeting.

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

### One-time AWS setup

1. **GitHub OIDC provider** in the AWS account (skip if it already exists):
   `token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.
2. **IAM role** GitHub can assume, trusted only for this repo's `main` branch and `production` environment:

   ```json
   {
     "Effect": "Allow",
     "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
     "Action": "sts:AssumeRoleWithWebIdentity",
     "Condition": {
       "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
       "StringLike": { "token.actions.githubusercontent.com:sub": "repo:<OWNER>/<REPO>:environment:production" }
     }
   }
   ```

   Permissions policy:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       { "Effect": "Allow", "Action": ["s3:ListBucket"], "Resource": "arn:aws:s3:::<BUCKET>" },
       { "Effect": "Allow", "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"], "Resource": "arn:aws:s3:::<BUCKET>/*" },
       { "Effect": "Allow", "Action": "cloudfront:CreateInvalidation", "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>" }
     ]
   }
   ```

3. In the GitHub repo, create an environment named **production** and add these **variables** (they aren't
   secrets): `AWS_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, and optionally `AWS_REGION` (default `us-east-1`).

### Before the first deploy

- **Back up the bucket.** The sync uses `--delete`, so files from the old site that aren't in `public/` are
  removed (the old CSS and the `Troop 924 Site Images/` folder). The PDFs and Word forms are kept at the same paths.
  `aws s3 sync s3://<BUCKET> ./bucket-backup` beforehand is cheap insurance.
- **Check how CloudFront reaches the bucket.** Hugo publishes pages as `/about/index.html`. If the CloudFront
  origin is the S3 *website* endpoint (`…s3-website-us-east-1.amazonaws.com`), `/about/` works as-is. If it's
  the S3 REST endpoint with Origin Access Control, add a small CloudFront Function that appends `index.html`
  to paths ending in `/`.
- The old page addresses (`/about.html`, `/parents.html`, `/calendar.html`, …) redirect to the new pages.
