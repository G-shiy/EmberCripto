ARGS=EmberCripto
DOCKERCOMPOSE=docker-compose -f docker-compose.yml

build:
	$(DOCKERCOMPOSE) build

up:
	$(DOCKERCOMPOSE) up -d

restart:
	$(DOCKERCOMPOSE) restart $(ARGS)

stop:
	$(DOCKERCOMPOSE) stop $(ARGS)

stop-all:
	docker stop $(shell docker ps -q)

logs:
	$(DOCKERCOMPOSE) logs -f $(ARGS)

bash: ## Access bash in container
	$(DOCKERCOMPOSE) exec $(ARGS) bash

remove:
	docker rm $(shell docker ps -a -q)

fix: ## Run autopep8 to reformat python files
	$(DOCKERCOMPOSE) exec $(ARGS) autopep8 --in-place -a --max-line-length 120 -r /app