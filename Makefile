build:
	@docker-compose build
	@docker-compose up -d mysql
	@docker-compose run --rm api npm i && npm run build
	@docker-compose run --rm api npm run migration:run
	@make up

ps:
	@docker-compose ps

up:
	@docker-compose up

stop:
	@docker-compose stop
	@make ps

g-migration-%:
	@docker-compose exec api npm run migration:create $*

migrate:
	@docker-compose exec api npm run typeorm migration:run

migration-revert:
	@docker-compose exec api npm run migration:revert