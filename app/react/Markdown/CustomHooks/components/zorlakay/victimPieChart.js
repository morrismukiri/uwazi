import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ResponsiveContainer, PieChart, XAxis, YAxis, Cell, Pie, Tooltip, Rectangle, Legend} from 'recharts';
import colorScheme from 'app/Charts/utils/colorScheme';
import {getFacetBuckets, getThesauriItemLabel} from './helpers';
import ExtendedTooltip from './extendedTooltip';

class VictimPieChart extends Component {
  render() {
    const {data, thesauris, thesauriId, field} = this.props;
    const facets = getFacetBuckets(data, field);
    const formatted = facets.map(({key, doc_count}) => {
      const name = getThesauriItemLabel(thesauris, thesauriId, key);
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
                formatted.map((entry, index) => <Cell key={index} fill={colorScheme[index % colorScheme.length]}/>)
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
  field: PropTypes.string,
  thesauriId: PropTypes.string
};

const mapStateToProps = ({thesauris}) => ({
  thesauris
});

export default connect(mapStateToProps)(VictimPieChart);
