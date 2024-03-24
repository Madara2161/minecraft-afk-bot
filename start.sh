#!/bin/bash

node bot.js
ERRNO=${?}

while (( $ERRNO == 0 )); do
	echo "| Reconnexion dans 5 secondes"
	node bot.js
	ERRNO=${?}
done

while (($ERRNO == 60)); do
    echo "| Déconnecté, reconnexion dans 60 secondes, Ctrl+C pour annuler"
	node bot.js
	ERRNO=${?}
done

echo '| Au revoir !'
