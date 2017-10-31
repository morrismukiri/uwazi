import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip, Rectangle, Legend} from 'recharts';
import colorScheme, {light as colorSchemeLight} from 'app/Charts/utils/colorScheme';
import {getFacetBuckets, getThesauriItemLabel} from './helpers';
import ExtendedTooltip from './extendedTooltip';

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

class VictimBarChart extends Component {
  render() {
    const {data, thesauris, idConfig} = this.props;
    const facets = getFacetBuckets(data, 'place_of_the_event');
    const citiesThesauri = idConfig.get('thesauriLocalGeographicalArea');
    const formatted = facets.map(({key, doc_count}) => {
      const name = getThesauriItemLabel(thesauris, citiesThesauri, key);
      return {
        key,
        doc_count,
        name,
        xAxisName: ''
      };
    });
    return (
      <ResponsiveContainer height={320}>
        <BarChart height={300} data={formatted}
          margin={{top: 0, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey='xAxisName'/>
          <YAxis />
          <CartesianGrid strokeDasharray='2 4'/>
          <Bar dataKey='doc_count' fill='#D24040' shape={<ColoredBar color='light' />} />
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
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

VictimBarChart.propTypes = {
  data: PropTypes.object,
  thesauris: PropTypes.object,
  idConfig: PropTypes.object
};

const mapStateToProps = ({thesauris, settings}) => ({
  thesauris,
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(VictimBarChart);
