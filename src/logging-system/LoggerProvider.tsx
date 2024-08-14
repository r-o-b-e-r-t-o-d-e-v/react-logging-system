import {ReactNode, useState} from "react";
import {LoggerContext, LoggerObserverScope, LoggerProducerScope, LogMessage, LogType} from "./LoggerContext";
import LoggerObserver = LoggerObserverScope.LoggerObserver;
import LoggerProducer = LoggerProducerScope.LoggerProducer;

export function LoggerProvider({children, printConsole}: { children: ReactNode, printConsole?: boolean }) {
    const [logState, setLogState] = useState<LogMessage | null>(null)

    function printLogToConsole(log: LogMessage, ...objects: any) {
        if (printConsole) {
            switch (log.type) {
                case LogType.MESSAGE:
                    console.log(log.message, ...objects)
                    break;
                case LogType.WARN:
                    console.warn(log.message, ...objects)
                    break
                case LogType.ERROR:
                    console.error(log.message, ...objects)
                    break;
            }
        }
    }

    const clearLog = () => {
        setLogState(null);
    };

    const log = (message: string, ...objects: any) => {
        _log(LogType.MESSAGE, message, ...objects);
    };

    const warn = (message: string, ...objects: any) => {
        _log(LogType.WARN, message, ...objects);
    };

    const error = (message: string, ...objects: any) => {
        _log(LogType.ERROR, message, ...objects);
    };

    const _log = (type: LogType, message: string, ...objects: any) => {
        const logMessage: LogMessage = {type: type, message: message};
        setLogState(logMessage);
        printLogToConsole(logMessage, ...objects)
    };

    const loggerObserver: LoggerObserver = {
        logMessage: logState,
        clearLog: clearLog
    }
    const loggerProducer: LoggerProducer = {log, warn, error}

    return <LoggerContext.Provider value={{loggerObserver, loggerProducer}}>
        {children}
    </LoggerContext.Provider>
}
