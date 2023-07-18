#!/bin/bash
#シェルの格納先へ移動
cd `dirname $0`

git pull origin master

echo -n "処理を続行してよろしいですか？ [y/N]: "
read ANS

case $ANS in
  [Yy]* )
    docker stop kaunet_app
    docker rm kaunet_app
    docker rmi kaunetapp-frontend
    docker-compose up -d
    ;;
  * )
    ;;
esac
