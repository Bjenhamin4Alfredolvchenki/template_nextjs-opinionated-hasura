This Next.js's boilerplate includes:

- [typescript](https://www.typescriptlang.org/)
- [next.js](https://nextjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [storybook](https://storybook.js.org/)
- [jest](https://jestjs.io/)
- [eslint](https://eslint.org/)
- [prettifier](https://prettier.io/)
- [sweetalert2](https://sweetalert2.github.io/)
- [react-icons](https://react-icons.github.io/react-icons/)

_based on: https://github.com/LongJohnSilver1504/NextJS-Tailwind-Storybook-and-TS-boilerplate_

---

## Configuration dev

- Install node (min 14): https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt

- Install and configure docker without sudo: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt

- Install and configure docker-compose: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt

- `cp .env.local.example .env.local`

---

## FREE Deploy on Heroku and Vercel

- Install hasura cli: https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli

- Heroku Cli (optional) - https://devcenter.heroku.com/articles/heroku-cli#download-and-install

- Deploy to your vercel account
- run `vercel link`

- Deploy to heroku with the heroku button (https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
- run `heroku login`

- `cp .env.production.sh.example .env.production.sh`
- update `HASURA_ADMIN_SECRET`, `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT`, `HASURA_GRAPHQL_ADMIN_SECRET` at `.env.production.sh` - search for `xxx`

---

## Always updated

_Please, update all packages before continue:_

```sh
# yarn global add npm-check-updates
ncu -u
yarn
```

_tests everything's still works:_

```sh
yarn build && yarn test && yarn storybook
```

If everything is working, please make a pull request
