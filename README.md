# How to use

Install Node.js. This app was tested with versions 16.20.0, 18.18.0 and 22.0.
The first one will return warnings while installing packages due to lack of support, but the app would still run nonetheless.

Install all dependencies with `npm i`.

Run with `npm run dev` command.

Run all the checkups with `npm run pre-commit`.

# App structure

I decided to go with the centralized approach: components will only display data and emit events,
Pinia will store everything and modify the data when necessary.
In some cases the data could - and maybe even should, for example with filters - be kept in the components, but the consistency was more important.

This is also the reason why store was later split into separate parts, each one responsible for managing parts of the state.

Planets screen component is responsible for communication between store (getting data, calling functions) and the rest of the components tree (gathering events, passing data).
It serves as a middleman between the store and its Vue children.

No routing except for only the main one. More than that would be unnecessary. I tried to use it for data fetching, but realized that API is too simple for that to be necessary.

Unit tests are presented in the store and components directories. Integration tests have their own dedicated directory.

# Why only one initial fetch request?

SWAPI has been abandoned for years, with no chance to implement advanced filtering, sorting and such. I had two options:

- Download all the data beforehand, store it in localstorage, implement full range of data filtering on the FE,
- Use only API data, implement only some filtering options, maybe try to do something more with the limited data.

The problem with the latter is that sorting would be done only for the current page, not the entire dataset, as it normally should be. On
top of that filtering would be limited only to planet names since other methods are either limited or non-existent. Therefore, I decided to go with the former approach.

# Why filtering options are stored in the store?

At first, I wanted to use getters to filter planets based on the... well, filters. Then I realized that the list would reload
immediately the moment I change any filter, even by one character. That is a pretty bad UX, even with debounce and similar techniques,
so I decided to filter planets manually, via a button.

Because of that I also had to decide whether to keep filters in the component and then send them to the store, or directly in the store.
Since planets, pagination and similar data was already stored in Pinia, and I wanted to avoid unnecessary data duplication,
putting filters there felt like a continuation of that idea.

# No "created" or "gravity" filters?

No, not enough time. Also, "created" field would require some additional work on validation for date strings, which would take
even more time, so I decided to skip both.

# No icons for asc / desc sorting? No 80%+ tests coverage?

In this and many more cases the reason is pretty much the same: at some point I had to stop working on this project and accept
the fact that there will be holes in it. _Done is better than perfect_, therefore let's ship it already.
