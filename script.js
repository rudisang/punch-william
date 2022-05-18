        let bar = 100;
        let timer = 25;
        let gameInterVal
        let interVal
        let startscreen = document.getElementById('startscreen')
        let level = document.getElementById('level')
        let time = document.getElementById('time')
        const sounds = ['audio.mp3','audio1.mp3','audio2.mp3','audio4.mp3','audio5.mp3','audio6.mp3'];
        let ended = document.getElementById('ended');
        let loser = document.getElementById('loser');
        let william = document.getElementById('william');
        let health = document.getElementById("health");
        health.style.width = bar+"%";

        document.onclick = userClicked;

        function startGame(){
            startscreen.style.display = 'none'
            console.log(level.value)
            let i = level.value
            
            gameInterVal = setInterval(function () {
                william.style.top = Math.floor(Math.random() * 80)+'%'
                william.style.left = Math.floor(Math.random() * 80)+'%'
                william.style.width = Math.floor(Math.random() * 200)+'px'
                
            }, i);

            setTimeout(function(){
                
                interVal = setInterval(function () {
                    if(bar <= 100){
                        bar = bar+5;
                        health.style.width = bar+"%";
                    }
                    
                    timer = timer-1;
                    time.innerHTML = timer

                    if(timer == 5){
                        let sound = new Howl({
                            src: ['ticktockb.mp3']
                        });
                        sound.play();
                    }
                    if(timer <= 0){
                        clearInterval(interVal);
                        clearInterval(gameInterVal);
                        loser.style.display = 'flex'
                        youLose()
                    }

                }, 1000);
            }, 800);
            
        }


        function userClicked() {
            let sound = new Howl({
                src: ['punchsound.mp3']
            });
            sound.play();
            let x = event.clientX;
            let y = event.clientY;
            let snowball = document.getElementById("snowballAppear");
            snowball.style.display = '';
            snowball.style.position = 'absolute';
            snowball.style.left = x-50 + 'px';
            snowball.style.top = y-50 + 'px';
        }

        function punch(){
            const random = Math.floor(Math.random() * sounds.length);
            let sound = new Howl({
                src: [sounds[random]]
            });
            sound.play();

            william.src = 'punched.png'
            william.style.width = '200px'

            bar = bar-2;
            health.style.width = bar+"%";

            if(bar <= 0){
                youWin()
            }

            setTimeout(function(){
                william.src = 'william-normal.png'
                william.style.top = Math.floor(Math.random() * 80)+'%'
                william.style.left = Math.floor(Math.random() * 80)+'%'
                william.style.width = Math.floor(Math.random() * 200)+'px'
            }, 500);
            userClicked()
        }

        function youLose(){
            let sound = new Howl({
                src: ['youlose.mp3']
            });
            let soundb = new Howl({
                src: ['losertrack.mp3']
            });
            sound.play();

            setTimeout(function(){
                soundb.play();
            }, 2000);
        }

        function youWin(){
            let sound = new Howl({
                src: ['winner.mp3']
            });
            sound.play();
            ended.style.display = 'flex'
            clearInterval(interVal);
            clearInterval(gameInterVal);

            if(level.value == 900){
                document.getElementById('level-text').innerHTML = 'Normal'
            }else if(level.value == 1000){
                document.getElementById('level-text').innerHTML = 'Easy'
            }else if(level.value == 500){
                document.getElementById('level-text').innerHTML = 'Moderate'
            }else if(level.value == 200){
                document.getElementById('level-text').innerHTML = 'God Mode'
            }

            document.getElementById('comptime').innerHTML = 30-timer
            
        }