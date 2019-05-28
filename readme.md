## What

Print a mantra in terminal,  
> Simple phrases to build positive mental habits.

![intro](https://user-images.githubusercontent.com/5526096/58380861-40a25a00-7fe9-11e9-8120-4e41920772f1.gif)

**Inspired by:**  
[fortune-mod](https://github.com/shlomif/fortune-mod)  
[momentum](https://momentumdash.com/)

**About Name?**  
It seems `Mantras` is already a npm package for angular,  
so I picked another name called `cheerup`.

# How

**Installation:**

Install [`Node` and `NPM`](https://nodejs.org/) first.

Install the package:
```
# npm
npm i -g cheerup

# or yarn
yarn add global cheerup
```

**Usage:**

```shell
cheerup
cheerup --daily
```

Add to your terminal as a startup
```
# bash
echo 'cheerup --daily' >> ~/.bashrc && source ~/.bashrc

# zsh
echo 'cheerup --daily' >> ~/.zshrc && source ~/.zshrc
```

# Contribution

**Add More Sentenses:**

mantras phrases are listed in `sentences/mantras.js`,  
You can add more lines with PR ;)

**Local Development:**

Install [`Node` and `NPM`](https://nodejs.org/).  
git clone and cd into the folder.  

```shell
# install depencency
npm install

# simply run from source
node ./cli.js 


# -------- global install test

# make it global command
npm link 

# run from linked global command
cheerup 

# unregister global command
npm uninstall -g cheerup 

```

_For yarn user:_

```shell
# link of yarn is bit different

yarn link
yarn unlink cheerup
```

**Distribution:**

I know only some js,
For more distribution (such as `brew`, `apt`).
make a PR if you like to run it from other palces :)

core function code is in `cli.js`,  
runner info declared in `package.json`.

If mantras list changed, the cli will complete other staff (such as update daily function) before run.

(I'm sorry but I don't know how to improve the ramdom pick algorithm yet, maybe you can improve it :)
