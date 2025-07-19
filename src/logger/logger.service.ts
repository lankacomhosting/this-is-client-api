/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { winstonConfig } from "src/winston.config";
import * as winston from "winston";
import { Logger } from "winston";

@Injectable()
export class LoggerService {
    private readonly logger : Logger;

    constructor() {
        this.logger = winston.createLogger(winstonConfig);
    }

    log(message: string){
        this.logger.log({ level: "info", message});
    }

    error(message: string){
        this.logger.error({message});
    }
}