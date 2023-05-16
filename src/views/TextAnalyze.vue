<template>
    <div class="container main-block">
        <div class="row">
            <div class="col-12">
                <div class="mb-3">
                    <span class="badge text-bg-success">Анализ новости</span>
                    <div class="dropdown dropdown_inline">
                        <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Условие
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" @click="change_condition('бизнес')">Бизнес</button></li>
                            <li><button class="dropdown-item" @click="change_condition('государство')">Государство</button></li>
                            <li><button class="dropdown-item" @click="change_condition('сил.структуры')">Сил.Структуры</button></li>
                            <li><button class="dropdown-item" @click="change_condition('разные т.з.')">Разные т.з.</button></li>
                        </ul>
                        <input class="form-control" type="text" v-model="input">
                    </div>
                    <div class="cond">Что передается в ChatGPT: <i>Предоставь мне подробный анализ данной новости {{ this.condition}}</i></div>
                    <div class="spinner-border text-success" role="status" id="load-circle">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div for="Textarea2" class="form-label">Ввод:</div>
                    <textarea class="form-control" id="Textarea1" rows="10"></textarea>
                    <button type="button" class="btn btn-success btn-control" @click="push_news">Запуск</button>
                    <button type="button" class="btn btn-success btn-control" style="margin-left: 10px;" @click="clear">Очистить</button>
                </div>
                <div class="mb-3">
                    <label for="Textarea2" class="form-label">Вывод:</label>
                    <textarea class="form-control" id="Textarea2" rows="10"></textarea>
                </div>
                <button type="button" class="btn btn-info btn-help" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Информация и пояснение
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Анализ новости</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Анализ новости - это инструмент, при помощи которого Вы можете получить подробный анализ новости от Исcкусственного Интелекта с той или иной точки зрения. На вход подается выражение - запрос: <b>"Предоставь мне подробный анализ данной новости + точка зрения"</b> Во вкладке <b>"Условие"</b> можно выбрать точку зрения.
                            <br><br>
                            "Бизнес" - с точки зрения бизнеса.<br>
                            "Государство" - с точки зрения государства.<br>
                            "Сил.Структуры" - с точки зрения силовых структур<br>
                            "Разные т.з." - с разных точек зрения
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
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
                condition: "",
                input: ""
            }
        },
        methods: {
            clear() {
                const textArea = document.getElementById("Textarea1")
                textArea.value = ""
            },
            change_condition(statement) {
                if (statement == "бизнес") {this.condition = "C точки зрения бизнеса"} 
                if (statement == "государство") {this.condition = "C точки зрения государства"} 
                if (statement == "сил.структуры") {this.condition = "C точки зрения силовых структур"} 
                if (statement == "разные т.з.") {this.condition = "C разных точек зрения"} 

            },
            async push_news() {
                if (this.input.length > 0) {
                    this.condition = this.input
                    console.log(this.input)
                }

                if (this.condition == "") {
                    alert("Внимание! Вы не выбрали условие!")
                    return 0
                }
                const textArea = document.getElementById("Textarea1")
                let temp = textArea.value

                if (temp == "") {
                    alert("Внимание! Вы не ввели текст!")
                    return 0
                }
                
                if (this.input.length > 0) {
                    this.condition = this.input
                }

                const load_elem = document.getElementById("load-circle")
                load_elem.style.display = "inline-block"
                const textArea2 = document.getElementById("Textarea2")

                const completion = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {'role': 'system', 'content': 'You are an assistant for the monitoring system. You must give your own analysis of the presented news.'},
                        {'role': 'user', 'content': 'Предоставь мне подробный анализ данной новости. ' + this.condition},
                        {'role': 'user', 'content': 'Представленная новость: ' + temp}
                    ],
                });
                textArea2.value = completion.data.choices[0].message.content
                load_elem.style.display = "none"
            },
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
.cond {
    display: inline-block;
    margin-left: 15px;
}
.dropdown_inline {
    margin-left: 10px;
    display: inline-block;
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