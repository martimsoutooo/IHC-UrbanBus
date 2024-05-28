# IHC-UrbanBus

## Install and run

```
cd urbanBus
npm install
npm run dev
```


## Development Guide

### Update your feature branch from dev


```
# Before, make sure you have committed all your changes to your local feature branch.

git checkout dev
git pull
git checkout <your feature branch name>
git merge dev

# Before continuing, resolve all merge conflicts (see below)

git push --force
```