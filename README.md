# Sky Strife Alternative client

## Setup

1. `git clone` this repository.
2. Run `pnpm install` in the base directory to install all dependencies.
3. Run `pnpm dev` to start the client.
4. Go to `localhost:3000`.

## Modifying the client

### Reading tables

Use MUD [Zustand hooks](https://github.com/latticexyz/mud/pull/1843) to read the state of tables on the World. All of the Sky Strife tables can be found in the public [MUD config](https://github.com/latticexyz/skystrife-workshop/blob/main/packages/contracts-skystrife/mud.config.ts).

### Reading different worlds

To change the default world loaded in the client, update `worlds.json`.
