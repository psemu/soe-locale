soe-locale
============

SOE Locale file parser

Usage
=====

Convert .dat and .dir files to JSON:

    node locale.js parse en_us_data.dat en_us_data.dir en_us_data.json

Convert JSON file to .dat and .dir files:

    node locale.js write en_us_data.json en_us_data.dat en_us_data.dir
