import LoggerObserver = LoggerObserverScope.LoggerObserver;
import LoggerProducer = LoggerProducerScope.LoggerProducer;
export declare enum LogType {
    MESSAGE = 0,
    WARN = 1,
    ERROR = 2
}
export interface LogMessage {
    type: LogType;
    message: string;
}
interface LoggerCtx {
    loggerObserver: LoggerObserver;
    loggerProducer: LoggerProducer;
}
export declare const LoggerContext: import("react").Context<LoggerCtx | undefined>;
export declare namespace LoggerObserverScope {
    interface LoggerObserver {
        logMessage: LogMessage | null;
        clearLog: () => void;
    }
    function useLogger(): LoggerObserver;
}
export declare namespace LoggerProducerScope {
    interface LoggerProducer {
        log: (message: string, ...objects: any) => void;
        warn: (message: string, ...objects: any) => void;
        error: (message: string, ...objects: any) => void;
    }
    function useLogger(): LoggerProducer;
}
export {};
