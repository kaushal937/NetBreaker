#include <iostream>
#include <fstream>
#include "writer.hpp"
extern "C" int logReq(const std::string *logLocation, const std::string *cont);
int logReq(const std::string *logLocation, const std::string *cont)
{
    if (cont != nullptr && logLocation != nullptr)
    {
        appendFile(*logLocation, *cont);
        return 0;
    }
    else
    {
        return 1;
    }
}