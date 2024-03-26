/*************************************************************

@ 전역함수

************************************************************/

// amchart : 라이센스 키
am4core.options.commercialLicense = "true";
am4core.useTheme(am4themes_animated);

/*************************************************************

@ uxCommonJS : ui 공통 호출함수입니다. 공통 이외에는 추가하지 마시오

************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  uxCommonJs.datePicker();
  uxCommonJs.tableSortBtn();
  uxCommonJs.btnShowBtn();
  uxCommonJs.filterBottomFix();
  uxCommonJs.selectBoxBtn();
  uxCommonJs.checkBoxAllChk();
  uxCommonJs.tooltipEvent();
  uxCommonJs.tabListAllChk();
  uxCommonJs.rangeEvent();
  uxCommonJs.modalClose();
  uxCommonJs.exceptClose();
  uxCommonJs.likeGroupBtn();
  uxCommonJs.noticeBtn();
  uxCommonJs.menuToggle();
  uxCommonJs.slblingActive();
  uxCommonJs.commtFixedHead();
  uxCommonJs.initializeCustomSelects({
    className: "custom-select",
    animationStyle: "slide", // 'fade', 'slide', 또는 null
  });

  uxJoinJs.radioBtn();

  uxProductJs.fillterSwiper();
  uxProductJs.filterSearch();
  uxProductJs.filterMoreBtn();
  uxProductJs.floatingMoreBtn();
  uxProductJs.seeMoreItem();
  uxProductJs.dangerInfoSelect();
  uxProductJs.tableToggleEvent();
  uxProductJs.prdInfoScrollHorizontal();
  uxProductJs.prdInfoSwipeRcmd();
  uxProductJs.prdInfoSwipeIvst();
  uxProductJs.prdInfoPricePopup();
  uxProductJs.prdInfoSwipeTicker();
  uxProductJs.viewScrollTab();

  uxInvestJs.investMainSwiper();
  uxInvestJs.writerSwiper();
  uxInvestJs.scrollPostView();

  uxSearchJs.searchPopupTab();
  uxSearchJs.relatedMore();
});

/*************************************************************

@ 탭리스트 전체선택 : 개발전달함수 : tabListAllChkCount

************************************************************/

const tabListAllChkCount = () => {
  const tabListCheck = document.querySelectorAll(
    ".modal-wrap .tab-list .allSelect input"
  );
  if (!document.querySelector(".allSelect input")) return;

  tabListCheck.forEach((el) => {
    const checkLength = el
      .closest(".tab-list")
      .querySelectorAll('li:not(.allSelect) input[type="checkbox"]');
    const checkCount = Array.from(checkLength).filter(
      (el) => el.checked
    ).length;

    if (checkLength.length == checkCount) {
      el.closest(".tab-list").querySelector(".allSelect input").checked = true;
    }
  });
};

/*************************************************************

@ 공통 알럿 : 개발공통함수

************************************************************/
const showMsg = (type, title, msg, okHandler, cancelHandler) => {
  switch (type) {
    case "alert":
      alert(msg);
      if (okHandler != null) okHandler();
      break;
    case "confirm":
      if (confirm(msg)) {
        if (okHandler != null) okHandler();
      } else {
        if (cancelHandler != null) cancelHandler();
      }
      break;
  }
};

/*************************************************************

@ 공통 함수

************************************************************/

// 스로틀링
const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

// 스크롤 방향
const scrollDirection = (currentScrollTop, lastTop) => {
  const scrollTop = currentScrollTop;
  const newDirection = scrollTop > lastTop ? "down" : "up";
  document.body.setAttribute("data-scroll-direction", newDirection);
  return newDirection;
};

// 수익률 계산기 직접입력 : FUN-FO-03017000
const selectDirectInput = (e) => {
  console.log("optionDiv", e.target);
  const targetElm = e.target;
  const directInput = document.querySelector(
    '[data-select-change="directInput"]'
  );
  const isText = targetElm.textContent === "직접입력" ? true : false;
  const active = "active";

  if (isText && directInput.classList.contains(active) === false) {
    directInput.classList.add(active);
  } else {
    directInput.classList.remove(active);
  }
};

/*************************************************************

@ uxCommonJS : ui 공통 함수입니다. 공통 이외에는 추가하지 마시오

************************************************************/
const uxCommonJs = {
  datePicker() {
    const formBoxDatePicker = document.querySelectorAll(".form-box.datepicker");
    if (!formBoxDatePicker) return;

    const inputDatePicker = document.querySelectorAll(".input-picker");
    const today = new Date();

    inputDatePicker.forEach((el) => {
      datepicker = mobiscroll.datepicker(el, {
        controls: ["calendar"],
        display: "anchored",
        dateFormat: "YY.MM.DD",
        showOuterDays: false,
        buttons: [{ text: "close" }],
        // touchUi: true,
        locale: mobiscroll.localeKo,
        renderCalendarHeader: function () {
          return (
            "<div mbsc-calendar-prev></div>" +
            '<div mbsc-calendar-nav class="custom-view-nav"></div>' +
            "<div mbsc-calendar-next></div>"
          );
        },
      });
      datepicker.setVal(new Date());
      datepicker.getVal();
    });
  },
  // 테이블 sort 버튼 [ 오름차순, 내림차순 ]
  tableSortBtn() {
    const tableSortBtn = document.querySelectorAll(".table-wrap .sort-btn");
    if (!tableSortBtn) return;
    tableSortBtn.forEach((el) => {
      el.addEventListener("click", function (event) {
        const hasClassOn = this.closest("tr").querySelector(".active");
        if (!this.classList.contains("active") && hasClassOn !== null) {
          hasClassOn.classList.remove("active");
          this.classList.add("active");
        } else {
          this.classList.toggle("active");
        }
      });
    });
  },
  // 테이블 클래스 더보기 버튼
  btnShowBtn() {
    const classMoreBtn = document.querySelectorAll(".btn-show-tr");
    if (!classMoreBtn) return;

    classMoreBtn.forEach((el) => {
      el.addEventListener("click", function () {
        this.classList.toggle("active");
        const hideClass = this.closest("tbody").querySelectorAll(".hide-tr");
        hideClass.forEach((target) => {
          target.classList.toggle("active");
        });
      });
    });
  },
  // 하단 필터상세 높이값을 구해서 패딩영역을 인라인에 넣어줍니다.
  filterBottomFix() {
    const filterBottomFix = document.querySelector(".bottom-fixed-wrap");
    if (!filterBottomFix) return;

    const footerWrap = document.querySelector(".footer-wrap");
    // 이때 60은 footer-wrap의 padding-bottom 값
    const btmFixWrapHeight = filterBottomFix.offsetHeight + 60;
    footerWrap.style.paddingBottom = btmFixWrapHeight + "px";
  },
  // 셀렉트 박스 클릭 이벤트
  selectBoxBtn() {
    const selectBtn = document.querySelectorAll(".dropdown .select-btn");
    if (!selectBtn) return;

    selectBtn.forEach((el) => {
      el.addEventListener("click", function () {
        this.closest(".dropdown").classList.toggle("active");
      });
    });

    const selectBtnValue = document.querySelectorAll(".drop-box button");
    selectBtnValue.forEach((el) => {
      el.addEventListener("click", function () {
        const buttonText = this.innerText;
        this.closest(".dropdown").querySelector(
          ".select-btn_text-content"
        ).textContent = buttonText;
        this.closest(".dropdown").classList.remove("active");
      });
    });
  },
  // input 타입에 allchk라 표기 되어 있으면, eachChk에 on클래스를 부여 합니다.
  checkBoxAllChk() {
    const allCheck = document.querySelector(".checkbox-wrap #allChk");
    if (!allCheck) return;
    const inputItem = allCheck
      .closest(".join-agree-wrap")
      .querySelectorAll(".each-agree-list input");
    const marketingAgreeList = document.querySelector(".marketing-agree-list");
    const joinBtnWrap = document.querySelector(".join-btn-wrap .btn-primary");

    allCheck.addEventListener("click", function () {
      if (allCheck.checked) {
        inputItem.forEach((el) => {
          el.checked = true;
        });
        marketingAgreeList.classList.add("on");
        joinBtnWrap.classList.remove("disabled");
      } else {
        inputItem.forEach((el) => {
          el.checked = false;
        });
        marketingAgreeList.classList.remove("on");
        joinBtnWrap.classList.add("disabled");
      }
    });

    // 리스트 체크가 모두 안될때, 모두 체크 헤제
    const counterTotal = inputItem.length;
    inputItem.forEach((el) => {
      el.addEventListener("click", function () {
        let inputCheckTotal = document.querySelectorAll(
          '.each-agree-list input[name="eachChk"]:checked'
        );
        if (counterTotal != inputCheckTotal.length) {
          allCheck.checked = false;
          joinBtnWrap.classList.add("disabled");
        } else {
          allCheck.checked = true;
          joinBtnWrap.classList.remove("disabled");
        }
      });
    });

    const personListFour = document.querySelector("#agreeItem4");
    personListFour.addEventListener("change", function () {
      if (personListFour.checked) {
        document.querySelector(".marketing-agree-list").classList.add("on");
      } else {
        document.querySelector(".marketing-agree-list").classList.remove("on");
      }
    });

    const marketingAgreeListItem = marketingAgreeList.querySelectorAll("input");
    marketingAgreeListItem.forEach((el) => {
      el.addEventListener("change", function () {
        let marketingAgreeListItemCheck =
          marketingAgreeList.querySelectorAll("input:checked").length;
        let marketingTotalItemCheck =
          marketingAgreeList.querySelectorAll("input").length;
        if (marketingTotalItemCheck !== marketingAgreeListItemCheck) {
          personListFour.checked = false;
        } else {
          personListFour.checked = true;
        }
      });
    });

    const essenntailList = document.querySelectorAll(
      ".each-agree-list .each-agree-item:not(:last-child)"
    );
    essenntailList.forEach((el) => {
      el.addEventListener("change", function () {
        let essenntailListCheck = document.querySelectorAll(
          ".each-agree-list .each-agree-item:not(:last-child) input:checked"
        ).length;
        if (essenntailList.length == essenntailListCheck) {
          joinBtnWrap.classList.remove("disabled");
        } else {
          joinBtnWrap.classList.add("disabled");
        }
      });
    });
  },
  // 툴팁 아이콘 클릭시 on / 툴팁 close 버튼 클릭시 off
  tooltipEvent() {
    const tooltip = document.querySelectorAll(".tooltip");
    if (!tooltip) return;
    const tooltipBtn = document.querySelectorAll(".tooltip .icon");
    const tooltipCloseBtn = document.querySelectorAll(".tooltip .close");

    // on 이벤트
    tooltipBtn.forEach((el) => {
      el.addEventListener("click", function () {
        this.closest(".tooltip")
          .querySelector(".tooltip-msg")
          .classList.toggle("active");
      });
    });

    // close 이벤트
    tooltipCloseBtn.forEach((el) => {
      el.addEventListener("click", function () {
        this.closest(".tooltip-msg").classList.remove("active");
      });
    });
  },
  // 공통 전체 버튼 클릭시 활성화 비활성화 이벤트
  tabListAllChk() {
    const allSelectBtn = document.querySelectorAll(".allSelect input");
    if (!allSelectBtn) return;

    allSelectBtn.forEach((el) => {
      const eachItem = el
        .closest(".tab-list")
        .querySelectorAll("li:not(.allSelect) input");
      el.addEventListener("change", function () {
        const allSelectChild = this.closest(".tab-list").querySelectorAll(
          "li:not(.allSelect) input"
        );
        if (this.checked) {
          allSelectChild.forEach((target) => {
            target.checked = true;
          });
        } else {
          allSelectChild.forEach((target) => {
            target.checked = false;
          });
        }
      });

      eachItem.forEach((each) => {
        each.addEventListener("change", function () {
          let allselectInput =
            this.closest(".tab-list").querySelector(".allSelect input");
          let eachLength = this.closest(".tab-list").querySelectorAll(
            "li:not(.allSelect) input"
          ).length;
          let eachCkeckLength = this.closest(".tab-list").querySelectorAll(
            "li:not(.allSelect) input:checked"
          ).length;
          if (eachLength == eachCkeckLength) {
            allselectInput.checked = true;
          } else {
            allselectInput.checked = false;
          }
        });
      });
    });
  },
  // 게이지 이벤트 drag시 발생 : 예시페이지) FUN-FO-03011500
  rangeEvent() {
    if (!$(".sliderRange")) return;
    $(".range-wrap-03 .sliderRange").slider({
      range: true,
      min: 0,
      max: 3,
      step: 1,
      values: [0, 3],
      create: function (event, ui) {
        const rangeValues = $(this).slider("values");
        const handles = $(this).find(".ui-slider-handle");
        handles.eq(0).attr("value", rangeValues[0]);
        handles.eq(1).attr("value", rangeValues[1]);
      },
    });

    $(".range-wrap-05 .sliderRange").slider({
      range: true,
      min: 0,
      max: 5,
      step: 1,
      values: [0, 5],
      create: function (event, ui) {
        const rangeValues = $(this).slider("values");
        const handles = $(this).find(".ui-slider-handle");
        handles.eq(0).attr("value", rangeValues[0]);
        handles.eq(1).attr("value", rangeValues[1]);
      },
    });

    // 핸들링 할때 바뀌는 수치
    $(".sliderRange").on("slidechange", function () {
      const rangeValues = $(this).slider("values");
      const handles = $(this).find(".ui-slider-handle");
      handles.eq(0).attr("value", rangeValues[0]);
      handles.eq(1).attr("value", rangeValues[1]);
    });
  },
  // 모달 전용 : modal-close을 클릭하면 active클래스 제거
  modalClose() {
    const modalWrap = document.querySelector(".modal-wrap");
    if (!modalWrap) return;

    const modalWrapClose = modalWrap.querySelector(".modal-close");
    modalWrapClose.addEventListener("click", function () {
      this.closest(".modal-wrap").classList.remove("active");
    });
  },
  exceptClose() {
    const exceptClose = document.querySelectorAll('[data-close="1"]');
    if (!exceptClose) return;

    exceptClose.forEach((el) => {
      el.addEventListener("click", function () {
        el.closest('[data-close-parent="1"]').classList.remove("active");
      });
    });
  },
  // 관심그룹 추가
  likeGroupBtn() {
    const likeModal = document.querySelector(".like-modal");
    if (!likeModal) return;

    const likeAddBtn = likeModal.querySelector(".likeAddBtn");
    const likeDelBtn = likeModal.querySelector(".likeDelBtn");

    if (likeAddBtn) {
      likeAddBtn.addEventListener("click", function () {
        likeModal.querySelector(".gruop-none").classList.remove("active");
        likeModal.querySelector(".gruop-add").classList.add("active");
      });
    }

    if (likeDelBtn) {
      likeDelBtn.addEventListener("click", function () {
        this.closest(".gruop-add").classList.remove("active");
      });
    }
  },
  // 유의사항
  noticeBtn() {
    const noticeWrap = document.querySelectorAll(".bottom-notice");
    if (!noticeWrap) return;

    const noticeBtn = document.querySelectorAll(".bottom-notice-title");

    noticeBtn.forEach((el) => {
      el.addEventListener("click", function () {
        el.closest(".bottom-notice").classList.toggle("active");
      });
    });
  },
  // 메뉴 활성화
  menuToggle() {
    const menuToggle = document.querySelector(".menu-item.hbg");
    if (!menuToggle) return;

    const header = document.querySelector(".header");
    menuToggle.addEventListener("click", function () {
      header.classList.toggle("is-sidebar");
    });
  },

  slblingActive() {
    const menuSlbling = document.querySelectorAll("[data-slibling]");
    if (!menuSlbling) return;

    const tabListItem = document.querySelectorAll(
      ".tab-list li label[data-tab]"
    );
    if (!tabListItem) return;

    tabListItem.forEach((el) => {
      el.addEventListener("click", function () {
        let itemValue = this.getAttribute("data-tab");
        let data = 0;
        menuSlbling.forEach((target) => {
          data = target.dataset.slibling;
          if (data == itemValue) {
            target.classList.add("active");
          } else {
            target.classList.remove("active");
          }
        });
      });
    });
  },

  /*************************************************************

		@ tab 공통 함수입니다. 
		@ 원하는 페이지에서 호출
		@ ======================================
			uxCommonJs.commTabs({
				elmName : ".tabs",        // 탭 전체
				tabList : ".tabsTitle",   // 탭 제목
				tabIndex : "2",						// 노출시키고 싶은 탭 순서
				tabCont : ".showHide",    // 탭 컨텐츠
				effect  : "fadeIn",    		// 효과(fadeIn, normal)
			});
		@ ======================================

	************************************************************/
  commTabs(option) {
    function Tabs(opt) {
      const tabs = document.querySelector(opt.elmName);
      const navItems = tabs.querySelectorAll(opt.tabList);
      const navIdxNum = opt.tabIndex;
      const navIdx = navIdxNum === "1" || navIdxNum == "" ? "0" : navIdxNum - 1;
      const contentItems = tabs.querySelectorAll(opt.tabCont);
      const effectName = opt.effect?.trim();
      const effect =
        effectName === "normal" || effectName == "" ? "normal" : "fade-in";
      const active = "active";

      let tabId = null;
      let tabList = null;

      const init = (() => {
        navItems[navIdx].parentElement.classList.add(active);
        contentItems[navIdx].classList.add(active, effect);
        navItems.forEach((elm) =>
          elm.addEventListener("click", (e) => eventHandler(e))
        );
      })();

      const eventHandler = (e) => {
        tabList = e.currentTarget.parentElement;
        tabId = e.currentTarget.getAttribute(`data-tab`);
        if (!tabList.classList.contains(active)) {
          removeElm();
          openTab();
          openContent(tabId);
        }
      };

      const openTab = () => {
        tabList.classList.add(active);
      };

      const openContent = (targetId) => {
        contentItems.forEach((elm) => {
          if (targetId === elm.dataset.tab) {
            elm.classList.add(active, effect);
          }
        });
      };

      const removeElm = () => {
        navItems.forEach((elm) => elm.parentElement.classList.remove(active));
        contentItems.forEach((elm) => elm.classList.remove(active, effect));
      };
    }
    const tabs = new Tabs(option);
  },

  /*************************************************************

		@ 테이블 헤더 고정 공통 함수입니다. 

	************************************************************/
  commtFixedHead() {
    const header = document.querySelector(".header");
    if (!header) return;

    const tabs = document.querySelector('[data-fixed-tab="fixedTab"]');
    const table = document.querySelector('[data-fixed-table="fixedTable"]');
    const thead = table?.querySelector("thead");

    let lastScrollTop = 0;

    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const direction = scrollDirection(scrollTop, lastScrollTop);

      if (tabs) {
        const isTabFixed = scrollTop >= tabs.offsetTop && direction !== "up";
        tabs.classList.toggle("fixed", isTabFixed);
      }

      if (table && tabs) {
        table.classList.toggle("fixed", tabs.classList.contains("fixed"));
        if (thead) {
          thead.style.top = tabs.classList.contains("fixed")
            ? `${thead.offsetHeight})`
            : "";
        }
      } else if (table) {
        const isTableFixed = scrollTop >= table.offsetTop && direction !== "up";
        table.classList.toggle("fixed", isTableFixed);
        if (thead) {
          thead.style.top = isTableFixed ? `${thead.offsetHeight})` : "";
        }
      }
      lastScrollTop = scrollTop;
    }, 100);

    window.addEventListener("scroll", handleScroll);
  },
  /*************************************************************
	
		@ 토글버튼 공통 함수입니다. 
		@ 원하는 페이지에서 호출
		@ ======================================
			uxCommonJs.toggleParentBtns([
			{
				btnName : ".prdBtn1",        // 버튼
				parentName : ".prdInfoClass1",   // 토글클래스
			},
			{
				btnName : ".prdBtn2",        // 버튼
				parentName : ".prdInfoClass2",   // 토글클래스
			}
		]);
		@ ======================================
	
	************************************************************/
  toggleParentBtns(options) {
    options.forEach((option) => {
      const toggleParentBtn = document.querySelectorAll(option.btnName);
      if (!toggleParentBtn) return;

      toggleParentBtn.forEach((el) => {
        el.addEventListener("click", function () {
          el.closest(option.parentName).classList.toggle("active");
        });
      });
    });
  },

  /*************************************************************

		@ 공통 셀렉트박스 

	************************************************************/
  initializeCustomSelects(options) {
    const selectName = document.querySelector(`.${options.className}`);
    if (!selectName) return;

    class CustomSelect {
      static instances = [];

      static closeAll(exceptThis = null) {
        CustomSelect.instances.forEach((instance) => {
          if (instance !== exceptThis) {
            instance.toggleOptions(false);
          }
        });
      }

      constructor(selectElement, options) {
        this.selectElement = selectElement;
        this.options = options; // 옵션 객체를 인스턴스에 저장

        this.createCustomSelect();
        this.createOptions();

        // 현재 인스턴스를 CustomSelect의 인스턴스 배열에 추가
        CustomSelect.instances.push(this);
      }

      createCustomSelect() {
        this.customSelect = document.createElement("div");
        this.customSelect.className = `${this.options.className}-visible`;
        this.customSelect.textContent =
          this.selectElement.options[
            this.selectElement.selectedIndex
          ].textContent;

        this.selectElement.after(this.customSelect);

        this.customSelect.addEventListener("click", (event) => {
          event.stopPropagation(); // 클릭 이벤트 전파 중지
          this.toggleOptions();
        });

        this.isOpen = false;
      }

      createOptions() {
        const optionsContainer = document.createElement("ul");
        optionsContainer.className = `${this.options.className}-options`;

        this.selectElement.querySelectorAll("option").forEach((option) => {
          const optionDiv = document.createElement("li");

          optionDiv.textContent = option.textContent;
          optionDiv.addEventListener("click", () =>
            this.handleOptionClick(option)
          );
          optionsContainer.appendChild(optionDiv);

          // 직접입력 체크
          optionDiv.addEventListener("click", selectDirectInput);
        });

        this.customSelect.appendChild(optionsContainer);
        this.optionsContainer = optionsContainer;
      }

      handleOptionClick(option) {
        this.selectElement.value = option.value; // 실제 <select>의 값 변경
        this.customSelect.childNodes[0].nodeValue = option.textContent + " ";
        this.toggleOptions(true);
      }

      toggleOptions(show) {
        const shouldShow = show !== undefined ? show : !this.isOpen;
        this.isOpen = shouldShow;
        this.optionsContainer.classList.toggle("show", shouldShow);
        this.customSelect.classList.toggle("open", shouldShow);
        if (shouldShow) {
          const animationClass =
            this.options.animationStyle === "fade" ? "fade-in" : "slide-in";
          this.optionsContainer.classList.add(animationClass);
          CustomSelect.closeAll(this);
        } else {
          this.optionsContainer.classList.remove("fade-in", "slide-in");
        }
      }
    }

    document.addEventListener("click", () => CustomSelect.closeAll());
    document
      .querySelectorAll(`.${options.className}`)
      .forEach((selectElement) => {
        new CustomSelect(selectElement, options);
      });
  },
};

/*************************************************************

@ uxJoinJs : 로그인,회원가입 전용 함수입니다. 이외에는 추가하지 마시오

************************************************************/
const uxJoinJs = {
  radioBtn() {
    const radioBorderWrap = document.querySelectorAll(".radio-border-wrap");
    if (!radioBorderWrap) return;

    radioBorderWrap.forEach((el) => {
      el.addEventListener("click", function (event) {
        const radioActiveBtn =
          this.closest(".join-type-wrap").querySelector(".radio-wrap.on");
        if (radioActiveBtn) {
          radioActiveBtn.classList.remove("on");
        }
        this.classList.add("on");
      });
    });
  },
};

/*************************************************************

@ uxProductJs : 상품 관려 전용 함수입니다. 이외에는 추가하지 마시오

************************************************************/
const uxProductJs = {
  // 내가 저장한 필터 스와이퍼 : 예시) FUN-FO-01042000
  fillterSwiper() {
    const filterSwiper = document.querySelectorAll(".swiperNav");
    if (!filterSwiper) return;

    filterSwiper.forEach((el) => {
      const swiper = new Swiper(el, {
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
      });
    });
  },
  // 탭 리스트 [ 필터검색, 내 검색 필터 ] toggle 이벤트
  filterSearch() {
    const tabSf = document.querySelector(".sf-tab");
    if (!tabSf) return;
    const tabListItem = document.querySelectorAll(".sf-tab li");
    const tabBoxWrap = document.querySelectorAll(".tab-box-wrap .tab-box");

    tabListItem.forEach((el) => {
      el.addEventListener("click", function (event) {
        if (!this.classList.contains("on")) {
          // tablist on 이벤트
          const hasClassOn = this.closest(".tab-list").querySelector(".on");
          hasClassOn.classList.remove("on");
          this.classList.add("on");

          // tab-contents active 이벤트
          const tabContentsItemActive = Array.from(tabBoxWrap).filter((item) =>
            item.classList.contains("on")
          );
          const tabContentsItemNot = Array.from(tabBoxWrap).filter(
            (item) => !item.classList.contains("on")
          );

          tabContentsItemActive.map((el) => el.classList.remove("on"));
          tabContentsItemNot.map((el) => el.classList.add("on"));
        }
      });
    });
  },
  // 내가 저장한 필터 더보기 버튼
  filterMoreBtn() {
    if (!document.querySelector(".btn-filter-more")) return;
    const filterMoreBtn = document.querySelectorAll(".btn-filter-more");

    filterMoreBtn.forEach((el) => {
      el.addEventListener("click", function (event) {
        el.closest(".filter-more-wrap")
          .querySelector(".filter-more-item")
          .classList.toggle("on");
      });
    });
  },
  //플로팅 필터상세
  floatingMoreBtn() {
    if (!document.querySelector(".f-d-open")) return;
    const floatingMoreBtn = document.querySelectorAll(".f-d-open");

    floatingMoreBtn.forEach((el) => {
      el.addEventListener("click", function (event) {
        el.closest(".filter-detail-wrap").classList.toggle("on");
      });
    });
  },
  // 상품 필터 검색 팝업 - 운용사 더보기 버튼 이벤트
  seeMoreItem() {
    const seeMoreBtn = document.querySelectorAll(".seeMoreBtn");
    if (!seeMoreBtn) return;

    seeMoreBtn.forEach((el) => {
      el.addEventListener("click", function () {
        el.classList.toggle("on");
        el.closest(".company-list").classList.toggle("more");
      });
    });
  },
  // 위험지표 3개 선택시, disabled 효과 : 예시페이지) FUN-FO-03021300
  dangerInfoSelect() {
    const dangerInfoSelect = document.querySelector(".danger-info-modal-wrap");
    if (!dangerInfoSelect) return;

    // 위험지표 선택 체크
    let dangerCounter = true;

    // 기간선택 체크
    let modalCounter = true;

    // 위험지표 선택 및 기간 선택이 true가 되면 버튼이 활성화도 포함
    const dangerItem = dangerInfoSelect.querySelectorAll(".tab-list input");
    dangerItem.forEach((el) => {
      el.addEventListener("change", function () {
        const itemCheck = dangerInfoSelect.querySelectorAll(
          ".tab-list input:checked"
        );
        const disabledItem = this.closest(".tab-list").querySelectorAll(
          "input:not(:checked)"
        );
        if (itemCheck.length == 3) {
          disabledItem.forEach((target) => {
            target.disabled = true;
            dangerCounter = true;
            if (dangerCounter == true && modalCounter == true) {
              btnPrimaryActive();
            }
          });
        } else {
          disabledItem.forEach((target) => {
            target.disabled = false;
            dangerCounter = false;
            btnPrimaryDisabled();
          });
        }
      });
    });

    const modalRadioWrap =
      dangerInfoSelect.querySelectorAll(".radio-wrap input");
    modalRadioWrap.forEach((el) => {
      el.addEventListener("change", function () {
        modalCounter = true;
        if (dangerCounter == true && modalCounter == true) {
          btnPrimaryActive();
        } else {
          btnPrimaryDisabled();
        }
      });
    });

    // 버튼 활성화
    function btnPrimaryActive() {
      dangerInfoSelect
        .querySelector(".modal-footer .btn-primary")
        .classList.remove("disabled");
    }

    // 버튼 비활성화
    function btnPrimaryDisabled() {
      dangerInfoSelect
        .querySelector(".modal-footer .btn-primary")
        .classList.add("disabled");
    }
  },

  // @ 상품리스트 탭 + 테이블 연동
  // @ 페이지에서 함수호출 : uxProductJs.tableToggleEvent()
  tableToggleEvent() {
    const dataClass = document.querySelector('[data-tab-class="mainTab"]');
    if (!dataClass) return;
    const tableMenuToggle = dataClass.querySelectorAll(".tab-list li");

    // table-wrap 클래스를 제외한 나머지 클래스 제거
    const removeClassExcept = (className, el) => {
      let classes = Array.from(el.classList);
      classes.forEach((classItem) => {
        if (!className.includes(classItem)) {
          el.classList.remove(classItem);
        }
      });
    };

    const tableWrap = document.querySelector(".table-wrap");
    tableMenuToggle.forEach((el, index) => {
      let number = index + 1;
      el.addEventListener("click", function (event) {
        event.preventDefault();
        removeClassExcept(
          ["table-wrap", "multi-head", "table-rate"],
          tableWrap
        );
        tableWrap.classList.add("table-active-" + number);
        if (!this.classList.contains("on")) {
          el.closest(".tab-list").querySelector(".on").classList.remove("on");
          this.classList.add("on");
        }
      });
    });
  },

  prdInfoScrollHorizontal() {
    var problemTable = $(".pid-item .scroll-table-wrap.horizontal");
    if (!problemTable) return;

    var numTd = problemTable.find(".scroll-table-body-item .td").length;

    for (var i = 0; i < numTd; i++) {
      var maxHeight = 0;

      problemTable.find(".scroll-table-body-item").each(function () {
        var tdHeight = $(this)
          .find(".td:nth-child(" + (i + 1) + ")")
          .outerHeight();

        if (tdHeight > maxHeight) {
          maxHeight = tdHeight;
        }
      });

      problemTable
        .find(".scroll-table-head .th:nth-child(" + (i + 1) + ")")
        .css("height", maxHeight + "px");
      problemTable
        .find(".scroll-table-body-item .td:nth-child(" + (i + 1) + ")")
        .css("height", maxHeight + "px");
    }
  },

  prdInfoSwipeRcmd() {
    const prdInfoSwipeRcmd = document.querySelectorAll(".prdInfoSwipeRcmd");
    if (!prdInfoSwipeRcmd) return;

    prdInfoSwipeRcmd.forEach((el) => {
      const swiper = new Swiper(el, {
        slidesPerView: 3,
        spaceBetween: 16,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
        scrollbar: {
          el: ".bottom-swiper-scrollbar",
        },
      });
    });
  },

  prdInfoSwipeIvst() {
    const prdInfoSwipeIvst = document.querySelectorAll(".prdInfoSwipeIvst");
    if (!prdInfoSwipeIvst) return;

    prdInfoSwipeIvst.forEach((el) => {
      const swiper = new Swiper(el, {
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
        scrollbar: {
          el: ".bottom-swiper-scrollbar",
        },
      });
    });
  },

  prdInfoSwipeTicker() {
    const prdInfoSwipeTicker = document.querySelector(".prdInfoSwipeTicker");
    if (!prdInfoSwipeTicker) return;

    const pauseBtn = prdInfoSwipeTicker.querySelector(".swiper-button-pause");
    const playBtn = prdInfoSwipeTicker.querySelector(".swiper-button-play");

    let tickerSwiper;

    const toggleBtns = () => {
      if (!tickerSwiper) return;
      if (tickerSwiper.autoplay && tickerSwiper.autoplay.running) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
      } else {
        pauseBtn.style.display = "none";
        playBtn.style.display = "block";
      }
    };

    tickerSwiper = new Swiper(prdInfoSwipeTicker, {
      slidesPerView: "auto",
      spaceBetween: 120,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      speed: 1000,
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      on: {
        slidePrevTransitionStart: function () {
          toggleBtns();
        },
        slideNextTransitionStart: function () {
          toggleBtns();
        },
      },
    });

    pauseBtn.addEventListener("click", function () {
      tickerSwiper.autoplay.stop();
      toggleBtns();
    });

    playBtn.addEventListener("click", function () {
      tickerSwiper.autoplay.start();
      toggleBtns();
    });

    toggleBtns();
  },

  prdInfoPricePopup() {
    const prdInfoPricePopup = document.querySelectorAll(".prd-check-modal");
    if (!prdInfoPricePopup) return;

    const prdInfoPricePopupBtn = document.querySelectorAll(
      ".prdInfoPricePopupBtn"
    );

    prdInfoPricePopupBtn.forEach((el) => {
      el.addEventListener("click", function () {
        const btnParent = el.closest(".modal-body");
        btnParent
          .querySelector(".select-filter-list")
          .classList.toggle("active");
        btnParent
          .querySelector(".select-filter-btn-wrap")
          .classList.toggle("active");
        btnParent
          .querySelector(".scroll-table-body")
          .classList.toggle("active");
      });
    });
  },

  // @ 상품 상세 스크롤 탭 : FUN-FO-03017000
  viewScrollTab() {
    const scrollTab = document.querySelector("[data-scroll-tab='scrollTab']");
    if (!scrollTab) return;

    const tabPosY = scrollTab.getBoundingClientRect().top;
    const screenHeight = scrollTab.offsetHeight;
    let active = "active";

    function initTabs() {
      const tabs = scrollTab.querySelectorAll(".scrollTabs");
      tabs.forEach((tab) => {
        tab.addEventListener("click", scrollToContent);
      });
    }

    function scrollToContent() {
      const contentId = this.getAttribute("data-target");
      const content = document.getElementById(contentId);
      const headerHeight = scrollTab.querySelector(".scrollTabs").offsetHeight;
      const scrollPosition = content.offsetTop - headerHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }

    function observeSections() {
      const observerOptions = {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );
      scrollTab.querySelectorAll(".scrollContent").forEach((section) => {
        observer.observe(section);
      });
    }

    function setActiveTab(sectionId) {
      const tabs = scrollTab.querySelectorAll(".scrollTabs");
      tabs.forEach((tab) => {
        tab.classList.remove(active);
        if (tab.getAttribute("data-target") === sectionId) {
          tab.classList.add(active);
        }
      });
    }

    function tabPosCheck() {
      const scrollTop = window.scrollY;
      const statusGuage = ((scrollTop - tabPosY) / screenHeight) * 100;
      const xBar = document.querySelector("[data-scroll-bar='scrollBar']");

      if (scrollTop >= tabPosY) {
        scrollTab.classList.add(active);
        xBar.style.width = statusGuage + "%";
      } else {
        scrollTab.classList.remove(active);
        xBar.style.width = 0;
      }
    }

    initTabs();
    observeSections();
    window.addEventListener("scroll", tabPosCheck);
  },
};

/*************************************************************

@ uxInvestJs : 투자정보 보기 전용 함수입니다. 이외에는 추가하지 마시오

************************************************************/
const uxInvestJs = {
  investMainSwiper() {
    const investMainSwiper = document.querySelectorAll(".swiperInvestMain");
    if (!investMainSwiper) return;

    investMainSwiper.forEach((el) => {
      const swiper = new Swiper(el, {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          renderFraction: function (currentClass, totalClass) {
            return (
              '<span class="' +
              currentClass +
              '"></span>' +
              '<span class="' +
              totalClass +
              '"></span>'
            );
          },
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
      });
    });
  },
  writerSwiper() {
    const writerSwiper = document.querySelectorAll(".swiperWriter");
    if (!writerSwiper) return;

    writerSwiper.forEach((el) => {
      const swiper = new Swiper(el, {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 3,
        spaceBetween: 20,
      });
    });
  },
  // 상세페이지 - 스크롤 : 예시페이지) FUN-FO-04014100
  scrollPostView() {
    const postViewWrap = document.querySelector(".post-view-wrap");
    if (!postViewWrap) return;

    window.addEventListener("scroll", () => {
      const screenScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const postViewTop =
        postViewWrap.offsetTop + postViewWrap.offsetParent.offsetTop - 96;
      const postViewBottom = postViewTop + postViewWrap.offsetHeight;
      const postViewHeight = parseInt(postViewBottom - postViewTop - 96 - 97);
      const statusPercent = (screenScroll / postViewHeight) * 100 + "%";
      if (screenScroll >= postViewTop) {
        document
          .querySelector(".post-view-title")
          .classList.add("post-view-title-sticky");
        document.querySelector(".header").style.position = "relative";
        document.querySelector(".post-view-title-status-bar").style.width =
          statusPercent;
      } else {
        document
          .querySelector(".post-view-title")
          .classList.remove("post-view-title-sticky");
        document.querySelector(".header").style.position = "fixed";
      }
    });
  },
};

/*************************************************************

@ uxSearchJs : 통합검색 전용 함수입니다. 이외에는 추가하지 마시오

************************************************************/
const uxSearchJs = {
  searchPopupTab() {
    const searchPopupTabWrap = document.querySelector(".searchPopupTab");
    if (!searchPopupTabWrap) return;

    const searchPopupRadioBtns = searchPopupTabWrap.querySelectorAll(
      'input[name="searchSubject"]'
    );
    const productHide = searchPopupTabWrap.querySelectorAll(".productHide");
    const keywordHide = searchPopupTabWrap.querySelectorAll(".keywordHide");
    searchPopupRadioBtns.forEach((radioButton) => {
      radioButton.addEventListener("click", function () {
        const selectedId = this.id;
        if (selectedId == "keyword") {
          productHide.forEach((el) => {
            el.style.display = "block";
          });
          keywordHide.forEach((el) => {
            el.style.display = "none";
          });
        } else if (selectedId == "product") {
          keywordHide.forEach((el) => {
            el.style.display = "flex";
          });
          productHide.forEach((el) => {
            el.style.display = "none";
          });
        }
      });
    });
  },
  // 연관검색노출 더보기 클릭 시 10개씩 보여주기
  relatedMore() {
    const relatedMoreWrap = document.querySelector(".search-result-related");
    if (!relatedMoreWrap) return;

    const moreBtn = document.querySelector(".search-result-related .more");
    const links = document.querySelectorAll(".search-result-related a");

    const toggleLinks = (start, end, display) => {
      for (let i = start; i < end; i++) {
        links[i].style.display = display;
      }
    };

    let start = 0;
    let end = Math.min(links.length, start + 10);

    moreBtn.addEventListener("click", function () {
      start = end;
      end = Math.min(links.length, start + 10);
      toggleLinks(start, end, "inline");
      if (end >= links.length) {
        moreBtn.style.display = "none";
      }
    });
  },
};

/*************************************************************

@ uxChartJS : 차트
@ 페이지에서 함수호출 : uxChartJS.productTreeMap(json)

************************************************************/
const uxChartJS = (function () {
  // 차트 : 트리맵 형
  const treeMap = (_data) => {
    if (!document.querySelector(".treemap-chart")) return;

    /* 수익률 범위 */
    function getColor(value) {
      if (value >= 10) return { background: "#fe6060", color: "#fff" };
      else if (value >= 5) return { background: "#ff8585", color: "#fff" };
      else if (value >= 3) return { background: "#ffa598", color: "#000" };
      else if (value >= 1) return { background: "#fbcbc1", color: "#000" };
      else if (value >= 0.5) return { background: "#f5ddd0", color: "#000" };
      else if (value >= 0) return { background: "#d7e2eb", color: "#000" };
      else if (value >= -0.5) return { background: "#cfeddd", color: "#000" };
      else if (value >= -1) return { background: "#aeddce", color: "#000" };
      else if (value >= -3) return { background: "#78b4df", color: "#000" };
      else if (value >= -5) return { background: "#6481cc", color: "#fff" };
      else if (value >= -10) return { background: "#485fb4", color: "#fff" };

      return { background: "#485fb4", color: "#000" };
    }

    function createTreemap(chartId, data) {
      // am4core.useTheme(am4themes_animated);

      const chart = am4core.create(chartId, am4charts.TreeMap);
      chart.data = data;

      chart.colors.step = 2;
      chart.padding(0, 0, 0, 0);

      /* Define data fields */
      chart.dataFields.value = "value";
      chart.dataFields.oneValue = "oneValue";
      chart.dataFields.name = "name";
      chart.dataFields.children = "children";

      const level1 = chart.seriesTemplates.create("0");
      const level1_column = level1.columns.template;
      level1_column.fillOpacity = 1;
      level1_column.strokeOpacity = 1;

      const level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
      level1_bullet.locationY = 0.5;
      level1_bullet.locationX = 0.5;
      level1_bullet.label.text = "{name}";

      level1_bullet.label.adapter.add("fill", function (fill, target) {
        const dataItem = target.dataItem;
        if (dataItem) {
          const colorInfo = getColor(dataItem.value);
          return am4core.color(colorInfo.color); // 여기서 커스텀 텍스트 색상 적용
        }
        return fill;
      });

      /* 
				column bg color 
				applyShadow : TURE에만 DropShadowFilter 적용
			*/
      level1_column.events.on("inited", function (event) {
        const dataItem = event.target.dataItem;
        const dataValue = dataItem.value;
        const bgColor = getColor(dataValue).background;
        const fColor = getColor(dataValue).color;

        if (dataItem && dataItem.dataContext.dataContext.applyShadow) {
          const shadow = new am4core.DropShadowFilter();
          shadow.dx = 0;
          shadow.dy = 0;
          shadow.blur = 5;
          shadow.opacity = 0.5;
          event.target.filters.push(shadow);

          // 상, 우, 하, 좌 여백 설정
          event.target.column.padding(4, 4, 4, 4);

          // 박스 테두리
          event.target.strokeWidth = 8;
          event.target.stroke = am4core.color(bgColor).lighten(-0.2);
        }

        // 배경컬러 적용
        dataItem.column.fill = am4core.color(bgColor);
      });

      // tooltip
      level1.tooltip.animationDuration = 300;
      level1.strokeOpacity = 1;

      // tooltip 포지션
      level1.tooltip.pointerOrientation = "vertical";
      level1.tooltip.position = "top";
      level1.tooltip.dy = -18;

      // tooltip 커스텀
      level1.tooltipHTML = `
				<div class="treemap-chart-tooltip">
					<div class="title">{name}</div>
					<div class="info"><span class="desc">보유비중</span> <span class="percent">{value}%</span></div>
					<div class="info"><span class="desc">1주 수익률</span> <span class="percent">{oneValue}%</span></div>
				</div>
				`;

      // tooltip BG
      level1.alwaysShowTooltip = "always";
      level1.tooltip.getFillFromObject = false;
      level1.tooltip.background.fill = am4core.color("#fff");
      level1.tooltip.background.fillOpacity = 1;
    }

    _data.forEach((jsonData) => {
      createTreemap(jsonData.id, jsonData.children);
    });
  };

  // 차트 : ETF 수익률
  const lineChartGradient = (id, lineData) => {
    function createLineChart(id, data) {
      // 기본 설정
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create(id, am4charts.XYChart);
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      let series = null;
      let iconStar = "../../static/images/svg/icon_star.svg";
      let iconZoom = "../../static/images/svg/icon_zoom.svg";

      // 날짜 데이터 추출
      const dates = data[0].date;

      // 시리즈 데이터 추출
      const seriesData = data[1];

      // 차트 데이터 생성
      const chartData = dates.map((date, index) => {
        const dataPoint = { date: new Date(date) };
        Object.keys(seriesData).forEach((seriesKey) => {
          const series = seriesData[seriesKey][0];
          dataPoint[seriesKey] = series.value[index];
          // specialDay를 직접 데이터 포인트에 포함
          dataPoint[`${seriesKey}SpecialDay`] = series.specialDay[index];
          dataPoint[`${seriesKey}SpecialDayMsg`] = series.specialDay[index];
        });
        return dataPoint;
      });

      chart.data = chartData;

      // 차트공통 스타일
      function chartCommon() {
        chart.padding(0, 40, 40, 40);

        // zoom버튼
        chart.zoomOutButton.icon.disabled = true; // 줌 기본아이콘 제거
        chart.zoomOutButton.background.fill = am4core.color(
          "rgba(35, 36, 51, 0.6)"
        ); // 배경색
        chart.zoomOutButton.background.states.getKey("hover").properties.fill =
          am4core.color("rgba(35, 36, 51, 1)"); // 마우스 오버시 색상
        chart.zoomOutButton.background.states.getKey("down").properties.fill =
          am4core.color("rgba(35, 36, 51, 1)"); // 마우스 다운시 색상

        chart.zoomOutButton.valign = "bottom";
        chart.zoomOutButton.marginRight = 10;
        chart.zoomOutButton.marginBottom = 10;
        chart.zoomOutButton.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일
        const zoomImage = chart.zoomOutButton.createChild(am4core.Image);
        zoomImage.href = iconZoom;
        zoomImage.width = 16;
        zoomImage.height = 16;
        zoomImage.interactionsEnabled = false;
      }

      // 날짜 형식
      function setDateFormat() {
        // day
        dateAxis.dateFormats.setKey("day", "yy.MM.dd");
        dateAxis.periodChangeDateFormats.setKey("day", "yy.MM.dd");
      }

      // x축 설정
      function setDateAxis() {
        dateAxis.renderer.minGridDistance = 50; // 날짜 레이블 간격 조정
        dateAxis.renderer.baseGrid.disabled = true;
        dateAxis.renderer.grid.template.strokeOpacity = 0;
        dateAxis.renderer.labels.template.fill = am4core.color("#71747c");
        dateAxis.renderer.labels.template.fontSize = 14;

        // x축라벨 위치
        dateAxis.renderer.maxLabelPosition = 1;
        dateAxis.renderer.labels.template.dx = 0;
        dateAxis.renderer.labels.template.dy = 0;

        dateAxis.startLocation = 0.2; // X축의 시작점을 약간 오른쪽으로 이동
        dateAxis.endLocation = 0; // X축의 끝점을 약간 왼쪽으로 이동

        // x축 하단 세로바
        dateAxis.renderer.ticks.template.disabled = false;
        dateAxis.renderer.ticks.template.strokeOpacity = 1;
        dateAxis.renderer.ticks.template.stroke = am4core.color("#D4D8E2");
        dateAxis.renderer.ticks.template.strokeWidth = 1;
        dateAxis.renderer.ticks.template.length = 8;

        dateAxis.renderer.line.strokeOpacity = 1;
        dateAxis.renderer.line.strokeWidth = 1;
        dateAxis.renderer.line.stroke = am4core.color("#D4D8E2");

        dateAxis.tooltip.disabled = true; // 축툴팁 감추기
      }

      // y축 설정
      function setValueAxis() {
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.grid.template.strokeOpacity = 1;
        valueAxis.renderer.grid.template.strokeDasharray = 3;
        valueAxis.renderer.grid.template.stroke = am4core.color("#D4D8E2");
        valueAxis.renderer.labels.template.fill = am4core.color("#71747c");
        valueAxis.renderer.labels.template.fontSize = 14;
        // valueAxis.renderer.labels.template.location = 100; // 축 중앙에 위치

        // y축라벨 위치 내부로 이동
        valueAxis.renderer.inside = true;
        valueAxis.renderer.maxLabelPosition = 0.99;
        valueAxis.renderer.labels.template.dx = -10;
        valueAxis.renderer.labels.template.dy = -15;

        valueAxis.tooltip.disabled = true; // 축툴팁 감추기
      }

      // 커서 설정
      function cursorHandler() {
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.disabled = true;
        chart.cursor.maxTooltipDistance = -1;

        // 드래그하여 X축과 Y축 모두에서 줌 가능하게 설정
        chart.cursor.behavior = "zoomXY";
      }

      // 특정일 구하기
      function findSpecialDayDates(dates, specialDays) {
        const specialDates = dates.filter((date, index) => specialDays[index]);
        return specialDates;
      }

      function findSpecialDayMessage(specialDays) {
        const specialDates = specialDays.filter((msg, index) => msg[index]);
        return specialDates;
      }

      // 시리즈 관리 객체
      const seriesManager = {
        seriesMap: {},
        seriesCounter: 6, // 초기 시리즈 개수를 6개로 설정
        maxSeries: 9,

        addSeriesToChart: function (seriesKey, seriesInfo) {
          if (!this.seriesMap[seriesKey]) {
            const specialDates = findSpecialDayDates(
              dates,
              seriesInfo.specialDay
            );
            const specialDatesMsg = findSpecialDayMessage(
              seriesInfo.specialDay
            );
            series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = seriesKey;
            series.dataFields.dateX = "date";
            series.name = seriesInfo.name;
            series.specialMsg = specialDatesMsg;

            // 라인, 그라데이션 스타일
            setLineGradientStyle(seriesKey, seriesInfo);

            // 기본 블릿 스타일
            setNormalBulletStyle(seriesKey, seriesInfo);

            // 툴팁 스타일
            setTooltipStyle();

            // 특정일 표시
            if (seriesKey === "series1") {
              makeStarBullet(specialDates);
            }

            // 각 시리즈에 공통 툴팁 설정
            chart.series.each(function (series) {
              series.adapter.add(
                "tooltipHTML",
                function (currentTooltip, target) {
                  // 현재 데이터 포인트의 날짜를 얻습니다.
                  const dataItem = target.tooltipDataItem;
                  if (dataItem) {
                    return createCommonTooltipHTML(dataItem.dateX, series);
                  }
                  return currentTooltip;
                }
              );
            });

            // 시리즈를 맵에 저장
            this.seriesMap[seriesKey] = series;
          }
        },

        removeSeriesFromChart: function (seriesKey) {
          if (this.seriesMap[seriesKey]) {
            chart.series
              .removeIndex(chart.series.indexOf(this.seriesMap[seriesKey]))
              .dispose();
            delete this.seriesMap[seriesKey];

            // 체크박스 제거
            const checkboxId = `legend-checkbox-${seriesKey}`;
            const checkboxContainer = document.querySelector(
              `#linechart-chkbox-item[data-series-key="${seriesKey}"]`
            );
            if (checkboxContainer) {
              checkboxContainer.remove();
            }

            // 여기서 6은 기본 시리즈 개수입니다.
            if (this.seriesCounter > 6) {
              this.seriesCounter--;
            }
          }
        },

        toggleSeries: function (seriesKey, isChecked, seriesInfo) {
          if (isChecked) {
            this.addSeriesToChart(seriesKey, seriesInfo);
          } else {
            this.removeSeriesFromChart(seriesKey);
          }
        },
      };

      // 각 시리즈별 툴팁 생성
      const createCommonTooltipHTML = (date, targetSeries) => {
        let tooltipHTML = "<div class='lineTooltip'><ul>";
        tooltipHTML += "<li>{date}</li>"; // 날짜 행 추가

        let specialMessage = "";

        // 데이터 아이템 순회
        targetSeries.dataItems.each((dataItem) => {
          if (dataItem.dateX.getTime() === date.getTime()) {
            specialMessage =
              dataItem.dataContext[
                `${targetSeries.dataFields.valueY}SpecialDayMsg`
              ];
          }
        });

        // 활성화된 시리즈의 데이터를 포함
        // 활성화된 모든 시리즈의 데이터를 포함
        chart.series.each(function (series, index) {
          if (!series.hidden) {
            const seriesName = series.name || "Unknown Series";
            const valueKey = series.dataFields.valueY;

            tooltipHTML += `<li class=${valueKey}><span>${seriesName}</span> : <strong>{${valueKey}}%</strong></li>`;
          }
        });

        tooltipHTML += "</ul>";

        // 특별한 날짜에 해당하는 메시지가 있을 경우 툴팁에 추가
        if (specialMessage) {
          tooltipHTML += `<article class=lineTooltip-msg><strong>${specialMessage}</strong></article>`;
        }
        tooltipHTML += "</div>";
        return tooltipHTML;
      };

      // 툴팁 스타일
      const setTooltipStyle = () => {
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(
          "rgba(0, 64, 150, 0.95)"
        );
        // 툴팁 가이드 라인 설정
        series.tooltip.label.minWidth = 120; // 툴팁의 최소 너비 설정
        series.tooltip.label.minHeight = 50; // 툴팁의 최소 높이 설정
        series.tooltip.label.fontSize = 13; // 툴팁 내 텍스트의 폰트 크기
        series.tooltip.pointerOrientation = "horizontal"; // 툴팁 방향

        // 가이드 라인 스타일 설정
        series.tooltip.background.strokeWidth = 0; // 가이드 라인 두께
        series.tooltip.background.strokeOpacity = 0; // 가이드 라인 투명도
        series.tooltip.background.pointerLength = 6; // 화살표 크기
      };

      // 기본 블릿 만들기
      const setNormalBulletStyle = (seriesKey, seriesInfo) => {
        const bullet = series.bullets.push(new am4charts.CircleBullet());
        const circle = bullet.createChild(am4core.Circle);
        const circleHover = bullet.states.create("hover");

        bullet.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일
        bullet.properties.scale = 0; // 기본블릿 스케일
        circleHover.properties.scale = 1; // 기본블릿 마우스 오버 스케일

        // 기본블릿 스타일
        circle.width = 16;
        circle.height = 16;
        circle.strokeWidth = 10;
        circle.strokeOpacity = 0.2;
        circle.stroke = am4core.color(seriesInfo.color[0].line).lighten(0.2);
        circle.fill = am4core.color(seriesInfo.color[0].line);

        // 기본 블릿 클릭
        bullet.events.on("hit", function (event) {
          bulletEventHandler(event);
        });
      };

      // 라인, 그라데이션
      const setLineGradientStyle = (seriesKey, seriesInfo) => {
        // 라인 색상
        series.stroke = am4core.color(seriesInfo.color[0].line);

        // 그라데이션 색상 설정
        let gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color(seriesInfo.color[0].start), 1);
        gradient.addColor(am4core.color(seriesInfo.color[0].end), 0);
        gradient.rotation = 90;

        series.fill = gradient; // 그라데이션 배경적용
        series.fillOpacity = 0.7; // 그라데이션 투명도 설정
        series.strokeWidth = 2; // 라인두께
        series.tensionX = 0.8; // 곡선 각도
      };

      // 별모양 만들기
      const makeStarBullet = (specialDates) => {
        let starBullet = series.bullets.push(new am4charts.Bullet());
        starBullet.propertyFields.disabled = "disabled"; // 'disabled' 필드를 기반으로 블릿의 활성화/비활성화 결정
        let starImg = starBullet.createChild(am4core.Image);
        starImg.href = iconStar;
        starImg.width = 24;
        starImg.height = 24;
        starImg.horizontalCenter = "middle";
        starImg.verticalCenter = "middle";
        starImg.nonScaling = true;
        starImg.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일

        const specialDatesFormatted = specialDates.map(
          (date) => new Date(date)
        );

        chart.data.forEach((item, index) => {
          // specialDatesFormatted 배열에서 일치하는 날짜를 찾습니다.
          let resultDate = (item.disabled = !specialDatesFormatted.some(
            (specialDate) =>
              specialDate.getDate() === item.date.getDate() &&
              specialDate.getMonth() === item.date.getMonth() &&
              specialDate.getFullYear() === item.date.getFullYear()
          ));
        });

        // 이미지 블릿 클릭
        starImg.events.on("hit", function (event) {
          // 선택된 날짜 정보 가져오기
          bulletEventHandler(event);
        });
      };

      // 체크박스 생성 함수
      const createCheckbox = (seriesKey, index) => {
        const checkboxId = `legend-checkbox-${seriesKey}`;
        const input = document.createElement("input");
        const seriesInfo = seriesData[seriesKey][0];

        input.type = "checkbox";
        input.id = checkboxId;

        // 초기에 생성할 때 시리즈 카운터와 비교
        input.checked = index <= seriesManager.seriesCounter;
        input.onchange = () => {
          if (input.checked) {
            seriesManager.addSeriesToChart(seriesKey, seriesInfo);
          } else {
            seriesManager.removeSeriesFromChart(seriesKey);
          }
        };

        const label = document.createElement("label");
        const button = document.createElement("button");
        const container = document.createElement("div");

        label.htmlFor = checkboxId;
        label.textContent = seriesInfo.name;

        button.setAttribute("type", "button");
        button.textContent = "닫기";

        container.setAttribute("class", "linechart-chkbox-item");
        container.appendChild(input);
        container.appendChild(label);

        // 닫기버튼 생성 및 이벤트 핸들러 추가
        if (index >= 7) {
          container.setAttribute("data-series-key", seriesKey);

          button.onclick = () => {
            seriesManager.removeSeriesFromChart(seriesKey);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
          };
          container.appendChild(button);
        }
        document.getElementById("chartLegend").appendChild(container);
      };

      // 시리즈 번호 증가
      const increaseGarph = () => {
        // 현재 활성화된 시리즈 수를 카운트합니다.
        let activeSeriesCount = Object.keys(seriesManager.seriesMap).length;
        seriesManager.seriesCounter = Math.max(
          seriesManager.seriesCounter,
          activeSeriesCount
        );

        if (seriesManager.seriesCounter < seriesManager.maxSeries) {
          seriesManager.seriesCounter++;
          const seriesIndex = seriesManager.seriesCounter; // 시리즈 배열 인덱스 조정
          const seriesKey = Object.keys(seriesData)[seriesIndex - 1]; // 시리즈 키
          const seriesInfo = seriesData[seriesKey][0]; // 시리즈 정보 매핑에서 시리즈 정보 가져오기

          seriesManager.toggleSeries(seriesKey, true, seriesInfo);

          // createCheckbox 호출
          createCheckbox(seriesKey, seriesManager.seriesCounter);
        } else {
          return false;
        }
      };

      // 초기화
      const initializeLegendAndSeries = () => {
        for (let i = 1; i <= seriesManager.seriesCounter; i++) {
          const seriesKey = Object.keys(seriesData)[i - 1];
          const seriesInfo = seriesData[seriesKey][0];

          seriesManager.addSeriesToChart(seriesKey, seriesInfo);
          createCheckbox(seriesKey, i);
        }

        chartCommon();
        setDateFormat();
        cursorHandler();
        setDateAxis();
        setValueAxis();
      };

      // 이벤트 핸들러
      const addBtn = document.querySelector(
        '[data-product-id="addSeriesButton"]'
      );
      const btnClose = document.querySelector(
        '[data-tooltip-close="btnClose"]'
      );
      addBtn.addEventListener("click", increaseGarph);
      btnClose.addEventListener("click", () => {
        btnClose.parentElement.style.display = "none";
      });

      initializeLegendAndSeries();
    }

    // 외부 핸들링 함수
    const bulletEventHandler = (e) => {
      if (e.target.className === "Image") {
        changeNews(e);
      } else {
        changeDownload(e);
      }
    };

    // 별 클릭
    const changeNews = (e) => {
      console.log("별 클릭!", e.target.className);

      const chartMsg = document.querySelector('[data-topic-news="chartMsg"]');
      chartMsg.classList.toggle("active");
    };

    // 기본 블릿 클릭
    const changeDownload = (e) => {
      console.log(
        "기본 블릿!",
        e.target.dataItem.dateX + ": " + e.target.dataItem.valueY
      );

      const btnDown = document.querySelector('[data-topic-pdf="download"]');
      btnDown.classList.add("active");
    };

    createLineChart(id, lineData);
  };

  // 차트 : 펀드 수익률
  const lineChartGradientFund = (id, lineData) => {
    function createLineChart(id, data) {
      // 기본 설정
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create(id, am4charts.XYChart);
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      let series = null;
      let iconStar = "../../static/images/svg/icon_star.svg";
      let iconZoom = "../../static/images/svg/icon_zoom.svg";

      // 날짜 데이터 추출
      const dates = data[0].date;

      // 시리즈 데이터 추출
      const seriesData = data[1];

      // 차트 데이터 생성
      const chartData = dates.map((date, index) => {
        const dataPoint = { date: new Date(date) };
        Object.keys(seriesData).forEach((seriesKey) => {
          const series = seriesData[seriesKey][0];
          dataPoint[seriesKey] = series.value[index];
          // specialDay를 직접 데이터 포인트에 포함
          dataPoint[`${seriesKey}SpecialDay`] = series.specialDay[index];
          dataPoint[`${seriesKey}SpecialDayMsg`] = series.specialDay[index];
        });
        return dataPoint;
      });

      chart.data = chartData;

      // 차트공통 스타일
      function chartCommon() {
        chart.padding(0, 40, 0, 40);

        // zoom버튼
        chart.zoomOutButton.icon.disabled = true; // 줌 기본아이콘 제거
        chart.zoomOutButton.background.fill = am4core.color(
          "rgba(35, 36, 51, 0.6)"
        ); // 배경색
        chart.zoomOutButton.background.states.getKey("hover").properties.fill =
          am4core.color("rgba(35, 36, 51, 1)"); // 마우스 오버시 색상
        chart.zoomOutButton.background.states.getKey("down").properties.fill =
          am4core.color("rgba(35, 36, 51, 1)"); // 마우스 다운시 색상

        chart.zoomOutButton.valign = "bottom";
        chart.zoomOutButton.marginRight = 10;
        chart.zoomOutButton.marginBottom = 10;
        chart.zoomOutButton.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일
        const zoomImage = chart.zoomOutButton.createChild(am4core.Image);
        zoomImage.href = iconZoom;
        zoomImage.width = 16;
        zoomImage.height = 16;
        zoomImage.interactionsEnabled = false;
      }

      // 날짜 형식
      function setDateFormat() {
        // day
        dateAxis.dateFormats.setKey("day", "yy.MM.dd");
        dateAxis.periodChangeDateFormats.setKey("day", "yy.MM.dd");
      }

      // x축 설정
      function setDateAxis() {
        dateAxis.renderer.minGridDistance = 50; // 날짜 레이블 간격 조정
        dateAxis.renderer.baseGrid.disabled = true;
        dateAxis.renderer.grid.template.strokeOpacity = 0;
        dateAxis.renderer.labels.template.fill = am4core.color("#71747c");
        dateAxis.renderer.labels.template.fontSize = 14;

        // x축라벨 위치
        dateAxis.renderer.maxLabelPosition = 1;
        dateAxis.renderer.labels.template.dx = 0;
        dateAxis.renderer.labels.template.dy = 0;

        dateAxis.startLocation = 0.2; // X축의 시작점을 약간 오른쪽으로 이동
        dateAxis.endLocation = 0; // X축의 끝점을 약간 왼쪽으로 이동

        // x축 하단 세로바
        dateAxis.renderer.ticks.template.disabled = false;
        dateAxis.renderer.ticks.template.strokeOpacity = 1;
        dateAxis.renderer.ticks.template.stroke = am4core.color("#D4D8E2");
        dateAxis.renderer.ticks.template.strokeWidth = 1;
        dateAxis.renderer.ticks.template.length = 8;

        dateAxis.renderer.line.strokeOpacity = 1;
        dateAxis.renderer.line.strokeWidth = 1;
        dateAxis.renderer.line.stroke = am4core.color("#D4D8E2");

        dateAxis.tooltip.disabled = true; // 축툴팁 감추기
      }

      // y축 설정
      function setValueAxis() {
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.grid.template.strokeOpacity = 1;
        valueAxis.renderer.grid.template.strokeDasharray = 3;
        valueAxis.renderer.grid.template.stroke = am4core.color("#D4D8E2");
        valueAxis.renderer.labels.template.fill = am4core.color("#71747c");
        valueAxis.renderer.labels.template.fontSize = 14;
        // valueAxis.renderer.labels.template.location = 100; // 축 중앙에 위치

        // y축라벨 위치 내부로 이동
        valueAxis.renderer.inside = true;
        valueAxis.renderer.maxLabelPosition = 0.99;
        valueAxis.renderer.labels.template.dx = -10;
        valueAxis.renderer.labels.template.dy = -15;

        valueAxis.tooltip.disabled = true; // 축툴팁 감추기
      }

      // 커서 설정
      function cursorHandler() {
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.disabled = true;
        chart.cursor.maxTooltipDistance = -1;

        // 드래그하여 X축과 Y축 모두에서 줌 가능하게 설정
        chart.cursor.behavior = "zoomXY";
      }

      // 특정일 구하기
      function findSpecialDayDates(dates, specialDays) {
        const specialDates = dates.filter((date, index) => specialDays[index]);
        return specialDates;
      }

      function findSpecialDayMessage(specialDays) {
        const specialDates = specialDays.filter((msg, index) => msg[index]);
        return specialDates;
      }

      // 시리즈 관리 객체
      const seriesManager = {
        seriesMap: {},
        seriesCounter: 3, // 초기 시리즈 개수를 3개로 설정
        maxSeries: 6,

        addSeriesToChart: function (seriesKey, seriesInfo) {
          if (!this.seriesMap[seriesKey]) {
            const specialDates = findSpecialDayDates(
              dates,
              seriesInfo.specialDay
            );
            const specialDatesMsg = findSpecialDayMessage(
              seriesInfo.specialDay
            );
            series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = seriesKey;
            series.dataFields.dateX = "date";
            series.name = seriesInfo.name;
            series.specialMsg = specialDatesMsg;

            // 라인, 그라데이션 스타일
            setLineGradientStyle(seriesKey, seriesInfo);

            // 기본 블릿 스타일
            setNormalBulletStyle(seriesKey, seriesInfo);

            // 툴팁 스타일
            setTooltipStyle();

            // 특정일 표시
            if (seriesKey === "series1") {
              makeStarBullet(specialDates);
            }

            // 각 시리즈에 공통 툴팁 설정
            chart.series.each(function (series) {
              series.adapter.add(
                "tooltipHTML",
                function (currentTooltip, target) {
                  // 현재 데이터 포인트의 날짜를 얻습니다.
                  const dataItem = target.tooltipDataItem;
                  if (dataItem) {
                    return createCommonTooltipHTML(dataItem.dateX, series);
                  }
                  return currentTooltip;
                }
              );
            });

            // 시리즈를 맵에 저장
            this.seriesMap[seriesKey] = series;
          }
        },

        removeSeriesFromChart: function (seriesKey) {
          if (this.seriesMap[seriesKey]) {
            chart.series
              .removeIndex(chart.series.indexOf(this.seriesMap[seriesKey]))
              .dispose();
            delete this.seriesMap[seriesKey];

            // 체크박스 제거
            const checkboxId = `legend-checkbox-${seriesKey}`;
            const checkboxContainer = document.querySelector(
              `#linechart-chkbox-item[data-series-key="${seriesKey}"]`
            );
            if (checkboxContainer) {
              checkboxContainer.remove();
            }

            // 여기서 6은 기본 시리즈 개수입니다.
            if (this.seriesCounter > 3) {
              this.seriesCounter--;
            }
          }
        },

        toggleSeries: function (seriesKey, isChecked, seriesInfo) {
          if (isChecked) {
            this.addSeriesToChart(seriesKey, seriesInfo);
          } else {
            this.removeSeriesFromChart(seriesKey);
          }
        },
      };

      // 각 시리즈별 툴팁 생성
      const createCommonTooltipHTML = (date, targetSeries) => {
        let tooltipHTML = "<div class='lineTooltip'><ul>";
        tooltipHTML += "<li>{date}</li>"; // 날짜 행 추가

        let specialMessage = "";

        // 데이터 아이템 순회
        targetSeries.dataItems.each((dataItem) => {
          if (dataItem.dateX.getTime() === date.getTime()) {
            specialMessage =
              dataItem.dataContext[
                `${targetSeries.dataFields.valueY}SpecialDayMsg`
              ];
          }
        });

        // 활성화된 시리즈의 데이터를 포함
        // 활성화된 모든 시리즈의 데이터를 포함
        chart.series.each(function (series, index) {
          if (!series.hidden) {
            const seriesName = series.name || "Unknown Series";
            const valueKey = series.dataFields.valueY;

            tooltipHTML += `<li class=${valueKey}><span>${seriesName}</span> : <strong>{${valueKey}}%</strong></li>`;
          }
        });

        tooltipHTML += "</ul>";

        // 특별한 날짜에 해당하는 메시지가 있을 경우 툴팁에 추가
        if (specialMessage) {
          tooltipHTML += `<article class=lineTooltip-msg><strong>${specialMessage}</strong></article>`;
        }
        tooltipHTML += "</div>";
        return tooltipHTML;
      };

      // 툴팁 스타일
      const setTooltipStyle = () => {
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(
          "rgba(0, 64, 150, 0.95)"
        );
        // 툴팁 가이드 라인 설정
        series.tooltip.label.minWidth = 120; // 툴팁의 최소 너비 설정
        series.tooltip.label.minHeight = 50; // 툴팁의 최소 높이 설정
        series.tooltip.label.fontSize = 13; // 툴팁 내 텍스트의 폰트 크기
        series.tooltip.pointerOrientation = "horizontal"; // 툴팁 방향

        // 가이드 라인 스타일 설정
        series.tooltip.background.strokeWidth = 0; // 가이드 라인 두께
        series.tooltip.background.strokeOpacity = 0; // 가이드 라인 투명도
        series.tooltip.background.pointerLength = 6; // 화살표 크기
      };

      // 기본 블릿 만들기
      const setNormalBulletStyle = (seriesKey, seriesInfo) => {
        const bullet = series.bullets.push(new am4charts.CircleBullet());
        const circle = bullet.createChild(am4core.Circle);
        const circleHover = bullet.states.create("hover");

        bullet.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일
        bullet.properties.scale = 0; // 기본블릿 스케일
        circleHover.properties.scale = 1; // 기본블릿 마우스 오버 스케일

        // 기본블릿 스타일
        circle.width = 16;
        circle.height = 16;
        circle.strokeWidth = 10;
        circle.strokeOpacity = 0.2;
        circle.stroke = am4core.color(seriesInfo.color[0].line).lighten(0.2);
        circle.fill = am4core.color(seriesInfo.color[0].line);

        // 기본 블릿 클릭
        // bullet.events.on("hit", function (event) {
        // 	bulletEventHandler(event);
        // });
      };

      // 라인, 그라데이션
      const setLineGradientStyle = (seriesKey, seriesInfo) => {
        // 라인 색상
        series.stroke = am4core.color(seriesInfo.color[0].line);

        // 그라데이션 색상 설정
        let gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color(seriesInfo.color[0].start), 1);
        gradient.addColor(am4core.color(seriesInfo.color[0].end), 0);
        gradient.rotation = 90;

        series.fill = gradient; // 그라데이션 배경적용
        series.fillOpacity = 0.7; // 그라데이션 투명도 설정
        series.strokeWidth = 2; // 라인두께
        series.tensionX = 0.8; // 곡선 각도
      };

      // 별모양 만들기
      const makeStarBullet = (specialDates) => {
        let starBullet = series.bullets.push(new am4charts.Bullet());
        starBullet.propertyFields.disabled = "disabled"; // 'disabled' 필드를 기반으로 블릿의 활성화/비활성화 결정
        let starImg = starBullet.createChild(am4core.Image);
        starImg.href = iconStar;
        starImg.width = 24;
        starImg.height = 24;
        starImg.horizontalCenter = "middle";
        starImg.verticalCenter = "middle";
        starImg.nonScaling = true;
        starImg.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일

        const specialDatesFormatted = specialDates.map(
          (date) => new Date(date)
        );

        chart.data.forEach((item, index) => {
          // specialDatesFormatted 배열에서 일치하는 날짜를 찾습니다.
          let resultDate = (item.disabled = !specialDatesFormatted.some(
            (specialDate) =>
              specialDate.getDate() === item.date.getDate() &&
              specialDate.getMonth() === item.date.getMonth() &&
              specialDate.getFullYear() === item.date.getFullYear()
          ));
        });

        // 이미지 블릿 클릭
        starImg.events.on("hit", function (event) {
          // 선택된 날짜 정보 가져오기
          bulletEventHandler(event);
        });
      };

      // 체크박스 생성 함수
      const createCheckbox = (seriesKey, index) => {
        const checkboxId = `legend-checkbox-${seriesKey}`;
        const input = document.createElement("input");
        const seriesInfo = seriesData[seriesKey][0];

        input.type = "checkbox";
        input.id = checkboxId;

        // 초기에 생성할 때 시리즈 카운터와 비교
        input.checked = index <= seriesManager.seriesCounter;
        input.onchange = () => {
          if (input.checked) {
            seriesManager.addSeriesToChart(seriesKey, seriesInfo);
          } else {
            seriesManager.removeSeriesFromChart(seriesKey);
          }
        };

        const label = document.createElement("label");
        const button = document.createElement("button");
        const container = document.createElement("div");

        label.htmlFor = checkboxId;
        label.textContent = seriesInfo.name;

        button.setAttribute("type", "button");
        button.textContent = "닫기";

        container.setAttribute("class", "linechart-fund-chkbox-item");
        container.appendChild(input);
        container.appendChild(label);

        // 닫기버튼 생성 및 이벤트 핸들러 추가
        if (index >= 4) {
          container.setAttribute("data-series-key", seriesKey);

          button.onclick = () => {
            seriesManager.removeSeriesFromChart(seriesKey);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
          };
          container.appendChild(button);
        }
        document.getElementById("chartLegend").appendChild(container);
      };

      // 시리즈 번호 증가
      const increaseGarph = () => {
        // 현재 활성화된 시리즈 수를 카운트합니다.
        let activeSeriesCount = Object.keys(seriesManager.seriesMap).length;
        seriesManager.seriesCounter = Math.max(
          seriesManager.seriesCounter,
          activeSeriesCount
        );

        if (seriesManager.seriesCounter < seriesManager.maxSeries) {
          seriesManager.seriesCounter++;
          const seriesIndex = seriesManager.seriesCounter; // 시리즈 배열 인덱스 조정
          const seriesKey = Object.keys(seriesData)[seriesIndex - 1]; // 시리즈 키
          const seriesInfo = seriesData[seriesKey][0]; // 시리즈 정보 매핑에서 시리즈 정보 가져오기

          seriesManager.toggleSeries(seriesKey, true, seriesInfo);

          // createCheckbox 호출
          createCheckbox(seriesKey, seriesManager.seriesCounter);
        } else {
          return false;
        }
      };

      // 초기화
      const initializeLegendAndSeries = () => {
        for (let i = 1; i <= seriesManager.seriesCounter; i++) {
          const seriesKey = Object.keys(seriesData)[i - 1];
          const seriesInfo = seriesData[seriesKey][0];

          seriesManager.addSeriesToChart(seriesKey, seriesInfo);
          createCheckbox(seriesKey, i);
        }

        chartCommon();
        setDateFormat();
        cursorHandler();
        setDateAxis();
        setValueAxis();
      };

      // 이벤트 핸들러
      const addBtn = document.querySelector(
        '[data-product-id="addSeriesButton"]'
      );
      addBtn.addEventListener("click", increaseGarph);

      initializeLegendAndSeries();
    }

    // 외부 핸들링 함수
    const bulletEventHandler = (e) => {
      if (e.target.className === "Image") {
        changeNews(e);
      }
    };

    // 별 클릭
    const changeNews = (e) => {
      console.log("별 클릭!", e.target.className);

      const chartMsg = document.querySelector('[data-topic-news="chartMsg"]');
      chartMsg.classList.toggle("active");
    };

    createLineChart(id, lineData);
  };

  // 차트 : 파이
  const pieChart = (id, data) => {
    // am4core.useTheme(am4themes_animated);

    const chart = am4core.create(id, am4charts.PieChart);
    chart.data = data;
    chart.innerRadius = am4core.percent(50); // 차트의 내부 반지름을 조정하여 차트가 화면을 완전히 채우도록 함

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    const slice = pieSeries.slices.template;

    pieSeries.sequencedInterpolation = true; // 시리즈에 대한 sequencedInterpolation 속성 추가
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.labels.template.disabled = true;

    slice.propertyFields.fill = "color";
    slice.strokeWidth = 1;
    slice.tooltipText = "";
    slice.states.getKey("hover").properties.scale = 1;

    const label1 = chart.seriesContainer.createChild(am4core.Label);
    label1.text = "";
    label1.horizontalCenter = "middle";
    label1.fontSize = 28;
    label1.fontWeight = 600;
    label1.dy = -20;

    const label2 = chart.seriesContainer.createChild(am4core.Label);
    label2.text = "";
    label2.horizontalCenter = "middle";
    label2.fontSize = 15;
    label1.fontWeight = 500;
    label2.dy = 15;

    chart.events.on("ready", function (ev) {
      pieSeries.slices.getIndex(0).isActive = true;
    });

    slice.events.on("toggled", function (ev) {
      if (ev.target.isActive) {
        // 클릭시 active 애니메이션 효과 false
        pieSeries.slices.each(function (slice) {
          slice.isActive = false;
        });

        label1.text = chart.numberFormatter.format(
          ev.target.dataItem.values.value.percent,
          "#.#'%'"
        );
        label1.fill = am4core.color("#232433"); // 검정색으로 지정
        label2.text = ev.target.dataItem.category;
        label2.fill = am4core.color("#71747C");
      }
    });
  };

  // 반원그래프
  const pieRoundChart = (id, data) => {
    // am4core.useTheme(am4themes_animated);

    const chart = am4core.create(id, am4charts.PieChart);
    const series = chart.series.push(new am4charts.PieSeries());

    // 차트에 애니메이션 효과 적용
    chart.hiddenState.properties.opacity = 0;

    // 배경데이터 만들기
    chart.data = [
      ...data,
      { category: "기타", value: 100 - data[0].value, color: "#E0E7EC" },
    ];

    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(75);
    chart.paddingBottom = 30;

    chart.startAngle = 180;
    chart.endAngle = 360;

    series.dataFields.value = "value";
    series.dataFields.category = "category";

    series.slices.template.propertyFields.fill = "color";
    series.slices.template.cornerRadius = 0;
    series.slices.template.innerCornerRadius = 0;
    series.slices.template.draggable = false; // 드래그 비활성화
    series.slices.template.inert = false; // 드래그 후 관성 효과 비활성화
    series.slices.template.clickable = false; // 클릭 이벤트 비활성화

    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;

    series.slices.template.tooltipText = ""; // Disable tooltips
    series.tooltip.disabled = true;

    // 슬라이스 호버 비활성화
    series.slices.template.hoverable = false;
    series.slices.template.states.getKey("hover").properties.scale = 1;

    // 클릭시 active 애니메이션 효과 false
    series.slices.template.events.on("toggled", function (ev) {
      if (ev.target.isActive) {
        series.slices.each(function (slice) {
          slice.isActive = false;
        });
      }
    });

    // 라벨정렬
    let label = chart.seriesContainer.createChild(am4core.Label);
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 28;
    label.fontWeight = "600";
    label.dy = -30; // 차트 중앙에서 위로 20px 옮김. 필요에 따라 조정

    // Calculate
    let total = data.reduce((acc, item) => acc + item.value, 0);
    label.text = total + "%";

    let label0 = chart.seriesContainer.createChild(am4core.Label);
    label0.isMeasured = false;
    label0.text = "LOW";
    label0.valign = "bottom"; // 텍스트를 하단으로 정렬
    label0.horizontalCenter = "middle"; // 텍스트를 왼쪽으로 정렬
    label0.fontSize = 14;
    label0.fontWeight = "400";
    label0.fill = am4core.color("#71747C");
    label0.dx = -112;
    label0.dy = 5;

    let label1 = chart.seriesContainer.createChild(am4core.Label);
    label1.isMeasured = false;
    label1.text = "HIGH";
    label1.valign = "bottom"; // 텍스트를 하단으로 정렬
    label1.horizontalCenter = "middle"; // 텍스트를 왼쪽으로 정렬
    label1.fontSize = 14;
    label1.fontWeight = "400";
    label1.fill = am4core.color("#71747C");
    label1.dx = 112;
    label1.dy = 5;
  };

  // 세계지도
  const mapChart = (id, data) => {
    // am4core.useTheme(am4themes_animated);

    const chart = am4core.create(id, am4maps.MapChart);
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    const polygonTemplate = polygonSeries.mapPolygons.template;
    const hs = polygonTemplate.states.create("hover");
    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    const imageSeriesTemplate = imageSeries.mapImages.template;
    const interfaceColors = new am4core.InterfaceColorSet();

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    chart.seriesContainer.draggable = false; // 드래그 비활성화
    chart.seriesContainer.resizable = false; // 크기 조절 비활성화
    chart.maxZoomLevel = 1; // 최대 줌 레벨 설정
    chart.deltaLongitude = -154.8; // 지도 좌우 변환

    polygonTemplate.stroke = 0; // 지역별 구분선 없애기

    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ["AQ", "GL"]; // 남극, 그린란드 제외

    // 도트 패턴
    var pattern = new am4core.CirclePattern();
    pattern.width = 5;
    pattern.height = 5;
    pattern.radius = 1.5;
    pattern.fill = am4core.color("#B9C6D8");
    pattern.strokeWidth = 0; // 테두리 제거

    // 패턴 적용
    polygonTemplate.fill = pattern;

    // 속성 설정
    imageSeriesTemplate.propertyFields.longitude = "longitude";
    imageSeriesTemplate.propertyFields.latitude = "latitude";

    imageSeries.data = data;

    chart.events.on("ready", updateCustomMarkers);
    chart.events.on("mappositionchanged", updateCustomMarkers);

    // 마커 좌표 업데이트
    function updateCustomMarkers(event) {
      imageSeries.mapImages.each(function (image) {
        if (!image.dummyData || !image.dummyData.externalElement) {
          image.dummyData = {
            externalElement: createCustomMarker(image),
          };
        }

        // 좌표에 따라 요소 위치를 변경합니다.
        const xy = chart.geoPointToSVG({
          longitude: image.longitude,
          latitude: image.latitude,
        });
        image.dummyData.externalElement.style.top = xy.y + "px";
        image.dummyData.externalElement.style.left = xy.x + "px";
      });
    }

    // 마커, 툴팁 생성
    function createCustomMarker(image) {
      const chart = image.dataItem.component.chart;

      // 마커 생성
      const holder = document.createElement("div");
      holder.className = "map-marker";
      holder.style.position = "absolute";

      // 툴팁 생성
      const tooltip = document.createElement("div");
      const value = document.createElement("strong");

      value.className = "map-tooltip-value";
      value.innerHTML = image.dataItem.dataContext.value + "%";

      tooltip.style.position = "absolute";
      tooltip.className = "map-tooltip";
      tooltip.innerHTML = image.dataItem.dataContext.title;

      tooltip.appendChild(value);
      holder.appendChild(tooltip);

      // 도트 생성
      const dot = document.createElement("div");
      dot.className = "dot";
      holder.appendChild(dot);

      // 펄스 생성
      const pulse = document.createElement("div");
      pulse.className = "pulse";
      holder.appendChild(pulse);

      // 클릭 가능한 링크 추가 (선택 사항)
      if (undefined != image.url) {
        holder.onclick = function () {
          window.location.href = image.url;
        };
        holder.className += " map-clickable";
      }

      // 마커를 지도 컨테이너에 추가
      chart.svgContainer.htmlElement.appendChild(holder);

      return holder;
    }
  };

  // 투자자 매매동향
  const multiLineChart = (id, data) => {
    // am4core.useTheme(am4themes_animated);

    const chart = am4core.create(id, am4charts.XYChart);
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = null;
    let bullet = null;

    // 차트 데이터
    chart.data = data;

    // 차트 공통
    function chartCommon() {
      chart.padding(0, 0, 0, 0);

      // Create series for each data field
      createSeries(
        "visits1",
        "개인",
        "#8681FF" // lineColor
      );
      createSeries(
        "visits2",
        "기관",
        "#26C1F8" // lineColor
      );
      createSeries(
        "visits3",
        "은행",
        "#1DB5AE" // lineColor
      );
    }

    // 커서 설정
    function cursorHandler() {
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.maxTooltipDistance = -1;

      // 드래그하여 X축과 Y축 모두에서 줌 가능하게 설정
      chart.cursor.behavior = "zoomXY";
    }

    // 차트 제목
    function legendHandler() {
      chart.legend = new am4charts.Legend();
      chart.legend.useDefaultMarker = true;

      chart.legend.position = "top";
      chart.legend.fontSize = 15;
      chart.legend.width = 300;
      chart.legend.padding(0, 0, 10, 0);
      chart.legend.labels.template.fill = am4core.color("#232433");
      chart.legend.dx = -45;

      const markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 16;
      markerTemplate.height = 16;
    }

    // 날짜 형식
    function setDateFormat() {
      // day
      dateAxis.dateFormats.setKey("day", "yy.MM.dd");
      dateAxis.periodChangeDateFormats.setKey("day", "yy.MM.dd");

      // month
      dateAxis.dateFormats.setKey("month", "yy.MM");
      dateAxis.periodChangeDateFormats.setKey("month", "yy.MM");

      // year
      dateAxis.dateFormats.setKey("year", "yy");
      dateAxis.periodChangeDateFormats.setKey("year", "yy");
    }

    // x축 설정
    function setDateAxis() {
      dateAxis.renderer.minGridDistance = 70; // 날짜 레이블 간격 조정
      dateAxis.renderer.baseGrid.disabled = true;
      dateAxis.renderer.grid.template.strokeOpacity = 0;
      dateAxis.renderer.labels.template.fill = am4core.color("#71747c");
      dateAxis.renderer.labels.template.fontSize = 14;

      // x축라벨 위치
      dateAxis.renderer.maxLabelPosition = 1;
      dateAxis.renderer.labels.template.dx = 0;
      dateAxis.renderer.labels.template.dy = 0;

      dateAxis.startLocation = 0.3; // X축의 시작점을 약간 오른쪽으로 이동
      dateAxis.endLocation = 0; // X축의 끝점을 약간 왼쪽으로 이동

      // x축 하단 세로바
      dateAxis.renderer.ticks.template.disabled = false;
      dateAxis.renderer.ticks.template.strokeOpacity = 1;
      dateAxis.renderer.ticks.template.stroke = am4core.color("#D4D8E2");
      dateAxis.renderer.ticks.template.strokeWidth = 1;
      dateAxis.renderer.ticks.template.length = 8;

      dateAxis.renderer.line.strokeOpacity = 1;
      dateAxis.renderer.line.strokeWidth = 1;
      dateAxis.renderer.line.stroke = am4core.color("#D4D8E2");

      dateAxis.tooltip.disabled = true; // 축툴팁 감추기
    }

    // y축 설정
    function setValueAxis() {
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.grid.template.strokeOpacity = 0.5;
      valueAxis.renderer.grid.template.strokeDasharray = 3;
      valueAxis.renderer.grid.template.stroke = am4core.color("#D4D8E2");
      valueAxis.renderer.labels.template.fill = am4core.color("#71747c");
      valueAxis.renderer.labels.template.fontSize = 14;

      // y축라벨 위치 내부로 이동
      valueAxis.renderer.inside = true;
      valueAxis.renderer.maxLabelPosition = 0.99;
      valueAxis.renderer.labels.template.dx = -10;
      valueAxis.renderer.labels.template.dy = -15;

      valueAxis.tooltip.disabled = true; // 축툴팁 감추기
    }

    // 차트 시리즈 생성
    const createSeries = (field, name, lineColor) => {
      series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";

      series.name = name; // legend 네임에 들어감
      series.strokeWidth = 2; // 차트라인 두께
      series.fillOpacity = 0; // 차트배경 투명도
      series.tensionX = 1; // 곡선 효과

      series.fill = am4core.color(lineColor); // 배경 색상 설정
      series.stroke = am4core.color(lineColor); // 선 색상 설정

      // 기본 블릿
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      const circle = bullet.createChild(am4core.Circle);
      const circleHover = bullet.states.create("hover");

      bullet.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일
      bullet.properties.scale = 0; // 기본블릿 스케일
      circleHover.properties.scale = 1; // 기본블릿 마우스 오버 스케일

      // 기본블릿 스타일
      circle.width = 16;
      circle.height = 16;
      circle.strokeWidth = 10;
      circle.strokeOpacity = 0.2;
      circle.stroke = am4core.color(lineColor).lighten(0.2);
      circle.fill = am4core.color(lineColor);

      // 툴팁 함수호출
      makeTooltip();

      return series;
    };

    // 툴팁 만들기
    const makeTooltip = () => {
      series.dataFields.visits1ValueY = "visits1";
      series.dataFields.visits2ValueY = "visits2";
      series.dataFields.visits3ValueY = "visits3";

      series.tooltipHTML = `
				<ul class='multiLine-chart-tooltip'>
					<li>{date}</li>
					<li><span>개인순매수</span> <strong>{visits1ValueY}억</strong></li>
					<li><span>거래순매수</span> <strong>{visits2ValueY}억</strong></li>
					<li><span>은행순매수</span> <strong>{visits3ValueY}억</strong></li>
				</ul>`;

      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#004096");

      // 툴팁 가이드 라인 설정
      series.tooltip.label.minWidth = 120; // 툴팁의 최소 너비 설정
      series.tooltip.label.minHeight = 118; // 툴팁의 최소 높이 설정
      series.tooltip.label.fontSize = 13; // 툴팁 내 텍스트의 폰트 크기
      series.tooltip.pointerOrientation = "left"; // 툴팁 방향

      // 가이드 라인 스타일 설정
      series.tooltip.background.strokeWidth = 0; // 가이드 라인 두께
      series.tooltip.background.strokeOpacity = 0; // 가이드 라인 투명도
      series.tooltip.background.pointerLength = 6; // 화살표 크기

      series.tooltip.dx = 10; // 툴팁 좌표
    };

    chartCommon();
    setDateFormat();
    setDateAxis();
    setValueAxis();
    cursorHandler();
    legendHandler();
  };

  // 키워드 인기 검색 순위
  const keywordLineChart = (id, data) => {
    // am4core.useTheme(am4themes_animated)

    const chart = am4core.create(id, am4charts.XYChart);
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = null;

    // 차트 데이터
    chart.data = data;

    // 차트 공통
    function chartCommon() {
      chart.padding(0, 0, 0, 0);

      // Create series for each data field
      createSeries(
        "visits1",
        "rgba(72, 150, 255, 1)", // lineColor
        "rgba(72, 150, 255, 0.3)", // startColor
        "rgba(72, 150, 255, 0)" // endColor
      );
    }

    // 커서 설정
    function cursorHandler() {
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.maxTooltipDistance = 0;

      chart.cursor.lineX.stroke = am4core.color("#4896FF");
      chart.cursor.fullWidthLineX = true;

      chart.cursor.lineX.strokeWidth = 2;
      chart.cursor.lineX.strokeOpacity = 1;
      chart.cursor.lineX.strokeDasharray = "";

      chart.cursor.snapToSeries = [series]; // 커서 자르기

      // 드래그하여 X축과 Y축 모두에서 줌 가능하게 설정
      chart.cursor.behavior = "zoomXY";
    }

    // 날짜 형식
    function setDateFormat() {
      // day
      dateAxis.dateFormats.setKey("day", "yy.MM.dd");
      dateAxis.periodChangeDateFormats.setKey("day", "yy.MM.dd");

      // month
      dateAxis.dateFormats.setKey("month", "yy.MM");
      dateAxis.periodChangeDateFormats.setKey("month", "yy.MM");

      // year
      dateAxis.dateFormats.setKey("year", "yy");
      dateAxis.periodChangeDateFormats.setKey("year", "yy");
    }

    // x축 설정
    function setDateAxis() {
      dateAxis.renderer.minGridDistance = 70; // 날짜 레이블 간격 조정
      dateAxis.renderer.baseGrid.disabled = true;
      dateAxis.renderer.grid.template.strokeOpacity = 0;
      dateAxis.renderer.labels.template.fill = am4core.color("#71747c");
      dateAxis.renderer.labels.template.fontSize = 14;

      // x축라벨 위치
      dateAxis.renderer.maxLabelPosition = 1;
      dateAxis.renderer.labels.template.dx = 0;
      dateAxis.renderer.labels.template.dy = 0;

      dateAxis.startLocation = 1; // X축의 시작점을 약간 오른쪽으로 이동
      dateAxis.endLocation = 0; // X축의 끝점을 약간 왼쪽으로 이동

      // x축 하단 세로바
      dateAxis.renderer.ticks.template.disabled = false;
      dateAxis.renderer.ticks.template.strokeOpacity = 1;
      dateAxis.renderer.ticks.template.stroke = am4core.color("#D4D8E2");
      dateAxis.renderer.ticks.template.strokeWidth = 1;
      dateAxis.renderer.ticks.template.length = 8;

      dateAxis.renderer.line.strokeOpacity = 1;
      dateAxis.renderer.line.strokeWidth = 1;
      dateAxis.renderer.line.stroke = am4core.color("#D4D8E2");

      dateAxis.tooltip.disabled = true; // 축툴팁 감추기
    }

    // y축 설정
    function setValueAxis() {
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.grid.template.strokeOpacity = 1;
      valueAxis.renderer.grid.template.strokeDasharray = 3;
      valueAxis.renderer.grid.template.stroke = am4core.color("#D4D8E2");
      valueAxis.renderer.labels.template.fill = am4core.color("#71747c");
      valueAxis.renderer.labels.template.fontSize = 14;

      // y축라벨 위치 내부로 이동
      valueAxis.renderer.inside = false;
      valueAxis.renderer.maxLabelPosition = 0.99;
      valueAxis.renderer.labels.template.dx = 0;
      valueAxis.renderer.labels.template.dy = 0;

      valueAxis.tooltip.disabled = true; // 축툴팁 감추기
    }

    // 차트 시리즈 생성
    const createSeries = (field, lineColor, startColor, endColor) => {
      series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";

      series.name = field; // legend 네임에 들어감
      series.strokeWidth = 2; // 차트라인 두께
      series.fillOpacity = 0.7; // 차트배경 투명도
      series.tensionX = 0.7; // 곡선 효과

      series.fill = am4core.color(lineColor); // 배경 색상 설정
      series.stroke = am4core.color(lineColor); // 선 색상 설정

      // 그라데이션
      let gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color(startColor));
      gradient.addColor(am4core.color(endColor));
      gradient.rotation = 90;
      series.fill = gradient;

      // 기본 블릿
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      let circle = bullet.createChild(am4core.Circle);
      let circleHover = bullet.states.create("hover");

      bullet.cursorOverStyle = am4core.MouseCursorStyle.pointer; // 커서 스타일
      bullet.properties.scale = 0; // 기본블릿 스케일
      circleHover.properties.scale = 1; // 기본블릿 마우스 오버 스케일

      // 기본블릿 스타일
      circle.width = 18;
      circle.height = 18;
      circle.strokeWidth = 4;
      circle.strokeOpacity = 1;
      circle.stroke = am4core.color("#fff");
      circle.fill = am4core.color(lineColor);
      circle.showTooltipOn = "always";

      // 블릿 그림자
      // let shadow = new am4core.DropShadowFilter();
      // shadow.dx = 0;
      // shadow.dy = 2;
      // shadow.blur = 2;
      // circle.filters.push(shadow);

      // 툴팁 함수호출
      makeTooltip();

      return series;
    };

    // 툴팁 만들기
    const makeTooltip = () => {
      series.dataFields.visits1ValueY = "visits1";
      // series.dataFields.visits2ValueY = 'visits2'
      // series.dataFields.visits3ValueY = 'visits3'

      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#fff");
      series.tooltip.background.fillOpacity = 1;
      series.tooltip.background.stroke = am4core.color("#D4D8E2"); // 툴팁 테두리 색상 설정

      // 툴팁 가이드 라인 설정
      series.tooltip.label.minWidth = 120; // 툴팁의 최소 너비 설정
      series.tooltip.label.minHeight = 60; // 툴팁의 최소 높이 설정
      series.tooltip.label.fontSize = 12; // 툴팁 내 텍스트의 폰트 크기
      series.tooltip.pointerOrientation = "left"; // 툴팁 방향
      series.tooltip.dx = 12; // 툴팁 좌표

      // 가이드 라인 스타일 설정
      series.tooltip.background.strokeWidth = 1; // 가이드 라인 두께
      series.tooltip.background.strokeOpacity = 1; // 가이드 라인 투명도
      series.tooltip.background.pointerLength = 0; // 화살표 크기

      // 툴팁 그림자 비활성화
      series.tooltip.background.filters.clear();

      series.tooltipHTML = `
				<ul class='keywordLine-chart-tooltip'>
					<li>{date}</li>
					<li><span>KODEX 200</span> <strong>{visits1ValueY}만</strong></li>
				</ul>`;
    };

    chartCommon();
    setDateFormat();
    setDateAxis();
    setValueAxis();
    cursorHandler();
  };

  return {
    productTreeMap: treeMap,
    pieChart: pieChart,
    pieRoundChart: pieRoundChart,
    lineChartGradient: lineChartGradient,
    lineChartGradientFund: lineChartGradientFund,
    mapChart: mapChart,
    multiLineChart: multiLineChart,
    keywordLineChart: keywordLineChart,
  };
})();
