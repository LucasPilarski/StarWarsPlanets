# How to use

Install node version 22.0 or newer.

Install all dependencies with `npm i`.

Run with `npm run dev` command.

# App structure

I decided to go with the centralized approach: components will only display data and emit events, Pinia will store everything and modify the data when necessary. In some cases
the data could - and maybe even should, for example with filters - be kept in the components, but the consistency was more important.

Planets screen component is responsible for communication between store (getting data, calling functions) and the rest of the components tree (gathering events, passing data). It
serves as a middleman between the store and its children.

No routing except for only the main one. More than that would be unnecessary. I tried to use it for data fetching, but realized that API is too simple for that to be necessary.

# Why only one initial fetch request?

SWAPI has been abandoned for years, with no chance to implement advanced filtering, sorting and such. I had two options before
me:

- Download all the data beforehand, store them in localstorage, implement full range of data filtering on the FE,
- Use only API data, implement only some filtering options, maybe try to do something more with the limited data.

The problem with the latter is that sorting would be done only for the current page, not the entire dataset, as it normally should be. On
top of that filtering would be limited only to planet names since other methods are either limited or non-existent. Therefore, I decided to go with the former.

# Why filtering options are stored in the store?

At first, I wanted to use getters to filter planets based on the... well, filters. Then I realized that the list would reload
immediately the moment I change any filter, even by one character. That is a pretty bad UX, even with debounce and similar techniques,
so I decided to filter planets manually, via a button.

Because of that I also had to decide whether to keep filters in the component and then send them to the store, or directly in the store.
Since planets, pagination and similar data was already stored in Pinia, and I wanted to avoid unnecessary data duplication,
putting also filters there felt like a continuation of that idea.

Thanks to that all the data was in one place and components are, as some people like to describe them, dumb.

# No "created" or "gravity" filters?

No, not enough time. Also, "created" field would require some additional work on validation for date strings, which would take
even more time, so I decided to skip both.

# Todo

- Tests for Pinia
- Tests for components
- Styles
- Cleanup
  - Readme update
  - Tests names and comments update
  - Add comments whenever necessary
  - Class names checkup
