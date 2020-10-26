git:
	git add .
	git commit .
	git push

build:
	gcc -o ./src/main.c ./dist/main.o
	chmod +x ./dist/main.o
	./main.o
