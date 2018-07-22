const tag = {
    state: {
        pageOpenedList: [],
        currentPageName: '',
        tagsList: []
    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
        },
        setOpenedList (state, list) {
            state.pageOpenedList = [...list];
        },
        addTag (state, tagObj) {
            state.pageOpenedList.push(tagObj);
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        }
    },
    actions: {

    }
};

export default tag;
