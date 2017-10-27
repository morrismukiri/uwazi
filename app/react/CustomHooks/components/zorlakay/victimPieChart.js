import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ResponsiveContainer, PieChart, XAxis, YAxis, Cell, Pie, Tooltip, Rectangle, Legend} from 'recharts';
import colorScheme, {light as colorSchemeLight} from 'app/Charts/utils/colorScheme';
import {getFacetBuckets, getThesauriItemLabel} from './helpers';

export class ExtendedTooltip extends React.Component {
  render() {
    if (this.props.active) {
      return (
        <div style={{backgroundColor: '#fff', border: '1px solid #ccc'}}>
          <div style={{backgroundColor: '#eee', borderBottom: '1px dashed #ccc', padding: '5px'}}>
            {this.props.payload[0].payload.name}&nbsp;&nbsp;
          </div>
          <div style={{padding: '5px'}}>
            {'Victims'}:&nbsp;&nbsp;<b style={{color: '#600'}}>{this.props.payload[0].value}</b><br />
          </div>
        </div>
      );
    }
    return null;
  }
}

ExtendedTooltip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
  chartLabel: PropTypes.string
};

export const ColoredBar = (props) => {
  const {index, color} = props;
  const colorPallete = color !== 'light' ? colorScheme : colorSchemeLight;
  return <Rectangle {...props} stroke='none' fill={colorPallete[index % colorScheme.length]}/>;
};

ColoredBar.propTypes = {
  color: PropTypes.string,
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number
};

class VictimPieChart extends Component {
  render() {
    const {data, thesauris, idConfig} = this.props;
    const facets = getFacetBuckets(data, 'status_of_the_victim_at_the_end_of_act');
    const statusThesauri = idConfig.get('thesauriStatusAsVictim');
    const formatted = facets.map(({key, doc_count}) => {
      const name = getThesauriItemLabel(thesauris, statusThesauri, key);
      const value = doc_count;
      return {
        key,
        doc_count,
        name,
        xAxisName: '',
        value
      };
    });
    return (
      <ResponsiveContainer height={320}>
        <PieChart height={300} data={formatted}
          margin={{top: 0, right: 30, left: 0, bottom: 0}}>
          {/* <XAxis dataKey='xAxisName'/>
          <YAxis /> */}
          {/* <CartesianGrid strokeDasharray='2 4'/> */}
          <Pie data={formatted} dataKey='doc_count' fill='#D24040' innerRadius={60} cy={150}>
            {
                formatted.map((entry, index) => <Cell fill={colorScheme[index % colorScheme.length]}/>)
            }
          </Pie>
          <Tooltip content={<ExtendedTooltip />} />
          <Legend
                  payload={formatted.map((item, index) => {
                    return {
                      value: item.name,
                      type: 'rect',
                      color: colorScheme[index % colorScheme.length],
                      formatter: () => <span style={{color: '#333'}}>{item.name}</span>
                    };
                  })}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

VictimPieChart.propTypes = {
  data: PropTypes.object,
  thesauris: PropTypes.object,
  idConfig: PropTypes.object
};

const mapStateToProps = ({thesauris, settings}) => ({
  thesauris,
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(VictimPieChart);
