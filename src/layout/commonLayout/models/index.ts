import { createActionType } from '@/store/actionType';

interface BookState {
    menuList: any[];
    bookList: any[];
}

const actionType = createActionType([
    'BOOK_MENU_LIST',
    'BOOK_LIST'
])

const initialState: BookState = {
    menuList: [],
    bookList: []
};

export const bookActions = {
    getBookMenuList: (menuList: any[]) => async (dispatch: any, getState: void, { API }: any) => {
        dispatch({
            type: actionType.BOOK_MENU_LIST,
            payload: menuList
        });
    },
    getApiList: () => async (dispatch: any, getState: void, { API }: any) => {
        API.getTheData({}).then((res: any[]) => {
            dispatch({
                type: actionType.BOOK_LIST,
                payload: res
            });
        });
    }
}

export const bookReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case actionType.BOOK_MENU_LIST:
            return Object.assign({}, state, {
                menuList: payload
            });
        case actionType.BOOK_LIST:
            return Object.assign({}, state, {
                bookList: payload
            });

        default: return state;
    }
}
