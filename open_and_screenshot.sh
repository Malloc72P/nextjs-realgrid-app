#!/bin/bash

# Chrome을 열고 localhost:3000으로 이동
open -a "Google Chrome" "http://localhost:3000"

# 브라우저가 로드될 시간 확보
sleep 3

# screencapture를 사용해 스크린샷 저장
screencapture -x /tmp/deleteBtn-current.png

echo "스크린샷이 /tmp/deleteBtn-current.png에 저장되었습니다"
