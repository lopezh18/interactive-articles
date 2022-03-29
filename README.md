## Getting Started Locally
1. Clone this repository
2. Install the project dependencies
```bash
npm install
# or
yarn
```
3. Run the development server in the root of the project with:

```bash
npm run dev
# or
yarn dev
```
## New Features
1. Built an API that returns articles with markdown and multiple choice quizzes
2. Created a frontend that can display articles with markdown and multiple choice features
3. Created visual feedback for correct and incorrect answers on the quizzes
4. Added the ability for the user to add comments & questions to the quiz

## Design Decisions & Tradeoffs
1. Installed react-markdown to parse Markdown, to save time and increase the amount of time I could spend on other areas of the project.
2. Created one JSON data file that returns an array instead of creating many article files because we can query on any unique values in a database, not just the id. The tradeoff here is the data doesn't accurately reflect how a Postgres database returns data for a specific item. 
3. Added a slug value to the articles as a unique identifier so the frontend can have a readable url. The Id value is a unique identifier that could be used to look up an item, so there is an additional unique identifier that would need to be stored in the database. 
4. This project uses Next on the Frontend instead of React to ensure SEO and I also really like how Next handles routing. The tradeoffs here are the support for react projects is a lot of literature online. Another tradeoff, that would likely impact a larger application is that with React you can use Redux to manage state through the entire application. 
5. Created separate components for markdown, multiple choice quizzes, and comments so they can be reused.
6. I was originally using TailwindCSS to style the components; however, some html elements, (headings and blockquotes) have default styling removed which caused some collisions with how the markdown was displayed. Had I caught this earlier, I would have used another styling library or plain css to style the components. I chose to go with inline styling because TailwindCSS is very similar to inline styling so it was very easy to change how I was styling the components.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
