SHELL := /bin/bash
OS := $(shell uname)
CHANGES=$(shell git status -uno --porcelain)
SED_INPLACE_OPTION := -i""

ifeq ($(OS), Darwin)
	SED_INPLACE_OPTION = -i ""
endif

all: deploy

version: src/routes/version/index.jsx
	@echo $(CHANGES)
	if [ "$(CHANGES)" == "" ]; then sh scripts/version.sh; fi
	if [ "$(CHANGES)" != "" ]; then exit 1; fi

deploy: version
	sed $(SED_INPLACE_OPTION) 's/staging/production/g' .circleci/config.yml
	sed $(SED_INPLACE_OPTION) 's/E1PP4JQQ9FXBKM/E18XR0TWKTKYBZ/g' .circleci/config.yml
	sed $(SED_INPLACE_OPTION) 's/618914508265405/617994471690742/g' .circleci/config.yml
	sed $(SED_INPLACE_OPTION) 's/GA_TRACKING_ID_PLACEHOLDER/UA-114912548-1/g' .circleci/config.yml
	sed $(SED_INPLACE_OPTION) 's/pk_test_ODYN77TcYpawv8oWmxfMHk0r/pk_live_cQhvZJaUywqRP9uhEgoEPRPQ/g' .circleci/config.yml
	git add .circleci/config.yml
	git add src/routes/version/index.jsx
	git commit -m "deploy to production"
	git push
	git revert `git rev-parse HEAD`
	git commit --amend -m "point back the deployment to staging"
