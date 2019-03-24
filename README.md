This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Playable Demo:** [http://rendner.github.io/react-columns](http://rendner.github.io/react-columns)

## Object of the game

The proper object of the game is to rank up a high score.  You can do this by eliminating sets of crystals, horizontally, vertically or diagonally.  When three or more crystals of the same color match up in the mentioned directions, they disappear and any crystals above them, fall down into the available space.

### Basic Rules
* Crystals will fall in sets of three. Skillfully layer the crystals as the fall by using the `arrow keys` to move them left or right.

* Arrange the set of crystals each time you press `arrow-up`.

* Arrange three or more crystals of the same color vertically, horizontally or diagonally and they will pop and disappear.

* The game ends if the middle column reaches the very top.

## Controls
`arrow-down` quickly sends the current set of crystals downward

`arrow-left` moves the current set of crystals to the left

`arrow-right` moves the current set of crystals to the right

`arrow-up` rearranges the current set of crystals

## Hints
**It's OK to build up as long as it is not in the center column.**
The game only ends when the center column rises to the top. It is OK to build up the crystals on the sides. One trick is to pile up the hard-to-place pieces to the left or right.

**You can change the arrangement of crystals that have landed.** You can arrange crystals that have already landed for a short time by using the `arrow-up` key. Another trick is to arrange the crystals right after the have landed when the speed of the falling crystals increases.

**Try removing crystals diagonally.** You can build chain reactions by giving preference to areas for diagonal removal as the crystals pile up.

## Credits
Thank you to 
- [qubodup](https://opengameart.org/users/qubodup) for the [crystal sprites](https://opengameart.org/content/rotating-crystal-animation-8-step)
- [Paul Henschel](https://twitter.com/0xca0a?lang=en) for the amazing [spring physics based React animation library](https://github.com/react-spring/react-spring)

## Links
[Wikipedia - Columns (video game)](https://en.wikipedia.org/wiki/Columns_(video_game))
[Youtube- Columns](https://www.youtube.com/results?search_query=columns+crown)
