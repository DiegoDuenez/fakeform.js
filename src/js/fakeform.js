



class FakeForm{

    constructor(data){

        this.data = data

        this.typesData = [
            'completeName',
            'firstName',
            'lastName',
            'date',
            'email',
            'random',
            'integer',
            'decimal',
            'lorem'
        ]

        this.firstNames = ['Diego', 'Miguel', 'Juan', 'Gabriel', 'Andrea', 'Melisa', 'Luis']
        this.lastNames = ['Dueñez', 'Perez', 'Gomez', 'García', 'Basurto', 'Reyes']

        if(this.data.hasOwnProperty('options')){
            
            if(this.data.options.hasOwnProperty('form')){

                this.form = document.querySelector(this.data.options.form)

                if(this.data.options.hasOwnProperty('button')){

                    this.button = document.querySelector(this.data.options.button)

                        this.button.addEventListener('click', (e) => {

                            e.preventDefault()

                            if(this.button.type == 'submit' || this.button.type == 'reset'){
                                console.log(`The button can't be of type ${this.button.type}`)
                            }
                            else{
                                this.getInputsDataFake()
                            }

                        });
                    
                }

            }

        }

    }


    getInputsDataFake(){

        
        this.inputs = this.form.getElementsByTagName("input");

        for (var i=0; i< this.inputs.length; i++) {

            this.generateData(this.inputs[i], this.inputs[i].getAttribute("data-fake-type") )
            
        };

    }

    generateData(input, typeData){

        if(this.typesData.includes(typeData)){

            if(typeData == 'completeName'){

                this.inputCompleteName(input)

            }
            if(typeData == 'firstName'){

                this.inputFirstName(input)

            }
            if(typeData == 'lastName'){

                this.inputLastName(input)

            }
            if(typeData == 'integer'){

               this.inputInteger(input)

            }
            if(typeData == 'decimal'){

               this.inputDecimal(input)

            }
            if(typeData == 'email'){

                this.inputEmail(input)

            }
            if(typeData == 'random'){
                
                this.inputRandom(input)

            }

            if(typeData == 'date'){

                this.inputDate(input)

            }

            if(typeData == 'lorem'){

                this.inputLorem(input)
            }

        }
        else if(typeData == null){

            if(input.type == 'text' || input.type == 'password'){

                this.inputRandom(input)

            }
            else if(input.type == 'number'){

                this.inputInteger(input)

            }
            else if(input.type == 'email'){

              this.inputEmail(input)

            }
            else if(input.type == 'date'){

                this.inputDate(input)

            }
            
        }
        else{
            console.log(`Data type ${typeData} not exists`)
        }

    }

    inputCompleteName(input){
        let completeName = this.firstNames[Math.floor(Math.random()*this.firstNames.length)] + ' ' + this.lastNames[Math.floor(Math.random()*this.lastNames.length)] + ' ' + this.lastNames[Math.floor(Math.random()*this.lastNames.length)];
                
        input.value = completeName
    }

    inputFirstName(input){
        let firstName = this.firstNames[Math.floor(Math.random()*this.firstNames.length)];
                
        input.value = firstName
    }

    inputLastName(input){
        let lastName = this.lastNames[Math.floor(Math.random()*this.lastNames.length)];
                
        input.value = lastName
    }

    inputInteger(input){

        if(input.hasAttribute('data-fake-between')){
            let between = input.getAttribute('data-fake-between')
            let min = Math.ceil(between.split('-')[0])
            let max = Math.floor(between.split('-')[1])
            input.value = Math.floor(Math.random() * (max - min  + 1) + min);
        }
        else{
            input.value = Math.floor(Math.random() * (9999 - 0  + 1) + 0);
            
        }

    }

    inputDecimal(input){

        if(input.hasAttribute('data-fake-between')){
                    
            let between = input.getAttribute('data-fake-between')
            let min = Math.ceil(between.split('-')[0])
            let max = Math.floor(between.split('-')[1])
            let presicion = 5
            if(input.hasAttribute('data-fake-presicion')){
                presicion = input.getAttribute('data-fake-presicion')
            }

            var rand = Math.random()*(max-min) + min;
            var power = Math.pow(10, presicion);
            
            input.value = Math.floor(rand*power) / power;
            
        }
        else{

            let min = 0
            let max = 999999
            let presicion = 5
            var rand = Math.random()*(max-min) + min;
            var power = Math.pow(10, presicion);
            input.value = Math.floor(rand*power) / power;

            
        }

    }

    inputEmail(input){

        let symbols = ['_','','-']
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        let domain = '';
        let email = this.firstNames[Math.floor(Math.random()*this.firstNames.length)] +  symbols[Math.floor(Math.random()*symbols.length)] + this.lastNames[Math.floor(Math.random()*this.lastNames.length)] + (Math.floor(Math.random() * 100));
       
        if(input.hasAttribute('date-fake-realdomain')){

            if(input.getAttribute('date-fake-realdomain') == 'true'){
                let domains = ['gmail', 'yahoo', 'apple', 'outlook', 'hotmail']
                domain += domains[Math.floor(Math.random() * domains.length)];

            }

        }
        else{
            for(var x = 0; x <= 5; x++){
                domain += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        if(input.hasAttribute('date-fake-customdomain')){
            domain = input.getAttribute('date-fake-customdomain')
        }
       

        if(email.includes('ñ')){
            email = email.replace('ñ', 'n')
        }
        input.value = email + `@${domain}.com`

    }

    inputRandom(input){

        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let random = '';

        if(input.hasAttribute('data-fake-length')){

            for(var x = 0; x <= parseInt(input.getAttribute('data-fake-length')); x++){
                random += chars[Math.floor(Math.random() * chars.length)];
            }

        }
        else{
            for(var x = 0; x <= 5; x++){
                random += chars[Math.floor(Math.random() * chars.length)];
            }

        }

        input.value = random

    }

    inputDate(input){

        var year = Math.floor(Math.random() * (2023 - 1850  + 1) + 1850);
        var month = Math.floor(Math.random() * (12 - 1  + 1) + 1);
        var day = Math.floor(Math.random() * (31 - 1  + 1) + 1);

        month = (month <  10) ? "0" + month : month;
        day = (day < 10) ? "0" + day: day;

        let date = `${year}-${month}-${day}`

        input.value = date

    }

    inputLorem(input){

        let text = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas delectus aspernatur, tenetur nam eaque perferendis nesciunt alias, minus iusto neque inventore odit, quisquam iure sint facere architecto illum vitae reprehenderit?'
       
        if(input.hasAttribute('data-fake-length')){

            input.value =  text.substr(0, input.getAttribute('data-fake-length'))

        }
        else{
            input.value =  text

        }

    }




}