import axios from 'axios'


const state = {
    saveState: {
        state: 'done'
    },
    memos: [{
        id: 0,
        'created_date': '',
        'title': '',
        'body': ''
    }]
}

const getters = {
    allMemos: (state) => state.memos,
    saveState: (state) => state.saveState,
}

const actions = {
    async fetchMemos({ commit }) {
        const response = await axios.get('http://localhost:80/memos');
        commit('setMemos', response.data);
    },
    async editMemo({ commit }, data) {
        const response = await axios.patch(`http://localhost:80/memos/${data.id}`, {
            memo: data
        }).catch(error => console.log(error))
        commit('updateMemoTitle', response.data)
    },
    async addMemo({ commit }, data) {
        const response = await axios.post('http://localhost:80/memos/', {
            memo: data
        })
        commit('createMemo', response.data)
    },
    async deleteMemo({ commit }, data) {
        await axios.delete(`http://localhost:80/memos/${data.id}`);
        commit('removeMemo', data.id)
    },
    async sortMemo({ commit }, e) {
        const sortType = e.target.options[e.target.options.selectedIndex].value;
        if (sortType === 'title') {
            commit('sortMemoByTitle')
        } else if (sortType === 'createdate') {
            commit('sortMemoByDate')
        }
    }
}

const mutations = {
    setMemos: (state, memos) => {
        state.memos = memos
        state.memos.sort((a, b) => (a.title.localeCompare(b.title)))
    },
    updateMemoTitle: (state, editedMemo) => {
        // let item = state.memos.find(memo => memo.id === editedMemo.id);
        // item = editedMemo;
        // Object.assign(state.memos, editedMemo);
        // state.memos = editedMemos;
        // only update when there's changes
        console.log(editedMemo);
        state.saveState = {state : 'done'}
    },
    createMemo: (state, memo) => {
        state.memos.unshift(memo);
    },
    removeMemo: (state, id) => (state.memos = state.memos.filter(memo => memo.id != id)),

    sortMemoByTitle: (state) => {
        state.memos.sort((a, b) => (a.title.localeCompare(b.title)))
    },
    sortMemoByDate: (state) => {
        state.memos.sort((a, b) => {
            const dateA = parseInt(a.created_date, 10);
            const dateB = parseInt(b.created_date, 10);

            if (dateA < dateB) {
                return 1;
            }
            if (dateA > dateB) {
                return -1;
            }
            return 0;
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}