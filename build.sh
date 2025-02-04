#!/bin/sh -vvv

date && echo 'Running build with envs:'

echo '=================='
env | egrep 'NEXT|REACT|SENTRY|REBUILD|BUILD_PARAMS|S3' | sort

# ls -alR
# ls -alR >/tmp/ls-alR.txt

bun $BUILD_PARAMS

mc alias set minio $REBUILD_S3_HOST $REBUILD_S3_ACCESS_KEY $REBUILD_S3_SECRET_KEY

mc cp -r --disable-multipart /tmp/ls-alR.txt minio/$REBUILD_S3_BUCKET

cd packages
echo dirs: *

for dir in *
do
  if [ -d "$dir/out" ]; then
    echo `date`: syncing $dir started
    #mc mirror --overwrite --disable-multipart $dir/out/ minio/$REBUILD_S3_BUCKET
    mc cp -r --disable-multipart $dir/out/ minio/$REBUILD_S3_BUCKET
    echo `date`: syncing $dir ended
  fi
done

cd ..
