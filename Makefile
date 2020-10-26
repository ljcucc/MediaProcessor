git:
	git add .
	git commit .
	git push

build:
	gcc -o ./dist/main.o ./src/main.c
	chmod +x ./dist/main.o
	./main.o
