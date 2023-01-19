# !/usr/bin/env bash
set -ueo pipefail

ENV=${1}
BUCKET="admin.fightsync.live-v3"

# if [ "$ENV" = "prod" ]; then
#     BUCKET="admin.fightsync.live-v3"
# fi

aws s3 sync ./build s3://${BUCKET} --delete