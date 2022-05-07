#!/bin/sh
cat request.txt | while read curl_command
do
    curl_command
done

exit 0