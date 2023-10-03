# Pizza Night Highlights

## Table of contents

- [Overview](#overview)
  - [Functionality](#functionality)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

This is a popular movie review website. It's a fullstack Next.js project that uses The Movie Database API. Over half a year ago I spent an hour or so following a Next 13 tutorial by developedbyed on youtube when it launched in its experimental state. The video went over dynamic rendering, data fetching in a server component, ssr, ssg, and a few key features of the update. Two months ago I came back and have spent a lot of time and energy building it into the full stack, feature rich, type safe, personal project that I'm proud of. If anyone has any advice on how I can do something a better way, I'd appreciate it. See the sections below for details on my process, the sites functionality, the tools I used and more.

## Functionality

- 20 highlighed popular movies are mapped to the homepage and are updated with data coming from the movie database api.
- Site visitors can click on a movie and will be brought to a dynamically rendered movie info page.
- They can check out the review board and filter reviews by movie.
- Nextauth provides the ability for users to sign in with their google account.
- Signed in users can:
    - create and update reviews from the movie pages that will appear on the review board
    - comment on reviews
    - change their layout from grid to list or card view
    - switch between light and dark mode and change the color theme
    - access and customize a profile page which contains user stats, information and reviews
    - see review and comment history pages
    - track their progress, complete quests, and earn XP
    - customize their settings/preferences and more
- The website is responsively designed for all screen sizes.

### Screenshots

Check screenshot folder

### Links

- [Git Repo](https://github.com/adamcodes2843/Next-13-Movie-App)
- [Live Site]()

### My process

Next 13 utilizes server and client components. My goal was to keep the pages on the server and use client components only when user interactivity was necessary. I wanted to recycle components, functions, and types as much as possible. The starting point was fetching the data from the movie database and mapping out the homepage. I used the data to create the cards and pass down props to dynamically generated movie pages. This is where the tutorial ended. When I took over, I switch the js files to ts. I always like to start by getting the components' jsx elements and styles worked out for all screen sizes until I need to start adding extra js functionality. I edited the global css and tailwind config for fonts, color theme changes, and animations as necessary additions to the basic inline styles became apparent. The first thing I did with state was the review form component. Early on I added the prisma orm for querying the postgress database. I needed nextauth so users could sign in and save their progress, so I checked their website for a provided starting point for the schema, which I edited to fit my needs as the project went on. I used next navigation features to keep the page current with database updates or to set and read params. Context was helpful for modal/popup boxes and disabling buttons, and you can keep wrapped components on the server as long as you don't import them directly into client components. 

### Built with

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Prisma](https://prisma.io)
- [Supabase](https://supabase.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vercel](https://vercel.com)
- [TypeScript](https://www.typescriptlang.org/)
- [NextAuth](https://next-auth.js.org/)
- Flexbox and Grid
- Mobile-first workflow

### What I learned

I can't remember everything, and in the future I'll keep this section up to date as I go, but here are a few examples of what I learned and practiced:

 - app router
 - building an api
 - crud operations
 - fetching and db queries in async client components
 - next navigation features like useRouter, usePathname, useSearchParams
 - next auth, sessions, and prisma functionality
 - customizing tailwind config
 - plan dark mode so I'm not repeating myself
 - typescript in react/next

### Continued development

- Next vs Astro SSG
- Next features like server actions, loading, custom errors, etc.
- Best practices and getting faster
- New Typescript/React skills
- I have projects in mind for other tools, languages, and frameworks such as Astro, Svelte, Vite, Python, Go, etc. 
- API's and databases.
- Styling

### Author

- Github - [Adam Childers](https://github.com/adamcodes2843)