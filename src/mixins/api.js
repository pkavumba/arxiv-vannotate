import {
    mapState
} from "vuex";

import axios from "axios";

export default {
    data: () => ({
        baseUrl: "https://arxiv-vanity-restful-api.herokuapp.com"
    }),
    computed: mapState([
        // map this.apiKey to store.state.apiKey
        "apiKey"
    ]),
    methods: {
        fetchPaper(arxiv_id, params = {}) {
            return axios
                .get(`${this.baseUrl}/api/renders/2/render/?arxiv_id=${arxiv_id}`, {
                    headers: {
                        //Authorization: `Api-Key ${this.apiKey}`,
                        Accept: "*/*"
                    },
                    params: params
                })
        },
        renderPaper(arxiv_id, params = {}) {
            return axios
                .get(`${this.baseUrl}/api/renders/2/render/?arxiv_id=${arxiv_id}`, {
                    headers: {
                        //Authorization: `Api-Key ${this.apiKey}`,
                        Accept: "*/*"
                    },
                    params: params
                })
        },
    }
};