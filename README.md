CoderTalk
---

CoderTalk is geared towards being a tool for technical presenters, with a focus on workshop type atmospheres (although it can be used for individual talks as well). Still a work in progress although it can be used for simple talks (live code demo for basic code is working). I'll work on putting a more clear README together as the tool gets closer to a more complete release.

To see an example, make sure you have node installed and then clone the repo. In the root of the repo run the following commands from the command line:

  * `npm install`
  * `./codertalk "example-talk/config.json"`

Once that's done, hop over to [http://localhost:4242](http://localhost:4242). You can navigate the slides using `Option/Alt+Left` or `Option/Alt+Right`. The need for `Option/Alt` is related to the code snippets and live preview explained next.

The code snippets on the 3rd slide of the example are fully editable and have a preview panel to the right that will automatically update. This update is debounced to prevent constant updating and will only update 750ms after the final keypress in an editor pane.

## High-level Todo's

[] Panel for navigating multi-talk workshops
[] Inline tests for attendees to participate in
[] Slide sync
[] Export

## Structure of a Plugin

You can develop your own plugins to use with CoderTalk and then require them in the content file of your talk within the `plugins` configuration array. Plugins follow a common file structure and are stored in `app/plugins`.

That file structure looks like this:

```text
|--app/
|  |--plugins/
|     |--pluginname/
|        |--pluginname.js
```

The structure was created to try and be as simple as possible allowing people to use it how best fit them.

Each plugin JS should follow an AMD pattern as it is loaded via RequireJS. In addition, the require-css plugin is included to load plugin specific CSS files. You can look at the livedemo plugin for an example of how this is used.