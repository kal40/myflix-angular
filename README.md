# Myflix Angular Client

## Description

Angular client for an application called myFlix based on
its existing server-side code (REST API and database). A single-page, responsive app with routing, rich interactions, several interface views, and a polished user experience.

This site was built using [GitHub Pages](https://pages.github.com/).

[LIVE DEMO](https://myflixang.smartcoder.dev/)

## Application features

- Display a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user can view all movies.
- On each movie card 4 buttons are available with the next functions:
  1. A genre button that when clicked a modal opens with the details about the genre of that particular movie.
  2. A director button that when clicked a modal opens with the details about the director of that particular movie.
  3. A Summary button that when clicked a modal opens with the details about the particular movie.
  4. A Favorite button that when clicked the particular movie will be added the user's favorite movies
- A profile view where the user details can be edited or the user can be deleted from the database.

## Tech stack

- Angular
- Angular Material
- TypeScript
- HTML/SCSS
- TypeDoc

## Getting started

### Prerequisites

Install `@angular/cli`.

### Installation

Clone the repository:

```shell
git clone https://github.com/kal40/myflix-angular.git
cd myflix-angular
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
