# React Logging System

This library is an implementation of a simple logging system for React.

It consists in two parts:
- logging-system: Will handle the logic.
- banner-component: Will handle the UI.

## logging-system
__LoggerContext__

The LoggerContext will manage the creation of a React context and the
  definition of interfaces for the both log observer and log producer.
- __Log Observer__: This part of the LoggerContext allow other pieces
  of code retrieve the current log and, in the case of a React
  component, react when a new log comes in. For a quick overview on
  how to make use of this, check the [banner-component](#banner-component)
  section below.
- __Log Producer__: This is the other part of the LoggerContext, it
  allows to produce new log messages that will be processed by the
  LoggerProvider. To produce new logs you should use 'useLogger' from
  'LoggerProducerScope':
  ```
  import {LoggerProducerScope} from "react-logging-system";
  import useLogger = LoggerProducerScope.useLogger;
  ```

__LoggerProvider__

This piece of code will implement the interfaces
mentioned above and will do the setup of the LoggerContext.Provider,
hence the user only needs to wrap the tsx code with the tag 'LoggerProvider'.

It also accepts the user to specify if the logs should also be printed
in the JS console by the prop parameter 'printConsole'.
This is an optional parameter. If omitted, the log will not be printed
in the JS console.
```
<LoggerProvider printConsole={true}>
...
</LoggerProvider>
```

## banner-component
__BannerComponent__ is a React component that implement the previous
mentioned Log observer to render the current log as a banner that
will pop up for a few seconds.

The banner has a map of colours representing the different types of
logs available in the logging system. Basically it shows the regular
messages with a green coloured background, uses an orange one for
warnings and a red for the errors.

To make use of the component just add the tag <BannerComponent/> to
your tsx code (it must be inside a <LoggerProvider> tag)

Here is an example of use:
```
export default function App() {

    return <div className="app-container">
        <LoggerProvider printConsole={true}>
            ...
            <BannerComponent />
        </LoggerProvider>
    </div>;
}
```

The BannerComponent has a prop parameter to allow customizing the duration
it will be shown in screen. It can be used this way:
```
<BannerComponent logBannerDuration={1000}/>
```
The duration is set in ms, being a value of 1000 equivalent to 1 second.

This parameter is optional, if it is not specified, the default
duration of the banner will be 3000 ms.

This BannerComponent is not mandatory to use. The user of the library
may want to implement their own component. For that, just bypass the
use of the <BannerComponent /> tag and, in the custom component, use
'useLogger' from 'LoggerObserverScope' to access the part of the
LoggerContext that will allow to retrieve the current log:
```
import {LoggerObserverScope, LogType} from "../../logging-system/LoggerContext";
import useLogger = LoggerObserverScope.useLogger;
```

## Deployment
The library is not published at npm but intended to be accessible via
GitHub.

The workaround is the use of a Github action (see '_.github/workflows/build-dist.yml_')
that will be triggered when there is a new push a commit into main branch.

This action will build and deploy the library distribution files in a
branch labeled as 'dist'. At the end, there will be a 'main' branch with
the library development project and a 'dist' branch with the minimum
necessary files for the distribution of the library.

Every commit into this 'dist' branch will be accompanied by a tag, that will
help to maintain a version control for every modification on the library.

## Installing the library

For a project to install the library simply run:
```
npm i github:r-o-b-e-r-t-o-d-e-v/react-logging-system#<tag_version>
```

Example:
```
npm i github:r-o-b-e-r-t-o-d-e-v/react-logging-system#v1.0.0
```
