# !/usr/bin/env bash
set -ueo pipefail

ENV=${1}
BUCKET="${ENV}.fightsync.live-root"

if [ "$ENV" = "prod" ]; then
    BUCKET="fightsync.live-root"
fi

aws s3 sync ./build s3://${BUCKET} --delete
