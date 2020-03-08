#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <algorithm>

using namespace std;

void parseCSV(const string& fileName, vector<pair<string, vector<string>>>& dataStorage){

  ifstream fin(fileName);
  string line;
  getline(fin,line);

  //[vector ( label, [csv lines, ...])]
  dataStorage.push_back(pair<string, vector<string>>("LABELS", vector<string> {line}));

  while(getline(fin, line)){
    stringstream ss(line);
    string linePart = "";
    cout << line << endl;

    // int counter = 0;
    // auto finder =  find_if(dataStorage.begin(), dataStorage.end(), ); 

    while (getline(ss, linePart, ',')){
      cout << linePart << endl;
    }
  }

}

void createParsedCSV(const string &fileName){

  vector<pair<string, vector<string>>> dataStorage; 
  parseCSV(fileName, dataStorage);
}

int main(int argc, char** argv){

  if(argc != 2){
    cout << "invalid input. Enter csv file name.";
    return 0;
  }

  const string fileName(argv[1]);
  createParsedCSV(fileName);

  return 0;
}