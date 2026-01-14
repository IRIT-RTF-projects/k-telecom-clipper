#Deploy

```
docker build -t admin-frontend-dev .

docker run \
  -p 5173:5173 \
  -e VITE_API_URL=http://host.docker.internal:5000 \
  admin-frontend-dev
```