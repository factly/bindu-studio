import React from "react";
import Area from "./area/index.js";
import StackedArea from "./stacked_area/index.js";
import StackedAreaProportional from "./stacked_area_proportional/index.js";
import Bar from "./bar/index.js";
import HorizontalBar from "./horizontal_bar/index.js";
import HorizontalStackBar from "./horizontal_stacked_bar/index.js";
import GroupedBar from "./grouped_bar/index.js";
import Line from "./line/index.js";
import LineProjected from "./line_projected/index.js";
import Pie from "./pie/index.js";
import GroupedLine from "./grouped_line/index.js";
import LineBar from "./line_bar/index.js";
import DivergingBar from "./diverging_bar/index.js";
import Donut from "./donut/index.js";
import GroupedBarProportional from "./grouped_bar_proportional/index.js";
import HorizontalGroupedBarProportional from "./horizontal_grouped_bar_proportional/index.js";
import { useParams } from "react-router-dom";

function OptionComponent(){
	let { id } = useParams();
  	id = parseInt(id);
	switch (id) {
	  case 0:
	    return <Area />
	  case 1:
	    return <StackedArea />
	  case 2:
	    return <StackedAreaProportional />
	  case 3:
	    return <Bar />
	  case 4:
	    return <HorizontalBar />
	  case 5:
	    return <HorizontalStackBar />
	  case 6:
	    return <GroupedBar />
	  case 7:
	    return <GroupedLine />
	  case 8:
	    return <Line />
	  case 9:
	    return <LineProjected />
	  case 10:
	    return <Pie />
	  case 11:
	    return <Donut />
	  case 12:
	    return <LineBar />
	  case 13:
	    return <DivergingBar />
	  case 14:
	    return <GroupedBarProportional />
	  case 15:
	    return <HorizontalGroupedBarProportional />
	  default:
	    return null
	}
}

export default OptionComponent;