import breakpoint from '@utility/breakpoint'

//Initial State
const INITIAL_STATE = {
    width: 0,
    forcedWidth: 0,
    breakpoint: ''
}

// Action Prefix
const _PREFIX = 'page/'

// Actions
const UPDATE_WIDTH = `${_PREFIX}updateWidth`
const FORCE_WIDTH = `${_PREFIX}forceWidth`

// Reducer
export default function pageReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case UPDATE_WIDTH:
            return {
                ...state,
                width: action.width,
                breakpoint: breakpoint(action.width)
            }
        case FORCE_WIDTH:
            return {
                ...state,
                forcedWidth: action.width,
                breakpoint: breakpoint(action.width)
            }
        default:
            return state
    }
}

// Sync Action Creators
export function updateWidth(width) {
    return {
        type: UPDATE_WIDTH,
        width
    }
}

export function forceWidth(width) {
    return {
        type: FORCE_WIDTH,
        width
    }
}
