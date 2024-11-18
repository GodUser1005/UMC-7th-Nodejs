import { StatusCodes } from "http-status-codes";


export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    statusCode = StatusCodes.BAD_REQUEST;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
};

export class DatabaseError extends Error{
    errorCode = "D001";
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
};

export class DataNotFound extends Error{
    errorCode = "D002";
    statusCode = StatusCodes.NOT_FOUND;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
};

export class DuplciateMissionChallenging extends Error{
    errorCode = "M001";
    statusCode = StatusCodes.BAD_REQUEST;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
};