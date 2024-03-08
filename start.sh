docker-compose -f docker-compose.db.yml up -d

sleep 20

docker-compose -f docker-compose.yml up -d
