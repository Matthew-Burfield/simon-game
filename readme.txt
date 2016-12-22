gameArray holds the list  of comupter moves.
An extra computer move should be added at the beginning of each round.

Begin round
  Add random computer move to gameArray
  Play all game move transitions
  wait for player input
  check player inputs match gameArray
End round

Get array iterator;
play transition for current iterator item
on event transition end, get next iterator