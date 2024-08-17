# promise-combinator

C'est un showcase des stratégies de promesse en hashtag#JavaScript, entre 3 promesses qui se résolvent / échouent dans un intervalle de 3 secondes.

Et donc, on peut constater les différents résultats selon la stratégie

Démo: https://lnkd.in/efAGcm9h

Source: https://lnkd.in/eHSV3Uwf


Ces combinateurs sont utilisés quand il y a plusieurs taches asynchrones à gérer. Ce qui est très fréquent dans nos applications.

Pour les détails:
- Promise.all : échoue lorsqu'une des promesses est rejetée. Si aucune n'est rejetée, elle se résout et te retourne un tableau des résultats.
- Promise.any : se résout dès qu'une des promesses se résout (d'où le "any"). Il échoue donc seulement si toutes les promesses sont rejetées.
- Promise.race : c'est un peu similaire à "any", sauf qu'il se résout ou se rejette en fonction de la 1ere promesse
- Promise.allSettled : se résout toujours et renvoie un tableau de résultats avec le récapitulatif de chaque promesse.