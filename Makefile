git:
	git add .
	git commit .
	git push

build:
	gcc -o ./dist/main ./src/main.c
	chmod +x ./dist/main
	./dist/main
