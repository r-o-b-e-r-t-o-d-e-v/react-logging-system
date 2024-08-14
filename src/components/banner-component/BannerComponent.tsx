import "./BannerComponent.scss"
import {useEffect, useRef, useState} from "react";
import {LoggerObserverScope, LogType} from "../../logging-system/LoggerContext";
import useLogger = LoggerObserverScope.useLogger;

export function BannerComponent({logBannerDuration}: {logBannerDuration?: number}) {
    const LOG_BANNER_DURATION_DEFAULT: number = 3000;
    const LOG_REMOVING_OFFSET: number = 1500;   // This is the offset time that will take since the banner disappears until the log is completely removed
    const SPACE: string = ' ';

    const [showBanner, setShowBanner] = useState<boolean>(false);
    const timerBannerRef = useRef<NodeJS.Timeout | null>(null);
    const timerLogRef = useRef<NodeJS.Timeout | null>(null);

    const [typesStylesMap] = useState(
        new Map([
            [LogType.MESSAGE, "banner-message"],
            [LogType.WARN, "banner-warn"],
            [LogType.ERROR, "banner-error"],
        ])
    )

    const {logMessage, clearLog} = useLogger()

    useEffect(() => {
        if (logMessage) {
            if (timerLogRef.current) {
                clearTimeout(timerLogRef.current);
                timerLogRef.current = null;
            }

            setShowBanner(true);
            timerBannerRef.current = setTimeout(() => _clearLog(), logBannerDuration ?? LOG_BANNER_DURATION_DEFAULT)

            return () => _clearBannerTimeout();
        }
    }, [logMessage, clearLog]);

    function _clearLog() {
        setShowBanner(false);
        timerLogRef.current = setTimeout(() => clearLog(), LOG_REMOVING_OFFSET)
    }

    function _clearBannerTimeout() {
        if (timerBannerRef.current) {
            clearTimeout(timerBannerRef.current);
            timerBannerRef.current = null;
        }
    }

    function _clearBannerTimeoutAndLog() {
        if (timerBannerRef.current) {
            _clearLog();
            _clearBannerTimeout();
        }
    }

    function resolveBannerType(): string {
        return typesStylesMap.get(logMessage?.type!) ?? ''
    }

    function resolveBannerVisibility(): string {
        return showBanner ? '' : 'banner-hidden'
    }

    function resolveBannerClasses(): string {
        return "banner" + SPACE + resolveBannerType() + SPACE + resolveBannerVisibility()
    }

    return <div className={"banner-container "}>
        <div className={resolveBannerClasses()} onClick={_clearBannerTimeoutAndLog}>
            <span>{logMessage?.message}</span>
        </div>
    </div>
}
