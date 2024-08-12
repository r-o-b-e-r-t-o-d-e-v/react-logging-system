import {createContext, useContext} from "react";
import LoggerObserver = LoggerObserverScope.LoggerObserver;
import LoggerProducer = LoggerProducerScope.LoggerProducer;

export enum LogType { MESSAGE, WARN, ERROR }

export interface LogMessage {
    type: LogType;
    message: string;
}

enum LoggerType { LOGGER_OBSERVER, LOGGER_PRODUCER }
type LoggerContextType = LoggerObserver | LoggerProducer

interface LoggerCtx {
    loggerObserver: LoggerObserver,
    loggerProducer: LoggerProducer
}

export const LoggerContext = createContext<LoggerCtx | undefined>(undefined);

function useLoggerAs (loggerType: LoggerType): LoggerContextType {
    const context = useContext(LoggerContext);

    if (!context) {
        throw new Error('useLogger must be used within a LoggerProvider');
    }

    switch (loggerType) {
        case LoggerType.LOGGER_OBSERVER:
            return context.loggerObserver;
        case LoggerType.LOGGER_PRODUCER:
            return context.loggerProducer;
    }
}

export namespace LoggerObserverScope {
    export interface LoggerObserver {
        logMessage: LogMessage | null;
        clearLog: () => void;
    }

    export function useLogger() {
        return useLoggerAs(LoggerType.LOGGER_OBSERVER) as LoggerObserver
    }
}

export namespace LoggerProducerScope {
    export interface LoggerProducer {
        log: (message: string, ...objects: any) => void;
        warn: (message: string, ...objects: any) => void;
        error: (message: string, ...objects: any) => void;
    }

    export function useLogger() {
        return useLoggerAs(LoggerType.LOGGER_PRODUCER) as LoggerProducer
    }
}
