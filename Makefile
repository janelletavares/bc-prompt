SHELL=/bin/bash -o pipefail

.PHONY: docker_build
docker_build:
	docker build -t janelletavares/bc-prompt:latest .

.PHONY: docker_push
docker_push: docker_build
	docker push janelletavares/bc-prompt:latest

.PHONY: docker_run
docker_run: docker_build
	docker run -d -p 3000:3000 janelletavares/bc-prompt:latest