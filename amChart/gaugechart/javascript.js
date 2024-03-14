const gaugeChart = (id, data) => {
  am4core.useTheme(am4themes_animated);

  // 게이지 차트 생성
  const chart = am4core.create(id, am4charts.GaugeChart);
  chart.hiddenState.properties.opacity = 0; // 초기 페이드 인 효과 설정

  // 차트 속성 설정
  chart.innerRadius = -55;

  // 값 축 생성
  const axis = chart.xAxes.push(new am4charts.ValueAxis());
  axis.min = 0;
  axis.max = 100;
  axis.strictMinMax = true;
  axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor(
    "background"
  );
  axis.renderer.grid.template.strokeOpacity = 0;
  axis.renderer.minGridDistance = 10000;

  // 색상 설정
  const colorSet = new am4core.ColorSet();

  console.log(colorSet);
  // Category 1에 대한 range 설정
  const range0 = axis.axisRanges.create();
  range0.value = 0;
  range0.endValue = data[0].value;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = am4core.color(data[0].color); // data에서 색상 읽기
  range0.axisFill.zIndex = -1;

  // Category 2에 대한 range 설정
  const range1 = axis.axisRanges.create();
  range1.value = data[0].value; // 직전 range의 endValue 사용
  range1.endValue = 100;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = am4core.color(data[1].color); // data에서 색상 읽기
  range1.axisFill.zIndex = -1;

  // 시작 숫자 위치 조정
  axis.renderer.baseGrid.strokeOpacity = 0;
  axis.renderer.labels.template.radius = 36; // 시작 숫자 위치 조정
  axis.renderer.labels.template.paddingTop = 35;
  axis.renderer.labels.template.inside = true;
  axis.renderer.labels.template.fill = am4core.color("#000"); // 숫자 색상 설정

  // 시작 및 끝 텍스트 변경
  axis.renderer.labels.template.adapter.add("text", function (text) {
    if (text == "0") {
      return "LOW";
    }
    if (text == "100") {
      return "HIGH";
    }
    return text;
  });

  // 중앙 레이블 추가
  const label = chart.seriesContainer.createChild(am4core.Label);
  label.text = data[0].value + "%"; // 레이블 텍스트 설정
  label.horizontalCenter = "middle"; // 수평 중앙 정렬
  label.verticalCenter = "middle"; // 수직 중앙 정렬
  label.fontSize = 20; // 폰트 크기 설정
  label.y = am4core.percent(-15); // 중앙에 위치하도록 y 값을 조정

  // 데이터 설정
  chart.data = data;
};
