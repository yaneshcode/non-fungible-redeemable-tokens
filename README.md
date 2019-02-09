# Non-fungible non-transferable redeemable tokens

Leveraging blockchain design patterns to create a contract that features Non-Fungible Non-Transferable Redeemable Software Licences.

This project uses 0x dev tools, Openzeppelin and the Truffle framework.

# Use case

A software licence tied to a non-fungible token.
The contract owner can whitelist addresses who are allowed to claim a single token.
Users who own these addresses can then redeem their token at their convenience.

Design patterns used:
- Non-fungibility
- Whitelisting
- Owner
- Sender verification

## Intro

First run `npm i` to install the dependencies.

## Tests

Before running tests you need to have the ethereum node running. We'll be running Geth from a docker container for simplicity.

```bash
docker run -it --rm -p 8545:8501 0xorg/devnet
```

Now we're ready to run the tests:

```bash
truffle test
```

## Notes

`truffle test` may hang or freeze while running the tests on Geth from the docker container. If this happens, try again, or try using a different ethereum node.

## Licence

Apache 2.0
