## Installation

Clone the repository
```bash
git clone git@github.com:astrolabe-expeditions/data-platform.git
```

Switch to the repo folder
```
cd data-platform
```

Install all the dependencies using yarn
```bash
yarn install
```

Copy the example env file and make the required configuration changes in the .env file
```bash
cp .env.example .env
```

Run the database migrations (Set the database connection in .env before migrating)
```bash
yarn prisma db push
```

Start the local development server
```bash
yarn dev
```

You can now access the server at [http://localhost:3000](http://localhost:3000)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
