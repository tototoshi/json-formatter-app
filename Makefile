.PHONY: install build serve clean

build:
	npx tsc
	# Errors occur in development mode (I don't know why)
	NODE_ENV=production npx webpack

install:
	npm install

serve:
	npx webpack serve

clean:
	rm -rf dist/
