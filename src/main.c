#include<stdio.h>
#include<string.h>

void writeIndex();

struct Page{
  char filename[20];
};

void makepage(struct Page *page, char *filename);

int main(){
  struct Page home;
  makepage(&home, "index.html");

  writeIndex();
  return 0;
}

void makepage(struct Page *page, char *filename){
 *page->filename = *filename;

  printf("processing %s ...", filename);
}


void writeIndex(struct Page page){
  FILE *indexFile = fopen(page.filename,"a");

  fclose(indexFile);
}
