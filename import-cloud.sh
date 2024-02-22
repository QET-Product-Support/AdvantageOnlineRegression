BASE_URL=https://xray.cloud.getxray.app
token=$(curl -H "Content-Type: application/json" -X POST --data '{"client_id":"345DB755551E4DC7AC562078B306E671","client_secret":"1a7c82df7d689cf388427c73b41a4d5c4e812c2fa8f4ef4b14295ddf1f7e0fd1"}' "$BASE_URL/api/v1/authenticate"| tr -d '"')
curl -H "Content-Type: application/json" -X POST -H "Authorization: Bearer $token"  --data @"output/results.json" "$BASE_URL/api/v1/import/execution/cucumber"
echo $token