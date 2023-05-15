import{d,o as c,c as r,a as t,b as u,t as b,e as m}from"./index-d525893a.js";import{_ as p}from"./_plugin-vue_export-helper-c27b6911.js";const _=new d.Configuration({apiKey:"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"}),v=new d.OpenAIApi(_),x={data(){return{condition:""}},methods:{clear(){const o=document.getElementById("Textarea1");o.value=""},change_condition(o){o=="бизнес"&&(this.condition="с точки зрения бизнеса"),o=="государство"&&(this.condition="с точки зрения государства"),o=="сил.структуры"&&(this.condition="с точки зрения силовых структур"),o=="разные т.з."&&(this.condition="с разных точек зрения")},async push_news(){if(this.condition=="")return alert("Внимание! Вы не выбрали условие!"),0;let e=document.getElementById("Textarea1").value;if(e=="")return alert("Внимание! Вы не ввели текст!"),0;const a=document.getElementById("load-circle");a.style.display="inline-block";const l=document.getElementById("Textarea2"),i=await v.createChatCompletion({model:"gpt-3.5-turbo",messages:[{role:"system",content:"Вы помощник для системы мониторинга. Вы должны дать свой собственный анализ представленной новости"},{role:"user",content:"Предоставь мне подробный анализ данной новости "+this.condition},{role:"user",content:"Представленная новость: "+e},{role:"assistant",content:"Вот мой подробный анализ новости "+this.condition}]});l.value=i.data.choices[0].message.content,a.style.display="none"}},mounted(){}},g={class:"container main-block"},h={class:"row"},y={class:"col-12"},f={class:"mb-3"},w=t("span",{class:"badge text-bg-success"},"Анализ новости",-1),k={class:"dropdown dropdown_inline"},C=t("button",{class:"btn btn-success dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Условие ",-1),q={class:"dropdown-menu"},T={class:"cond"},B=t("div",{class:"spinner-border text-success",role:"status",id:"load-circle"},[t("span",{class:"visually-hidden"},"Loading...")],-1),A=t("div",{for:"Textarea2",class:"form-label"},"Ввод:",-1),I=t("textarea",{class:"form-control",id:"Textarea1",rows:"10"},null,-1),E=m('<div class="mb-3"><label for="Textarea2" class="form-label">Вывод:</label><textarea class="form-control" id="Textarea2" rows="10"></textarea></div><button type="button" class="btn btn-info btn-help" data-bs-toggle="modal" data-bs-target="#exampleModal"> Информация и пояснение </button><div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">Анализ новости</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"> Анализ новости - это инструмент, при помощи которого Вы можете получить подробный анализ новости от Исcкусственного Интелекта с той или иной точки зрения. На вход подается выражение - запрос: <b>&quot;Предоставь мне подробный анализ данной новости + точка зрения&quot;</b> Во вкладке <b>&quot;Условие&quot;</b> можно выбрать точку зрения. <br><br> &quot;Бизнес&quot; - с точки зрения бизнеса.<br> &quot;Государство&quot; - с точки зрения государства.<br> &quot;Сил.Структуры&quot; - с точки зрения силовых структур<br> &quot;Разные т.з.&quot; - с разных точек зрения </div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>',3);function M(o,e,a,l,i,n){return c(),r("div",g,[t("div",h,[t("div",y,[t("div",f,[w,t("div",k,[C,t("ul",q,[t("li",null,[t("button",{class:"dropdown-item",onClick:e[0]||(e[0]=s=>n.change_condition("бизнес"))},"Бизнес")]),t("li",null,[t("button",{class:"dropdown-item",onClick:e[1]||(e[1]=s=>n.change_condition("государство"))},"Государство")]),t("li",null,[t("button",{class:"dropdown-item",onClick:e[2]||(e[2]=s=>n.change_condition("сил.структуры"))},"Сил.Структуры")]),t("li",null,[t("button",{class:"dropdown-item",onClick:e[3]||(e[3]=s=>n.change_condition("разные т.з."))},"Разные т.з.")])])]),t("div",T,[u("Что передается в ChatGPT: "),t("i",null,"Предоставь мне подробный анализ данной новости "+b(this.condition),1)]),B,A,I,t("button",{type:"button",class:"btn btn-success btn-control",onClick:e[4]||(e[4]=(...s)=>n.push_news&&n.push_news(...s))},"Запуск"),t("button",{type:"button",class:"btn btn-success btn-control",style:{"margin-left":"10px"},onClick:e[5]||(e[5]=(...s)=>n.clear&&n.clear(...s))},"Очистить")]),E])])])}const G=p(x,[["render",M]]);export{G as default};