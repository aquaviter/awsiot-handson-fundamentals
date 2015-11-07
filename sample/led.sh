#!/bin/bash

OUTPUT='desired.json'
PAYLOAD='payload.json'
REGION='ap-northeast-1'

if [ $# -ne 1 ]; then
  echo "Usage: bash $0 <on|off>" 1>&2
  exit 1
fi

cat << EOF > $PAYLOAD
{
  "state": {
    "desired": {
      "led": "$1"
    }
  }
}
EOF

cat $PAYLOAD

aws iot-data update-thing-shadow --thing-name edison \
	--payload file://$PAYLOAD $OUTPUT \
	--region $REGION
