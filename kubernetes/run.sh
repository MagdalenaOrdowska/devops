#!/bin/sh

minikube addons enable ingress
# Start mypostgres
kubectl apply -f ./mypostgres/postgres-pvc.yml

kubectl apply -f ./mypostgres/pv-local.yml

kubectl apply -f ./mypostgres/postgres-secret.yml

kubectl apply -f ./mypostgres/postgres-clusterip.yml

kubectl apply -f ./mypostgres/postgres-configMap.yml

kubectl apply -f ./mypostgres/postgres-deployment.yml

# Start myredis
kubectl apply -f ./myredis/myredis-deployment.yml

kubectl apply -f ./myredis/my-redis-configMap.yml

kubectl apply -f ./myredis/myredis-clusterip.yml

# Start mybackend
kubectl apply -f ./mybackend/mybackendlb-clusterip.yaml

kubectl apply -f ./mybackend/mybackendlb-deployment.yaml

kubectl apply -f ./mybackend/mybackendlb-node-port.yaml


# Start myfrontend
kubectl apply -f ./myfrontend/myfrontend-clusterip.yaml

kubectl apply -f ./myfrontend/myfrontend-deployment.yaml

kubectl apply -f ./myfrontend/myfrontend-node-port.yaml


# Start Ingress
kubectl apply -f myapp-ingress.yml
