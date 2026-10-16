#include <stdio.h>
#include <iostream>
#include <fstream>

int appendFile(const std::string &filename, const std::string &content)
{
    std::ofstream outputFile(filename, std::ios::app);
    if (outputFile.is_open())
    {
        outputFile << content << "\n";
        outputFile.close();
        return 0;
    }
    else
    {
        return 1;
    }
}