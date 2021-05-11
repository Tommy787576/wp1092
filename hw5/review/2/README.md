## WP1092 HW5 Number Guessing Game

## Basic
All basic function is implemented

## Advanced

1. Server not responding or not connected

If player can not get any response after clicking a button, the page should pop out an alert window with message `"Can not connect to server"`.
If server back up online, the game can still continue.

2. Log recording

After the server is on, a log file will be create in **`server/log/`** with time of first received message from client as file name. Every action from client side would be record in this file.
If the server is restarted, new log file will be generated and latter action would be recorded in new log file.