const chartData = {
  "treemap-chart-01": {
    name: "첫 번째 카테고리",
    children: [
      { name: "삼성 11", value: 10 },
      { name: "삼성 2", value: 5 },
      { name: "삼성 43", value: 3 },
      { name: "삼성 4", value: 1 },
      { name: "삼성 5", value: 0.5 },
      { name: "삼성 6", value: 0 },
    ],
  },
  "treemap-chart-02": {
    name: "두 번째 카테고리",
    children: [
      { name: "삼성 11", value: -10 },
      { name: "삼성 2", value: -5 },
      { name: "삼성 43", value: -3 },
      { name: "삼성 4", value: -1 },
      { name: "삼성 5", value: -0.5 },
    ],
  },
};

function getColor(value) {
  if (value >= 10) return { background: "#F26060", color: "#fff" };
  else if (value >= 5) return { background: "#FF8585", color: "#fff" };
  else if (value >= 3) return { background: "#FFA598", color: "#000" };
  else if (value >= 1) return { background: "#FBCBC1", color: "#000" };
  else if (value >= 0.5) return { background: "#F5DDD0", color: "#000" };
  else if (value >= 0) return { background: "#D7E2EB", color: "#000" };
  else if (value >= -0.5) return { background: "#CFEDDD", color: "#000" };
  else if (value >= -1) return { background: "#AEDDCE", color: "#000" };
  else if (value >= -3) return { background: "#78B4DF", color: "#000" };
  else if (value >= -5) return { background: "#6481CC", color: "#fff" };
  else if (value <= -10) return { background: "#485FB4", color: "#fff" };
  return { background: "#D7E2EB", color: "#000" }; // 기본 색상
}
am4core.ready(function () {
  // 차트 div
  const chartDiv = am4core.create("treemap-chart-01", am4charts.TreeMap);

  // 데이터 설정
  chartDiv.data = chartData;

  // 트리맵 시리즈 생성
  const series = chartDiv.series.push(new am4charts.TreeMapSeries());
  series.dataFields.value = "value";
  series.dataFields.name = "name";

  // 색상 팔레트 설정
  series.colors = new am4core.ColorSet();

  // step 속성 설정
  series.colors.step = 2;

  // 툴팁 설정
  series.tooltip.label.text = "{name}: {value}";

  // 레이블 설정
  //   const label = series.labels.template;
  //   label.text = "{name}";
  //   label.fontSize = 10;

  // 마진 설정
  chartDiv.margin(10, 10, 10, 10);
});
