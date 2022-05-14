build:
	@docker-compose up -d
	@make migrate

ps:
	@docker-compose ps

up:
	@docker-compose up
	@make ps

stop:
	@docker-compose stop
	@make ps

g-migration-%:
	@docker-compose exec api npm run migration:create $*

migrate:
	@docker-compose exec api npm run typeorm migration:run

migrate-revert:
	@docker-compose exec api npm run migration:revert