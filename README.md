# F1ian

Some sort of Formula 1 data representation - form yet to be determined

Primarily built for those F1ians like myself who enjoy watching replays of races past. Made so much more enjoyable with some sporting and historical context around it (championship positions pre and post race, qualifying and starting grid, current political fuss, rule changes, spicy driver feuds).

It's a pretty handy reference tool too, so it has that going for it which is nice.

[Waffle](https://waffle.io/andrew-rayco/f1)

## Installation

Clone this repo and `cd` into the directory. Then:

```
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

## Deployment to Heroku

There's no doubt a smarter way to do this...

-   Remove the following from the `.gitignore` file

```
bundle*
main.css
```

-   Ensure bundle files and main.css are generated before pushing to Heroku.

-   Login to Heroku and push up:

```
heroku login
git push heroku [branch-to-push]:master
```

Force push if you get a rejection that isn't resolved by a git pull:

```
git push heroku [branch-to-push]:master -f
```

## Notes

### TODO/Refactor

-   Visualisation is disabled due to painfully long wait (60 secs plus) fetching full race laptime data from the source.
    Source dev is looking into it. But for now it's unplayable. Breaks my heart.
-   Consider an option to download laptimes soon after new races and store locally to address this.

### Hey

Thanks for being you.
