import React, { FunctionComponent } from 'react'
import Plotly from 'plotly.js-basic-dist'
import * as PlotlyTyped from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import { GraphItem, BarPlotColors } from './types'
import _ from 'lodash-es'

const Plot = createPlotlyComponent(Plotly)

export type BarPlotProps = {
  isTop: boolean
  style?: React.CSSProperties
  plotData: GraphItem[]
  layoutConfig: Partial<PlotlyTyped.Layout>
  optionsConfig: Partial<PlotlyTyped.Config>
  label: string
  xMax: number
  colors?:  BarPlotColors
  onClick?: Function
}

type LayoutOptions = { isTop: boolean; maxValue: number; isLegend?: boolean }

function getBarPlotDataPoints(
  data: any[],
  filter?: string,
  colors?: BarPlotColors,
): any[] {
  if (filter) {
    data = data.filter(item => item.y === filter)
  }
  var groups = _.uniq(data.map(item => item['group']))
  const result: any[] = []
  const defaultColors = [`(28,118,175,1)`, `rgba(91,176,181,1)`]

  groups.forEach((group, i) => {
    const items = data.filter(item => item.group === group)
    result.push({
      x: items.map(item => item.x),
      y: items.map(item => item.y),
      name: group,
      orientation: 'h',
      marker: {
        color: colors ? colors[group] : defaultColors[i],
        width: 1,
      },
      type: 'bar',
    })
  })

  return result
}

function getLayout(
  layoutConfig: Partial<PlotlyTyped.Layout>,
  { isTop, maxValue }: LayoutOptions,
): Partial<PlotlyTyped.Layout> {
  const layout = _.cloneDeep(layoutConfig)
  layout.xaxis = {
    visible: false,
    range: [0, maxValue],
  }
  layout.showlegend = false
  layout.height = isTop ? 40 : 20
  return layout
}

const BarPlot: FunctionComponent<BarPlotProps> = ({
  plotData,
  optionsConfig,
  isTop,
  layoutConfig,
  label,
  xMax,
  colors,
  style = { width: '100%', height: '100%' },
}: BarPlotProps) => {
  return (
    <Plot
      style={style}
      layout={getLayout(layoutConfig, {
        isTop,
        maxValue: xMax,
      })}
      config={optionsConfig}
      data={getBarPlotDataPoints(plotData, label, colors)}
    />
  )
}

export default BarPlot