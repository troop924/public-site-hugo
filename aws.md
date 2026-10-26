# AWS setup for troop924.org

The deploy workflow (`.github/workflows/deploy.yml`) builds the site, syncs it to S3, and clears the CloudFront
cache. This is the one-time setup it needs.

## One-time AWS setup

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

## Before the first deploy

- **Back up the bucket.** The sync uses `--delete`, so files from the old site that aren't in `public/` are
  removed (the old CSS and the `Troop 924 Site Images/` folder). The PDFs and Word forms are kept at the same paths.
  `aws s3 sync s3://<BUCKET> ./bucket-backup` beforehand is cheap insurance.
- **Check how CloudFront reaches the bucket.** Hugo publishes pages as `/about/index.html`. If the CloudFront
  origin is the S3 *website* endpoint (`…s3-website-us-east-1.amazonaws.com`), `/about/` works as-is. If it's
  the S3 REST endpoint with Origin Access Control, add a small CloudFront Function that appends `index.html`
  to paths ending in `/`.
- The old page addresses (`/about.html`, `/parents.html`, `/calendar.html`, …) redirect to the new pages.
