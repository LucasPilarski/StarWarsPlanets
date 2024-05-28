# How to use

Install node version 22.0 or newer.

Type `npm i` in the console.

Type `npm run dev` to run locally.

# Why only one initial fetch request?

SWAPI has been abandoned for years, with no chance to implement advanced filtering, sorting and such. I have two options before
me:

- Download all the data beforehand, store them in localstorage when necessary, implement full range of data filtering,
- Use only API data, implement only some filtering options

The problem with the latter is that sorting would be done only for the current page, not the entire dataset, as it should be. On
top of that filtering would be limited only to planet names. Therefore, I decoded to go with the former.

# App structure

Screen:

Components:

Pinia:

# Todo

- Load data from the API
- Store data in Pinia
- Display data in a simple table
- Differentiate between empty and populated data
- Add loading indicator
- If possible use routing for data loading
- Split filters into basic (name, firing list reload on change) and advanced (the rest)
- Tests for Pinia
- Tests for components
- Map climate options based on the API response
