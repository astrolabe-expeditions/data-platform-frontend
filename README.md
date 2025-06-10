# Data platform

This platform is designed to centralize and manage data collected from the various citizen expeditions organized by Astrolabe Expeditions. This repository contains the back-office and API components of the application. Additional parts of the project include an [ETL (Extract, Transform, Load) pipeline](https://github.com/astrolabe-expeditions/data-platform-processing) for processing data, and a [map application](https://github.com/astrolabe-expeditions/data-platform-map) for visualizing the collected data.

> ⚠️ **This project is archived and no longer maintained.**
> Feel free to browse the code, but note that no further updates or support will be provided.

## What is Astrolabe Expeditions?

[Astrolabe Expeditions](https://www.astrolabe-expeditions.org/) is an non-profit association that develops participatory science programmes with
laboratories to enable citizens to actively contribute to scientific research.

Citizens' expeditions are set up to collect large-scale scientific data and involve citizens in understanding and preserving the ocean.

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

## Development

You can seed the database with dummy data and some users

```bash
yarn prisma db seed
```

After you can connect with

```
// Gabriel
email: gabriel@gmail.com
pass:  hi123

// Emma
email: emma@gmail.com
pass: hi123
```

## How to contribute?

We are eager for contributions and very happy when we receive them! It can be code, of course, but it can also take other forms. The workflow is explained in [the contributing guide](https://github.com/astrolabe-expeditions/data-platform/blob/dev/docs/CONTRIBUTING.md).

Feel free to [open an issue](https://github.com/astrolabe-expeditions/data-platform/issues/new) for questions and suggestions.

## Licensing

Data platform is an Open Source software, released under the MIT License.
