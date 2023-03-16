# Motion Canvas CLI

Motion Canvas CLI serves to act like `ng` for Angular, but for [Motion Canvas](https://motioncanvas.io/)

The goal is to publish this as an npm package, or eventually try and integrate into the motion canvas project. 

For now, this is a work in progress and my first attept at making a npm package, command line app, and a whole lot more.

## Usage

> Needs to be run within the root of a motion canvas project

```bash
# List current scene schematics
mc scenes

# Add a new blank scene
mc add-scene <sceneSchematic> <newSceneName>
mc add-scene empty new-animation-scene
```

## Special Thanks

The repo by `ryansonshine` [typescript-npm-cli-template](https://github.com/ryansonshine/typescript-npm-cli-template) was used to initially generate this application scaffold