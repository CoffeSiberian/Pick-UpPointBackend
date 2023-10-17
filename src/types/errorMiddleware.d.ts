import {
    ConnectionError,
    DatabaseError,
    ValidationError,
    AccessDeniedError,
    ConnectionAcquireTimeoutError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    HostNotFoundError,
    HostNotReachableError,
    InvalidConnectionError,
} from "sequelize";

export interface dbErrorsType {
    err:
        | ConnectionError
        | DatabaseError
        | ValidationError
        | AccessDeniedError
        | ConnectionAcquireTimeoutError
        | ConnectionRefusedError
        | ConnectionTimedOutError
        | HostNotFoundError
        | HostNotReachableError
        | InvalidConnectionError;
}
