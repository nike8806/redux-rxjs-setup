# ATC STRAWMAN

ADK Tooling Client [STRAWMAN](https://en.wikipedia.org/wiki/Straw_man_proposal)

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Conventions](#conventions)
    1. [Github](#github)
    2. [Javascript](#javascript)
    3. [JSX](#jsx)
    4. [Styling](#styling)
4. [Builds](#builds)
5. [Releases](#releases)

## Overview

A demo tool for highlighting what the ATC could be in order to flush out real product requirements for an MVP.

## Getting Started

1. **Install dependencies**

    * Install a node version manager, like [n](https://github.com/tj/n)
    * Install the lts version of node: `n lts`
    * Install project dependencies: `cd atc-strawman && npm i`

2. **Start developing**

    * Start development server: `npm start`
    * A new browser window should open to https://local.4433!
      * NOTE: You will need to accept the security warning in the browser
      * NOTE: You need to make an entry into your hosts file (e.g., `/etc/hosts` on mac) in order to setup the `local.com` mapping to your local network ip

3. **Start developing with storybook**

    * Start development server: `npm run storybook`
    * A new browser window should open running storybook (check the console for the allocated address)

## Conventions

In addition to the [Connected Device Best Practices), devs are expected to follow these additional conventions.

### Github

1. Every branch **MUST** be named in the following convention:

    `{category}/{JIRA}-{summary}`, e.g. `feature/ADKTOOLS-123-my-short-description`.

    If the task is menial and trivial and does not require a JIRA task, `{JIRA}` can be omitted. Typical `{category}` values are: `feature`, `fix`, `hotfix`, `patch`, `test`, etc.

1. Every Github PR **MUST** have at least 1 **approval** before it can be merged into `master`.

1. Every Github PR **SHOULD** have an accompanying JIRA ticket. Exceptions to this include menial and trivial tasks that do not affect daily time reporting, e.g. changing a variable name, forgot to lint something, etc.

1. If a Github PR violates a **SHOULD** best practice, reviewers **SHOULD** use best judgement on deciding if it should be mentioned privately or publicly to the requester.

1. If a conversation becomes lengthy, reviewers **SHOULD** contact the original requester via Slack/Zoom to continue the conversation. After a resolution is reached, the reviewer/requester **SHOULD** post a short synopsis of the resolution.

### JavaScript

Please see the [.eslintrc.json](.eslintrc.json) file for this project's encouraged practices.

Other criteria not outlined:

* Do **NOT** write excess clever code.
  * It does not help anyone. Imagine if you had to take over someone else's overly clever code.

* Do **NOT** excessively overengineer solutions.
  * Common symptoms of overengineering include planning for use cases that are not currently in scope, squeezing out miniscule performance gains, etc.
  * Requirements change frequently.

* Do **NOT** write shorthand code for the purpose of performance.
  * For production code we will minify and uglify, so it defeats the purpose.

* Do try to make variable functions and names concise.
  * When working with units such as time, the units **MUST** be in the name, e.g. `currentTimeMillis` or `currentTimeSecs`.
  * Event handler functions **MUST** be prefaced with `on` before the name, e.g. `onCurrentTime` or `onSuccess`.
  * Booleans **SHOULD** have a boolean-type word such as `is`, `should`, `did`, or `has` word in front, e.g. `isEnabled` or `shouldEnable`.
  * Naming **SHOULD** be concise. Avoid overly pedantic names, e.g. `loopCounterForCodeInTheMiddle`. On the same token, avoid overly shortened names that do not convey meaning. Saving a few characters that will be minified will not be worth it for the next developer that takes over your code.

* Do try to organize where/when possible.
  * Pages and components
    * Pages and components **MUST** be organized in a structured hierarchy.

      All pages are components. Not all components are pages.

      ``` JS
      components /
          Devices /
              components /
                  MyDevicesComponent1
                  MyDevicesComponent2
                  ...
      ```

      1. If a component is reusable across different components, then it should go into the topmost `components` folder that encapsulates its reuse.
      1. If a component is not reusable across different components, then it should go within the `components` folder of its parent container. For example, a Devices control component is highly likely to be used **only** inside the Devices container. The Devices control component should be kept inside the Devices container.

    * Component names **MUST** use PascalCase:

      ``` JS
      src/js/component/MyComponent.js
      src/js/component/MyComponent/index.js
      ```

  * Folder Naming
    * **SHOULD** be camelCase except for Components and Containers.

      ``` JS
      components
      cache
      enums
      ...
      ```

    * **SHOULD** have an underscore in front if it affects all folders at its current level.

      ``` JS
      components /
          _core /
          Devices /
          Tests /
          Results /
          ...
      ```

  * Imports
    * **SHOULD** be grouped in the following order: libraries > absolute paths > relative paths > scss > variables.
    * **SHOULD** be alpha sorted based on the first (or only) variable name.
    * **SHOULD** have line breaks separating logical groupings, e.g. linebreak between library and relative imports.
    * **SHOULD** use single quotes, e.g. `import Home from '../components/Home'`.
    * **SHOULD** default any custom scss for the component to be named `styles.scss` and live at the top of the component directory level for which it applies.

### JSX

When rendering JSX that may conditionally appear in the dom, use `null` to indicate when the JSX should render empty. Using `''` can cause undesired empty dom element rendering. [See reference link](https://stackoverflow.com/questions/30097091/correct-way-to-define-an-empty-dom-element-in-react)

**BAD:**

``` JSX
if (logoFocusedAsset) {
    return (<img alt='brand logo' src='some/path' className='logo focused' />);
} else {
    return '';
}
```

**GOOD:**

``` JSX
if (logoFocusedAsset) {
    return (<img alt='brand logo' src='some/path' className='logo focused' />);
} else {
    return null;
}
```

### Styling

1. When doing component development, styles **SHOULD** be defined as a separate `styles.scss` file at the same level as the component defined in `index.js`.

      ``` JS
      src/js/component/MyComponent/index.js
      src/js/component/MyComponent/styles.scss
      ```

2. Zero (0) based values **MUST** not include units, e.g. `0` is favored over `0rem`.

3. Numerical values **SHOULD** use `rem` units wherever possible. Avoid using `px` unless necessary.

4. CSS ids **SHOULD** be used for non-reusable instances, and CSS classnames **SHOULD** be used for reusable instances.

5. CSS ids and classnames **SHOULD** follow the general principle of `lessSpecific--moreSpecific` that generally aligns to the component architecture (e.g., `button--primary`).

    * The general rule of thumb is that when it is possible to have more than one of `lessSpecific`, then `--moreSpecific` **SHOULD** be added for the individual permutations.
    * It is preferred that this strategy be employed only at the very top level of a component, and that rule #4 be used to handle component internals.
    * If a component does not need the double dash (`--`), it is not necessary to force one.

6. CSS classnames that describe particular component details or transient state (e.g., `isValid`, `text`, `icon`, etc.) **SHOULD** be defined as simply as possible (e.g., `.isValid`),

    * These simple classnames **SHOULD** be properly enclosed in the scope block to which they pertain (see previous rule) to prevent collisions.
    * Care **SHOULD** be taken when introducing a simple classname to the global scope in order to avoid collisions and unwanted side effects.
    * Any new global rules **SHOULD** be defined in `styles/_globals.scss`.

7. CSS classnames that cannot be condensed into a single word **SHOULD** use `camelCase` (e.g., `isValid`).

8. A sample case pulling it all together:

    **BAD:**

    ``` CSS
    .form-group--form-control {
      padding: 0rem;
      margin-top: 10px;

      &--is-valid {
        color: $success;
      }
    }
    ```

    **GOOD:**

    ``` CSS
    .formGroup--formControl {
      padding: 0;
      margin-top: 0.1rem;

      &.isValid {
        color: $success;
      }
    }
    ```

## Builds

* edit `build/fix-storybook-images.sh` to set the current semver from `package.json`
* `npm run build`
  1. cleans out the `dist` directory in root
  2. builds the main app into `dist`
  3. builds a static version of storybook into the `dist/docs` subdirectory

## Releases

* make sure that the package.json has been updated with the correct semver for the release, including an `npm i` for the correctly tagged `package-lock.json`.
* use the github web interface to create a new release with the server from the previous step.
* add relevant release notes (follow the style of the previous release notes).
