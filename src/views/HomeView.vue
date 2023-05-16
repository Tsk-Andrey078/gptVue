<template>
    <div class="container main-block">
        <div class="row">
            <div class="col-3">
                <ul v-for="(item, index) in news" class="list-group">
                    <li class="list-group-item">{{ index }} -  {{ item.substring(0, 20) }}</li>
                </ul>
            </div>
            <div class="col-9">
                
                <div class="mb-3">
                    <span class="badge text-bg-success">Обобщение</span>
                    <div class="spinner-border text-success" role="status" id="load-circle">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div style="display: inline-block">Что передается в ChatGPT: <i>Предоставь мне главное из новости в 3-4 предложениях и выдели ключевые лица, игроков, компании и т.д. в новости</i></div>
                    <div for="Textarea2" class="form-label">Ввод:</div>
                    <textarea class="form-control" id="Textarea1" rows="10"></textarea>
                    <button type="button" class="btn btn-success btn-control" @click="add_text">Добавить новость</button>
                    <button type="button" class="btn btn-success btn-control" style="margin-left: 10px;" @click="clear">Очистить</button>
                </div>
                <div class="mb-3">
                    <label for="Textarea2" class="form-label">Вывод:</label>
                    <textarea class="form-control" id="Textarea2" rows="10"></textarea>
                    <button type="button" class="btn btn-success btn-control" @click="prepare_data">Запуск</button>
                </div>
            </div>
            <button type="button" class="btn btn-info btn-help" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Информация и пояснение
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Обощение</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Обобщение - это инструмент, при помощи которого вы можете выделить главное из своих новостей, а также вывести ключевые лица из текста(Если это возможно). На вход для языковой модели GPT подается специальное выражение-запрос: <b>"Предоставь мне главное из новости в 3-4 предложениях и выдели ключевые лица, игроков, компании и т.д. в новости"</b> которое применяется для каждой введенной новости. <br>
                        Список новостей можно наблюдать на панели слева.
                        <br><br>
                        Поле "Ввод" предназначено для ввода текста новости. <br>
                        Кнопка "Добавить новость" добовляет текст новости в список.<br>
                        Кнопка "Очистить" очищает список новостей и поле ввода. <br>
                        Кнопка "Запуск" отправит ваши новости в GPT и сгенерирует ответ
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import { Configuration, OpenAIApi } from "openai"
    const configuration = new Configuration({
        apiKey: "",
    });
    let prepared_data = ""
    const openai = new OpenAIApi(configuration);

    export default{
        data() {
            return {
                news: [
                ]
            }
        },
        methods: {
            clear() {
                const textArea = document.getElementById("Textarea1")
                textArea.value = ""
                this.news = []
            },
            add_text() {
                const textArea = document.getElementById("Textarea1")
                let temp = textArea.value
                if (temp == "") {
                    alert("Внимание! Вы не ввели текст!")
                    return 0
                }
                this.news.push(temp)
                textArea.value = ""
            },
            async prepare_data() {
                if (this.news.length == 0) {
                    alert("Внимание! Вы не добавили новости!")
                    return 0
                }
                prepared_data = "\n"
                const load_elem = document.getElementById("load-circle")
                load_elem.style.display = "inline-block"
                for(let element of this.news) {
                    const completion = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {'role': 'system', 'content': 'You are an assistant for the monitoring system. You must highlight the main thing from the provided news and state it in 3-4 sentences and highlight key persons, players, companies, etc. from the news. Output format - SUMMARY: , KEY_PERSONS_AND_COMPANYS: . Output make on russion language'},
                            {'role': 'user', 'content': 'Предоставь мне главное из новости в 3-4 предложениях и выдели ключевые лица, игроков, компании и т.д. из новости'},
                            {'role': 'user', 'content': 'Представляемая новость: ' + element}
                        ],
                    });
                    console.log(completion.data.choices[0].message.content)
                    prepared_data = prepared_data + "\n\n" + completion.data.choices[0].message.content + "\n\n================================"
                }
                load_elem.style.display = "none"
                const textArea2 = document.getElementById("Textarea2")
                textArea2.value = prepared_data
            }
        },
        mounted() {
            
        },
    }
</script>

<style>
.btn-help {
    margin: 0 auto;
    margin-top: 30px;
    max-width: 20%;
}
#load-circle {
    display: none;
}
.main-block {
    margin-top: 50px;
}
.btn-control {
    margin-top: 20px;
}
</style>