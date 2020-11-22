#!/bin/bash
# Define a timestamp variable
timestamp=date +"%T" # current time

pg_dump SiapceDB > "sipcedb-$(date +%d-%m-%y).sql"