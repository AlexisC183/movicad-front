type IdRolePair = {
    id: number,
    role: 'administrativo' | 'estudiante'
};

type ResJso<T> =
    | { status: 'err', message: string }
    | { status: 'logout' }
    | { status: 'forbidden' }
    | { status: 'not_found' }
    | {
        status: 'ok',
        data: T,
        idRolePair?: IdRolePair
    };

export type {
    IdRolePair,
    ResJso
}
