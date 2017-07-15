# F1ian
Some sort of Formula 1 data representation - form yet to be determined

Primarily built for those F1ians like myself who enjoy watching replays of races past. Made so much more enjoyable with some sporting and historical context around it (championship positions pre and post race, qualifying and starting grid, current political fuss, rule changes, spicy driver feuds).

It's a pretty handy reference tool too, so it has that going for it which is nice. 

[Waffle](https://waffle.io/andrew-rayco/f1)

### Things to investigate
- Currently each component that needs data is hitting the api and adding to its own state. Probably better to set up an onclick in the parent component and pass the data as props?
- To avoid hitting undefined errors before component state is populated with data, render methods include an if statement checking if state.whatever exists. There's no doubt a better way to do this.

