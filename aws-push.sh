$(aws ecr get-login --no-include-email --region us-east-1);
docker build -t asana-takehome .;
docker tag asana-takehome:latest 475152969799.dkr.ecr.us-east-1.amazonaws.com/asana-takehome:latest;
docker push 475152969799.dkr.ecr.us-east-1.amazonaws.com/asana-takehome:latest;