export interface ILoggingTimer {
    logs: string[];
    start: Function;
    stop: Function;
    lap: Function;
}

export interface IOptions {
    name?: string;
    logging?: boolean;
    logger?: {
        log?: Function;
        warn?: Function;
    };
}

class LoggingTimer {
    protected checkpoints: number[] = [];
    protected timerName: string;
    protected loggingEnabled: boolean;
    protected logger: {
        log: Function;
        warn: Function;
    } = {
        log: console.log,
        warn: console.warn
    };

    constructor(options: IOptions) {

        const {
            name = "",
            logging = true,
            logger = {}
        } = options;

        this.timerName = name;
        this.loggingEnabled = logging;
        if(typeof logger.log === "function"){
            this.logger.log = logger.log;
        }
        if(typeof logger.warn === "function"){
            this.logger.warn = logger.warn;
        }
    }

    private static getTimestamp() {
        return performance.now();
    }

    private log(message: string) {
        if(this.loggingEnabled){
            this.logger.log(message);
        }
    }

    private warn(message: string){
        this.logger.warn(message);
    }

    private get latestCheckpoint(){
        return this.checkpoints.length === 0 ? null : this.checkpoints[this.checkpoints.length-1];
    }

    private get latestTimeElapsed(){
        const c = this.checkpoints;
        const l = c.length;
        return l < 2 ? null : c[l-1] - c[l-2];
    }

    private get currentLapIndex() {
        return this.checkpoints.length > 1 ? this.checkpoints.length - 1 : null;
    }

    get logs() {
        return this.checkpoints;
    }

    start() {
        if(this.checkpoints.length === 0){
            this.checkpoints.push(LoggingTimer.getTimestamp());
            this.log(`TIMER ${this.timerName} [STARTS]`);
        }
        else {
            this.warn("Timer is already started");
        }
    }

    stop() {
        if(this.checkpoints.length > 0){
            this.checkpoints = [];
            this.log(`TIMER ${this.timerName} [STOPPED] [TOOK ${this.latestCheckpoint}ms]`);
        }
        else {
            this.warn("Timer is not yet started");
        }
    }

    lap() {
        if(this.checkpoints.length > 0){
            this.checkpoints.push(LoggingTimer.getTimestamp());
            this.log(`TIMER ${this.timerName} [LAP_${this.currentLapIndex}] [TOOK ${this.latestCheckpoint}ms]`);
        }
        else {
            this.warn("Timer is not yet started");
        }
    }
}

export default LoggingTimer;