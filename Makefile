.PHONY: *

build:
	@which lodash || yarn global add lodash-cli
	@[ -d node_modules ] || yarn install
	@cp node_modules/dayjs/dayjs.min.js support/dayjs/
	@echo "Building custom lodash..."
	@lodash -d -o common/vendor/lodash.custom.js include="debounce,throttle,isEqual,noConflict"
	@gulp
	@git add -A .

watch:
	@gulp watch

clean:
	@find ./* -type d -name "dist" -prune -exec rm -rf {} \;
	@rm -rf common/vendor/*
	@rm -rf node_modules
