type ResJso<T> =
    | { status: 'err', message: string }
    | { status: 'logout' }
    | { status: 'not_found' }
    | { status: 'ok', data: T };

export type {
    ResJso
}
