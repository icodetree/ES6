//1. 모든애니메이션에 대한 정보를 배열에 담아둔다.
(() => {

    // 6. 스크롤위치값은 상황에 따라 활용하기 위해 변수로 지정해준다.
    let yOffset = 0;
    let prevScrollHeight = 0; // 7. 현재 스크롤위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 8. 현재 보여지는 화면(씬)의 번호


    // 2. 섹션별 배열을 생성해준다.
    const sceneInfo = [
        {
            type : "sticky", // "sticky" 유무를 타입으로 지정해준다.
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : { // 각 섹션의 높이값을 설정하기 위해 아이디를 가져온다.
                container : document.querySelector("#scroll-section-0")
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

        // 12. 현재 높이에 맞춰서 currentScene을 세팅해준다 > 새로고침을 위한 장치.
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= pageYOffset) {
                currentScene = i;
                break;
            }
        }
        // 13. 10번과 동일 > 바디에 css에서 미리 지정해둔 씬의 내용이 보이도록 설정해준다.
        document.body.setAttribute('id', `show-scene-${currentScene}`);

    }

    function scrollLoop () {
        // 스크롤값을 초기화시켜준다.
        prevScrollHeight = 0;
        
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;            
        }

        // //9. 현재화면 번호를 체크하기 위해 스크롤되는 yOffset과 이전 스크롤된 영역 + 현재씬의 높이값을 비교해준다.
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }
        if(yOffset < prevScrollHeight) {
            // IOS 브라우저 바운스 효과로 인해 마이너스가 되는것을 방지
            if(currentScene === 0) return;
            currentScene--;
        }


        // 10. 바디에 css에서 미리 지정해둔 씬의 내용이 보이도록 설정해준다.
        document.body.setAttribute('id', `show-scene-${currentScene}`);

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