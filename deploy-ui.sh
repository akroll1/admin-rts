# #!/usr/bin/env bash
# set -ueo pipefail

# # ENV=${1}
# # BUCKET="${ENV}.fightsync.live-root"

# # if [ "$ENV" = "prod" ]; then
#     BUCKET="fightsync.live-root"
# # fi

# aws s3 sync ./build s3://${BUCKET} --delete
# # forcing diff

#!/usr/bin/env bash

S3_BUCKET="fightsync.live-root"

pushd src
npm run build
popd

aws s3 sync build s3://${S3_BUCKET} --delete 


# aws cloudfront create-invalidation --distribution-id E1B89ASVD5SL5G --paths "/*"