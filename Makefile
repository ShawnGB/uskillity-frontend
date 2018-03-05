SHELL := /bin/bash

CHANGES=$(shell git status -uno --porcelain)

all: deploy

version: src/routes/version/index.jsx
	@echo $(CHANGES)
	if [ "$(CHANGES)" == "" ]; then sh scripts/version.sh; fi
	if [ "$(CHANGES)" != "" ]; then exit 1; fi

deploy: version
	sed -i"" 's/staging/production/g' .circleci/config.yml
	sed -i"" 's/E4HKCMC6NWB8/XXXXXXXXXXXX/g' .circleci/config.yml
	git add .circleci/config.yml
	git add src/routes/version/index.jsx
	git commit -m "deploy to production"
	#git push
	git revert `git rev-parse HEAD`
	git commit --amend -m "point back the deployment to staging"

