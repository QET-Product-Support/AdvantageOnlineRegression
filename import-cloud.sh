BASE_URL=https://xray.cloud.getxray.app
token=$(curl -H "Content-Type: application/json" -X POST --data '{"client_id":"'"${CLIENT_ID}"'","client_secret":"'"${CLIENT_SECRET}"'"}' "$BASE_URL/api/v1/authenticate"| tr -d '"')
curl -H "Content-Type: application/json" -X POST -H "Authorization: Bearer $token"  --data @"output/results.json" "$BASE_URL/api/v1/import/execution/cucumber"
