//1. 모든애니메이션에 대한 정보를 배열에 담아둔다.
(() => {

    // 6. 스크롤위치값은 상황에 따라 활용하기 위해 변수로 지정해준다.
    let yOffset = 0; // 전체문서에서 현재스크롤 위치값
    let prevScrollHeight = 0; // 7. 현재 스크롤위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 8. 현재 보여지는 화면(씬)의 번호
    let enterNewScene = false; // 25. 새로운 씬이 시작된 순간 -1 버그를 없애는 boolean 값

    // 2. 섹션별 배열을 생성해준다.
    const sceneInfo = [
        {
            type : "sticky", // "sticky" 유무를 타입으로 지정해준다.
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : { // 각 섹션의 높이값을 설정하기 위해 아이디를 가져온다.
                container : document.querySelector("#scroll-section-0"),

                // 15. 첫번째 섹션에 문장들을 선택
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values : {
                // 16. 효과에따른 시작점과 끝점값을 배열로 넣어준다.
                // 28. { start : 0.1, end : 0.2 } 특정위치에서 애니매이션이 작동도록 설정하는 값
                messageA_opacity_in : [0, 1, { start : 0.1, end : 0.2 }],
                messageB_opacity_in : [0, 1, { start : 0.3, end : 0.4 }],
                messageA_translateY_in : [20, 0, { start : 0.1, end : 0.2 }],
                // 32. 사라지는 애니메이션 객체 추가 
                messageA_opacity_out : [1, 0, { start : 0.25, end : 0.3 }],
                messageB_opacity_out : [1, 0, { start : 0.3, end : 0.4 }],
                messageA_translateY_out : [0, -20, { start : 0.25, end : 0.3  }],
            }
        },
        {
            type : "normal",
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector("#scroll-section-1")
            }
        },
        {
            type : "sticky",
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector("#scroll-section-2")
            }
        },
        { 
            type : "sticky",
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector("#scroll-section-3")
            }
        },
    ];

    // 3. 각 섹션의 스크롤 높이를 세팅해준다.
    function setLayout () {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            // 각섹션 높이값을 아이디에 주입시킨다.
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        // 12. 새로고침을 위한 장치 : 현재 높이에 맞춰서 currentScene을 세팅해준다.
        let totalScrollHeight = 0;

        yOffset = window.pageYOffset;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        // 13. 10번과 동일 > 바디에 css에서 미리 지정해둔 씬의 내용이 보이도록 설정해준다.
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // 19. 애니메이션 > 투명도 값을 조절하는 함수
    // 20. currentYOffset 현재씬에서 얼마나 스크롤됐는지 알수있는 인자값
    function calcValues(values, currentYOffset) {
        let rv;
        // 22. 스크롤이 얼만큼 되었는지 현재씬에서 스크롤된 범위를 비율로 구해줘야 opacity값을 조절해줄수 있다.
        const scrollHeight =  sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;


        // 29. start ~ end 사이에서의 애니메이션 실행을 위해 분기
        if(values.length === 3) {

            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            // 31. 애니메이션 사이구간에만 작동되어야 하기때문에 분기처리
            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                // 30. 애니메이션 시작 : partScrollStart
                // 애니메이션 끝 : partScrollStart
                // 애니메이션 구간 : partScrollHeight
                // 현재 신의 시작 : currentYOffset
                // 구간안의 비율을 구하기 위한 공식
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
                
            } else if (currentYOffset < partScrollStart) {
                rv = values[0]
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1]
            }

        } else {
            // 23. 현재범위값에 messageA_opacity 배열 [0, 1]사이값을 구하기위해 빼준다.
            // 24. 범위값에서 처음값에서 시작하기위해 끝에 시작값을 더해준다. (values[0])
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;
    }

    // 18. 해당씬에서만 애니메이션이 일어나야하므로 각 신별로 체크해준다.
    function playAnimation () {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;

        // 21. 현재신에서 얼마나 스크롤됬는지 알기위해 전체스크롤에서 이전 스크롤높이값을 빼준다.
        const currentYOffset  = yOffset - prevScrollHeight;

        // 33. 현재씬의 스크롤 높이값
        const scrollHeight =  sceneInfo[currentScene].scrollHeight;

        // 34. 애니메이션이 나타나고 사라지는 구간 사이의 비율을 구한다.
        const scrollRatio = currentYOffset / scrollHeight;


        switch (currentScene) {
            case 0:
                // console.log('0 play');
                const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset) ;
                const messageA_opacity_out= calcValues(values.messageA_opacity_out, currentYOffset) ;
                const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset) ;
                const messageA_translateY_out= calcValues(values.messageA_translateY_out, currentYOffset) ;

                // 35. 애니메이션 구간 중간지점을 설정해 분기
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = messageA_opacity_in;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
                } else {
                    // out
                    objs.messageA.style.opacity = messageA_opacity_out;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
                }
                console.log( messageA_opacity_in );
                break;
            case 1:
                // console.log('1 play');
                break;
            case 2:
                // console.log('2 play');
                break;
            case 3:
                // console.log('3 play');
                break;
        
            default:
                break;
        }
    }

    function scrollLoop () {
        enterNewScene = false;
        // 스크롤값을 초기화시켜준다.
        prevScrollHeight = 0;
        
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;            
        }

        // //9. 현재화면 번호를 체크하기 위해 스크롤되는 yOffset과 이전 스크롤된 영역 + 현재씬의 높이값을 비교해준다.
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            // 26. 바뀌는 순간에 true로 변경해준다.
            enterNewScene = true; 
            currentScene++;

            // 14. 10번 이동 > 바디에 css에서 미리 지정해둔 씬의 내용이 보이도록 설정해준다.
            document.body.setAttribute('id', `show-scene-${currentScene}`);            
        }

        if(yOffset < prevScrollHeight) {
            enterNewScene = true; 

            // IOS 브라우저 바운스 효과로 인해 마이너스가 되는것을 방지
            if(currentScene === 0) return;
            currentScene--;

            // 14. 10번 이동 > 바디에 css에서 미리 지정해둔 씬의 내용이 보이도록 설정해준다.
            document.body.setAttribute('id', `show-scene-${currentScene}`);            
        }

        // 10. 바디에 css에서 미리 지정해둔 씬의 내용이 보이도록 설정해준다.
        // document.body.setAttribute('id', `show-scene-${currentScene}`);
        
        // 27. enterNewScene = true 이면 리턴.
        if(enterNewScene) return;

        // 17. 애니메이션 함수를 작성
        playAnimation();
    }


    // 5. 스크롤되고 있는 영역을 판별하기 위한 이벤트 핸들러와 함수를 만들어준다.
    window.addEventListener("scroll", () => {
        yOffset = window.pageYOffset;
        scrollLoop();    
    });

    // 4. 리사이즈시에도 높이값이 변경하도록 설정해준다.
    window.addEventListener("resize" , setLayout);

    // 11. 로드시에도 씬의 내용이 보여져야하기 때문에 이벤트 리스너에 넣어준다.
    window.addEventListener("load" , setLayout);
})()