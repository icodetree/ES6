
// 52번 차례
// 거의 다왔다.





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
            // 0
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

                // 37. canvas추가
                canvas : document.querySelector('#video-canvas-0'),
                context : document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages : []
            },
            values : {
                // 38. 비디오관련 배열추가
                videoImageCount : 300,
                imageSequence : [0, 299], // 이미지 순서
                canvas_opacity : [1, 0, { start : 0.9, end : 1 }],


                // 16. 효과에따른 시작점과 끝점값을 배열로 넣어준다.
                // 28. { start : 0.1, end : 0.2 } 특정위치에서 애니매이션이 작동도록 설정하는 값
                messageA_opacity_in : [0, 1, { start : 0.1, end : 0.2 }],
                messageB_opacity_in : [0, 1, { start : 0.3, end : 0.4 }],
                messageC_opacity_in : [0, 1, { start : 0.5, end : 0.6 }],
                messageD_opacity_in : [0, 1, { start : 0.7, end : 0.8 }],

                messageA_translateY_in : [20, 0, { start : 0.1, end : 0.2 }],
                messageB_translateY_in : [20, 0, { start : 0.3, end : 0.4 }],
                messageC_translateY_in : [20, 0, { start : 0.5, end : 0.6 }],
                messageD_translateY_in : [20, 0, { start : 0.7, end : 0.8 }],

                // 32. 사라지는 애니메이션 객체 추가 
                messageA_opacity_out : [1, 0, { start : 0.25, end : 0.3 }],
                messageB_opacity_out : [1, 0, { start : 0.45, end : 0.5 }],
                messageC_opacity_out : [1, 0, { start : 0.65, end : 0.7 }],
                messageD_opacity_out : [1, 0, { start : 0.85, end : 0.9 }],

                messageA_translateY_out : [0, -20, { start : 0.25, end : 0.3  }],
                messageB_translateY_out : [0, -20, { start : 0.45, end : 0.5  }],
                messageC_translateY_out : [0, -20, { start : 0.65, end : 0.7  }],
                messageD_translateY_out : [0, -20, { start : 0.85, end : 0.9  }],
            }
        },
        {
            // 1
            type : "normal",
            // heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector("#scroll-section-1")
            }
        },
        {
            // 2
            type : "sticky",
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector("#scroll-section-2"),
                messageA : document.querySelector('#scroll-section-2 .a'),
                messageB : document.querySelector('#scroll-section-2 .b'),
                messageC : document.querySelector('#scroll-section-2 .c'),

                pinB : document.querySelector('#scroll-section-2 .b .pin'),
                pinC : document.querySelector('#scroll-section-2 .c .pin'),

                // 46. 두번째 캔버스 추가
                canvas : document.querySelector('#video-canvas-1'),
                context : document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages : []

            },
            values : {
                // 47. 비디오관련 배열추가
                videoImageCount : 960,
                imageSequence : [0, 959], // 이미지 순서
                canvas_opacity_in : [0, 1, { start : 0, end : 0.1 }],
                canvas_opacity_out : [1, 0, { start : 0.95, end : 1 }],
                

                // 컷별로 작성
                messageA_translateY_in : [20, 0, { start : 0.15, end : 0.2 }],
                messageB_translateY_in : [30, 0, { start : 0.5, end : 0.55 }],
                messageC_translateY_in : [30, 0, { start : 0.72, end : 0.77 }],

                messageA_opacity_in : [0, 1, { start : 0.15, end : 0.2 }],
                messageB_opacity_in : [0, 1, { start : 0.5, end : 0.55 }],
                messageC_opacity_in : [0, 1, { start : 0.72, end : 0.77 }],

                messageA_translateY_out : [0, -20, { start : 0.3, end : 0.35  }],
                messageB_translateY_out : [0, -20, { start : 0.58, end : 0.63  }],
                messageC_translateY_out : [0, -20, { start : 0.85, end : 0.9  }],

                messageA_opacity_out : [1, 0, { start : 0.3, end : 0.35 }],
                messageB_opacity_out : [1, 0, { start : 0.58, end : 0.63 }],
                messageC_opacity_out : [1, 0, { start : 0.85, end : 0.9 }],

                pinB_scaleY : [0.5, 1, { start : 0.5, end : 0.55 }],
                pinC_scaleY : [0.5, 1, { start : 0.72, end : 0.77 }],

                pinB_opacity_in : [0, 1, { start : 0.5, end : 0.55 }],
                pinC_opacity_in : [0, 1, { start : 0.72, end : 0.77 }],

                pinB_opacity_out : [1, 0, { start : 0.58, end : 0.63 }],
                pinC_opacity_out : [1, 0, { start : 0.85, end : 0.9 }],

            }
        },
        { 
            // 3
            type : "sticky",
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight : 0,
            objs : {
                container : document.querySelector("#scroll-section-3")
            }
        },
    ];

    // 39. 캔버스관련 함수 생성
    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.jpg`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        // 50. 두번째 캔버스 이미지를 세팅
        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.jpg`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }
    }
    setCanvasImages();

    // 3. 각 섹션의 스크롤 높이를 세팅해준다.
    function setLayout () {
        for (let i = 0; i < sceneInfo.length; i++) {

            // 36. sticky 영역이 아닌영역 분기처리
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if(sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
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


        // 42.캔버스를 모든 디바이스에 맞추기위해 높이값을 브라우저에 맞추고 가운데 정렬해준다.
        // 43. 윈도우 높이값인 1080기준으로하는 높이의 비율값을 변수로 선언해준다.
        const heightRatio = window.innerHeight / 1080
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

        // 48. 두번째 캔버스 추가
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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

                // 40. 이미지 시퀀스를 실행하는 로직을 만들어준다.
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));  // 정수처리
                // 41. 캔버스에 그려준다. 크기가 같기때문에 가로세로는 0,0
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);

                // 45. 캔버스가 사라질때 투명도를 제어
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

                // 35. 애니메이션 구간 중간지점을 설정해 분기
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }

                break;

            case 2:
                // console.log('2 play');

                // 49. 두번째 캔버스에 그려준다. 크기가 같기때문에 가로세로는 0,0
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));  // 정수처리
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);


                // 51. 시작투명도와 끝나는 시점 투명도를 위해 비율구간을 설정해준다.
                if (scrollRatio <= 0.5) {
                    // in
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    // out
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }

                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
                
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }

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
    // window.addEventListener("resize" , setLayout);

    // 44. 캔버스가 최초 실햏시에도 보여야하기때문에 로직을 수정해준다.
    window.addEventListener("resize" , () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });

    // 11. 로드시에도 씬의 내용이 보여져야하기 때문에 이벤트 리스너에 넣어준다.
    window.addEventListener("load" , setLayout);
})()