export let task_data = [{
    date: "2023-02-19",
    words: {
        Entire_word: [

        ],
        To_be_tested_word: [

        ],
        Complete_word: [

        ]
    },
}, ]
task_data.forEach(obj => {
    Object.defineProperty(obj, "Get_day", {
        get() {
            return this.date.split("-")[2];
        }
    });
    Object.defineProperty(obj, "Get_Month", {
        get() {
            return this.date.split("-")[1];
        }
    });
    Object.defineProperty(obj, "Get_Year", {
        get() {
            return this.date.split("-")[0];
        }
    });
    Object.defineProperty(obj, "Entire_word_Count", {
        get() {
            return this.words.Entire_word.length;
        }
    });
    Object.defineProperty(obj, "To_be_tested_word_Count", {
        get() {
            return this.words.To_be_tested_word.length;
        }
    });
    Object.defineProperty(obj, "Complete_word_Count", {
        get() {
            return this.words.Complete_word.length;
        }
    });
});

export let errTask_data = [{
    date: "0000-00-00",
    words: {
        Entire_word: [

        ],
        To_be_tested_word: [

        ],
        Complete_word: [

        ]
    },
}];