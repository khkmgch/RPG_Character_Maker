const Config = {
    Image : {
        male : {
            hero : "https://recursionist.io/img/dashboard/lessons/quickstart/male-hero.png",
            warrior : "https://recursionist.io/img/dashboard/lessons/quickstart/male-warrior.png",
            mage : "https://recursionist.io/img/dashboard/lessons/quickstart/male-mage.png"
        },
        female : {
            hero : "https://recursionist.io/img/dashboard/lessons/quickstart/female-hero.png",
            warrior : "https://recursionist.io/img/dashboard/lessons/quickstart/female-warrior.png",
            mage : "https://recursionist.io/img/dashboard/lessons/quickstart/female-mage.png"
        }
    }
}
class Status{
    static InitialStatus = {
        hero : {
            strength : 15,
            agility : 15,
            resilience : 30,
            wisdom : 5,
            luck : 35
        },
        warrior : {
            strength : 30,
            agility : 25,
            resilience : 30,
            wisdom : 10,
            luck : 5
        },
        mage : {
            strength : 10,
            agility : 20,
            resilience : 20,
            wisdom : 45,
            luck : 5
        }
    }
    static Multiplier = {
        everyman : {
            strength : 1,
            agility : 1,
            resilience : 1,
            wisdom : 1,
            luck : 1
        },
        batoutofhell : {
            strength : 1,
            agility : 1.4,
            resilience : 1,
            wisdom : 1,
            luck : 1
        },
        brave : {
            strength : 1.1,
            agility : 1.1,
            resilience : 1,
            wisdom : 1,
            luck : 1.2
        },
        luckydevil : {
            strength : 1,
            agility : 1,
            resilience : 1,
            wisdom : 1,
            luck : 1.5
        },
        tomboy : {
            strength : 1.1,
            agility : 1.1,
            resilience : 1,
            wisdom : 1,
            luck : 1
        },
    }
    constructor(job, traits){
        this.map = Status.initializeStatus(job, traits);
    }
    static initializeStatus(job, traits){
        let map = {};
        let initial = Status.InitialStatus[job];
        let multiplier = Status.Multiplier[traits];
        for(let key in initial){
            map[key] = Math.floor(initial[key] * multiplier[key]);
        }
        return map;
    }
}
var vm = new Vue({
    el : `#game-maker`,
    data(){
        return {
            name: "",
            gender: "male",
            job: "hero",
            traits: "everyman",
            status: new Status(`hero`, `everyman`).map
        };
    },
    computed: {
        url: function(){
            return Config.Image[this.gender][this.job];
        },
        gender_jp: function(){
            switch(this.gender){
                case "male": return "男性";
                case "female": return "女性";
            }
        },
        job_jp: function(){
            switch(this.job){
                case "hero": return "勇者";
                case "warrior": return "戦士";
                case "mage": return "魔法使い";
            }
        },
        traits_jp: function(){
            switch(this.traits){
                case "everyman": return "ふつう";
                case "batoutofhell": return "電光石火";
                case "brave": return "勇者";
                case "luckydevil": return "ラッキーマン";
                case "tomboy": return "おてんば";
            }
        }
    },
    methods: {
        evaluate: function(){
            if(this.gender == "male" && this.traits == "tomboy"){
                this.traits = "everyman";
            }
            if(this.gender == "female" && this.traits == "luckydevil"){
                this.traits = "everyman";
            }
            if(this.traits == "brave" && this.job != "hero"){
                this.traits = "everyman";
            }
        },
        update: function(){
            this.status = new Status(this.job, this.traits).map;
        }
    }
})
