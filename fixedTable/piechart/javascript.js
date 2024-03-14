am4core.ready(function () {
  am4core.options.commercialLicense = "AKD-73667548429";

  am4core.useTheme(am4themes_animated);

  const data = [{
    "category": "국내주식",
    "value": 89.6,
    "color": am4core.color("#4D7AF0"),

  }, {
    "category": "해외주식",
    "value": 7.1,
    "color": am4core.color("#5AA9FF"),
  }, {
    "category": "국내채권",
    "value": 3.3,
    "color": am4core.color("#69D5D0"),
  }]

  const chart = am4core.create("chartdiv", am4charts.PieChart);
  chart.data = data;
  chart.width = 200;
  chart.height = 200;
  chart.innerRadius = am4core.percent(100); // 차트의 내부 반지름을 조정하여 차트가 화면을 완전히 채우도록 함


  const pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.sequencedInterpolation = true; // 시리즈에 대한 sequencedInterpolation 속성 추가
  pieSeries.dataFields.value = "value";
  pieSeries.dataFields.category = "category";
  pieSeries.slices.template.propertyFields.fill = "color";
  pieSeries.labels.template.disabled = true;  
  pieSeries.slices.template.strokeWidth = 1;


  const label1 = chart.seriesContainer.createChild(am4core.Label);
  label1.text = "";
  label1.horizontalCenter = "middle";
  label1.fontSize = 28;
  label1.fontWeight = 600;
  label1.dy = -30;

  const label2 = chart.seriesContainer.createChild(am4core.Label);
  label2.text = "";
  label2.horizontalCenter = "middle";
  label2.fontSize = 15;
  label2.dy = 10;
  

  chart.events.on("ready", function (ev) {
    pieSeries.slices.getIndex(0).isActive = true;
  });

  pieSeries.slices.template.events.on("toggled", function (ev) {
    if (ev.target.isActive) {
      // 클릭시 active 애니메이션 효과 false
      pieSeries.slices.each(function (slice) {
        slice.isActive = false;
      });

      label1.text = chart.numberFormatter.format(ev.target.dataItem.values.value.percent, "#.#'%'");
      label1.fill = am4core.color("#232433"); // 검정색으로 지정
      label2.text = ev.target.dataItem.category;
      label2.fill = am4core.color("#71747C");
    }
  });

}); 